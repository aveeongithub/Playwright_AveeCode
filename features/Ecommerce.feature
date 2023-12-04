Feature: Just a normal scenario POC using Playwright Cucumber

Scenario: Placing a normal order on a demo site
    Given the user logs in to the application
    Then the user selects the products
    And the user adds it to the bags
    Then the user checks out  