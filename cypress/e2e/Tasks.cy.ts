describe("<Tasks />", () => {
  it("should logout correctly", () => {
    cy.intercept("POST", "/auth/logout", {
      statusCode: 204,
    }).as("logout");
    cy.intercept("GET", "/projects*", {
      statusCode: 200,
      fixture: "projects.json",
    });

    cy.visit("/tasks");
    cy.findByTestId("logout-button").click();
    cy.wait("@logout");
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });
});
