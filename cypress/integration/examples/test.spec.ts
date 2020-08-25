describe("Example", () => {
  it("test", () => {
    const testString = "test-string";

    cy.wrap(testString).should("equal", testString).customCommand();
  });
});
