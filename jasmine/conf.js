
// https://www.npmjs.com/package/protractor-jasmine2-screenshot-reporter
var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
var reporter = new HtmlScreenshotReporter({
  dest: 'target/screenshots',
  filename: 'my-report.html',
  reportOnlyFailedSpecs: false, // report all, including success and failure
  captureOnlyFailedSpecs: true, // capture only failed
  showSummary: true,
  showQuickLinks: true,
});

// https://github.com/angular/protractor/blob/master/lib/config.ts
exports.config = {
  framework: 'jasmine',
  // seleniumAddress: 'http://67.188.225.131:4444/wd/hub',
  // seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
  seleniumAddress: 'http://192.168.34.1:4444/wd/hub',
  // specs: ['spec/seleniumEx/*.js'],
  specs: ['spec.js'],
  maxSessions: 1,
// 所以还需要写针对制定的浏览器的指定的操作系统的版本，决定是否要启动虚拟机
// chorme
// firefox
// safari，旧版本的话，需要启动VirtualBox
// ie11，需要启动VirtualBox
// edge，需要启动VirtualBox
// 指定某些浏览器 启动 某些浏览器不启动 
  // multiCapabilities: [{
  //   browserName: 'firefox'
  // }, {
  //   browserName: 'chrome'
  // }, {
  //   browserName: 'internet explorer'
  // }],
  multiCapabilities: [{
    browserName: 'firefox',
    customer_key: 'customer_value',
  },{
    browserName: 'chrome'
  },{
    browserName: 'internet explorer'
  }],
  jasmineNodeOpts: {
    // 60s
    defaultTimeoutInterval: 60 * 1000,
    showColors: true, // Use colors in the command line report.
  },



  // Setup the report before any tests start
  beforeLaunch: function() {
    return new Promise(function(resolve){
      reporter.beforeLaunch(resolve);
    });
  },

  // Assign the test reporter to each running instance,
  // If multiple capabilities are being run, this will run once per capability.
  onPrepare: function() {
    jasmine.getEnv().addReporter(reporter);
    return browser.getProcessedConfig().then(function(config) {
      // config.capabilities is the CURRENT capability being run, if
      // you are using multiCapabilities.
      console.log('Executing capability', config.capabilities);
      // issue a remote start for VM
      // do while - check the VM start returns good ...

    });

  },

  // Close the report after all tests finish
  afterLaunch: function(exitCode) {
    return new Promise(function(resolve){
      reporter.afterLaunch(resolve.bind(this, exitCode));
    });
  },

  // 
  onCleanUp: function(exitCode) {
    console.log('cleanup....', exitCode);
  },

};
