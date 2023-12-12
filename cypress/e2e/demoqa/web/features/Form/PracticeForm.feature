Feature: User access Practice Form's page, fill it up and submit it

@forms
Scenario: User access Practice Form's page, fill all inputs and submit it
  Given User open the Forms page
  Given User click on Practice Form menu Item in the left menu
  When Fill up the whole Practice Form
  When Click on Submit button
  Then Confirmation modal is shown
