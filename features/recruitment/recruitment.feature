Feature: Recruitment - Candidate Management

  Background:
    Given I am logged in as Admin

  Scenario: View all candidates with no filters returns records
    When I navigate to Candidates page
    And I click the recruitment search button
    Then I should see candidate records

  Scenario: Search candidates by shortlisted status returns records
    When I navigate to Candidates page
    And I filter candidates using "searchByShortlisted"
    And I click the recruitment search button
    Then I should see candidate records

  Scenario: Search candidates by rejected status returns records
    When I navigate to Candidates page
    And I filter candidates using "searchByRejected"
    And I click the recruitment search button
    Then I should see candidate records

  Scenario: Search candidates by Senior QA Lead vacancy returns records
    When I navigate to Candidates page
    And I filter candidates using "searchBySeniorQA"
    And I click the recruitment search button
    Then I should see candidate records

  Scenario: Search candidates by Payroll Administrator vacancy returns records
    When I navigate to Candidates page
    And I filter candidates using "searchByPayroll"
    And I click the recruitment search button
    Then I should see candidate records

  Scenario: Search candidates by Manual application method returns records
    When I navigate to Candidates page
    And I filter candidates using "searchByManual"
    And I click the recruitment search button
    Then I should see candidate records

  Scenario: Search candidates by status and vacancy combination returns records
    When I navigate to Candidates page
    And I filter candidates using "searchByStatusAndVacancy"
    And I click the recruitment search button
    Then I should see candidate records

  Scenario: Search candidates by status and vacancy with no matching results
    When I navigate to Candidates page
    And I filter candidates using "searchNoResults"
    And I click the recruitment search button
    Then I should see no candidate records

  Scenario: Search candidates with invalid name shows validation error
    When I navigate to Candidates page
    And I enter candidate name from "invalidCandidateName"
    And I click the recruitment search button
    Then I should see an invalid name error

  Scenario: Reset candidate filters clears all fields
    When I navigate to Candidates page
    And I filter candidates using "searchByStatusAndVacancy"
    And I click the recruitment reset button
    Then the candidate filters should be cleared

  Scenario: View candidate detail shows all sections
    When I navigate to Candidates page
    And I click the recruitment search button
    And I view the first candidate
    Then I should see candidate detail sections

  Scenario: Delete candidate shows confirmation dialog
    When I navigate to Candidates page
    And I click the recruitment search button
    And I click delete on the first candidate
    Then I should see the delete confirmation dialog

  Scenario: Cancel delete keeps candidate in list
    When I navigate to Candidates page
    And I click the recruitment search button
    And I click delete on the first candidate
    And I cancel the delete
    Then I should see candidate records

  @sharedDemoSite
  Scenario: Delete candidate successfully removes from list
    When I navigate to Candidates page
    And I click the recruitment search button
    And I click delete on the first candidate
    And I confirm the delete
    Then the candidate should be deleted successfully