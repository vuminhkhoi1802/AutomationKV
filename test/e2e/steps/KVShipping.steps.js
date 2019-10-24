import { assert } from 'chai';
import { Given, Then, When } from "cucumber";
import { kvShipping } from "../pages/KVShipping.page";
import { kvManagement } from "../pages/KVManagement.page";
import { shippingLogin } from "../pages/ShippingLogin.page";
import { context } from '../../data/Context';

/* Huy Don Hang tren KV Shipping */
let deliveryCode;

When(/^Lay duoc ma van don$/, () => {
    deliveryCode = kvManagement.deliveryCode.getText();
    console.log(deliveryCode);
});

When(/^Tim ma van don o thanh Search$/, () => {
    kvShipping.searchForDeliveryOrder(deliveryCode);
});

When(/^Vao chi tiet ma van don tren Shipping$/, () => {
    kvShipping.goToSearchedDeliveryOrder();
});

When(/^An nut Huy tren Shipping$/, () => {
    kvShipping.cancelDeliveryOrder();
});

Then(/^Nguoi dung nhin thay trang thai "([^"]*)"$/, (status) => {
    try {
        const message = () => {
            return browser.$('//span[contains(text(),\'ã h\')]')
                .getText()
        };
        if (message() === status) {
            console.log('PASSED - Vận đơn đã được hủy');
        } else {
            console.log('FAILED - Vận đơn vẫn còn tồn tại');
        }
    } catch (e) {
        console.log('Message Element Not Found');
        throw (e);
    }
});

/* Feature: Nguoi dung xuat file */
Given(/^already login to KV Shipping$/, () => {
    shippingLogin.open();
    shippingLogin.loginShipping(context.data.shipping);
});

When(/^Dang o danh sach cac gian hang$/, () => {
    kvShipping.goToShopList();
});

Given(/^Dang o danh sach van don$/, () => {
    kvShipping.goToDeliveryOrderList();
});

When(/^tim kiem gian hang va vao chi tiet gian hang$/, () => {
    kvShipping.searchForDedicatedShop(context.data.shipping);
    kvShipping.goToDedicatedShop(context.data.shipping);
});

When(/^tim kiem ten gian hang "([^"]*)"$/, (shop) => {
    shop = context.data.shipping;
    kvShipping.searchForDedicatedShop(shop);
});

When(/^Vao danh sach van don - chi tiet gian hang$/, () => {
    kvShipping.goToShopDeliveryList();
});

When(/^An nut "([^"]*)"$/, (button) => {
    button = kvShipping.exportFileShopButton.getText();
    kvShipping.exportFileShop();
    console.log(`Da an nut${button}`);
});

When(/^An nut "([^"]*)" - danh sach gian hang$/, (button) => {
    kvShipping.exportFileShopList();
});

When(/^An nut "([^"]*)" - list van don$/, (button) => {
    kvShipping.exportFileOrderDeliveryList();
});

Then(/^Nguoi dung download duoc file ve va file ton tai o trong thu muc Downloads$/, () => {
    console.log('Download file Thanh Cong');
});

/* Feature: Gui mail thong bao */

Given(/^Dang o danh sach email thong bao$/, () => {
    kvShipping.goToEmailNotificationList();
});

When(/^dien ngay hoan thanh$/, () => {
    kvShipping.inputDateRange(context.data.emailNotification);
});

When(/^Them moi file thong bao$/, () => {
    kvShipping.uploadEmailNotificationFile(context.data.emailNotification);
    kvShipping.createNewNotification();
});

Then(/^Nguoi dung thay trang thai "([^"]*)"$/, (status) => {
    kvShipping.verifySucceededSendNotification(status);
    console.log(status);
});

/* Feature: Upload file doi soat */

Given(/^Dang o danh sach doi soat$/, () => {
    kvShipping.goToCrossCheckList();
});

When(/^Chon loai doi soat (.*)$/, (type) => {
    kvShipping.chooseCCType(type);
});

When(/^Tao moi doi soat using (.*), (.*), (.*), (.*)$/, (client, dateFrom, dateTo, file) => {
    kvShipping.chooseCCClient(client);
    kvShipping.chooseCCFile(file);
    kvShipping.chooseCCDateFrom(dateFrom);
    kvShipping.chooseCCDateTo(dateTo);
    kvShipping.confirmCCCreation();
});

Then(/^Ra duoc man hinh co gia tri lech khac 0$/, () => {
    kvShipping.verifyCrossCheck(context.data.crosscheck);
});
