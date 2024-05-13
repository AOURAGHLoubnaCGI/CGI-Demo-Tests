Feature: Login Functionality

  Scenario: Login using empty email
    Given I am on the login page
    When I enter a password but leave the email blank
    And I submit the login form
    Then I should see "Email required!"

  Scenario: Login using empty password
    Given I am on the login page
    When I enter an email but leave the password blank
    And I submit the login form
    Then I should see "Password is required!"

  Scenario Outline: Login with incorrect credentials
    Given I am logged in as a <role>
    When I enter a wrong email
    And I submit the login form
    Then I should see an error "Error: No match for Email and/or Password"

    When I enter a wrong password
    And I submit the login form
    Then I should see an error "Error: No match for Email and/or Password"

    Examples:
      | role     |
      | client   |
      | developer|
      | admin    |

  Scenario Outline: Login with correct credentials
    Given I am logged in as a <role>
    When I submit the login form
    Then I should be redirected to the dashboard

    Examples:
      | role     |
      | client   |
      | developer|
      | admin    |
