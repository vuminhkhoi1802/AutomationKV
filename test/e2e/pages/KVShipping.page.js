import { assert } from 'chai';
import {
  checkElementVisibility,
  delayBrowser,
  executeClick,
  executeWait,
  filePath,
  remoteFilePath,
  getNumberFromString, waitAndClick,
} from '../constants/CommonFunctions.constant';
import {
  kvShippingDeliveryOrderListURL,
  kvShippingEmailNotificationListURL,
  kvShippingShopListURL,
  kvShippingCrossCheckListURL,
  kvShippingDeliveryOrderDetailURL,
  kvPreLivePrefix,
  livePrefix,
  preLivePrefix,
  productionPrefix,
} from '../constants/SystemURLs.constant';
import { SHIPPING_ORDER_DELIVERY_LIST } from '../constants/SystemLabels.constant';
import { ENTER } from '../constants/SystemKeys.constant';
import { context } from '../../data/Context';
import { currentURL } from "../constants/CommonVariables.constant";

class KVShipping {
  get deliveryOrderSearchBar () {
    return browser.$ ('//input[@placeholder=\'Order code....\']');
  }

  get foundDeliveryOrderNumber () {
    return browser.$ ('//span[@class=\'text-\']//ancestor::a');
  }

  get deliveryOrderCancelButton () {
    return browser.$ ('//button[@class=\'btn btn-danger btn-sm\']');
  }

  get shopListInputSearch () {
    return browser.$ ('//input[@id=\'inputSearch\']');
  }

  get shopSearchButton () {
    return browser.$ ('//button[contains(text(),\'Tìm ki\')]');
  }

  get shopDeliveryList () {
    return browser.$ ('//a[contains(text(),\'Danh sách v\')]');
  }

  get orderDeliveryList () {
    return browser.$ ('//h3[@class=\'box-title\']');
  }

  get dateFromInput () {
    return browser.$ ('//input[@id=\'date-range\']');
  }

  get dateFromSubInput () {
    return browser.$ ('//body[@class=\'skin-blue sidebar-mini\']/div[2]/div[1]/div[1]/input[1]');
  }

  get dateToInput () {
    return browser.$ ('//input[@id=\'completed-date\']');
  }

  get dateToSubInput () {
    return browser.$ ('//div[3]//div[2]//input[1]');
  }

  get applyDateButton () {
    return browser.$ ('//button[text()=\'Apply\']');
  }

  get exportFileShopButton () {
    return browser.$ ('//button[@id=\'export-xls\']');
  }

  get exportFileShopListButton () {
    return browser.$ ('//button[@name=\'action\']');
  }

  get exportFileDeliveryListButton () {
    return browser.$ ('//button[@id=\'export-xls\']');
  }

  get addNewButton () {
    return browser.$ ('//a[@class=\'btn btn-success btn-lg\']');
  }

  get chooseFileButton () {
    return browser.$ ('//input[@placeholder=\'RetailerID\']');
  }

  get createNewNotificationButton () {
    return browser.$ ('//button[@id=\'submit_btn\']');
  }

  get successSendNotificationStatus () {
    return browser.$ ('//tbody[1]//tr[1]//td[6]');
  }

  get crosscheckListHeader () {
    return browser.$ ('//h3[@class=\'box-title\']');
  }

  get addNewCrossCheckButton () {
    return browser.$ ('//button[@data-toggle=\'modal\']');
  }

  get crossCheckTypeDropDown () {
    return browser.$ ('//select[@id=\'checker_type\']//following-sibling::span[1]');
  }


  get crosscheckTypeInput () {
    return browser.$ ('//span[@class=\'select2-search select2-search--dropdown\']//input[@class=\'select2-search__field\']');
  }

  get deliveryServiceDropDown () {
    return browser.$ ('//select[@id=\'checker_client\']//following-sibling::span');
  }

  get deliveryServiceInput () {
    return browser.$ ('//span[@class=\'select2-search select2-search--dropdown\']//input[@class=\'select2-search__field\']');
  }

