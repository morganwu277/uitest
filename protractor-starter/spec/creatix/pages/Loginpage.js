// import Common from "./Common";
import Page from "../../utils/Page";

export default class Loginpage extends Page {
  selector = $("form+button");

  get = () => {
    /**
     * Browser window will maximize width and height
     */
    browser
      .manage()
      .window()
      .maximize();

    browser.baseUrl = "https://leetcode.com";
    browser.get("/accounts/login/");
    this.waitUntilDisplayed();
  };

  // getCommon = () => new Common();
}
