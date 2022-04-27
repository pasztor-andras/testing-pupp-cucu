const assert = require("assert");
const { Given, When, Then } = require("@cucumber/cucumber");

Given("I am online at outlook.hu", function (int) {
    //Go to page
    await page.goto("https://outlook.live.com/owa/?nlp=1", { waitUntil: "networkidle2" });

    //Email input
    const emailInput = "#i0116"
    await page.type(emailInput, "andras.pasztor2022@outlook.hu");
    await page.click('input[type="submit"]');

    //Password input
    await page.waitForSelector("#i0118");
    await page.type("#i0118", "QaYwSx789");
    await page.click('input[type="submit"]');
    await page.waitForSelector('#idSIButton9');
    await page.click('#idSIButton9');
  
  });

  When("I empty the list of sent emails", function (int) {
    const listOfSentEmails = 'div[title="Elküldött elemek"]';
    await page.waitForSelector(listOfSentEmails);
    await page.click(listOfSentEmails);

    await page.click('button[name="Mappa ürítése"]');
    let deleteEmails = await page.waitForSelector('button[id="ok-1"]');

    await page.click('button[id="ok-1"]');
   
    await page.goto("https://outlook.live.com/mail/0");
    await page.waitForTimeout(3000);
  });

  Then("I can see that the folder is empty", function (int){
    assert.xyz
  });