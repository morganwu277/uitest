var utils = require('./utils');
var webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;

var driver = browser.driver;


describe(utils.titleWithBrowser('Leetcode Login', browser), function() {
  beforeEach(function() {

    browser.get('https://leetcode.com/accounts/login/');

    // should use browser wait API, maybe better
    browser.driver.sleep(3000);
    // var name = driver.findElement(By.name('login'));
    // var pwd =  driver.findElement(By.name('password'));
    // var loginBtn =  driver.findElement(By.xpath('//*[@id="app"]/div/div[2]/div/div[2]/div/div/div/button/div'));

    // name.sendKeys('');
    // pwd.sendKeys('');
    // loginBtn.click();

  });


  it('title should be ', function() {
    expect(browser.getTitle()).toBe("Account Login - LeetCode");
  });


});