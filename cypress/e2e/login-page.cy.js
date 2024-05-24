// Écoute de l'événement au niveau global
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;  // Désactive la gestion automatique des erreurs non capturées
});

describe('Login Page', () => {
    beforeEach(() => {
        cy.visit('https://cgi-demo-test.000webhostapp.com/CGI-De');
    });

    it("Login using empty email", () => {
        cy.get("input[placeholder='Email']").clear();
        cy.get("input[placeholder='Password']").type('somepassword');
        cy.submitLoginForm();
        cy.get("label[for='login[email]']").should('have.text', 'Email required!');
    });

    it("Login using empty password", () => {
        cy.get("input[placeholder='Email']").type('email@example.com');
        cy.get("input[placeholder='Password']").clear();
        cy.submitLoginForm();
        cy.get("label[for='login[password]']").should('have.text', 'Password is required!');
    });

    ['client', 'developer', 'admin'].forEach((role) => {
        it(`Login using wrong Email for ${role}`, function() {
            cy.loginByRole(role);
            cy.get("input[placeholder='Email']").clear().type('wrongEmail@localhost.com');
            cy.submitLoginForm();
            cy.get("#userAlertContainer").should('have.text', 'Error: No match for Email and/or Password');
        });

        it(`Login using wrong password for ${role}`, function() {
            cy.loginByRole(role);
            cy.get("input[placeholder='Password']").clear().type('wrongPassword');
            cy.submitLoginForm();
            cy.get("#userAlertContainer").should('have.text', 'Error: No match for Email and/or Password');
        });

        it(`Login using correct data for ${role}`, function() {
            cy.loginByRole(role);
            cy.submitLoginForm();
            //cy.url().should('include', '/dashboard');
        });
    });
});
