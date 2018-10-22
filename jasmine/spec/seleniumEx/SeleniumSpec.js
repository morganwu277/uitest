var selenium = require('selenium-webdriver'),
    By = selenium.By,
    until = selenium.until;
var screenshotDirPrefix = './screenshots/';
var driverTakeScreenshot = function(driver, screenshotName) {
    var fileName = screenshotDirPrefix + screenshotName;
    console.log('Error happened, creating a screenshot with name: ' + fileName);
    driver.takeScreenshot().then(function(data) {
        var fs = require('fs');
        if (!fs.existsSync(screenshotDirPrefix)) {
            fs.mkdirSync(screenshotDirPrefix);
        }
        var base64Data = data.replace(/^data:image\/png;base64,/, "")
        fs.writeFile(fileName, base64Data, 'base64', function(err) {
            if (err) console.log(err);
        });
    });
}

var equalsOrScreenshot = function(expected, driver, screenshotName) {
    return {
        asymmetricMatch: function(actual) {
            var passed = actual === expected;
            if (!passed) {
                driverTakeScreenshot(driver, screenshotName)
            }
            return passed;
        },
        jasmineToString: function() {
            return expected;
        }
    }
}

var containsOrScreenshot = function(expected, driver, screenshotName) {
    return {
        asymmetricMatch: function(actual) {
            var passed = actual === expected;
            if (!passed) {
                driverTakeScreenshot(driver, screenshotName)
            }
            return passed;
        },
        jasmineToString: function() {
            return expected;
        }
    }
}

describe('Selenium Tutorial', function() {
    // Open the TECH.insight website in the browser before each test is run
    beforeEach(function(done) {
        this.driver = new selenium.Builder()
            // .forBrowser('chrome')
            // .forBrowser('firefox')
            .forBrowser('internet explorer')
            // .forBrowser('MicrosoftEdge')
            // .forBrowser('safari')
            .usingServer('http://67.188.225.131:4444/wd/hub')
            .build();
        // console.log('created a chrome instance')
        global_driver = this.driver;
        this.driver.get('http://www.techinsight.io/').then(done);
    });

    // Close the website after each test is run (so that it is opened fresh each time)
    afterEach(function(done) {
        this.driver.quit().then(done);
    });

    // Test to ensure we are on the home page by checking the <body> tag id attribute
    it('Should be on the home page', function(done) {
        var element = this.driver.findElement(selenium.By.tagName('body'));
        var _driver = this.driver;

        element.getAttribute('id').then(function(id) {
            expect(id).toEqual(equalsOrScreenshot('home', _driver, 'home.png'));
            done();
        });
    });

    // Test the navigation bar by clicking on the 'REVIEW' link and checking the URL changes to '/review'
    it('Has a working nav', function(done) {
        this.driver.findElement(selenium.By.linkText("REVIEW")).click().then(() => {
            var _driver = this.driver;
            this.driver.getCurrentUrl().then((value) => {
                    expect(value).toEqual(equalsOrScreenshot('http://www.techinsight.io/review/', _driver, 'review.png'));
                    done();
                })
                .catch((err) => {
                    console.log('res:' + err);
                });
        });

    });
});