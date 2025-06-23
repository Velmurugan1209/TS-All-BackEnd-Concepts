
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

(async () => {
  const browser = await puppeteer.launch(); // return  a launch an browser
  const page = await browser.newPage(); // returns a puppeteer new browsing page


  // Load HTML file
  const htmlPath = path.join(__dirname, 'template.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');

  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
   
   
  // Generate PDF
  await page.pdf({
    path: 'output.pdf',
    format: 'A4',
    printBackground: true
  });

  await browser.close();
  console.log( " ✅ PDF generated: output.pdf ");
})();
