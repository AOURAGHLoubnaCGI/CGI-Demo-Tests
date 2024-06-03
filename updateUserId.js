const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'cypress.json');

fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) {
    console.error('Error reading cypress.json:', err);
    return;
  }

  try {
    const config = JSON.parse(data);
    const updatedUserId = (config.userIdToDelete || 0) + 1;

    // Mettre à jour la valeur de userIdToDelete dans cypress.json
    config.userIdToDelete = updatedUserId;

    // Écrire les modifications dans cypress.json
    fs.writeFile(filePath, JSON.stringify(config, null, 2), (err) => {
      if (err) {
        console.error('Error updating userIdToDelete:', err);
      } else {
        console.log('userIdToDelete updated to:', updatedUserId);
      }
    });
  } catch (error) {
    console.error('Error parsing cypress.json:', error);
  }
});
