Feature: handling emails with Outlook

Scenario: send an email with Outlook
    Given I am logged in at outlook.hu
    When I start a new email with a subject and body
    When I press the Send button
    Then I see the email in the list of sent emails

Scenario: open a sent email with Outlook
    Given I am logged in at outlook.hu
    When I click the list of sent emails
    Then I can select an email

Scenario: delete sent email in Outlook
    Given I am logged in at outlook.hu
    When I empty the list of sent emails
    Then I can see that the folder is empty
