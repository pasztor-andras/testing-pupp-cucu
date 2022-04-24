const puppeteer = require("puppeteer");
require("dotenv").config({ path: "../.env" });

(async () => {
  const browser = await puppeteer.launch({ args: ["--window-size=1920,1080"], headless: false, devtools: true });

  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  });

  //Go to page
  await page.goto("https://outlook.live.com/owa/?nlp=1", { waitUntil: "networkidle0" });
  //Email ok
  await page.type("#i0116", process.env.USER_EMAIL, { delay: 150 });
  await page.click('input[type="submit"]');

  //Password ok
  await page.waitForTimeout(1000);
  await page.type("#i0118", process.env.USER_PASSWORD, { delay: 150 });
  await Promise.all([page.waitForNavigation({ waitUntil: "domcontentloaded" }), page.click('input[type="submit"]')]);
  await page.waitForTimeout(1000);
  await Promise.all([page.waitForNavigation({ waitUntil: "domcontentloaded" }), page.click('input[type="submit"]')]);

  //Create email and send it
  await page.waitForTimeout(300);
  await page.waitForSelector(".root-168");
  await page.click(".root-168");
  await page.waitForTimeout(5000);
  await page.type(".ms-SelectionZone", process.env.RECIPIENT_EMAIL, { delay: 150 });
  await page.keyboard.press("Enter");
  await page.waitForTimeout(1000);
  await page.type('input[type="text"]', "Teszt tárgy", { delay: 150 });

  await page.waitForTimeout(2000);
  await page.click(".h04ZZTiPR1gPpezg0OQA");
  await page.type(".h04ZZTiPR1gPpezg0OQA", "Teszt üzenet", { delay: 150 });

  await page.click('[title="Küldés (Ctrl+Enter)"]');

  //Check the sent emails
  await page.waitForTimeout(1000);
  await page.click('div[title="Elküldött elemek"]');

  //List of emails
  await page.waitForSelector('div[title="Elküldött elemek"]');
  await page.waitForTimeout(2000);
  await page.click('div[class="s0OAmtxWyjwp1q8ElgO7"]');
  await page.waitForTimeout(6000);

  //Delete all emails
  await page.goBack({ waitUntil: "load" });
  await page.waitForSelector('div[title="Elküldött elemek"]');
  await page.click('div[title="Elküldött elemek"]');

  await page.click('button[name="Mappa ürítése"]');
  await page.waitForTimeout(3000);
  await page.waitForSelector('button[id="ok-1"]');
  await page.click('button[id="ok-1"]');
  await page.waitForTimeout(3000);

  await page.goto("https://outlook.live.com/mail/0");
  await page.waitForTimeout(3000);

  await browser.close();
})();
