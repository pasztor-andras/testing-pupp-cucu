const assert = require("assert");
const { Given, When, Then } = require("@cucumber/cucumber");


Given("I am logged in at outlook.hu", async function (int) {
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
  
  When("I start a new email with a subject and body", async function (int) {
    const newMessageButton = ".root-168"
    await page.waitForSelector(newMessageButton);
    await page.click(newMessageButton);
    
    const addresseeInput = ".ms-SelectionZone"
    await page.waitForSelector(addresseeInput);
    await page.type(addresseeInput, "andras.pasztor1@gmail.com");
    await page.keyboard.press("Enter");
    
    const subjectInput = 'input[type="text"]'
    await page.type(subjectInput, "Teszt tárgy");
    
    const messageInput = ".h04ZZTiPR1gPpezg0OQA"
    await page.click(messageInput);
    await page.type(messageInput, "Teszt üzenet");
    
  });
   
  And("I press the Send button", async function (int) {
    const sendButton = '[title="Küldés (Ctrl+Enter)"]'
    await page.click(sendButton);
  });
  
  Then("I see the email in the list of sent emails", function (int){
    assert.equal(actual, expected)
  });
