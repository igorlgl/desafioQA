Feature: User access Browser Windows' page to test button action

@windows
Scenario: User access Browser Windows' page to test button action and check new opened window content
  Given User open the Alerts, Frame & Windows page
  Given User click on Browser Windows menu Item in the left menu
  When Click on New Window button
  Then New window should be shown
  Then New window content should be "This is sample page"
