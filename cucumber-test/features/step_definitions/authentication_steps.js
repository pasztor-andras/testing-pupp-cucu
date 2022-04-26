const assert = require("assert");
const { Given, When, Then } = require("@cucumber/cucumber");

function authentication() {
  Given("I am online at outlook.hu = goto\\(https:\\/\\/outlook.live.com\\/owa\\/?nlp={int})", function (int) {
    // Given('I am online at outlook.hu = goto\\(https:\\/\\/outlook.live.com\\/owa\\/?nlp={float})', function (float) {
    // Write code here that turns the phrase above into concrete actions
    return "pending";
  });

  When("I write my email address in the email field = type\\(andras.pasztor2022@outlook.hu)", function () {
    // Write code here that turns the phrase above into concrete actions
    return "pending";
  });
  When("I provide a valid password for the same user = type\\(QaYwSx789)", function () {
    // Write code here that turns the phrase above into concrete actions
    return "pending";
  });
  When("I click on the Login button", function () {
    // Write code here that turns the phrase above into concrete actions
    return "pending";
  });

  Then("I am logged into the outlook inbox = assert\\(https:\\/\\/outlook.live.com\\/mail\\/{int}\\/)", function (int) {
    // Then('I am logged into the outlook inbox = assert\\(https:\\/\\/outlook.live.com\\/mail\\/{float}\\/)', function (float) {
    // Write code here that turns the phrase above into concrete actions
    return "pending";
  });
}
