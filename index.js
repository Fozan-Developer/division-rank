const checkWelcomeMessageFunc = require('./src/checkWelcomeMessage');
const validateDivision = require('./src/validateDivision');
const findUserDivision = require('./src/findUserDivision');
const getUsersInDivision = require('./src/getUsersInDivision');
const assignDivisions = require('./src/assignDivisions');

class RankSystem {
    constructor(initialDivisions = []) {
        this.divisions = {};
        initialDivisions.forEach(division => this.#createDivision({ id: division.id, name: division.name, options: division.options }));
    }

    // Private method to create a new division
    #createDivision({ id, name, options }) {
        validateDivision(name, options); // Validate the division

        // Check if a division with the same name already exists
        if (this.divisions[name]) {
            throw new Error(`Division ${name} already exists.`);
        }

        // Create a new division
        this.divisions[name] = {
            id: id,
            name: name,
            users: {},
            options: options
        };
    }

    // Private method to check the welcome message
    #checkWelcomeMessage() {
        return checkWelcomeMessageFunc();
    }

    // Method to set new users
    setUsers(users) {
        // Check if users is an array
        if (!Array.isArray(users)) {
            throw new Error('Users must be an array.');
        }

        this.users = users;

        return users;
    }

    // Method to find the division where a user belongs
    findUserDivision(user) {
        return findUserDivision({ user, divisions: this.divisions });
    }

    // Method to get users in a specific division
    getUsersInDivision(users, division) {
        return getUsersInDivision({ users, division, divisions: this.divisions });
    }

    assignDivisions({ users, numberOfRounds }) {
        return assignDivisions({ users, numberOfRounds, initialDivisions: this.divisions });
    }
}

module.exports = RankSystem;
