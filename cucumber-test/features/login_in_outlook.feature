Feature: Login process in Outlook.
    The user want to enter the Outlook


Scenario: Login to Outlook with valid credentials
    Given I am online at outlook.hu = goto(https://outlook.live.com/owa/?nlp=1)
    When I write my email address in the email field = type(andras.pasztor2022@outlook.hu)
    And I provide a valid password for the same user = type(QaYwSx789)
    And I click on the Login button
    Then I am logged into the outlook inbox = assert(https://outlook.live.com/mail/0/)