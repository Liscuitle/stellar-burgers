import {baseUrl} from "../../../src/services/configs/app-config";

describe("Main page",  () => {
    beforeEach("Setting viewport and loading ingredient", () => {
        cy.viewport(1920, 1280);
        cy.intercept("GET", `${baseUrl}/ingredients`, {fixture: "ingredients.json"});
        cy.intercept("POST", `${baseUrl}/auth/login`, {fixture: "login.json"});
        cy.intercept("POST", `${baseUrl}/orders`, {fixture: "create-order.json"});
        cy.visit("/");
    });

    it("Should be available on localhost:3000", () => {
        cy.contains("Соберите бургер");
    })
   
});
