let numberForEmail = Math.floor((Math.random() * 10000) + 1);
let emailPerson = `JohnSmith${numberForEmail}@mail.com`

describe("test suite of shop site", () => {
    beforeEach(async () => {
        await browser.url("https://demowebshop.tricentis.com/");
    })
    it("Verify that allows register a User", async () => {


        await $("//a[@class='ico-register']").click();

        await $("//input[@id='gender-male']").click();
        await $("//input[@class='text-box single-line'][@id='FirstName']").setValue("John");
        await $("//input[@class='text-box single-line'][@id='LastName']").setValue("Smith");
        await $("//input[@class='text-box single-line'][@id='Email']").setValue(emailPerson);

        await $("//input[@id='Password']").setValue("111111");
        await $("//input[@id='ConfirmPassword']").setValue("111111");

        await $("//input[@id='register-button']").click();

        await expect($("//div[@class='result']")).toHaveText('Your registration completed')

        await $("//a[@class='ico-logout']").click()


    })
    it("Verify that allows login a User", async () => {

        await $("//a[@class='ico-login']").click();
        await $("//input[@class='email']").setValue(emailPerson);
        await $("//input[@class='password']").setValue("111111");
        await $("//input[@class='button-1 login-button']").click();

        await expect($("//a[@class='ico-logout']")).toBeDisplayed();


    })
    it("Verify that 'Computers' group has 3 sub-groups with correct names", async () => {

        const computer = await $("//ul[@class='top-menu']/li/a[contains(text(),'Computers')]");

        await expect(computer).toHaveText('COMPUTERS');
        computer.moveTo()
        const group1 = await $("//ul[@class='top-menu']/li/ul/li/child::a[contains(text(),'Desktops')]")
        const group2 = await $("//ul[@class='top-menu']/li/ul/li/child::a[contains(text(),'Notebooks')]")
        const group3 = await $("//ul[@class='top-menu']/li/ul/li/child::a[contains(text(),'Accessories')]")
        await expect(group1).toHaveText('Desktops');
        await expect(group2).toHaveText('Notebooks');
        await expect(group3).toHaveText('Accessories');

    })

    it("Verify that allows sorting items 'Name: A to Z'", async () => {

        const currArray = [];
        const bookButton = await $("//ul[@class='top-menu']/li/a[contains(text(),'Books')]");
        await bookButton.click(); // click and Selected Books category

        const productGrid = await $$("div.product-grid > div > div > div.details > h2 >a");
        for (let i = 0; i < productGrid.length; i++) {
            currArray.push(await productGrid[i].getText());
        } // adding values to currArray
        const sortedArray = currArray.sort()//sorting currArr from A to Z

        const sortedSiteArray = [];
        const sortDropdown = await $("#products-orderby");
        await sortDropdown.selectByVisibleText("Name: A to Z"); // select sorting from m A to Z on site 
        const productGridSorted = await $$("div.product-grid > div > div > div.details > h2 >a");
        for (let i = 0; i < productGridSorted.length; i++) {
            sortedSiteArray.push(await productGridSorted[i].getText());
        } // adding sortered values from site to final arr

        expect(sortedArray).toEqual(sortedSiteArray);
    });
    it("Verify that allows sorting items 'Name: Z to A'", async () => {

        const currArray = [];
        const bookButton = await $("//ul[@class='top-menu']/li/a[contains(text(),'Books')]");
        await bookButton.click(); // click and Selected Books category

        const productGrid = await $$("div.product-grid > div > div > div.details > h2 >a");
        for (let i = 0; i < productGrid.length; i++) {
            currArray.push(await productGrid[i].getText());
        } // adding values to currArray
        const sortedArray = currArray.sort().reverse() //sorting currArr from Z to A

        const sortedSiteArray = [];
        const sortDropdown = await $("#products-orderby");
        await sortDropdown.selectByVisibleText("Name: Z to A"); // select sorting from Z to A on site 
        const productGridSorted = await $$("div.product-grid > div > div > div.details > h2 >a");
        for (let i = 0; i < productGridSorted.length; i++) {
            sortedSiteArray.push(await productGridSorted[i].getText());
        } // adding sortered values from site to final arr

        expect(sortedArray).toEqual(sortedSiteArray);

    });

    it("Verify that allows changing number of items 4 on page'", async () => {
        const currArray = [];
        const ApparelButton = await $("//ul[@class='top-menu']/li/a[contains(text(),'Apparel & Shoes')]");
        await ApparelButton.click(); // click and Selected Apparel & Shoes category

        const selectedOptions = await $("#products-pagesize")

        await selectedOptions.selectByVisibleText('4');
        let numberElPage = await $('//select[@id="products-pagesize"]/option[@selected]')
        const getValueFromOptions = await numberElPage.getText()
        let num = await Number(getValueFromOptions)

        const productGrid = await $$("div.product-grid > div > div > div.details > h2 >a");
        for (let i = 0; i < productGrid.length; i++) {
            currArray.push(await productGrid[i].getText());
        } // adding values to currArray
        const lengthOfArray = await productGrid.length //get arr length
        let resolt;
        await lengthOfArray <= num ? resolt = true : resolt = false
        expect(resolt).toEqual(true);
    });

    it("Verify that allows changing number of items 8 on page'", async () => {
        const currArray = [];
        const ApparelButton = await $("//ul[@class='top-menu']/li/a[contains(text(),'Apparel & Shoes')]");
        await ApparelButton.click(); // click and Selected Apparel & Shoes category

        const selectedOptions = await $("#products-pagesize")

        await selectedOptions.selectByVisibleText('8');
        let numberElPage = await $('//select[@id="products-pagesize"]/option[@selected]')
        const getValueFromOptions = await numberElPage.getText()
        let num = await Number(getValueFromOptions)

        const productGrid = await $$("div.product-grid > div > div > div.details > h2 >a");
        for (let i = 0; i < productGrid.length; i++) {
            currArray.push(await productGrid[i].getText());
        } // adding values to currArray
        const lengthOfArray = await productGrid.length //get arr length
        let resolt;
        await lengthOfArray <= num ? resolt = true : resolt = false
        expect(resolt).toEqual(true);
    });


    it("Verify that allows adding an item to the Wishlistr", async () => {

        await $("//ul[@class='top-menu']/li/a[contains(text(),'Apparel & Shoes')]").click();
        await $("//h2/a[@href='/50s-rockabilly-polka-dot-top-jr-plus-size']").click();
        await $("//input[@value='Add to wishlist']").click();
        await $("//a[@class='ico-wishlist'][1]").click();

        await expect($("//div[@class='wishlist-content']")).toBeDisplayed();


    })
    it("Verify that allows adding an item to the card", async () => {

        const apparelButton = await $("//ul[@class='top-menu']/li/a[contains(text(),'Apparel & Shoes')]");
        apparelButton.click()
        await $('//input[@type="button"][@value="Add to cart"][1]').click() // "Add to cart" button in product grid
        await $('//div[@class="add-to-cart-panel"]/input[@value="Add to cart"]').click() //"Add to cart" button in product page
        await browser.pause(3000)

        await expect($("//p[@class='content']")).toBeDisplayed(); // check if success element is displayed
        await expect($("//p[@class='content']")).toHaveTextContaining('The product has been added to your ');// check if success element has correct text


    })

    it("Verify that allows removing an item from the card", async () => {

        const shopingCartButton = await $("//span[text()='Shopping cart']");
        shopingCartButton.click()
        const orderForm = await $('div.order-summary-content>form')


        await $("//input[@type='checkbox' and @name='removefromcart'][1]").click() // click on checkbox
        await $('//input[@name="updatecart"]').click() //clcik on Update shoping cart
        await browser.pause(3000)

        await expect($("input[name='removefromcart'][value='3645629")).not.toBeDisplayed(); // check if success element is displayed



    })
    it("should allows checkout an item ", async () => {
        const ApparelTab = await $("ul.top-menu > li:nth-of-type(4) > a");
        await ApparelTab.click()
        await $('input[value="Add to cart"]').click();
        await $('#add-to-cart-button-5').click()
        await $("a.ico-cart").click();
        await $(".totals").scrollIntoView();
        await $("input#termsofservice").click();
        await $('#checkout').click()
        await expect($('.page-title')).toBeDisplayed();
    })


})