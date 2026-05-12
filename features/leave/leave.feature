Feature: Leave Management

  Background:
    Given I am logged in as Admin

  @sharedDemoSite
  Scenario: Admin assigns leave to an employee with all valid data
    When I navigate to Assign Leave page
    And I assign leave using "validAssignment"
    Then the leave should be assigned successfully

  Scenario: Assign button clicked with all fields empty
    When I navigate to Assign Leave page
    And I click the assign button without filling any fields
    Then I should see a required field error

  Scenario: Assign leave with no employee name
    When I navigate to Assign Leave page
    And I assign leave using "noEmployeeName"
    Then I should see a required field error

  Scenario: Assign leave with invalid employee name shows no results
    When I navigate to Assign Leave page
    And I enter invalid employee name from "invalidEmployee"
    Then I should see no employee search results

  Scenario: Assign leave with no leave type
    When I navigate to Assign Leave page
    And I assign leave using "noLeaveType"
    Then I should see a required field error

  Scenario: Assign leave with no from date
    When I navigate to Assign Leave page
    And I assign leave using "noFromDate"
    Then I should see a required field error

  Scenario: Assign leave with no to date
    When I navigate to Assign Leave page
    And I assign leave using "noToDate"
    Then I should see a required field error

  Scenario: Assign leave with past dates shows confirmation popup
    When I navigate to Assign Leave page
    And I fill leave form using "pastDate"
    And I click the assign button
    Then I should see a confirmation popup

  Scenario: Assign leave with to date before from date
    When I navigate to Assign Leave page
    And I fill leave form using "toDateBeforeFromDate"
    And I click the assign button
    Then I should see a date validation error

  @sharedDemoSite
  Scenario: Assign leave for single day boundary
    When I navigate to Assign Leave page
    And I assign leave using "singleDay"
    Then the leave should be assigned successfully

  Scenario: Assign leave with comment exceeding 250 characters
    When I navigate to Assign Leave page
    And I fill leave form using "longComment"
    And I click the assign button
    Then I should see a maximum comment length error

  Scenario: Assign leave that overlaps with existing leave
    When I navigate to Assign Leave page
    And I fill leave form using "overlappingLeave"
    And I click the assign button and confirm
    Then I should see an overlapping leave warning

  Scenario: Search leave list with no filters returns records
    When I navigate to Leave List page
    And I click the search button
    Then I should see records in the leave list

  Scenario: Search leave list by scheduled status returns records
    When I navigate to Leave List page
    And I filter by status "Scheduled"
    And I click the search button
    Then I should see records in the leave list

  Scenario: Search leave list by date range returns records
    When I navigate to Leave List page
    And I filter by date range from "searchByDateRange"
    And I click the search button
    Then I should see records in the leave list

  Scenario: Reset leave list filters clears all fields
    When I navigate to Leave List page
    And I filter by status "Scheduled"
    And I click the reset button
    Then the filters should be cleared