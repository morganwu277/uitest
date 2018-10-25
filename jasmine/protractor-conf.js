// https://www.npmjs.com/package/protractor-jasmine2-screenshot-reporter
const HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
const reporter = new HtmlScreenshotReporter({
  dest: 'target/screenshots',
  filename: 'my-report.html',
  reportOnlyFailedSpecs: false, // report all, including success and failure
  captureOnlyFailedSpecs: true, // capture only failed
  showSummary: true,
  showQuickLinks: true,
});

const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const jas_spec_reporter = new SpecReporter({  // add jasmine-spec-reporter
  spec: {
    displaySuccessful: true,
    displayPending: true,   // display each pending spec
    displayDuration: true,  // display each spec duration
  },
  summary: {
    displaySuccessful: false, // display summary of all successes after execution
    displayFailed: true,    // display summary of all failures after execution
    displayPending: false,   // display summary of all pending specs after execution
    displayDuration: true,
  }
});


// https://github.com/angular/protractor/blob/master/lib/config.ts
exports.config = {
  framework: 'jasmine',
  directConnect: true,
  chromeDriver: "node_modules/.bin/chromedriver",
  // specs: ['spec/seleniumEx/*.js'],
  specs: ['spec/spec.js'],
  maxSessions: 1,

  jasmineNodeOpts: {
    // 60s
    defaultTimeoutInterval: 60 * 1000,
    showColors: true, // Use colors in the command line report.
  },


  // Setup the report before any tests start
  beforeLaunch: function() {
    return new Promise(function(resolve) {
      reporter.beforeLaunch(resolve);
    });
  },

  // Assign the test reporter to each running instance,
  // If multiple capabilities are being run, this will run once per capability.
  onPrepare: function() {
    // non-angular app  
    browser.ignoreSynchronization = true;
    jasmine.getEnv().clearReporters();
    jasmine.getEnv().addReporter(reporter);
    jasmine.getEnv().addReporter(jas_spec_reporter);
  },

  // Close the report after all tests finish
  afterLaunch: function(exitCode) {
    return new Promise(function(resolve) {
      reporter.afterLaunch(resolve.bind(this, exitCode));
    });
  },
};
