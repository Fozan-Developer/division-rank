/**
 * Filters users based on their ratings within a specified division.
 * @param {Object} params - Object containing users, division, and divisions.
 * @param {Array} params.users - Array of user objects to filter. Each user must have a rating property.
 * @param {String} params.division - Name of the division to filter users for.
 * @param {Object} params.divisions - Object containing division configurations where each division has minPoints and maxPoints defining the rating range.
 * @returns {Array} - Array of user objects that belong to the specified division based on their rating.
 * @throws {Error} - If users is not an array, division is not a string, division does not exist, a user does not have a rating, or a user's rating is not an integer.
 */
function getUsersInDivision({ users, division, divisions }) {
    // Check argument types
    if (!Array.isArray(users)) {
        throw new Error('Users must be an array.');
    }
    if (typeof division !== 'string') {
        throw new Error('Division must be a string.');
    }
    if (!divisions.hasOwnProperty(division)) {
        throw new Error(`Division ${division} does not exist.`);
    }

    // Get minimum and maximum points for the specified division
    const minPoints = divisions[division].options.minPoints;
    const maxPoints = divisions[division].options.maxPoints;

    // Filter users array
    const usersInDivision = users.filter(user => {
        // Check if user is an object and has a rating property
        if (typeof user !== 'object' || !user.hasOwnProperty('rating')) {
            throw new Error(`User ${user.id} does not have a rating.`);
        }

        // Check if user's rating is an integer
        if (!Number.isInteger(user.rating)) {
            throw new Error(`Rating of user ${user.id} must be an integer.`);
        }

        const userRating = user.rating;

        // Check if user's rating falls within the division's rating range
        return userRating >= minPoints && userRating <= maxPoints;
    });

    return usersInDivision;
}

module.exports = getUsersInDivision;
