const {test, expect} = require('@playwright/test')

test("@Web Validations", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://www.rahulshettyacademy.com/consulting");
    await page.goBack();
    //To check if element is visible or hidden
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.screenshot({path: 'screenshot.png'});
    await page.locator("#hide-textbox").screenshot({path: 'partialElement.png'})
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    //Handling Javascript popups
    //We need to listen to events
    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();

    //hovering
    await page.locator("#mousehover").hover();

    //Handling Frame 
    //iFrame and Frameset
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    console.log("*****************DONE***********************")
})

test.only("Visual Regression Tests", async({page})=>{
    await page.goto("https://www.google.co.uk");
    expect (await page.screenshot()).toMatchSnapshot('landingpage.png');
})