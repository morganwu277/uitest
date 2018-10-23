// noinspection JSUnusedGlobalSymbols
import { SpecReporter } from "jasmine-spec-reporter";

const HtmlScreenshotReporter = require("protractor-jasmine2-screenshot-reporter");

const reporter = new HtmlScreenshotReporter({
  dest: "target/screenshots",
  filename: "my-report.html",
  reportOnlyFailedSpecs: false, // report all, including success and failure
  captureOnlyFailedSpecs: true, // capture only failed
  showSummary: true,
  showQuickLinks: true,
});

const request = require("request");


export const config = {
  framework: "jasmine2",
  specs: ["spec/**/Homepage.spec.js"],
  // specs: ["spec/**/LoginPage.spec.js"],
  // directConnect: true,
  // chromeDriver: "node_modules/.bin/chromedriver",
  seleniumAddress: "http://192.168.34.1:4444/wd/hub",
  maxSessions: 1,
  multiCapabilities: [{
  //   browserName: 'firefox',
  //   customer_key: 'customer_value',
  // }, {
  //   browserName: 'chrome'
  // }, {
    browserName: "internet explorer",
  // }, {
    // browserName: 'safari'
  }],

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
    browser.getProcessedConfig().then(_config => {
      // config.capabilities is the CURRENT capability being run, if
      // you are using multiCapabilities.
      console.log("Executing capability", _config.capabilities);
      // issue a remote start for VM
      // do while - check the VM start returns good ...
      const browserName = _config.capabilities.browserName;
      return request(`http://192.168.34.1:4444/grid/admin/MyConsoleServlet/vm?browserName=${browserName}&command=start`, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        console.log(body.url);
        console.log(body.explanation);
        console.log(res);
        const browserUp = false;
        while (!browserUp) {
          request(`http://192.168.34.1:4444/grid/admin/MyConsoleServlet/healthz?browserName=${browserName}`, { json: true }, (err, res, body) => {
            console.log(body.url);
            console.log(body.explanation);
            console.log(res);
          });
        }
      });
    });

    jasmine.getEnv().addReporter(new SpecReporter({
      // Defaults: https://github.com/bcaudan/jasmine-spec-reporter#default-options
      // Configuration: https://github.com/bcaudan/jasmine-spec-reporter/blob/master/src/configuration.ts
      suite: {
        displayNumber: true, // display each suite number (hierarchical)
      },
      spec: {
        displaySuccessful: true,
        displayPending: true, // display each pending spec
        displayDuration: true, // display each spec duration
      },
      summary: {
        displaySuccessful: false, // display summary of all successes after execution
        displayFailed: true, // display summary of all failures after execution
        displayPending: false, // display summary of all pending specs after execution
        displayDuration: true,
      },
    }));
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

    return browser.getProcessedConfig().then(_config => {
      // config.capabilities is the CURRENT capability being run, if
      // you are using multiCapabilities.
      console.log("Executing capability", _config.capabilities);
      // issue a remote start for VM
      // do while - check the VM start returns good ...
      const browserName = _config.capabilities.browserName;
      request(`http://192.168.34.1:4444/grid/admin/MyConsoleServlet/vm?browserName=${browserName}&command=stop`, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        console.log(body.url);
        console.log(body.explanation);
        console.log(res);
      });
    });
  },

  // Spec patterns are relative to the location of the spec file. They may
  // include glob patterns.
  suites: {
    creatix: "spec/creatix/*.spec.js",
    homepage: "spec/**/Homepage.spec.js",
  },
};
