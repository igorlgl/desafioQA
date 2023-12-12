Feature: User access Web Tables' page to test table and records interactions

@webtables
Scenario: User access Web Tables' page add validate actions functionality
  Given User open the Elements page
  Given User click on Web Tables menu Item in the left menu
  When User click on Add button
  When User populate Registration Form's fields
  When User click on Submit Button
  Then New record should be shown with the provided data
  Given User click to edit last added record
  Given User edit first name information
  When User click on Submit Button
  Then Edited record should updated data information
  Given User click to delete last edited record
  Then Last record no longer exist

@webtablesbonus
Scenario: User access Web Tables' page add validate actions functionality interaction with 12 new records
  Given User open the Elements page
  Given User click on Web Tables menu Item in the left menu
  When User add 12 new records
    |firstName|lastName|age|email|salary|department|
    |FN1|LN1|18|fn1_ln1@demoqa.com|1000|IT|
    |FN2|LN2|28|fn2_ln2@demoqa.com|2000|IT|
    |FN3|LN3|38|fn3_ln3@demoqa.com|3000|IT|
    |FN4|LN4|48|fn4_ln4@demoqa.com|4000|IT|
    |FN5|LN5|58|fn5_ln5@demoqa.com|5000|IT|
    |FN6|LN6|68|fn6_ln6@demoqa.com|6000|IT|
    |FN7|LN7|78|fn7_ln7@demoqa.com|7000|IT|
    |FN8|LN8|88|fn8_ln8@demoqa.com|8000|IT|
    |FN9|LN9|98|fn9_ln9@demoqa.com|9000|IT|
    |FN10|LN10|18|fn10_ln10@demoqa.com|10000|IT|
    |FN11|LN11|18|fn11_ln11@demoqa.com|11000|IT|
    |FN12|LN12|18|fn12_ln12@demoqa.com|12000|IT|
  Then Records count should be 15
  When User delete all 12 newly added records
  Then Records count should be 3