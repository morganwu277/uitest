
# Install lib
# use node8
```bash
npm install --save selenium-webdriver
npm install --save jasmine
npm install --save jasmine-spec-reporter
npm install -g jasmine
# inside jasmine folder, don't needs to do this, since I already did
jasmine init 

```
# Jasmine part
1. download chrome driver and put under your path
```bash
# https://github.com/angular/webdriver-manager 
npm install -g webdriver-manager

webdriver-manager update -d geckodriver=0.23.0
webdriver-manager update

```
2. 


Note: Run Jasmine
`jasmine`

3. install protractor
```bash
npm install -g protractor # install webdriver-manager and protractor
npm install --save protractor
npm install --save protractor-jasmine2-screenshot-reporter # html and screen reporter
```

## for MacOSX safari support 
```bash
# execute once only
# https://developer.apple.com/documentation/webkit/testing_with_webdriver_in_safari
safaridriver --enable
```

# vagrant vbox operations
```bash
vagrant package --base <VBoxName> --output <saveFileName>
vagrant box add --name lc/edge edge_win10.vbox
```

