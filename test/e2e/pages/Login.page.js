import {
  kvLivePrefix, kvPreLivePrefix, kvStagingPrefix, kvStagingURL, kvStating9k2Prefix, kvURL
} from '../constants/SystemURLs.constant';


class LoginPage {
  open () {
    browser.url (kvLivePrefix);
  }

  get kvLogoSlogan () {
    return browser.$ ('//a[@class=\'logo dpib ovh\']//img');
  }

  get inputEmail () {
    return $ ('body #UserName');
  }

  get inputPassword () {
    return $ ('body #Password');
  }

  get buttonSaleSignIn () {
    return $ ('body #loginNewSale');
  }

  get buttonManagementSignIn () {
    return browser.$ ('//input[@name=\'quan-ly\']');
  }

  get userSaleLoggedIn () {
    return $ ('.lk-user-name');
  }

  get userManagementLoggedIn () {
    return browser.$ ('//a[@class=\'dpib userName\']');
  }

  fillInCredential (user) {
    const currentURL = browser.getUrl ();
    if (this.kvLogoSlogan.isExisting ()) {
      if (currentURL.includes (kvPreLivePrefix)) {
        this.inputEmail.setValue (user.preLive.login);
        this.inputPassword.setValue (user.preLive.password);
      } else if (currentURL.includes (kvLivePrefix)) {
        this.inputEmail.setValue (user.production.login);
        this.inputPassword.setValue (user.production.password);
      } else if (currentURL.includes (kvStagingPrefix)) {
        this.inputEmail.setValue (user.staging.login);
        this.inputPassword.setValue (user.staging.password);
      } else if (currentURL.includes (kvStating9k2Prefix)) {
        this.inputEmail.setValue (user.staging9k2.login);
        this.inputPassword.setValue (user.staging9k2.password);
      }
    }
  }

  loginSale () {
    this.buttonSaleSignIn.click ();
  }

  loginManagement () {
    this.buttonManagementSignIn.click ();
  }

}

export const loginPage = new LoginPage ();
