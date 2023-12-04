const {test, expect} = require('@playwright/test');

test.only('First Test Script without browser', async ({page}) => {
        //const context = await browser.newContext();
            //const page = await context.newPage();
            page.route('**/*.css',route=>route.abort()); //abort, continue, fulfill //network calls abort
            const userName = page.locator("#username");
            const signIn = page.locator("#signInBtn");
            const cardTitles = page.locator(".card-body a");
                await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
                    await page.locator("#username").type("rahulshetty");
                        await page.locator("[type='password']").type("learning");
                            await page.locator("#signInBtn").click();
                                console.log(await page.locator("[style*='block']").textContent()); //Avoiding wait until element is present, playwright will intelligently do it itself
                                    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
                                        //type and fill example
                                            await userName.fill(""); //fill clears existing texts
                                                await userName.fill("rahulshettyacademy");
                                                //race conditions
                                                await Promise.all(
                                                    [
                                                        page.waitForNavigation(),
                                                        signIn.click()
                                                    ]
                                                )
                                                    //await signIn.click();
                                                        //console.log(await page.locator(".card-body a").textContent()); //multiple elements present
                                                        console.log(await page.locator(".card-body a").nth(2).textContent());
                                                        console.log(await page.locator(".card-body a").first().textContent());
                                                        const allTitles = await cardTitles.allTextContents();
                                                        console.log(allTitles); //Returns a array

});

test('First Test Script', async ({page}) => {
    await page.goto("https://www.lloydsbank.com/");
        console.log (await page.title());
            //Asserting using page fixture
                await expect(page).toHaveTitle("Lloyds Bank - Personal Banking, Personal Finances & Bank Accounts");
});

