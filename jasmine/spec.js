var utils = require('./utils');
var webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;

var driver = browser.driver;



var isPresent = function(browser) {
  return browser.findElement(by.xpath('//*[@id="app"]/div/div[2]/div/div[2]/div/div/div/button/div'));
}


describe(utils.titleWithBrowser('Protractor Demo App', browser), function() {
  

  beforeEach(function() {


    browser.get('https://leetcode.com/accounts/login/');
    browser.wait(until.elementLocated(By.name('login'))).then(name => {
      console.log(name)
    });

    // driver.wait(() => until.elementLocated(By.name('password')));
    // driver.wait(() => until.elementLocated(By.xpath('//*[@id="app"]/div/div[2]/div/div[2]/div/div/div/button/div')));

    // var name = driver.findElement(By.name('login'));
    // var pwd =  driver.findElement(By.name('password'));
    // var loginBtn =  driver.findElement(By.xpath('//*[@id="app"]/div/div[2]/div/div[2]/div/div/div/button/div'));


    // name.sendKeys('xue777hua@163.com');
    // pwd.sendKeys('^yhn7ujm8ik,');
    // loginBtn.click();

  });


  it('title should be ', function() {
    console.log(browser.getTitle());
  });

});