Feature: User access Progress Bar' page to test its functionality

@progressbar
Scenario: User access Progress Bar' to test its functionality
  Given User open the Widgets page
  Given User click on Progress Bar menu Item in the left menu
  When User click on Start button
  When User click on Stop button before progress bar reach 25%
  Then Progress should be lower than 25%
  When User click on Start button
  When User wait progress reach 100%
  Then Reset button should be visible
  Given User click on Reset button
  Then Progress bar is 0% completed