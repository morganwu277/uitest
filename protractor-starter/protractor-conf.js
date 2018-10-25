
const HtmlScreenshotReporter = require("protractor-jasmine2-screenshot-reporter");
const reporter = new HtmlScreenshotReporter({
  dest: "target/screenshots",
  filename: "my-report.html",
  reportOnlyFailedSpecs: false, // report all, including success and failure
  captureOnlyFailedSpecs: false, // capture only failed
  showSummary: true,
  showQuickLinks: true,
});

export const config = {
  framework: "jasmine2",
  // specs: ["spec/**/Homepage.spec.js"],
  specs: ["spec/**/Loginpage.spec.js"],
  directConnect: true,
  chromeDriver: "node_modules/.bin/chromedriver",
  // seleniumAddress: "http://192.168.34.1:4444/wd/hub",

  // capabilities: {
  //   browserName: "chrome",
  //   chromeOptions: {
  //     // http://peter.sh/experiments/chromium-command-line-switches/#test-type
  //     args: ["--test-type"],
  //     // https://github.com/angular/protractor/blob/master/docs/browser-setup.md#using-headless-chrome
  //     // args: ["--headless", "--disable-gpu", "--window-size=800x600"],
  //   },
  // },

  jasmineNodeOpts: {
    // remove ugly protractor dot reporter
    print: () => { },
  },

  // Setup the report before any tests start
  beforeLaunch() {
    return new Promise(((resolve) => {
      reporter.beforeLaunch(resolve);
    }));
  },

  onPrepare: () => {
    /**
     * If you are testing against a non-angular site - set ignoreSynchronization setting to true
     *
     * If true, Protractor will not attempt to synchronize with the page before
     * performing actions. This can be harmful because Protractor will not wait
     * until $timeouts and $http calls have been processed, which can cause
     * tests to become flaky. This should be used only when necessary, such as
     * when a page continuously polls an API using $timeout.
     *
     * @type {boolean}
     */
    browser.ignoreSynchronization = true;
  },

  // Close the report after all tests finish
  afterLaunch(exitCode) {
    return new Promise(function (resolve) {
      reporter.afterLaunch(resolve.bind(this, exitCode));
    });
  },

  // https://stackoverflow.com/questions/34377409/oncleanup-vs-oncomplete-vs-afterlaunch
  // will be executed once per capability after all tests have finished
  onCleanUp(exitCode) {
    console.log("cleanup....", exitCode);
  },

  // Spec patterns are relative to the location of the spec file. They may
  // include glob patterns.
  // suites: {
  //   creatix: "spec/creatix/*.spec.js",
  //   homepage: "spec/**/Homepage.spec.js",
  // },
};
