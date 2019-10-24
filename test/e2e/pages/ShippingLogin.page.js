import { timeOut } from '../constants/CommonVariables.constant';
import { shippingURL } from '../constants/SystemURLs.constant';
import { executeClick } from '../constants/CommonFunctions.constant';

class ShippingLogin {
  open() {
    browser.url(shippingURL);
  }

  get inputEmail() {
    return $('body #email');
  }

  get inputPassword() {
    return browser.$('//input[@id=\'password\']');
  }

  get buttonSignIn() {
    return browser.$('//button[@type=\'submit\']');
  }

  get userShippingLoggedIn() {
    return browser.$('//span[@class=\'hidden-xs\']');
  }

  loginShipping(shipping) {
    const currentURL = browser.getUrl();
    if (currentURL.includes('kvpos')) {
      this.inputEmail.setValue(shipping.preLive.login);
      this.inputPassword.setValue(shipping.preLive.password);
    } else if (currentURL.includes('kiotapi')) {
      this.inputEmail.setValue(shipping.production.login);
      this.inputPassword.setValue(shipping.production.password);
    }

    executeClick(this.buttonSignIn);
    // browser.waitUntil(() => {
    //     return this.userShippingLoggedIn.getText() === shipping.production.name;
    // }, timeOut);
  }
}

export const shippingLogin = new ShippingLogin();
