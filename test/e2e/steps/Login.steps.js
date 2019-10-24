import { assert } from 'chai';
import { Given, When, Then } from 'cucumber';
import { loginPage } from '../pages/Login.page';
import { context } from '../../data/Context';

Given(/^I'm on the login page$/, () => {
    loginPage.open();
});

When(/^I log in with a default user$/, () => {
    loginPage.fillInCredential(context.data.user);
    loginPage.loginSale();
});

When(/^I log in with a default user - Management$/, () => {
    loginPage.fillInCredential(context.data.user);
    loginPage.loginManagement();
});

Then(/^show user name '(.+)' on the site$/, (userName) => {
    assert.equal(loginPage.userSaleLoggedIn.getText(), userName);
});

Then(/^show user name '(.+)' on the site - Management$/, (userName) => {
    assert.equal(loginPage.userManagementLoggedIn.getText(), userName);
});
