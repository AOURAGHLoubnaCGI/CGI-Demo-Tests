describe('User API Tests', () => {
    const getUsersUrl = 'https://cgi-demo-testt.000webhostapp.com/CGI-Demo/CGI-Demo/api/users/index.php';
    let userIdToDelete, numberOfUsers;

    it('List of users', () => {
        cy.request({
            method: 'GET',
            url: getUsersUrl
        }).then((response) => {
            // Afficher le contenu du corps de la réponse dans la console
            cy.log('Response Body:', response.body);

            // Verify the response status
            expect(response.status).to.eq(200);

            // Verify the number of users
            response.body.forEach((user) => {
                expect(user.id).to.exist;
                expect(user.name).to.exist;
                expect(user.email).to.exist;
            });
            numberOfUsers = response.body.length;
        });
    });
    it(" Add Invalid user", () => {

            cy.request({
                method: 'POST',
                url: getUsersUrl,
                body: { "name": "Loubna"},
                failOnStatusCode: false // prevent Cypress from failing the test
            }).then(({ status, body }) => {
                expect(status).to.eq(400); //bad request
                expect(body.message).to.eq("Invalid input");
            });
    });
    it("Add a user successfully", () => {
        // Read the user fixture
        cy.fixture('users-api').then((data) => {

            data.name = Math.random().toString(36).substring(2); // random string
            data.email = Math.random().toString(36).substring(2) + "@localhost.com"; //random email

            cy.request({
                method: 'POST',
                url: getUsersUrl,
                body: data
            }).then(({ status, body }) => {
                // Verify the response status and body
                expect(status).to.eq(201);
                expect(body.message).to.eq("User added successfully");
                expect(body.user).to.exist;
                expect(body.user.id).to.exist;
                expect(body.user.name).to.eq(data.name);
                expect(body.user.email).to.eq(data.email);

                // Store the new user's ID for deletion later
                userIdToDelete = body.user.id;

                // Verify the number of users has increased
                cy.request(getUsersUrl).then((getResponse) => {
                    expect(getResponse.body.length).to.eq(numberOfUsers + 1);
                    numberOfUsers++;
                });
            });
        });
    });

    it('invalid User ID', () => {
        // Send GET request to delete the user
        cy.request({
            method: 'GET',
            url: `https://cgi-demo-testt.000webhostapp.com/CGI-Demo/CGI-Demo/api/users/delete-user.php?id=A1`,
            failOnStatusCode: false // prevent Cypress from failing the test on a non-2xx status code
        }).then((response) => {
            // Verify the response status and message
            expect(response.status).to.eq(400);
            expect(response.body.message).to.eq("Invalid user ID");
            // Verify the number of users has decreased
            cy.request(getUsersUrl).then((getResponse) => {
                expect(getResponse.body.length).to.eq(numberOfUsers);
            });
        });
    });

    it('User not found', () => {
        // Send GET request to delete the user
        cy.request({
            method: 'GET',
            url: `https://cgi-demo-testt.000webhostapp.com/CGI-Demo/CGI-Demo/api/users/delete-user.php?id=500`,
            failOnStatusCode: false // prevent Cypress from failing the test on a non-2xx status code
        }).then((response) => {
            // Verify the response status and message
            expect(response.status).to.eq(404);
            expect(response.body.message).to.eq("User not found");
            // Verify the number of users has decreased
            cy.request(getUsersUrl).then((getResponse) => {
                expect(getResponse.body.length).to.eq(numberOfUsers);
            });
        });
    });

    it('should delete a user successfully', () => {
        // Send GET request to delete the user
        cy.request({
            method: 'GET',
            url: `https://cgi-demo-testt.000webhostapp.com/CGI-Demo/CGI-Demo/api/users/delete-user.php?id=${userIdToDelete}`,
        }).then((response) => {
            // Verify the response status and message
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq("User deleted successfully");

            // Verify the number of users has decreased
            cy.request(getUsersUrl).then((getResponse) => {
                expect(getResponse.body.length).to.eq(numberOfUsers - 1);
                numberOfUsers--;
            });
        });
    });
});
