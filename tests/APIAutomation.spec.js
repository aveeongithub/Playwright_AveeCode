const {test, expect, request} = require('@playwright/test')
const {APiutils}=require('./Utils/APIUtils');
const loginPayload = {userEmail:"anything@test.com",userPassword:"Anything@1"} //saving payload as a javascript object
let token;

test.beforeAll( async ()=>{   
    const apiContext = await request.newContext();
    //calling classes to Utils
    //const apiUtils =  new APiutils(apiContext, loginPayload);
    //apiUtils.getToken();
    //Login API
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data:loginPayload
    }) //expecting 200, 201 -- @param @CodeRevision required
    expect((await loginResponse).ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json(); //will return the response in .json format
    token = loginResponseJson.token; //saving the EY token to parse it to skip login everytime
    console.log(token);
    });

test('Application Login for Order Completion', async ({page})=>
 {
    //Inserting token into Browser Local Storage through initialization JS script
        page.addInitScript(value =>{
            window.localStorage.setItem('token', value);
        }, token);
     
        await page.goto("https://rahulshettyacademy.com/client");
        // await page.locator("#userEmail").fill("anshika@gmail.com");
        // await page.locator("#userPassword").type("Iamking@000");
        // await page.locator("[value='Login']").click();
        // await page.waitForLoadState('networkidle');
        const email = "rahulshetty@gmail.com";
        const productName = 'zara coat 3';
        const products = page.locator(".card-body");
            const titles= await page.locator(".card-body b").allTextContents();
            console.log(titles);
            const count = await products.count();
                for(let i =0; i < count; ++i)
                {
                    if(await products.nth(i).locator("b").textContent() === productName)
                        {
                            //add to cart
                            await products.nth(i).locator("text= Add To Cart").click();
                            break;
                        }
    }
   
    await page.locator("[routerlink*='cart']").click();
    //await page.pause();
    
    await page.locator("div li").first().waitFor();
    const bool =await page.locator("h3:has-text('zara coat 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    
    await page.locator("[placeholder*='Country']").type("ind");

    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for(let i =0;i< optionsCount; ++i)
    {
        let text =  await dropdown.locator("button").nth(i).textContent();
        if(text === " India")
        {
           await dropdown.locator("button").nth(i).click();
           break;
        }
    }
   await expect(page.locator(".user__name [type='text']").first()).toHaveText("anything@test.com");
   await page.locator(".action__submit").click();
   
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
            console.log(orderId);
            await page.locator("button[routerlink*='myorders']").click();
            await page.locator("tbody").waitFor();
            const rows = await page.locator("tbody tr");
                for(let i =0; i<await rows.count(); ++i)
                {
                    const rowOrderId =await rows.nth(i).locator("th").textContent();
                    if (orderId.includes(rowOrderId))
                            {
                                await rows.nth(i).locator("button").first().click();
                                break;
                            }
                }
    const orderIdDetails =await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
 })