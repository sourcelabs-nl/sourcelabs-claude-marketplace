const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// Platform-specific Chrome path detection
function getChromePath() {
    const platform = process.platform;

    if (platform === 'darwin') {
        // macOS
        const macPaths = [
            '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
            '/Applications/Chromium.app/Contents/MacOS/Chromium'
        ];
        for (const p of macPaths) {
            if (fs.existsSync(p)) return p;
        }
    } else if (platform === 'win32') {
        // Windows
        const winPaths = [
            'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
            'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
            process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe'
        ];
        for (const p of winPaths) {
            if (fs.existsSync(p)) return p;
        }
    } else {
        // Linux
        const linuxPaths = [
            '/usr/bin/google-chrome',
            '/usr/bin/chromium-browser',
            '/usr/bin/chromium',
            '/snap/bin/chromium'
        ];
        for (const p of linuxPaths) {
            if (fs.existsSync(p)) return p;
        }
    }

    // Let Puppeteer find Chrome automatically
    return undefined;
}

// Load optional configuration
function loadConfig() {
    const configPath = path.join(__dirname, 'pdf-config.json');
    const defaultConfig = {
        chromePath: getChromePath(),
        brandPrimary: '#1089C8',
        brandDark: '#0C7BB8',
        slideWidth: '1200px',
        slideHeight: '800px',
        timeout: 5000
    };

    if (fs.existsSync(configPath)) {
        try {
            const userConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
            console.log('📋 Loaded custom configuration from pdf-config.json\n');
            return { ...defaultConfig, ...userConfig };
        } catch (error) {
            console.warn('⚠️  Warning: Could not parse pdf-config.json, using defaults');
            return defaultConfig;
        }
    }

    return defaultConfig;
}

const config = loadConfig();

// Get presentation name and flags from command line arguments
const args = process.argv.slice(2);
const presentationName = args.find(arg => !arg.startsWith('--'));
const isDryRun = args.includes('--dry-run');

if (!presentationName) {
    console.error('❌ Error: Please specify a presentation name');
    console.log('\nUsage: node scripts/generate-pdf.js <presentation-name> [--dry-run]');
    console.log('\nOptions:');
    console.log('  --dry-run    Show what would be generated without creating PDF');
    process.exit(1);
}

if (isDryRun) {
    console.log('🔍 DRY RUN MODE - No PDF will be generated\n');
}

const slidesBaseDir = path.join(__dirname, '..', 'slides');
const presentationDir = path.join(slidesBaseDir, presentationName);

// Validate presentation directory exists
if (!fs.existsSync(presentationDir)) {
    console.error(`❌ Error: Presentation directory not found`);
    console.log(`\n📁 Expected: ${presentationDir}`);
    console.log(`💡 Current working directory: ${process.cwd()}`);
    console.log(`\n📂 Expected directory structure:`);
    console.log(`   slides/`);
    console.log(`     └── ${presentationName}/`);
    console.log(`         └── [topic folders with HTML files]`);

    if (fs.existsSync(slidesBaseDir)) {
        console.log('\n📋 Available presentations:');
        const dirs = fs.readdirSync(slidesBaseDir).filter(f =>
            fs.statSync(path.join(slidesBaseDir, f)).isDirectory()
        );
        if (dirs.length > 0) {
            dirs.forEach(dir => console.log(`  - ${dir}`));
        } else {
            console.log('  (no presentations found)');
        }
    } else {
        console.log(`\n⚠️  Warning: slides/ directory not found at ${slidesBaseDir}`);
        console.log('   Make sure you are in the correct workspace directory.');
    }
    process.exit(1);
}

console.log(`📄 Generating PDF for "${presentationName}" presentation...\n`);

// Read the presentation HTML file to extract slide order
const presentationHtmlPath = path.join(slidesBaseDir, `${presentationName}.html`);
if (!fs.existsSync(presentationHtmlPath)) {
    console.error(`❌ Error: Presentation HTML file not found`);
    console.log(`\n📁 Expected: ${presentationHtmlPath}`);
    console.log(`\n💡 Make sure the main presentation HTML file exists:`);
    console.log(`   slides/${presentationName}.html`);
    console.log(`\n   This file should contain the categorySlides object that defines`);
    console.log(`   the order and structure of your presentation slides.`);
    process.exit(1);
}

const presentationHtml = fs.readFileSync(presentationHtmlPath, 'utf-8');

// Extract categorySlides object from the presentation HTML
const categorySlideMatch = presentationHtml.match(/const\s+categorySlides\s*=\s*({[\s\S]*?})\s*;/);
if (!categorySlideMatch) {
    console.error('❌ Error: Could not extract slide order from presentation HTML');
    process.exit(1);
}

