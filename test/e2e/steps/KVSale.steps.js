import { assert } from "chai";
import { Given, When, Then } from "cucumber";
import { kvSalePage } from "../pages/KVSale.page";
import { loginPage } from "../pages/Login.page";
import { context } from "../../data/Context";
import { orderNumberPattern } from "../constants/CommonVariables.constant";
import { kvInvoiceURL, kvSaleURL } from "../constants/SystemURLs.constant";
import { kvManagement } from "../pages/KVManagement.page";
import { delayBrowser } from "../constants/CommonFunctions.constant";

Given (/^User already login to the KV Sale Page$/, () => {
  if (!loginPage.userManagementLoggedIn.isExisting ()) {
    loginPage.open ();
    loginPage.fillInCredential (context.data.user);
    loginPage.loginSale (context.data.user);
  } else {
      browser.navigateTo(kvSaleURL);
  }
});

When (/^Da chon san pham vao gio hang$/, () => {
  kvSalePage.selectProduct (context.data.user);
});

When (/^Dien thong tin giao hang$/, () => {
  kvSalePage.inputCustomer (context.data.customer);
  kvSalePage.goToDeliverySettings ();
  assert.equal(kvSalePage.deliveryWindowsTitle.getText(), 'Chi tiết đơn giao hàng');

});

When (/^Dien thong tin doi tac giao hang (.*)$/, (client) => {
  kvSalePage.selectDeliveryService (client);
});

When (/^Thanh toan don hang$/, () => {
  try {
    kvSalePage.finishDelivery (context.data.note);
    kvSalePage.finishSale ();
    delayBrowser (5000);
  } catch (error) {
    throw (error);
  }
});

Then (/^Tao don hang thanh cong$/, async () => {
  browser.navigateTo (kvInvoiceURL);
  kvManagement.handlePopUp ();
  const orderNumber = kvSalePage.mostRecentOrder.getText ();
  if (orderNumber.match (orderNumberPattern)) {
    console.log ('PASSED - Order Number is valid');
  } else {
    console.log ('FAILED - Order Number is not matched with the pattern');
  }
});
