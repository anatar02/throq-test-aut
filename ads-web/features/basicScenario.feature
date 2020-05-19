Feature: First Feature
  @smoke
  Scenario: TC-19_Verify the Invalid Credentials message
    Given I have first task
    And Step from First Hello in Background Feature feature file
    When I attempt to solve it
    Then I surely succeed