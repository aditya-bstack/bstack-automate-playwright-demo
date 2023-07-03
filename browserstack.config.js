const base = require('@playwright/test');
const cp = require('child_process');
const clientPlaywrightVersion = cp
  .execSync('npx playwright --version')
  .toString()
  .trim()
  .split(' ')[1];

const util = require('util');



const caps = {
    name: process.env.BROWSERSTACK_BUILD_NAME,
    build: process.env.BROWSERSTACK_BUILD_NAME,
    project: 'aditya-bstack-onboarding',
    "browserstack.debug" : "true",
    "browserstack.networkLogs" : "true",
    'browserstack.username': process.env.BROWSERSTACK_USERNAME || 'adityagupta_h4RNen',
    'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY || 'Kyky847fPuzn382fUnhS',
};

// Patching the capabilities dynamically according to the project name.
const patchCaps = (name, title) => {
    let combination = name.split(/@browserstack/)[0];
    let [browerCaps, osCaps] = combination.split(/:/);
    let [browser, browser_version] = browerCaps.split(/@/);
    let osCapsSplit = osCaps.split(/ /);
    let os = osCapsSplit.shift();
    let os_version = osCapsSplit.join(' ');
    caps.browser = browser ? browser : 'chrome';
    caps.browser_version = browser_version ? browser_version : 'latest';
    caps.os = os ? os : 'osx';
    caps.os_version = os_version ? os_version : 'catalina';
    caps.name = process.env.BROWSERSTACK_BUILD_NAME;
  };

exports.getCdpEndpoint = (name, title) => {
    patchCaps(name, title)    
    const cdpUrl = `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps))}`
    console.log(`--> ${cdpUrl}`)
    return cdpUrl;
}