// Parse the categorySlides object
let categorySlides;
try {
    // Use eval to parse the JavaScript object (safe in this context as we control the input)
    categorySlides = eval(`(${categorySlideMatch[1]})`);
} catch (error) {
    console.error('❌ Error parsing slide order:', error.message);
    process.exit(1);
}

// Build ordered slide list from categorySlides
let allSlides = [];
const categories = Object.keys(categorySlides);

console.log(`Found ${categories.length} categories:`, categories.join(', '));

categories.forEach(category => {
    const slideList = categorySlides[category];
    slideList.forEach(slideInfo => {
        const slidePath = path.join(presentationDir, slideInfo.category, slideInfo.name);
        if (fs.existsSync(slidePath)) {
            allSlides.push({
                category: slideInfo.category,
                file: slideInfo.name,
                path: slidePath
            });
        } else {
            console.warn(`⚠️  Warning: Slide not found: ${slidePath}`);
        }
    });
});

console.log(`Total slides: ${allSlides.length}\n`);

// Build the print version HTML
let printHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${presentationName} - Print Version</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <style>
          
        :root {
       
            /* Typography */
            --font-base: 'Raleway', sans-serif;
            --font-mono: 'Monaco', 'Courier New', monospace;
            
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: var(--font-base);
            color: #333;
            background: white;
        }

        .slide {
            width: ${config.slideWidth};
            height: ${config.slideHeight};
            padding: 60px;
            page-break-after: always;
            page-break-inside: avoid;
            position: relative;
            background: white;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
        }

        /* Title slides (containing .center with h1) should be vertically centered */
        .slide:has(> .center > h1:first-child) {
            justify-content: center;
        }

        /* Logo in bottom right corner */
        .slide::after {
            content: "";
            position: absolute;
            bottom: 20px;
            right: 30px;
            width: 50px;
            height: 50px;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            opacity: 0.8;
        }

        .slide:last-child {
            page-break-after: auto;
        }

        h1 {
            font-size: 3em;
            color: ${config.brandPrimary};
            margin-bottom: 20px;
            font-weight: 700;
        }

        h2 {
            font-size: 2.5em;
            color: ${config.brandPrimary};
            margin-bottom: 40px;
            font-weight: 600;
        }

        h3 {
            font-size: 1.8em;
            color: ${config.brandDark};
            margin-top: 10px;
            margin-bottom: 15px;
            font-weight: 600;
        }

        .subtitle {
            font-size: 1.4em;
            color: #666;
            margin-top: 10px;
        }

        ul {
            list-style: none;
            margin: 20px 0;
        }

        ul li {
            font-size: 1.3em;
            line-height: 1.8;
            margin-bottom: 15px;
            padding-left: 30px;
            position: relative;
        }

        ul li:before {
            content: "▸";
            position: absolute;
            left: 0;
            color: ${config.brandPrimary};
            font-weight: bold;
        }

        .two-column {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-top: 20px;
        }

        code {
            background: #f5f5f5;
            padding: 2px 8px;
            border-radius: 4px;
            font-family: 'Monaco', 'Courier New', monospace;
            font-size: 0.9em;
            color: #d63384;
        }

        pre {
            background: #2d2d2d;
            color: #f8f8f2;
            padding: 20px;
            border-radius: 8px;
            overflow-x: auto;
            margin: 20px 0;
            font-size: 0.95em;
            line-height: 1.5;
        }

        pre code {
            background: none;
            color: inherit;
            padding: 0;
        }

        /* Prism.js overrides for better integration */
        pre[class*="language-"] {
            background: #2d2d2d;
            margin: 20px 0;
            padding: 20px;
            border-radius: 8px;
            font-size: 0.95em;
        }

        code[class*="language-"] {
            background: none;
            color: #f8f8f2;
            text-shadow: none;
            font-family: 'Monaco', 'Courier New', monospace;
        }

        .highlight {
            background: #fff3cd;
            padding: 2px 6px;
            border-radius: 3px;
        }

        .note {
            background: #e7f3ff;
            border-left: 4px solid ${config.brandPrimary};
            padding: 15px 20px;
            margin: 20px 0;
            font-size: 1.1em;
            border-radius: 4px;
        }

        .center {
            text-align: center;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 1.1em;
        }

        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        th {
            background: ${config.brandPrimary};
            color: white;
            font-weight: 600;
        }

        .comparison {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-top: 20px;
        }

        .box {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border: 2px solid #e9ecef;
        }

        .box h4 {
            color: ${config.brandPrimary};
            margin-bottom: 10px;
            font-size: 1.3em;
        }

        @media print {
            .slide {
                page-break-after: always;
                page-break-inside: avoid;
            }

            body {
                background: white;
            }
        }

        @page {
            size: ${config.slideWidth} ${config.slideHeight};
            margin: 0;
        }
    </style>
