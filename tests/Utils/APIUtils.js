 class APIUtils
 {
    constructor(apiContext)
    {
        this.apiContext = apiContext; //instance creation for entire class reach
    }
    async getToken()
    {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:loginPayload
        }) //expecting 200, 201 -- @param @CodeRevision required
        expect((await loginResponse).ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json(); //will return the response in .json format
        token = loginResponseJson.token; //saving the EY token to parse it to skip login everytime
        console.log(token);
        return token;
    }
 }
 module.exports = {APIUtils};