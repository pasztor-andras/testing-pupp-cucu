const puppeteer = require("puppeteer");
require("dotenv").config({ path: "../.env" });
const assert = require("assert");

let browser;
let page;

describe("setup", () => {
  before(async () => {
    browser = await puppeteer.launch({ args: ["--window-size=1920,1080"], headless: false, slowMo: 100 });
    page = await browser.newPage();
    
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    });
    
    //Go to page
    await page.goto("https://outlook.live.com/owa/?nlp=1", { waitUntil: "networkidle2" });
  });
  describe("email handling", () => {
    it("writes an email and sends it", async () => {
      //Email input
      const emailInput = "#i0116";
      await page.type(emailInput, process.env.USER_EMAIL);
      await page.click('input[type="submit"]');

      //Password input
      await page.waitForSelector("#i0118");
      await page.type("#i0118", process.env.USER_PASSWORD);
      await page.click('input[type="submit"]');
      await page.waitForSelector("#idSIButton9");
      await page.click("#idSIButton9");

      //Create email and send it
      const newMessageButton = ".root-168";
      await page.waitForSelector(newMessageButton);
      await page.click(newMessageButton);

      const addresseeInput = ".ms-SelectionZone";
      await page.waitForSelector(addresseeInput);
      await page.type(addresseeInput, process.env.RECIPIENT_EMAIL);
      await page.keyboard.press("Enter");

      const subjectInput = 'input[type="text"]';
      await page.type(subjectInput, "Teszt tárgy");

      const messageInput = ".h04ZZTiPR1gPpezg0OQA";
      await page.click(messageInput);
      await page.type(messageInput, "Teszt üzenet");
      const sendButton = '[title="Küldés (Ctrl+Enter)"]';
      await page.click(sendButton);

      const recipient = process.env.RECIPIENT_EMAIL;
      const expected = await page.$eval(addresseeInput, (val) => val.get);

      assert.equal(recipient, expected);
    }).timeout(50000);
    it("checks sent email", async () => {
      //Email input
      const emailInput = "#i0116";
      await page.type(emailInput, process.env.USER_EMAIL);
      await page.click('input[type="submit"]');

      //Password input
      await page.waitForSelector("#i0118");
      await page.type("#i0118", process.env.USER_PASSWORD);
      await page.click('input[type="submit"]');
      await page.waitForSelector("#idSIButton9");
      await page.click("#idSIButton9");

      //Check the sent emails
      const listOfSentEmails = 'div[title="Elküldött elemek"]';
      await page.waitForSelector(listOfSentEmails);
      await page.click(listOfSentEmails);

      //List of emails
      await page.waitForSelector(listOfSentEmails);
      const oneEmail = 'div[class="s0OAmtxWyjwp1q8ElgO7"]';
      await page.click(oneEmail);
      await page.waitForSelector(oneEmail);
    }).timeout(50000);
    it("deletes sent email", async () => {
      //Email input
      const emailInput = "#i0116";
      await page.type(emailInput, process.env.USER_EMAIL);
      await page.click('input[type="submit"]');

      //Password input
      await page.waitForSelector("#i0118");
      await page.type("#i0118", process.env.USER_PASSWORD);
      await page.click('input[type="submit"]');
      await page.waitForSelector("#idSIButton9");
      await page.click("#idSIButton9");

      //Delete all emails
      await page.waitForSelector(listOfSentEmails);
      await page.click(listOfSentEmails);

      await page.click('button[name="Mappa ürítése"]');
      await page.waitForSelector('button[id="ok-1"]');
      await page.click('button[id="ok-1"]');

      await page.goto("https://outlook.live.com/mail/0");
      await page.waitForTimeout(3000);
    }).timeout(50000);
  });

  after(async () => {
    await browser.close();
  });
});
