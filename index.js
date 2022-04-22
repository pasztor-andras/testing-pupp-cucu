const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();

  //Go to page
  await page.goto("https://outlook.live.com/owa/?nlp=1", { waitUntil: "networkidle0" });

  //Email ok
  await page.type("#i0116", "andras.pasztor2022@outlook.hu", { delay: 250 });
  await page.click("#idSIButton9");
  await page.waitForNavigation();
  //await Promise.all([page.click("#idSIButton9"), page.waitForNavigation()]);
  
  //Password ok
  await page.type("#i0118", "QaYwSx789", { delay: 250 });
  await page.click("#idSIButton9");
  await Promise.all([page.click("#idSIButton9"), page.waitForNavigation({ waitUntil: "networkidle0" })]);
  
 


  console.log("New Page URL:", page.url("https://outlook.live.com/mail/0/"));

  //await browser.close();
})();