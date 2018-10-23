import Loginpage from "./pages/Loginpage";

const loginPage = new Loginpage();

describe("loginPage", () => {
  describe("when on loginPage", () => {
    beforeAll(() => {
      loginPage.get();
    });

    it("then page should be displayed", () => {
      expect(loginPage.isDisplayed()).toBe(true);
    });
  });
});
