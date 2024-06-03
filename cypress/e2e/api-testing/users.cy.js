describe('User API Tests', () => {
    const getUsersUrl = 'https://cgi-demo-test.000webhostapp.com/CGI-Demo/api/users/index.php';
    const userIdToDelete = 14;
    const deleteUserUrl = `https://cgi-demo-test.000webhostapp.com/CGI-Demo/api/users/delete-user.php?id=${userIdToDelete}`;


    it("Add a user successfully", () => {
        // Read the user fixture
        cy.fixture('users-api').then((data) => {

            // dynamic values
            data.id = Math.floor(Math.random() * 100).toString(); // number between 0 and 99
            data.name = Math.random().toString(36).substring(2); // random string
            data.email = Math.random().toString(36).substring(2) + "@localhost.com"; //random email

            cy.request({

                method: 'POST',
                url: getUsersUrl,
                body: data

            }).then((response) => {

                expect(response.status).to.eq(201);
                expect(response.body.message).to.eq("User added successfully");

            });
        });
    });

    it('should have 4 users and return status 200', () => {
        cy.request({
            method: 'GET',
            url: getUsersUrl
        }).then((response) => {

            // Afficher le contenu du corps de la réponse dans la console
            cy.log('Response Body:', response.body);

            // Verify the response status
            expect(response.status).to.eq(200);

            // Verify the number of users
            expect(response.body).to.have.lengthOf(4);
        });
    });

    it.only('should delete a user successfully', () => {
        console.log(`URL avec userIdToDelete actuel: ${deleteUserUrl}`)
        // Send GET request to delete the user
        cy.request({
            method: 'GET',
            url: deleteUserUrl,
        }).then((response) => {
            // Verify the response status
            expect(response.status).to.eq(200);
            // Verify the response body
            //expect(response.body).to.have.property('message', );
            expect(response.body.message).to.eq("User deleted successfully");
        });
    });

});