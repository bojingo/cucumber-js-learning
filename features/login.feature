Feature: Login

    As a user
    I want to login to Google
    In order to use Google's services

    Scenario: Login from home page

        Given I visit the home page
        When I log in as "basic user"
        Then I have access to "basic user" profile

    Scenario: Login from Gmail

        Given I visit the gmail page
        When I log in as "basic user"
        Then I see my inbox

    @wip
    Scenario: Invalid credentials

        Given I visit the home page
        When I log in as "user with invalid credentials"
        Then I am informed that my credentials are invalid