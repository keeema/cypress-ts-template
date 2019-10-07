function describeForCustomSuperDomain(
  title: string,
  fn: (this: Mocha.Suite) => void
): Mocha.Suite {
  return describe(title, function(this: Mocha.Suite) {
    it("Prepare for custom Super Domain", () => {
      cy.log(
        `*Pre-case to deal with url different from ${Cypress.config(
          "baseUrl"
        )}*`
      );

      cy.visit("http://super-domain-workaround.about-gitlab-com.nip.io");

      cy.location().then(url =>
        expect(
          url.host.substr(0, url.host.indexOf(".")),
          `expect ${url.host} to contains "super-domain-workaround")`
        ).to.equal("super-domain-workaround")
      );
    });

    fn.call(this);
  });
}

describeForCustomSuperDomain("AppPart", () => {
  describe("Test", () => {
    let testNumber = 0;
    let counter = 0;

    beforeEach(() => {
      cy.then(() => (testNumber = Math.floor(Math.random() * 1000000))).then(
        () => {
          cy.writeFile(`test/${testNumber}`, "test");
          cy.visit(`http://${testNumber}.bobrilstrap-com.nip.io/`);
        }
      );
    });

    it("test1", () => {
      cy.wrap(++counter).should("equal", 1);

      cy.get("h1")
        .should($el => expect($el.text().indexOf("nginx") >= 0).to.be.true)
        .location()
        .should(url =>
          expect(
            parseInt(url.host.substr(0, url.host.indexOf(".") + 1)),
            `expect ${url.host} to containt ${testNumber}`
          ).to.equal(testNumber)
        );
    });

    it("test2", () => {
      cy.wrap(++counter).should("equal", 2);

      cy.get("h1")
        .should($el => expect($el.text().indexOf("nginx") >= 0).to.be.true)
        .location()
        .should(url =>
          expect(
            parseInt(url.host.substr(0, url.host.indexOf(".") + 1)),
            `expect ${url.host} to containt ${testNumber}`
          ).to.equal(testNumber)
        );
    });
  });
});
