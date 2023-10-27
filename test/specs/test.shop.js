describe("test suite of shop site", ()=>{
    beforeEach(async()=>{
        await browser.url("https://demowebshop.tricentis.com/");
    })
    it("Verify that allows register a User", async () => {
        
        await $("//a[@class='ico-register']").click();

        await $("//input[@id='gender-male']").click();
        await $("//input[@class='text-box single-line'][@id='FirstName']").setValue("John");
        await $("//input[@class='text-box single-line'][@id='LastName']").setValue("Smith");
        await $("//input[@class='text-box single-line'][@id='Email']").setValue("JohnSmith22@mail.com");
 
        await $("//input[@id='Password']").setValue("111111");
        await $("//input[@id='ConfirmPassword']").setValue("111111");

        await $("//input[@id='register-button']").click();

      //  await expect($("//div[@class='result']")).toHaveText('Your registration completed')
        
        
    })
    it("Verify that allows login a User", async () => {
  
        await $("//a[@class='ico-login']").click();
        await $("//input[@class='email']").setValue("JohnSmith22@mail.com");
        await $("//input[@class='password']").setValue("111111");
        await $("//input[@class='button-1 login-button']").click();
      
        await expect($("//a[@class='ico-logout']")).toBeDisplayed();


    })
    it("Verify that ‘Computers’ group has 3 sub-groups with correct names", async () => {
  
        const computer = await $("//ul[@class='top-menu']/child::li[2]/child::a");
        
        await expect(computer).toHaveText('COMPUTERS');
        computer.moveTo()
        const group1 = await $("//ul[@class='top-menu']/li[2]/ul/li[1]/child::a")
        const group2 = await $("//ul[@class='top-menu']/li[2]/ul/li[2]/child::a")
        const group3 = await $("//ul[@class='top-menu']/li[2]/ul/li[3]/child::a")
        await expect(group1).toHaveText('Desktops');
        await expect(group2).toHaveText('Notebooks');
        await expect(group3).toHaveText('Accessories');

    })

     it("Verify that allows adding an item to the Wishlistr", async () => {
  
        await $("/html/body/div[4]/div[1]/div[2]/ul[1]/li[4]/a").click();
        await $("//h2/a[@href='/50s-rockabilly-polka-dot-top-jr-plus-size']").click();
        await $("//input[@value='Add to wishlist']").click();
        await $("//a[@class='ico-wishlist'][1]").click();
      
        await expect($("//div[@class='wishlist-content']")).toBeDisplayed();


    })


})