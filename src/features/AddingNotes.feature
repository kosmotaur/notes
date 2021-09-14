Feature: Adding notes

  Scenario: Adding a note
    When I add a note
    Then it should be created
    And my list of notes should contain one note