  get uploadCCFileButton () {
    return browser.$ ('//input[@name=\'file\']');
  }

  get periodDateCCDropDown () {
    return browser.$ ('//input[@id=\'period-date\']');
  }

  get periodDateCCFrom () {
    return browser.$ ('//input[@name=\'daterangepicker_start\']');
  }

  get periodDateCCTo () {
    return browser.$ ('//input[@name=\'daterangepicker_end\']');
  }

  get applyPeriodDateCCButton () {
    return browser.$ ('//button[@class=\'applyBtn btn btn-sm btn-success\']');
  }

  get confirmCreateCCButton () {
    return browser.$ ('//button[@id=\'select_checker_type\']');
  }

  get crosscheckCODDetailTitle () {
    return browser.$ ('//h3[contains(@class,\'box-title\')]');
  }

  get difference () {
    return browser.$ ('//a[contains(@class,\'text-bold\')][contains(text(),\'ch\')]');
  }

  goToShopList () {
    browser.navigateTo (kvShippingShopListURL);
  }

  goToDeliveryOrderList () {
    browser.navigateTo (kvShippingDeliveryOrderListURL);
    assert.equal (this.orderDeliveryList.getText (), SHIPPING_ORDER_DELIVERY_LIST);
  }

  goToEmailNotificationList () {
    browser.navigateTo (kvShippingEmailNotificationListURL);
  }

  goToCrossCheckList () {
    browser.navigateTo (kvShippingCrossCheckListURL);
  }

  goToSearchedDeliveryOrder () {
    const newURL = this.foundDeliveryOrderNumber.getAttribute ('href');
    console.log (newURL);
    // browser.navigateTo(kvShippingDeliveryOrderDetailURL + order);
    browser.navigateTo (newURL);
  }

  searchForDeliveryOrder (order) {
    executeWait (this.deliveryOrderSearchBar);
    executeClick (this.deliveryOrderSearchBar);
    this.deliveryOrderSearchBar.setValue (order);
    browser.keys (ENTER);
    executeWait (browser.$ ('//h3[@class=\'box-title\']'));
  }

  cancelDeliveryOrder () {
    try {
      if (this.deliveryOrderCancelButton.isExisting ()) {
        executeWait (this.deliveryOrderCancelButton);
        executeClick (this.deliveryOrderCancelButton);
        console.log ('Cancel Button Clicked');
      } else {
        console.log ('Order is already cancelled');
      }
    } catch (e) {
      console.log ('Not Clicked');
      throw e;
    }
  }

  searchForDedicatedShop (shipping) {
    executeWait (this.shopListInputSearch);
    if (browser.getUrl ().includes (preLivePrefix)) {
      this.shopListInputSearch.setValue (shipping.preLive.shop);
    } else if (browser.getUrl ().includes (livePrefix)) {
      this.shopListInputSearch.setValue (shipping.production.shop);
    }
    executeClick (this.shopSearchButton);
  }

  inputDateRange (emailNotification) {
    executeWait (this.dateFromInput);
    executeClick (this.dateFromInput);
    executeClick (this.dateFromSubInput);
    this.dateFromSubInput.setValue (emailNotification.dateFrom);
    executeWait (this.dateToInput);
    executeClick (this.dateToInput);
    executeClick (this.dateToSubInput);
    this.dateToSubInput.setValue (emailNotification.dateTo);
    executeClick (this.applyDateButton);
  }

  searchedShop (shop) {
    return browser.$ (`//a[contains(text(),'${shop}')]`);
  }

  goToDedicatedShop (shipping) {
    if (browser.getUrl().includes(preLivePrefix)){
      executeWait (this.searchedShop(shipping.preLive.shop));
      executeClick (this.searchedShop(shipping.preLive.shop));
    } else if (browser.getUrl().includes(livePrefix || productionPrefix)){
      executeWait (this.searchedShop(shipping.production.shop));
      executeClick (this.searchedShop(shipping.production.shop));
    }
  }

