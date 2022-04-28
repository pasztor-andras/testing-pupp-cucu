const { After, Before, Given, When, Then } = require("@cucumber/cucumber");


Before(async function() {
  return await this.openOutlookPage();
});

After(async function() {
  return await this.closeOutlookPage()
})

//-------- First Scenario----------------
Given("I am logged in at outlook.hu", async function () {
  await this.loginToOutlook();
});
 
When("I start a new email with a subject and body", async function () {
  await this.writeEmail();
});

When("I press the Send button", async function () {
  await this.sendEmail();
});

Then("I see the email in the list of sent emails", async function () {
  await this.checkEmail();
});


//-------- Second Scenario----------------
When("I click the list of sent emails", async function () {
  await this.listOfEmail();
});
Then("I can select an email", async function () {
  await this.checkSentEmail();
});

//-------- Third Scenario----------------
When("I empty the list of sent emails", async function () {
  await this.listOfEmail();
});
Then("I can see that the folder is empty", async function () {
  await this.deleteAllEmails();
});