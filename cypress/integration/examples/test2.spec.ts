describe("Example", () => {
  const testString = "test-string";

  it("all cy execution plan", async () => {
    cy.wrap(testString).should("eql", testString);
    cy.then(() => doSomeAsync())
      .then((val) => doSomeAsyncCalc(val))
      .should("equal", 20);
  });

  it("two cy blocks - one as cy wrapper for standard async, second with standard cy commands", async () => {
    let thirdResult = 0;
    cy.wrap(testString).should("eql", testString);
    cy.then(async () => {
      const result = await doSomeAsync();
      const secondResult = await doSomeAsyncCalc(result);
      thirdResult = doSomeSyncCalc(secondResult);
    });

    cy.wrap(thirdResult).should("equal", 30);
  });

  it("everything async in one block", async () => {
    const result = await doSomeAsync();
    const secondResult = await doSomeAsyncCalc(result);
    const thirdResult = doSomeSyncCalc(secondResult);
    expect(thirdResult).to.eql(30);
  });

  function doSomeAsync(): Promise<number> {
    return new Promise((resolve) => setTimeout(() => resolve(10), 2000));
  }

  function doSomeAsyncCalc(value: number): Promise<number> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(value + 10), 2000)
    );
  }

  function doSomeSyncCalc(value: number): number {
    return value + 10;
  }
});
