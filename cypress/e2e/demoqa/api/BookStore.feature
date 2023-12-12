Feature: To test BookStore API service!

@api
Scenario: To create an User
	Given Automation Create an User

@api
Scenario: To generate an Access Token
	Given Automation generate an Access Token

@api
Scenario: To confirm if an user can be Authorized
	Given Automation confirm that and user can be Authorized

@api
Scenario: Get all available books
	Given Automation gets all available books

@api
Scenario: Rent two books
	Given Automation add two books under the current user collection
    
@api
Scenario: List user details after book rent
	Given Automation list current user details