// import Dropdown from "../src/dropdown"
// import { TestUtils } from "./test-utils.js"

describe("Text Component", () => {
  describe("open()", () => {
    it("changes the opened property", () => {
      const component = new Dropdown()
      component.open()
      expect(component.opened).toBeTrue()
    })
  })
})
