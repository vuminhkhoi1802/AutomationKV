Feature: Login vao KiotViet Sale

    Background:
        Given I'm on the login page
    Scenario: Login Successfully
        When I log in with a default user
        Then show user name 'shiptest' on the site
