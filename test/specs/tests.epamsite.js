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
        const languageButton = await $('//li/*/div[@class="mobile-location-selector__button-section"]');
        await languageButton.click();

        const uaButton = await $('//li[@class="location-selector__item"]/a[@lang="uk"]');
        await uaButton.click(); 
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

    

it("Check that allow to switch location list by region", async () => {
    const expectedRegions = ['AMERICAS', 'EMEA', 'APAC'];
    const actualRegions = [];
    await $('div.section:nth-child(16)').scrollIntoView();
    await $$('.js-tabs-controls div > a').map(async el => actualRegions.push(await el.getText()));
    await expect(actualRegions).toEqual(expectedRegions);

    await $('div.js-tabs-controls div:nth-of-type(2) > a').click();
    await expect($('.owl-item > div[data-country="belarus"]')).toBeDisplayed();
    await $('.owl-item > div[data-country="belarus"]').scrollIntoView();
    await $('.owl-item > div[data-country="belarus"]').click();
    await $('.owl-item > div[data-country="belarus"]').isSelected();
})
      it("Check that allows to switch location list by region", async () => {
        
        
      
   
          const regionButton = await $('//a[text()="EMEA"]/parent::div');
          await regionButton.scrollIntoView();
          await regionButton.click();
          const locationList = await $("//div[@class='location-list__item']");
          await expect(locationList).toBeDisplayed();
        
      });


     it("Check  required fields", async () => {
        await browser.url("https://www.epam.com/about/who-we-are/contact");
        const requiredFields = await $("//label[contains(@for,'user_first_name')]/parent::div").getAttribute('data-required')
        
        await expect(requiredFields).toEqual('true')
        // const pageTitle = await browser.getTitle();
        // expect(pageTitle).toEqual('EPAM | Software Engineering & Product Development Services')
     })
     it("Check the search function", async () => {
       
        const searchButton = await $("//button[@class='header-search__button header__icon']")
        await searchButton.click()
        const searchField = await $("//input[@id='new_form_search']")
        await searchField.setValue("AI")
        const findButton = await $("//button[contains(@class,'custom-search-button')]")
        await findButton.click()
        await browser.pause(3000)

        const searchResultsCounter = await $("//h2[@class='search-results__counter']");
        await expect(searchResultsCounter).toBeDisplayed();
    
       
    })
    
    it("Check the logo redirect ro main page", async()=>{
        
        
        const logo = await $("//a[@class='header__logo-container desktop-logo']");
        logo.click();
        await browser.pause(1000)
        
        await expect(browser).toHaveUrl('https://www.epam.com/')
    }) 
    it("Check that allows to download report", async () => {
        await browser.url("https://www.epam.com/about");
        const fs = require("fs");
        const downloadButton = await $('a[href$=".pdf"]');
        await downloadButton.scrollIntoView();
        await downloadButton.click();
        const filePath = "/Users/arsen_luchka/Downloads/EPAM_Corporate_Overview_2023.pdf"; 
        const fileExists = await fs.existsSync(filePath);
        await expect(fileExists).toBe(true);
      });
       
})


