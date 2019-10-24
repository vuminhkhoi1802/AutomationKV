import * as commonVariables from './CommonVariables.constant';

const path = require('path');

const timeOut = commonVariables.timeOut;
export const delayBrowser = (argument) => {
    browser.pause(argument);
};

export const runInBrowser = (argument) => {
    argument.click();
    console.log('Element is clicked', argument);
};

export const executeClick = (argument) => {
    browser.execute(runInBrowser, argument);
};

export const executeWait = (argument) => {
    browser.waitUntil(() => {
        return argument.isExisting();
    }, timeOut);
};

export const waitAndClick = (argument) => {
    executeWait(argument);
    executeClick(argument);
};

export const checkElementVisibility = (argument) => {
    browser.execute((el) => el.style.display = 'block', argument);
    argument.waitForDisplayed();
    console.log(argument.toString() + 'is displayed');
};

export const filePath = (argument) => {
    return path.join(__dirname, 'documents/' + argument);
};

export const remoteFilePath = (argument) => {
    return browser.uploadFile(filePath(argument));
};

export const getNumberFromString = (argument) => {
    return argument.getText().match(/\d/g).join("");
};

