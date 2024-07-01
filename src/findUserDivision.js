/**
 * Finds the division where a user belongs based on their rating.
 * @param {Object} params - Object containing user and divisions.
 * @param {Object} params.user - User object with rating.
 * @param {Object} params.divisions - Object containing division configurations.
 * @returns {String|null} - Name of the division or null if user is not found in any division.
 * @throws {Error} - If user does not have a rating.
 */
function findUserDivision({ user, divisions }) {
    // Check if user has a rating
    if (!user.rating) {
        throw new Error(`User ${user.id} does not have a rating.`);
    }

    // Iterate through all divisions
    for (const divisionName in divisions) {
        if (divisions.hasOwnProperty(divisionName)) {
            const division = divisions[divisionName];

            // Check if user's rating falls within the division's rating range
            if (user.rating >= division.options.minPoints && user.rating <= division.options.maxPoints) {
                return divisionName; // Return division name if user's rating matches
            }
        }
    }

    return null; // Return null if user is not found in any division or rating does not match any division's range
}

module.exports = findUserDivision;
