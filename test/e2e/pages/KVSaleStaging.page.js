import * as systemKeys from '../constants/SystemKeys.constant';
import {
  delayBrowser,
  waitAndClick,
  checkElementVisibility,
  executeWait, executeClick,
} from '../constants/CommonFunctions.constant';
import { ARROW_DOWN, ENTER } from '../constants/SystemKeys.constant';


class KVSaleStagingPage {
  get printerCheck () {
    return browser.$ ("//a[@id='printConfig']");
  }

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
    return browser.$ ('//span[contains(text(),\'Giao hàng\')]');
  }

  get deliveryServiceInput () {
    return browser.$ ('//input[@id=\'deliveryPartnerSearchInput\']');
  }

  get deliveryWindowsTitle () {
    return browser.$ ('//span[@class=\'k-window-title\'][contains(text(),\'n giao hàng\')]');
  }

  get deliveryServiceSelection () {
    return browser.$ ('//tr[12]//td[1]//div[1]//div[1]//input[1]');
  }

  get shopAddressSelectArrow() {
    return browser.$('//div[@class=\'select-wrapper\']//span[@class=\'k-icon k-i-arrow-s\'][contains(text(),\'select\')]');
  }

  get shopAddressSelectInput() {
    return browser.$('//span[contains(text(),\'ng Kim Liên, Qu\')]');
  }

  get withinDayDeliveryPanel(){
    return browser.$('//a[contains(text(),\'Giao trong ngày\')]');
  }

  get deliveryFinishButton () {
    return browser.$ ('//button[@class=\'btn btn-success\'][contains(text(),\'Xong\')]');
  }

  get checkOutButton () {
    return browser.$ ('//button[@id=\'saveTransaction\']');
  }

  get mostRecentOrder () {
    return browser.$ ("//section[@class='mainRight invoices ng-scope']//tr[2]//td[4]");
  }

  offLineDeliveryServiceStatus() {
    return ('//div[@class=\'wedget-delivery--offline\']');
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

  selectProduct (product) {
    this.handlePopUp ();
    executeWait (this.productSelection(product));
    executeClick (this.productSelection(product));
  }

  goToDeliverySettings () {
    checkElementVisibility (this.deliveryLink);
    if (!this.deliveryLink.isExisting ()) {
      console.log ('Delivery Link is yet checked');
      waitAndClick (this.deliveryCheckBox);
    }
    console.log ('Delivery Link is already checked');
    waitAndClick (this.deliveryLink);
    delayBrowser (4000);
  }

  productSelection (product) {
    return browser.$ ('//span[contains(text(),\''+product+'\')]');
    // return browser.$('//div[@class=\'swiper-slide swiper-slide-active\']//ul');
  }

  selectDeliveryService (client) {
    try {
      // while (this.offLineDeliveryServiceStatus().isExisting()){
      //   browser.refresh();
      //   this.goToDeliverySettings();
      // }
      waitAndClick(this.shopAddressSelectArrow);
      delayBrowser(4000);
      waitAndClick(this.shopAddressSelectInput);
      delayBrowser(4000);
      waitAndClick(this.withinDayDeliveryPanel);
      // executeWait(this.deliveryServiceInput);
      // this.deliveryServiceInput.setValue (client);
      // delayBrowser (6000);
      // browser.keys (ARROW_DOWN);
      // browser.keys (ENTER);
      delayBrowser(10000);
      executeWait (this.deliveryServiceSelection);
      executeClick (this.deliveryServiceSelection);
      delayBrowser(10000);
    } catch (error) {
      throw error;
    }
  }

  finishDelivery () {
    waitAndClick (this.deliveryFinishButton);
  }

  finishSale () {
    delayBrowser (4000);
    waitAndClick (this.checkOutButton);
    delayBrowser (4000);
  }
}

export const kvSaleStagingPage = new KVSaleStagingPage ();
