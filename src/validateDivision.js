/**
 * Validates the name and options of a division.
 * @param {string} name - The name of the division to validate.
 * @param {Object} options - The options object containing minPoints and maxPoints.
 * @throws {Error} - If name is not a non-empty string or options are not valid.
 */
function validateDivision(name, options) {
    validateName(name);
    validateOptions(options);
}

/**
 * Validates the name of a division.
 * @param {string} name - The name of the division to validate.
 * @throws {Error} - If name is not a non-empty string.
 */
function validateName(name) {
    if (typeof name !== 'string' || name.trim().length === 0) {
        throw new Error('Division name must be a non-empty string.');
    }
}

/**
 * Validates the options object of a division.
 * @param {Object} options - The options object containing minPoints and maxPoints.
 * @throws {Error} - If options are not an object, null, or if minPoints/maxPoints are not integers.
 */
function validateOptions(options) {
    if (typeof options !== 'object' || options === null || Array.isArray(options)) {
        throw new Error('Division options must be an object.');
    }

    if (typeof options.minPoints !== 'number' || !Number.isInteger(options.minPoints)) {
        throw new Error('Division options.minPoints must be an integer.');
    }

    if (typeof options.maxPoints !== 'number' || !Number.isInteger(options.maxPoints)) {
        throw new Error('Division options.maxPoints must be an integer.');
    }
}

module.exports = validateDivision;
