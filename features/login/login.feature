Feature: Login

  Background:
    Given I am on the login page

  Scenario: Admin logs in with valid credentials
    When I enter username from "admin"
    And I enter password from "admin"
    And I click the login button
    Then I should be on the dashboard

  @requiresLocalEnv
  Scenario: ESS employee logs in with valid credentials
    When I enter username from "ess"
    And I enter password from "ess"
    And I click the login button
    Then I should be on the dashboard

  Scenario: Login with incorrect password
    When I enter username from "wrongPassword"
    And I enter password from "wrongPassword"
    And I click the login button
    Then I should see an invalid credentials error

  Scenario: Login with non-existent username
    When I enter username from "invalidUser"
    And I enter password from "invalidUser"
    And I click the login button
    Then I should see an invalid credentials error

  Scenario: Login with empty username
    When I enter password from "admin"
    And I click the login button
    Then I should see a username required error

  Scenario: Login with empty password
    When I enter username from "admin"
    And I click the login button
    Then I should see a password required error

  Scenario: Login with both fields empty
    When I click the login button
    Then I should see both fields required error

  Scenario: SQL injection attempt in username field
    When I enter username from "sqlInjection"
    And I enter password from "sqlInjection"
    And I click the login button
    Then I should see an invalid credentials error

  Scenario: XSS payload in username field
    When I enter username from "xssPayload"
    And I enter password from "xssPayload"
    And I click the login button
    Then I should see an invalid credentials error

  @knownDefect
  Scenario: Brute force lockout after 5 failed attempts
    When I attempt to login with wrong password 5 times
    Then I should see an account disabled error

  Scenario: Accessing protected URL while unauthenticated
    When I navigate directly to the dashboard URL
    Then I should be redirected to the login page