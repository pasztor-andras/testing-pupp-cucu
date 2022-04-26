const puppeteer = require("puppeteer");
require("dotenv").config({ path: "../.env" });




(async () => {
  const browser = await puppeteer.launch({ args: ["--window-size=1920,1080"], headless: false, slowMo: 100 });
  const page = await browser.newPage();

  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  });

  //Go to page
  await page.goto("https://outlook.live.com/owa/?nlp=1", { waitUntil: "networkidle0" });

  //Email input
  const emailInput = "#i0116"
  await page.type(emailInput, process.env.USER_EMAIL);
  await page.click('input[type="submit"]');

  //Password input
  await page.waitForSelector("#i0118");
  await page.type("#i0118", process.env.USER_PASSWORD);
  await page.click('input[type="submit"]');
  await page.waitForSelector('#idSIButton9');
  await page.click('#idSIButton9');
  
  //Create email and send it
  const newMessageButton = ".root-168"
  await page.waitForSelector(newMessageButton);
  await page.click(newMessageButton);
  
  const addresseeInput = ".ms-SelectionZone"
  await page.waitForSelector(addresseeInput);
  await page.type(addresseeInput, process.env.RECIPIENT_EMAIL);
  await page.keyboard.press("Enter");

  const subjectInput = 'input[type="text"]'
  await page.type(subjectInput, "Teszt tárgy");
  
  const messageInput = ".h04ZZTiPR1gPpezg0OQA"
  await page.click(messageInput);
  await page.type(messageInput, "Teszt üzenet");
  const sendButton = '[title="Küldés (Ctrl+Enter)"]'
  await page.click(sendButton);
  
  //Check the sent emails
  const listOfSendedEmails = 'div[title="Elküldött elemek"]'
  await page.waitForSelector(listOfSendedEmails);
  await page.click(listOfSendedEmails);

  //List of emails
  await page.waitForSelector(listOfSendedEmails);
  const oneEmail = 'div[class="s0OAmtxWyjwp1q8ElgO7"]'
  await page.click(oneEmail);
  await page.waitForSelector(oneEmail);
  await page.waitForTimeout(3000);

  //Delete all emails
  await page.goBack({ waitUntil: "load" });
  await page.waitForSelector(listOfSendedEmails);
  await page.click(listOfSendedEmails);

  await page.click('button[name="Mappa ürítése"]');
  await page.waitForSelector('button[id="ok-1"]');
  await page.click('button[id="ok-1"]');

  await page.goto("https://outlook.live.com/mail/0");
  await page.waitForTimeout(3000);

  await browser.close();
})();
