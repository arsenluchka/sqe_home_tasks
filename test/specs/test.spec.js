describe("test suite of Epam site", ()=>{
    beforeEach(async()=>{
        await browser.url("https://www.epam.com");
    })
    it("Check title", async () => {
        await expect(browser).toHaveTitle('EPAM | Software Engineering & Product Development Services')
    })

    it("Check the ability to switch Light / Dark mode",async()=>{
        await $('header > div > div > section >div').click()
        await expect($('.light-mode')).toBeDisplayed()
    })
   
    it("Check language us to ua", async()=>{
        const languageButton = await $('//*[@id="wrapper"]/div[2]/div[1]/header/div/div/ul/li[2]/div/div/button');
        languageButton.click();
        await browser.pause(1000)

        const uaButton = await $('//*[@id="wrapper"]/div[2]/div[1]/header/div/div/ul/li[2]/div/nav/ul/li[6]/a');
        uaButton.click();
        await browser.pause(1000)
        
        await expect(browser).toHaveUrl('https://careers.epam.ua/')
    })
 
    it("Check policy information", async () => {
        const expectedArray = ['INVESTORS',  'OPEN SOURCE', 'COOKIE POLICY', 'PRIVACY POLICY', 'WEB ACCESSIBILITY','APPLICANT PRIVACY NOTICE'];
        const actualArray = [];
        await $('div.policies').scrollIntoView();
        await $$('div.policies > div ul > li').map(async (el) => {
          actualArray.push(await el.getText());
        });
        await expect(actualArray).toEqual(expectedArray);
      });
    it("Check  required fields", async () => {
        await browser.url("https://www.epam.com/about/who-we-are/contact");
        const requiredFields = await $("//label[contains(@for,'user_first_name')]/parent::div").getAttribute('data-required')
        
        await expect(requiredFields).toEqual('true')
        // const pageTitle = await browser.getTitle();
        // expect(pageTitle).toEqual('EPAM | Software Engineering & Product Development Services')
    })
    
    it("Check the logo redirect ro main page", async()=>{
        
        
        const logo = await $("//a[@class='header__logo-container desktop-logo']");
        logo.click();
        await browser.pause(1000)
        
        await expect(browser).toHaveUrl('https://www.epam.com/')
    }) 
    it("Check that allows to download report ", async()=>{

     
        await browser.url("https://www.epam.com/about");
        const fs = require('fs');
        const downloadButton = await $('a[href$=".pdf"]')
        browser.pause(3000)
        await downloadButton.scrollIntoView()
        await browser.pause(3000)
        await downloadButton.click()
        await browser.pause(10000)

        const filePath = await'./EPAM_Corporate_Overview_Q3_october.pdf';
        const fileExists =await fs.existsSync(filePath);
        await expect(fileExists).toBe(true);

    })
       
})


