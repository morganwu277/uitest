exports.titleWithBrowser = function(name, browser) {
	return name +', testing in browser: ' + browser.getProcessedConfig().value_.capabilities.browserName;
}