</head>
<body>
`;

// Read and add each slide
console.log('Adding slides in order:');
console.log(`Progress: 0/${allSlides.length} slides processed\n`);

let currentCategory = null;
let processedCount = 0;

allSlides.forEach((slide, index) => {
    // Print category header when it changes
    if (slide.category !== currentCategory) {
        currentCategory = slide.category;
        console.log(`\n📂 ${currentCategory}:`);
    }

    const slideContent = fs.readFileSync(slide.path, 'utf-8');
    printHTML += `    <div class="slide">\n        ${slideContent}\n    </div>\n\n`;
    processedCount++;

    // Show progress for every slide
    const percentage = Math.round((processedCount / allSlides.length) * 100);
    console.log(`  ✓ ${slide.file} [${processedCount}/${allSlides.length} - ${percentage}%]`);
});

printHTML += `
<!-- Prism.js for syntax highlighting -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" rel="stylesheet"/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-kotlin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-java.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-bash.min.js"></script>
<script>
    // Trigger Prism highlighting on all code blocks
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }
</script>
</body>
</html>`;

// Write the print version
const printHtmlPath = path.join(__dirname, `${presentationName}-print.html`);
fs.writeFileSync(printHtmlPath, printHTML);

console.log(`\n✅ Generated print HTML: ${path.basename(printHtmlPath)}`);

// If dry-run mode, show summary and exit
if (isDryRun) {
    console.log('\n📊 DRY RUN SUMMARY:');
    console.log('═══════════════════════════════════════');
    console.log(`Presentation:     ${presentationName}`);
    console.log(`Total Slides:     ${allSlides.length}`);
    console.log(`Total Categories: ${categories.length}`);
    console.log(`Brand Primary:    ${config.brandPrimary}`);
    console.log(`Brand Dark:       ${config.brandDark}`);
    console.log(`Slide Size:       ${config.slideWidth} × ${config.slideHeight}`);
    console.log(`Chrome Path:      ${config.chromePath || 'Auto-detect'}`);
    console.log(`\nOutput would be:  ${path.join(__dirname, '..', `${presentationName}.pdf`)}`);
    console.log(`Temp HTML file:   ${printHtmlPath}`);
    console.log('\n✨ Dry run complete! Use without --dry-run to generate PDF.\n');

    // Clean up temporary HTML file
    fs.unlinkSync(printHtmlPath);
    process.exit(0);
}

console.log('\n📝 Generating PDF...\n');

// Generate PDF using Puppeteer
(async () => {
    try {
        console.log('🚀 Launching browser...');

        const launchOptions = {
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        };

        // Use Chrome path from config, or try to detect it
        const chromePath = config.chromePath || getChromePath();
        if (chromePath) {
            launchOptions.executablePath = chromePath;
            console.log(`   Using Chrome: ${chromePath}`);
        } else {
            console.log('   Using Puppeteer bundled Chromium');
        }

        const browser = await puppeteer.launch(launchOptions);

        const page = await browser.newPage();

        console.log('📄 Loading presentation...');
        await page.goto(`file://${printHtmlPath}`, {
            waitUntil: 'networkidle0'
        });

        // Wait for Prism.js to finish syntax highlighting
        console.log('🎨 Applying syntax highlighting...');
        await page.waitForFunction(() => {
            return typeof Prism !== 'undefined' && document.querySelectorAll('pre code').length > 0;
        }, { timeout: config.timeout }).catch(() => {
            console.log('⚠️  Prism.js not found or no code blocks, continuing...');
        });

        // Give Prism extra time to highlight
        await page.waitForTimeout(1000);

        const pdfPath = path.join(__dirname, '..', `${presentationName}.pdf`);

        console.log('💾 Saving PDF...');
        await page.pdf({
            path: pdfPath,
            width: config.slideWidth,
            height: config.slideHeight,
            printBackground: true,
            preferCSSPageSize: true,
            margin: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }
        });

        await browser.close();

        console.log('\n✅ PDF generated successfully!');
        console.log(`📍 Location: ${pdfPath}`);
        console.log(`📊 Total slides: ${allSlides.length}`);

        // Get file size
        const stats = fs.statSync(pdfPath);
        const fileSizeKB = Math.round(stats.size / 1024);
        console.log(`📦 File size: ${fileSizeKB} KB`);

        // Clean up temporary HTML file
        console.log('🧹 Cleaning up temporary files...');
        fs.unlinkSync(printHtmlPath);
        console.log('✨ Cleanup complete!\n');
    } catch (error) {
        console.error('\n❌ Error generating PDF:', error.message);

        // Clean up temporary HTML file even on error
        try {
            if (fs.existsSync(printHtmlPath)) {
                fs.unlinkSync(printHtmlPath);
            }
        } catch (cleanupError) {
            // Ignore cleanup errors
        }

        process.exit(1);
    }
})();