  goToShopDeliveryList () {
    executeWait (this.shopDeliveryList);
    executeClick (this.shopDeliveryList);
  }

  exportFileShop () {
    executeWait (this.exportFileShopButton);
    executeClick (this.exportFileShopButton);
  }

  exportFileShopList () {
    executeWait (this.exportFileShopListButton);
    executeClick (this.exportFileShopListButton);
    delayBrowser ();
    browser.keys (ENTER);
  }

  exportFileOrderDeliveryList () {
    executeWait (this.exportFileDeliveryListButton);
    executeClick (this.exportFileDeliveryListButton);
  }

  uploadEmailNotificationFile (emailNotification) {
    executeWait (this.addNewButton);
    executeClick (this.addNewButton);
    checkElementVisibility (this.chooseFileButton);
    this.chooseFileButton.waitForDisplayed ();
    this.chooseFileButton.setValue (remoteFilePath (emailNotification.file));
  }

  createNewNotification () {
    executeWait (this.createNewNotificationButton);
    executeClick (this.createNewNotificationButton);
  }

  verifySucceededSendNotification (status) {
    executeWait (this.successSendNotificationStatus);
    status = this.successSendNotificationStatus.getText ();
    assert.equal (status, 'Đã gửi hết');
  }


  chooseCCType (type) {
    executeWait (this.crosscheckListHeader);
    executeClick (this.addNewCrossCheckButton);
    if (this.crossCheckTypeDropDown.isExisting ()) {
      console.log ('found');
      try {
        checkElementVisibility (this.crossCheckTypeDropDown);
        this.crossCheckTypeDropDown.click ();
        this.crosscheckTypeInput.setValue (type);
        browser.keys (ENTER);
      } catch (e) {
        console.log ('not clickable');
        throw e;
      }
    } else {
      console.log ('not found');
    }
  }

  chooseCCTypeShop () {

  }

  addNewCrossCheckShop (crosscheck) {
    if (this.periodDateCCDropDown.isExisting ()) {
      try {
        this.periodDateCCFrom.setValue ();
      } catch (e) {
        throw e;
      }
    }
  }

  chooseCCClient (client) {
    if (this.deliveryServiceDropDown.isExisting ()) {
      console.log ('delivery client found');
      try {
        checkElementVisibility (this.deliveryServiceDropDown);
        this.deliveryServiceDropDown.click ();
        this.deliveryServiceInput.setValue (client);
        browser.keys (ENTER);
      } catch (error) {
        throw (error);
      }
    } else {
      console.log ('not found');
    }
  }

  chooseCCFile (file) {
    checkElementVisibility (this.uploadCCFileButton);
    this.uploadCCFileButton.setValue (remoteFilePath (file));
  }

  chooseCCDateFrom (dateFrom) {
    executeClick (this.periodDateCCDropDown);
    this.periodDateCCFrom.setValue (dateFrom);
  }

  chooseCCDateTo (dateTo) {
    this.periodDateCCTo.setValue (dateTo);
  }

  confirmCCCreation () {
    executeClick (this.applyDateButton);
    executeClick (this.applyPeriodDateCCButton);
    waitAndClick (this.confirmCreateCCButton);
  }

  verifyCrossCheck () {
    try {
      delayBrowser (7000);
      executeWait (this.crosscheckCODDetailTitle);
      if (this.crosscheckCODDetailTitle.isExisting ()) {
        assert (this.crosscheckCODDetailTitle.getText (), context.data.ccDetailTitle);
        const diff = getNumberFromString (this.difference);
        assert.isTrue (diff !== 0, 'Chỉ số lệch khác giá trị 0');
      } else {
        console.log ('Element does not exist');
      }
    } catch (e) {
      console.log ('TimeOut on waiting for the element!');
      throw e;
    }
  }
}

export const kvShipping = new KVShipping ();
