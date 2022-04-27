const assert = require("assert");
const { Given, When, Then } = require("@cucumber/cucumber");

Given("I am logged in at outlook.hu", function (int) {
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

  When("I click the list of sent emails", function (int) {
    const listOfSentEmails = 'div[title="Elküldött elemek"]';
    await page.waitForSelector(listOfSentEmails);
    await page.click(listOfSentEmails);

});

And("click an email", function (int) {
    //List of emails
    await page.waitForSelector(listOfSentEmails);
    const oneEmail = 'div[class="s0OAmtxWyjwp1q8ElgO7"]';
    await page.click(oneEmail);
    await page.waitForSelector(oneEmail);
    
  });

  Then("I can see the body of the email", function (int){
    assert.xyz
  });