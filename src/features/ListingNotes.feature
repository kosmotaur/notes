Feature: Listing notes

  Scenario: listing notes
    Given I have some notes
    When I request them
    Then my list of notes contains them
