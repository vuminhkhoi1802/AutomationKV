import {assert} from 'chai';
import {Given, When, Then} from 'cucumber';
import {shippingLogin} from "../pages/ShippingLogin.page";
import {context} from '../../data/Context';

Given(/^I'm on the login page \- Shipping$/, () => {
    shippingLogin.open();
});
When(/^I log in with a default user \- Shipping$/, () => {
    shippingLogin.loginShipping(context.data.shipping);
});

Then(/^show user name 'Khôi \- OCC' on the site \- Shipping$/, () => {
    const topUser = browser.$('//span[@class=\'hidden-xs\']');
    assert.equal(topUser.getText(), 'Khôi - OCC');
});
