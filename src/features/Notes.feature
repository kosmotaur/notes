Feature: Managing notes

  Scenario: listing notes
    Given I have some notes
    When I request them
    Then my list of notes contains them

  Scenario: adding a note
    When I add a note
    Then it should be created
    And my list of notes should contain that note

  Scenario: deleting a note
    Given I have a note
    When I delete it
    Then my list of notes should not include that note
