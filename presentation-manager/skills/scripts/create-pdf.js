const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    console.log('🚀 Launching browser...');

    const browser = await puppeteer.launch({
        headless: true,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    const htmlPath = path.join(__dirname, 'presentation-print.html');
    const pdfPath = path.join(__dirname, 'presentation.pdf');

    console.log('📄 Loading presentation...');
    await page.goto(`file://${htmlPath}`, {
        waitUntil: 'networkidle0'
    });

    console.log('📝 Generating PDF...');
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

    console.log('✅ PDF generated successfully!');
    console.log(`📍 Location: ${pdfPath}`);
    console.log(`📊 Total slides: 65\n`);
})();
