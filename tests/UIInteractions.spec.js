const {test, expect} = require('@playwright/test');

test.describe.configure({mode:'parallel'});
test('@Web First Test Script without browser', async ({page}) => {
            await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
            const userName = page.locator("#username");
            const signIn = page.locator("#signInBtn");
            const documentLink = page.locator("[href*='documents-request']");
            const dropdown = page.locator("select.form-control");
            await dropdown.selectOption("consult");
            await page.locator(".radiotextsty").last().click();
            await expect(page.locator(".radiotextsty").last()).toBeChecked();
            await page.locator("#okayBtn").click();
            await page.locator("#terms").click();
            await expect(page.locator("#terms")).toBeChecked();
            await page.locator("#terms").uncheck(); //uncheck doesn't have an assertion in PW
            //expect(await page.locator("#terms").isChecked()).toBeFalsy();
            //for Blinking Texts or dynamic UI Elements
            await expect(documentLink).toHaveAttribute("class","blinkingText");
        })

test('@Web Child Window Handling', async ({browser})=>{
    const context= await browser.newContext();
    const page= await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click()
     ])
     var text =await newPage.locator(".red").textContent();
     console.log(text);

})