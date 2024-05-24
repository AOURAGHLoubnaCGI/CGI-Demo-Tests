// Écoute de l'événement au niveau global
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;  // Désactive la gestion automatique des erreurs non capturées
});

describe('Task Management', () => {
    beforeEach(() => {
        cy.navigateToTasks();
    });

    afterEach(() => {
        cy.logout();
    })

    it('Required fields Empty', () => {


    });

    it('All fields empty except the required fields', () => {
 
    });

    it('Fields Filled Correctly', () => {

    });

    it('Modify Task', () => {

    });

    it('Delete Task', () => {

    });

 });
