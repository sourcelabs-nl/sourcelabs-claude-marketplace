const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// Get presentation name from command line argument
const presentationName = process.argv[2];

if (!presentationName) {
    console.error('❌ Error: Please specify a presentation name');
    console.log('\nUsage: node generate-presentation-pdf.js <presentation-name>');
    console.log('\nAvailable presentations:');
    console.log('  - coroutines');
    console.log('  - interop-testing-framework-integration');
    process.exit(1);
}

const slidesBaseDir = path.join(__dirname, '..', 'slides');
const presentationDir = path.join(slidesBaseDir, presentationName);

// Validate presentation directory exists
if (!fs.existsSync(presentationDir)) {
    console.error(`❌ Error: Presentation directory not found: ${presentationDir}`);
    console.log('\nAvailable presentations:');
    const dirs = fs.readdirSync(slidesBaseDir).filter(f =>
        fs.statSync(path.join(slidesBaseDir, f)).isDirectory()
    );
    dirs.forEach(dir => console.log(`  - ${dir}`));
    process.exit(1);
}

console.log(`📄 Generating PDF for "${presentationName}" presentation...\n`);

// Read the presentation HTML file to extract slide order
const presentationHtmlPath = path.join(slidesBaseDir, `${presentationName}.html`);
if (!fs.existsSync(presentationHtmlPath)) {
    console.error(`❌ Error: Presentation HTML not found: ${presentationHtmlPath}`);
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
    <style>
        /* Hamburg Font - AH Brand Typography */
        @font-face {
            font-family: 'Hamburg';
            src: url('https://static.ah.nl/ah-static/fonts/hamburg-ah-regular.woff2') format('woff2'),
                 url('https://static.ah.nl/ah-static/fonts/hamburg-ah-regular.woff2') format('woff');
            font-weight: 400;
            font-style: normal;
            font-display: swap;
        }

        @font-face {
            font-family: 'Hamburg';
            src: url('https://static.ah.nl/ah-static/fonts/hamburg-ah-bold.woff2') format('woff2'),
                 url('https://static.ah.nl/ah-static/fonts/hamburg-ah-bold.woff2') format('woff');
            font-weight: 700;
            font-style: normal;
            font-display: swap;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Hamburg', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            color: #333;
            background: white;
        }

        .slide {
            width: 1200px;
            height: 800px;
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

        /* AH Logo in bottom right corner */
        .slide::after {
            content: "";
            position: absolute;
            bottom: 20px;
            right: 30px;
            width: 50px;
            height: 50px;
            background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIzLjIxOCAxMS40NzFsLTUuNTItMTAuMzA4YTIuMTcgMi4xNyAwIDAwLTIuOTc3LS44ODdMNC42MTggNS45MjRjLS40NTQuMjYtLjg3OS43MTYtMS4wNzIgMS4zNjJsLTIuNzExIDkuNDRjLS4zMjUgMS4xMy4zMSAyLjMxNCAxLjQyIDIuNjQ1bDE1LjkyNSA0LjU0MmMxLjEwOC4zMzIgMi4yNy0uMzE3IDIuNTk2LTEuNDQ3bDIuNjM0LTkuMjU3Yy4xNzEtLjU0NC4wNzUtMS4yMTQtLjE5Mi0xLjczOHoiIGZpbGw9IiMwMEFERTYiLz4KICAgIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTMuMzc5IDYuMDM1cy0uMDA5IDQuMjktLjAwMSA0LjI4bC4yMDItLjI5Yy44NDEtMS4yMDcgMS42NTctMi4zMjEgMy4wOTItMi4zMjEgMS43MTYtLjAwMSAyLjY0NiAxLjQyNyAyLjY1MiAyLjYyOXYuNTMybC0uMDA4IDcuMTYzSDE3LjM5bC0uMDA5LTcuMjg0YzAtMS0uODA4LS45OTgtLjgyLS45OTgtLjY1IDAtMS44NSAxLjYyNC0zLjE4MyAzLjQyOXY0Ljg1NWwtMS45NDcuMDAyLS4wMDMtMi4yNDdzLTEuMjg4IDIuMjQ4LTMuMjE3IDIuMjVjLTIuMTg4IDAtMi45My0xLjQ5Ni0yLjkzNi01LjA4LS4wMDMtMy40MTUuNDg0LTUuMjQyIDIuODMtNS4yNDQgMS43ODMtLjAwMiAzLjMxNiAyLjU4MyAzLjMxNiAyLjU4M1Y4LjY1N2wxLjk1OC0yLjYyMnpNOC4xMzIgOS43NGMtLjg5Ni4wMDItLjk3NC45NDMtLjk3MSAzLjIxMi4wMDMgMi4yNy4xMjYgMy4xNTUuOTY5IDMuMTU1IDEuMTQ0LS4wMDIgMi45NDgtMi44OTcgMi45NDgtMi44OTdzLTEuNzktMy40Ny0yLjk0Ni0zLjQ3eiIgZmlsbD0iI2ZmZiIvPgo8L3N2Zz4K');
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
            color: #179EDA;
            margin-bottom: 20px;
            font-weight: 700;
        }

        h2 {
            font-size: 2.5em;
            color: #179EDA;
            margin-bottom: 40px;
            font-weight: 600;
        }

        h3 {
            font-size: 1.8em;
            color: #0C7BB8;
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
            color: #179EDA;
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
            border-left: 4px solid #179EDA;
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
            background: #179EDA;
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
            color: #179EDA;
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
            size: 1200px 800px;
            margin: 0;
        }
    </style>
</head>
<body>
`;

// Read and add each slide
console.log('Adding slides in order:');
let currentCategory = null;
allSlides.forEach((slide, index) => {
    // Print category header when it changes
    if (slide.category !== currentCategory) {
        currentCategory = slide.category;
        console.log(`\n📂 ${currentCategory}:`);
    }

    const slideContent = fs.readFileSync(slide.path, 'utf-8');
    printHTML += `    <div class="slide">\n        ${slideContent}\n    </div>\n\n`;
    console.log(`  ✓ ${slide.file}`);
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
console.log('\n📝 Generating PDF...\n');

// Generate PDF using Puppeteer
(async () => {
    try {
        console.log('🚀 Launching browser...');

        const browser = await puppeteer.launch({
            headless: true,
            executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();

        console.log('📄 Loading presentation...');
        await page.goto(`file://${printHtmlPath}`, {
            waitUntil: 'networkidle0'
        });

        // Wait for Prism.js to finish syntax highlighting
        console.log('🎨 Applying syntax highlighting...');
        await page.waitForFunction(() => {
            return typeof Prism !== 'undefined' && document.querySelectorAll('pre code').length > 0;
        }, { timeout: 5000 }).catch(() => {
            console.log('⚠️  Prism.js not found or no code blocks, continuing...');
        });

        // Give Prism extra time to highlight
        await page.waitForTimeout(1000);

        const pdfPath = path.join(__dirname, '..', `${presentationName}.pdf`);

        console.log('💾 Saving PDF...');
        await page.pdf({
            path: pdfPath,
            width: '1200px',
            height: '800px',
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
