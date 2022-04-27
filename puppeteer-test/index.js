const puppeteer = require("puppeteer");
require("dotenv").config({ path: "../.env" });
const assert = require("assert");

let browser;
let page;
const listOfSentEmails = 'div[title="Elküldött elemek"]';

describe("setup", () => {
  before(async () => {
    browser = await puppeteer.launch({ args: ["--window-size=1920,1080"], headless: false, slowMo: 120 });
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
      let expected = true;
      let actual;
      //Email input
      const emailInput = "#i0116";
      await page.type(emailInput, "andras.pasztor2022@outlook.hu");
      await page.click('input[type="submit"]');

      //Password input
      await page.waitForSelector("#i0118");
      await page.type("#i0118", "QaYwSx789");
      await page.click('input[type="submit"]');
      await page.waitForSelector("#idSIButton9");
      await page.click("#idSIButton9");

      //Create email and send it
      //const newMessageButton = ".root-168";
      const newMessageButton = "#id__8";
      await page.waitForSelector(newMessageButton);
      await page.click(newMessageButton);

      const addresseeInput = ".ms-SelectionZone";
      await page.waitForSelector(addresseeInput);
      await page.type(addresseeInput, "andras.pasztor1@gmail.com");
      await page.keyboard.press("Enter");
      
      const subjectInput = 'input[type="text"]';
      await page.type(subjectInput, "Teszt tárgy");
      
      {/*
      const subjectText = await page.$('input[type="text"]');
      console.log(typeof subjectText);
      const subject = await page.evaluate((val) => val.textContent, subjectText);
      console.log(subject);
    */}
      
      const messageInput = ".h04ZZTiPR1gPpezg0OQA";
      await page.click(messageInput);
      await page.type(messageInput, "Teszt üzenet");
      const sendButton = '[title="Küldés (Ctrl+Enter)"]';
      let sendingEvent = await page.click(sendButton);
     
      if(sendingEvent) {
        actual = true
      } else {
        actual = false
      }
      assert.equal(actual, expected);
    }).timeout(50000);
    it("checks sent email", async () => {
      let expected = true;
      let actual;
      //Check the sent emails
      await page.waitForSelector(listOfSentEmails);
      await page.click(listOfSentEmails);

      //List of emails
      await page.waitForSelector(listOfSentEmails);
      const oneEmail = 'div[class="s0OAmtxWyjwp1q8ElgO7"]';
      if(oneEmail) {
        await page.click(oneEmail);
        await page.waitForSelector(oneEmail);
        actual = true
      } else {
        actual = false
      }

      assert.equal(actual, expected);
    }).timeout(50000);
    it("deletes sent email", async () => {
      //Delete all emails
      let expected = true;
      let actual;
      
      await page.waitForSelector(listOfSentEmails);
      await page.click(listOfSentEmails);
      
      let deleteAllEmailsButton = await page.click('button[name="Mappa ürítése"]');
      
      if(!deleteAllEmailsButton) {
        await page.waitForSelector('button[id="ok-1"]');
        await page.click('button[id="ok-1"]');
        await page.waitForTimeout(3000)
        actual = true
      } else {
        actual = false
      }
     
      await page.goto("https://outlook.live.com/mail/0");
      await page.waitForTimeout(1000);

      assert.equal(actual, expected);
    }).timeout(50000);
  });

  after(async () => {
    await browser.close();
  });
});
