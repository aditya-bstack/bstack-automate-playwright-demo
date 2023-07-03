const {test, expect} = require('@playwright/test')
  
test('bstackdemo test1', async ({page}, testInfo) => {
    try {
        await page.evaluate(_ => {},`browserstack_executor: ${JSON.stringify({action: "setSessionName", arguments: {name:testInfo.project.name}})}`);
        await page.goto('https://bstackdemo.com/')
        //await expect(page).toHaveTitle('StackDemo')
        //await page.pause()
        await page.click('id=signin')
        await page.locator('#username > div > div.css-1hwfws3').click()
        await page.locator('id=react-select-2-input').fill('demouser')
        await page.keyboard.press('Enter')
        await page.locator('#password > div > div.css-1hwfws3').click()
        await page.locator('id=react-select-3-input').fill('testingisfun99')
        await page.keyboard.press('Enter')
        await page.click('id=login-btn')
        await expect(page.locator('xpath=//*[@id="__next"]/div[2]/div/form/div[2]/h3')).toBeHidden()
        await page.locator('xpath=//*[@id="1"]/div[4]').click()
        await page.locator('#__next > div > div > div.float-cart.float-cart--open > div.float-cart__content > div.float-cart__footer > div.buy-btn').click()
        await page.locator('id=firstNameInput').fill('sample_first_name')
        await page.locator('id=lastNameInput').fill('sample_last_name')
        await page.locator('id=addressLine1Input').fill('sample_address')
        await page.locator('id=provinceInput').fill('sample_province')
        await page.locator('id=postCodeInput').fill('sample_postal_code')
        await page.click('id=checkout-shipping-continue')
        await expect(page.locator('text=Your Order has been successfully placed.')).toHaveCount(1)
        await page.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'Product added to cart'}})}`);
    } catch(e){
        console.log(e)
        await page.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: 'Test failed'}})}`);
    }
})

test('bstackdemo test2', async ({page}, testInfo) => {
    await page.evaluate(_ => {},`browserstack_executor: ${JSON.stringify({action: "setSessionName", arguments: {name:testInfo.project.name}})}`);
    await page.goto('https://bstackdemo.com/')
    //await expect(page).toHaveTitle('StackDemo')
    //await page.pause()
    await page.click('id=signin')
    await page.locator('#username > div > div.css-1hwfws3').click()
    await page.locator('id=react-select-2-input').fill('demousers')
    await page.keyboard.press('Enter')
    await page.locator('#password > div > div.css-1hwfws3').click()
    await page.locator('id=react-select-3-input').fill('testingisfun99')
    await page.keyboard.press('Enter')
    await page.click('id=login-btn')
    await expect(page.locator('xpath=//*[@id="__next"]/div[2]/div/form/div[2]/h3')).toBeHidden()
    await page.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: 'Login unsuccessful'}})}`);
})