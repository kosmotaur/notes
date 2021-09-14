Feature: Deleting notes

  @deletingNotes
  Scenario: deleting a note
    Given I have a note
    When I delete it
    Then my list of notes should not include that note
