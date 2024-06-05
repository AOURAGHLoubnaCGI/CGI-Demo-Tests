// Écoute de l'événement au niveau global
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;  // Désactive la gestion automatique des erreurs non capturées
});
describe('Project Management', () => {
    beforeEach(() => {
        cy.navigateToProjects();
    });

    //  afterEach(() => {
    //     cy.logout();
    // })

    it('Add project - required fields Empty', () => {
        cy.get('li.open > .sub-menu > :nth-child(2) > .cursor-pointer').click();
        // Section Générale
        cy.get('#projects_projects_types_id').select('Internal');
        cy.get("#projects_projects_status_id > option[selected='selected']").should('have.text', 'Open');
        cy.get('#projects_name').clear().should('have.text', '');

        cy.get('#extra_fields_7').type('https://www.live.com/');
        cy.get('#extra_fields_8').type('https://www.test.com/');

        cy.fillDateFields();
        cy.get('.modal-scrollable').scrollIntoView();
        cy.typeInCkEditor('Hello, world! This is a test using CKEditor.');

        cy.navigateToTab('#tab_team');
        ['3', '4', '5'].forEach(num => {
            cy.get(`#projects_team_${num}`).check().should('be.checked');
        });

        cy.navigateToTab('#tab_attachments');
        cy.get('input[multiple="multiple"]').selectFile('cypress/fixtures/cgi.jpg', { force: true });
       cy.wait(1000);
        cy.get("button[type='submit']").click();

        cy.get('#form_error_handler').should('exist');
        //cy.get('#form_error_handler > div').should('have.text', 'Some fields are required. They have been highlighted above.');
        //cy.get('#form_error_handler > div').should('have.text', 'Some fields are required. They have been highlighted above.');

        cy.get('.modal-footer > .btn-default').click();
    });

    it('Add project - All fields empty except required field', () => {
        cy.get('li.open > .sub-menu > :nth-child(2) > .cursor-pointer').click();
        // Fill only the required field
        cy.get('#projects_name').type('02 project');

        // Clear other fields 
        cy.get('#extra_fields_7').clear();
        cy.get('#extra_fields_8').clear();

        // Assume no default values for dates or deselect if automatically filled
        cy.checkDateFieldsEmpty(); 
        
        cy.navigateToTab('#tab_team');
        cy.get('input[type="checkbox"]').uncheck({ force: true }); // Uncheck all team options

        cy.navigateToTab('#tab_attachments');
        cy.get('input[type="file"]').should('not.have.value'); // Ensure no file is attached

        // Submit the form
        cy.get("button[type='submit']").click();
    });

    it('Add project - All Fields Filled Correctly', () => {
        cy.get('li.open > .sub-menu > :nth-child(2) > .cursor-pointer').click();
        // General Section - change here to fill the field instead of clearing it
        cy.get('#projects_projects_types_id').select('Internal');
        cy.get("#projects_projects_status_id > option[selected='selected']").should('have.text', 'Open');
        cy.get('#projects_name').type('01 Project');

        cy.get('#extra_fields_7').type('https://www.live.com/');
        cy.get('#extra_fields_8').type('https://www.test.com/');

        cy.fillDateFields();
        cy.get('.modal-scrollable').scrollIntoView();
        cy.typeInCkEditor('Hello, world! This is another test using CKEditor.');

        cy.navigateToTab('#tab_team');
        ['3', '4', '5'].forEach(num => {
            cy.get(`#projects_team_${num}`).check().should('be.checked');
        });

        cy.navigateToTab('#tab_attachments');
        cy.get('input[multiple="multiple"]').selectFile('cypress/fixtures/cgi.jpg', { force: true });
        cy.wait(2000);
        cy.get("button[type='submit']").click();
    });

    it('Modify project', () => {
        cy.get("li[class='open'] li:nth-child(1) a:nth-child(1)").click();
        cy.get(':nth-child(1) > :nth-child(2) > [href="#"] > .fa').click();
        cy.get('#projects_name').clear().type('Project name Modified');
        cy.get("button[type='submit']").click();
    });

    it('Delete project', () => {
        cy.get("li[class='open'] li:nth-child(1) a:nth-child(1)").click();
        cy.get('a').filter((index, element) => {
            // Vérifie que le texte de l'élément correspond et que l'attribut href contient un chemin spécifique
            return element.textContent.includes('Project name Modified') ;
            //&& element.getAttribute('href').includes('/CGI-Demo/index.php/projects/open/')
        }).click();
        //cy.get('.sub-menu > .active > a').click
    });
});
