Feature: Adding notes

  @addingNotes
  Scenario: Adding a note
    When I add a note
    Then my list of notes should contain one note
