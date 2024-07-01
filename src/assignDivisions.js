/**
 * Assigns divisions to users based on their rating.
 * @param {Object} options - Options object.
 * @param {Array} options.users - Array of user objects.
 * @param {number} options.numberOfRounds - Number of rounds used to calculate average rating.
 * @param {Object} options.initialDivisions - Initial divisions object.
 * @returns {Object} Object containing calculated divisions and updated users.
 */
function assignDivisions({ users, numberOfRounds, initialDivisions }) {
    // Convert initialDivisions object to an array
    const divisions = Object.values(initialDivisions);

    // Step 1: Calculate minPoints and maxPoints for each division
    const calculatedDivisions = calculateMinMaxPoints({ users, divisions, numberOfRounds });

    // Step 2: Assign divisions to users
    for (let user of users) {
        let assignedDivision = null;
        for (let i = 0; i < divisions.length; i++) {
            const division = divisions[i];
            // Check condition to assign division
            if (user.rating >= division.minPoints && user.rating <= division.maxPoints) {
                assignedDivision = division;
                break; // Found appropriate division, exit loop
            }
        }
        // If no appropriate division found, assign the first division
        if (!assignedDivision) {
            assignedDivision = divisions[0];
        }

        // Assign division to the user
        user.division = assignedDivision.name;
    }

    return {
        divisions: calculatedDivisions,
        users
    };
}

/**
 * Calculates minPoints and maxPoints for each division based on user ratings.
 * @param {Object} options - Options object.
 * @param {Array} options.users - Array of user objects.
 * @param {Array} options.divisions - Array of division objects.
 * @param {number} options.numberOfRounds - Number of rounds used to calculate average rating.
 * @returns {Array} Updated divisions array with minPoints and maxPoints calculated.
 */
function calculateMinMaxPoints({ users, divisions, numberOfRounds }) {
    // Calculate total rating
    let totalRating = 0;
    for (let user of users) {
        totalRating += user.rating;
    }

    // If numberOfRounds is not provided, default to 3
    if (!numberOfRounds) {
        numberOfRounds = 3;
    }
    
    // Calculate average rating based on numberOfRounds
    const averageRating = ((totalRating / numberOfRounds) / users.length);

    // Sort divisions by id in ascending order
    divisions.sort((a, b) => a.id - b.id);

    // Calculate minPoints and maxPoints for each division
    const numberOfDivisions = divisions.length;
    for (let i = 0; i < numberOfDivisions; i++) {
        const division = divisions[i];
        division.minPoints = Math.round(averageRating * (i + 1));
        division.maxPoints = (i === numberOfDivisions - 1) ? Infinity : Math.round(averageRating * (i + 2));
    }

    return divisions;
}

module.exports = assignDivisions;
