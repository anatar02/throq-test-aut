Feature: Background Feature

  Background: I have a job
    Given The job is nice
    And I get paid

  @smoke
  Scenario: TC-1_Ability to create new student
    Given I have first task
    And Step from First Hello in Background Feature feature file
    When I attempt to solve it
    Then I surely succeed

  @smoke
  Scenario: TC-2_Ability to edit existing student
    Given I have second task
    And Step from First Hello in Background Feature feature file
    When I attempt to solve it
    Then I surely succeed
  @smoke
  Scenario: TC-3_Ability to delete the existing student
    Given I have third task
    And Step from First Hello in Background Feature feature file
    When I attempt to solve it
    Then I surely succeed

  @smoke
  Scenario: TC-4_Verify user is able to see No students found message
    Given I have third task
    And Step from First Hello in Background Feature feature file
    When I attempt to solve it
    Then I surely succeed

  @smoke
  Scenario: TC-5_Ability to search by student First Name
    Given I have third task
    And Step from First Hello in Background Feature feature file
    When I attempt to solve it
    Then I surely succeed

  @smoke
  Scenario: TC-6_Ability to search by student Phone number
    Given I have third task
    And Step from First Hello in Background Feature feature file
    When I attempt to solve it
    Then I surely succeed

  @smoke
  Scenario: TC-7_Ability to search by student Phone number
    Given I have third task
    And Step from First Hello in Background Feature feature file
    When I attempt to solve it
    Then I surely succeed

  @smoke
  Scenario: TC-8_Verify No records found with search "buyme"
    Given I have third task
    And Step from First Hello in Background Feature feature file
    When I attempt to solve it
    Then I surely succeed

  @smoke
  Scenario: TC-9_Ability to navigate back to Student List page from Student Information
    Given I have third task
    And Step from First Hello in Background Feature feature file
    When I attempt to solve it
    Then I surely succeed

  @smoke
  Scenario: TC-10_User ability to edit Student detailed from Student Information
    Given I have third task
    And Step from First Hello in Background Feature feature file
    When I attempt to solve it
    Then I surely succeed

  @smoke
  Scenario: TC-11_User ability to logout from Student Information
    Given I have third task
    And Step from First Hello in Background Feature feature file
    When I attempt to solve it
    Then I surely succeed

  @smoke
  Scenario: TC-12_User ability to logout from Student Information
    Given I have third task
    And Step from First Hello in Background Feature feature file
    When I attempt to solve it
    Then I surely succeed

  @smoke
  Scenario: TC-13_Verify the Please enter valid email address error message
    Given I have third task
    And Step from First Hello in Background Feature feature file
    When I attempt to solve it
    Then I surely succeed

  @smoke
  Scenario: TC-14_Verify the Please enter valid email address error message
    Given I have third task
    And Step from First Hello in Background Feature feature file
    When I attempt to solve it
    Then What i am "Yes" tested


  @smoke
  Scenario Outline: TC-15_<which> Hello
    Given I have "<what>" task
    And Step from "<what>" in "<which>" feature file
    When I attempt to solve it
    Then What i am "<expect>" tested

    Examples:
      | what | which  | expect |
      | easy | first  | Yes    |
      | hard | second | Yes  |
      | hard | second | Yes  |
      | hard | second | Yes   |

