import * as systemKeys from '../constants/SystemKeys.constant';
import {
  delayBrowser,
  waitAndClick,
  checkElementVisibility,
  executeWait, executeClick,
} from '../constants/CommonFunctions.constant';
import { ARROW_DOWN, ENTER } from '../constants/SystemKeys.constant';
import { kvLivePrefix, kvPreLivePrefix } from "../constants/SystemURLs.constant";


class KVSalePage {

  get popUpWindow () {
    return $ ('.popup-header');
  }

  get customerField () {
    return $ ('body #customerSearchInput');
  }

  get deliveryCheckBox () {
    return $ ('body #delivery');
  }

  get deliveryLink () {
    return browser.$ ("//span[contains(text(),'Giao hàng')]");
  }

  get deliveryServiceInput () {
    return browser.$ ("//input[@id='deliveryPartnerSearchInput']");
  }

  get deliveryWindowsTitle () {
    return browser.$ ("//span[@class='k-window-title']");
  }

  get deliveryServiceSelection () {
    return browser.$ ("//div[@class='kv-body']//div[2]//div[1]//label[1]//input[1]");
  }

  get deliveryNoteInput () {
    return browser.$ ("//div[@class='form-group form-note']//textarea[@placeholder='Ghi chú']");
  }

  get deliveryFinishButton () {
    return browser.$ ("//button[@class='btn btn-success'][contains(text(),'Xong')]");
  }

  get checkOutButton () {
    return browser.$ ('//button[@id=\'saveTransaction\']');
  }

  get mostRecentOrder () {
    return browser.$ ("//section[@class='mainRight invoices ng-scope']//tr[2]//td[4]");
  }

  inputCustomer (customer) {
    try {
      delayBrowser (4000);
      waitAndClick (this.customerField);
      this.customerField.setValue (customer.name);
      delayBrowser (4000);
      browser.keys (systemKeys.ENTER);
      delayBrowser (4000);
    } catch (error) {
      throw error;
    }
  }

  handlePopUp () {
    if (this.popUpWindow.isExisting ()) {
      waitAndClick (this.popUpWindow);
      browser.keys (ESCAPE);
    }
  }

  productSelection (product) {
    return browser.$ ('//span[contains(text(),\'' + product + '\')]');
  }

  selectProduct (user) {
    this.handlePopUp ();
    if (browser.getUrl ().includes (kvPreLivePrefix)) {
      executeWait (this.productSelection (user.preLive.product));
      executeClick (this.productSelection (user.preLive.product))
    } else if (browser.getUrl ().includes (kvLivePrefix)) {
      executeWait (this.productSelection (user.production.product));
      executeClick (this.productSelection (user.production.product));
    }
  }

  goToDeliverySettings () {
    checkElementVisibility (this.deliveryLink);
    if (!this.deliveryLink.isExisting ()) {
      console.log ('Link is not found');
      waitAndClick (this.deliveryCheckBox);
    }
    console.log ('Link is already existing!');
    waitAndClick (this.deliveryLink);
    delayBrowser (4000);
  }

  selectDeliveryService (client) {
    try {
      delayBrowser (5000);
      this.deliveryServiceInput.setValue (client);
      delayBrowser (3000);
      browser.keys (ARROW_DOWN);
      browser.keys (ENTER);
      executeWait (this.deliveryServiceSelection);
      executeClick (this.deliveryServiceSelection);
    } catch (error) {
      throw error;
    }
  }

  addNote (note) {
    waitAndClick (this.deliveryNoteInput);
    this.deliveryNoteInput.setValue (note);
    delayBrowser (5000);
  }

  finishDelivery (note) {
    this.addNote (note);
    waitAndClick (this.deliveryFinishButton);
  }

  finishSale () {
    delayBrowser (4000);
    waitAndClick (this.checkOutButton);
    delayBrowser (4000);
  }
}

export const kvSalePage = new KVSalePage ();
