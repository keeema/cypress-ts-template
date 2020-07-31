describe("Example", () => {
  it("test", () => {
    const testString = "test-string";

    cy.wrap(testString).should("exist", testString).customCommand();
  });

  let testValue = false;
  it("should work", () => {
    cy.get("div", { timeout: 5000 }).should(() => expect(testValue).to.be.true);
  });
});
