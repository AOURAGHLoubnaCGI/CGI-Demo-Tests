// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("loginByRole", (role) => {
    cy.fixture('users').then((users) => {
        const user = users[role];
        cy.visit('https://cgi-demo-test.000webhostapp.com/CGI-Demo/');
        cy.get("input[placeholder='Email']").type(user.email);
        cy.get("input[placeholder='Password']").type(user.password);
    });
});

// Cypress.Commands.add('loginWithSession', function () {
//     cy.session('userSession', () => {
//         cy.visit('/login'); // Modify with your login URL
//         cy.get('input[name="username"]').type('administrator@localhost.com');
//         cy.get('input[name="password"]').type('administrator');
//         //cy.get('form').submit();
//         //cy.url().should('include', '/dashboard'); // Adjust based on your app's URL
//     });
// });

Cypress.Commands.add('submitLoginForm', () => {
    cy.get("button[type='submit']").click();
});

Cypress.Commands.add('navigateToProjects', () => {
    cy.loginByRole('admin');
    cy.submitLoginForm();
    cy.get("a[href='/CGI-Demo/index.php/login/logoff'] > i.fa.fa-sitemap").click();
});

Cypress.Commands.add('fillDateFields', () => {
    const fields = ['#extra_fields_1', '#extra_fields_2', '#extra_fields_3', '#extra_fields_4', '#extra_fields_5'];
    fields.forEach(field => {
        cy.get(field).click();
        cy.get('.active.day').click();
    });
});

Cypress.Commands.add('checkDateFieldsEmpty', () => {
    const fields = ['#extra_fields_1', '#extra_fields_2', '#extra_fields_3', '#extra_fields_4', '#extra_fields_5'];
    fields.forEach(field => {
        cy.get(field).should('be.empty');
    });
});

Cypress.Commands.add('typeInCkEditor', (text) => {
    cy.get('.cke_wysiwyg_frame').then($iframe => {
        const $body = $iframe.contents().find('body');
        cy.wrap($body).type(text);
    });
});

Cypress.Commands.add('navigateToTab', (tabId) => {
    cy.get(`a[href='${tabId}']`).click();
});

Cypress.Commands.add('logout', () => {
    cy.get('.fa.fa-angle-down').should('be.visible').click()
    //cy.get("a[href='/index.php/login/logoff']").click()
    cy.get("a[href='/CGI-Demo/index.php/login/logoff']").click()
})

Cypress.Commands.add('navigateToTasks', () => {
    cy.loginByRole('admin');
    cy.submitLoginForm();
    cy.get("a[href$='/CGI-Demo/index.php/tasks'] > i.fa.fa-tasks ").click(); 
});

