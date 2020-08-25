describe("Example", () => {
  const testString = "test-string";

  it("failing test", () => {
    const testString = "test-string";
    cy.wrap(testString).should("eql", "dd").customCommand();
  });

  it("will not work 1", async () => {
    let result = 0;
    cy.wrap(testString).should("eql", testString);
    cy.then(() => doSomeAsync()).then((val) => (result = val));
    const secondResult = await doSomeAsyncCalc(result);
    cy.wrap(secondResult).should("equal", 20);
  });

  it("will not work 2", async () => {
    let result = 0;
    cy.wrap(testString).should("eql", testString);
    cy.then(() => doSomeAsync()).then((val) => (result = val));
    const secondResult = await doSomeAsyncCalc(result);
    cy.wrap(secondResult).should("equal", 20);
  });

  // it("will not work 3", async () => {
  //   let result = 0;
  //   cy.wrap(testString).should("eql", testString);
  //   cy.then(() => doSomeAsync()).then((val) => (result = val));
  //   const secondResult = doSomeSyncCalc(result);
  //   cy.wrap(secondResult).should("equal", 20);
  // });
  function doSomeAsync(): Promise<number> {
    return new Promise((resolve) => setTimeout(() => resolve(10), 2000));
  }

  function doSomeAsyncCalc(value: number): Promise<number> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(value + 10), 2000)
    );
  }

  // function doSomeSyncCalc(value: number): number {
  //   return value + 10;
  // }
});
