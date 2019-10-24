import { assert } from "chai";
import { When, Then } from "cucumber";
import { kvSaleStagingPage } from "../pages/KVSaleStaging.page";
import { context } from "../../data/Context";
import { delayBrowser } from "../constants/CommonFunctions.constant";
import { kvStagingInvoiceURL } from "../constants/SystemURLs.constant";
import { kvManagement } from "../pages/KVManagement.page";
import { orderNumberPattern } from "../constants/CommonVariables.constant";


When (/^Staging - Da chon san pham vao gio hang (.*)$/, (product) => {
  kvSaleStagingPage.selectProduct (product);
});

When (/^Staging - Dien thong tin giao hang$/, () => {
  kvSaleStagingPage.inputCustomer (context.data.customer);
  kvSaleStagingPage.goToDeliverySettings ();
  const title = kvSaleStagingPage.deliveryWindowsTitle;
  assert.equal (title.getText (), 'Chi tiết đơn giao hàng');
});

When (/^Staging - Dien thong tin doi tac giao hang (.*)$/, (client) => {
  kvSaleStagingPage.selectDeliveryService (client);
});

When (/^Staging - Chon doi tac ahamove$/,  () => {
  kvSaleStagingPage.selectDeliveryService()
});

When (/^Staging - Thanh toan don hang$/, () => {
  try {
    kvSaleStagingPage.finishDelivery ();
    kvSaleStagingPage.finishSale ();
    delayBrowser (5000);
  } catch (error) {
    throw (error);
  }
});

Then (/^Staging - Tao don hang thanh cong$/, () => {
  browser.navigateTo (kvStagingInvoiceURL);
  kvManagement.handlePopUp ();
  const orderNumber = kvSaleStagingPage.mostRecentOrder.getText ();
  if (orderNumber.match (orderNumberPattern)) {
    console.log ('PASSED - Order Number is valid');
  } else {
    console.log ('FAILED - Order Number is not matched with the pattern');
  }
  delayBrowser (6000);
});
