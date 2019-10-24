import { assert } from 'chai';
import { Given, When, Then } from 'cucumber'
import { loginPage } from "../pages/Login.page";
import { kvManagement } from '../pages/KVManagement.page';
import { context } from "../../data/Context";
import { kvInvoiceURL } from "../constants/SystemURLs.constant";
import { delayBrowser } from "../constants/CommonFunctions.constant";


Given(/^User already login to KV Management$/, () => {
    if (!kvManagement.currentUserName.isExisting()) {
        loginPage.open();
        loginPage.fillInCredential(context.data.user);
        loginPage.loginManagement(context.data.user);
    } else {
        browser.navigateTo(kvInvoiceURL);
    }
});

When(/^Ton tai ma don hang$/, () => {
    kvManagement.handlePopUp();
    kvManagement.checkIfTheCreatedOrderExist();
});

When(/^Vao chi tiet ma van don$/, () => {
    kvManagement.goToOrderDetail();
});

When(/^An nut Huy$/, () => {
    if (!kvManagement.successMessage.isExisting()){
        delayBrowser(4000);
        kvManagement.cancelOrder();
        kvManagement.handleCancelSuccess();
        delayBrowser(4000);
        // kvManagement.goToOrderDetail();
    } else {
        console.log("Delivery is already cancelled");
    }
});


Then(/^Nguoi dung nhin thay van don o trang thai "([^"]*)"$/, (status) => {
    const deliveryStatus = kvManagement.successMessage.getText();
    if (deliveryStatus === status) {
        console.log('PASSED');
    } else {
        console.log('FAILED');
    }
});
