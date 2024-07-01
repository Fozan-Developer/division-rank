const fs = require('fs');
const path = require('path');

module.exports = function() {
    const packagePath = path.resolve(__dirname, '../package.json');
    const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));

    if (packageData.showWelcomeMessage === true) {
        console.log('Welcome to RankSystem! Check out the documentation at: https://fozan.gitbook.io/division-rank/');

        // Change showWelcomeMessage to false
        packageData.showWelcomeMessage = false;

        // Write changes back to package.json
        fs.writeFileSync(packagePath, JSON.stringify(packageData, null, 2));
    }
};
