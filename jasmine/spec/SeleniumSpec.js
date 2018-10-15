var selenium = require('selenium-webdriver'),
    By = selenium.By,
    until = selenium.until;

var snapshot_on_error = function(error, driver, done) {
    driver.takeScreenshot().then(function(data) {
        var fs = require('fs');
        var base64Data = data.replace(/^data:image\/png;base64,/, "")
        fs.writeFile("out.png", base64Data, 'base64', function(err) {
            if (err) console.log(err);
            done()
        });
        done()
    });
}
describe('Selenium Tutorial', function() {

    // Open the TECH.insight website in the browser before each test is run
    beforeEach(function(done) {
        this.driver = new selenium.Builder()
            .forBrowser('chrome')
            // .forBrowser('firefox')
            // .usingServer('http://67.188.225.131:4444/wd/hub')
            .build();

        // console.log('created a chrome instance')
        this.driver.get('http://www.techinsight.io/').then(done);
    });

    // Close the website after each test is run (so that it is opened fresh each time)
    afterEach(function(done) {
        this.driver.quit().then(done);
    });

    // Test to ensure we are on the home page by checking the <body> tag id attribute
    // it('Should be on the home page', function(done) {
    //     var element = this.driver.findElement(selenium.By.tagName('body'));

    //     element.getAttribute('id').then(function(id) {
    //         expect(id).toBe('home');
    //         done();
    //     });
    // });

    // Test the navigation bar by clicking on the 'REVIEW' link and checking the URL changes to '/review'
    it('Has a working nav', function(done) {

        this.driver.findElement(selenium.By.linkText("REVIEW")).click().then(() => {
            this.driver.getCurrentUrl().then((value) => {
                    expect(value).equalOrScreenshot('review1').then((res) => {
                        console.log('err:' + res);
                    });
                    done();
                })
                .catch((err) => {
                    console.log('res:' + err);
                })
            // .catch((error) => {
            //     console.log(error)
            //     snapshot_on_error(error, this.driver, done)
            // });            
        });

    });
});