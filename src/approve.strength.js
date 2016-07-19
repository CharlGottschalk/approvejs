/*
 * approve.strength.js 0.0.3
 * Tests whether a value is a strong password like string.
 * Author: Charl Gottschalk
 * @license: MIT
 */

/** 
 * Checks if a value is a strong password string.
 * @example
 * var rule = {
 *     strength: {
 *         min: 8,
 *         bonus: 10
 *     }
 * };
 * approve.value('some value', rule);
 * @return {Object} An object with various properties relating to the value's score.
 * @function strength
 * @memberOf approve.tests
 * @inner
 */
var strength = {
    /**
     * The minimum length a password must be.
     */
    minimum: 8,
    /**
     * The minimum length a password must be for a bonus point.
     */
    minimumBonus: 10,
    /**
     * The text representing the strength of a password.
     */
    messages: {
        0: 'Very Weak',
        1: 'Weak',
        2: 'Better',
        3: 'Almost',
        4: 'Acceptable',
        5: 'Strong',
        6: 'Very Strong'
    },
    /**
     * The default error message.
     */
    message: '{title} did not pass the strength test.',
    /**
     * Expects the 'min' and 'bonus' parameters.
     */
    expects: ['min', 'bonus'],
    /**
     * Default error messages
     * @type {Object}
     */
    errors: {
        isMinimum: '{title} must be at least {min} characters',
        hasLower: '{title} must have at least 1 lower case character',
        hasUpper: '{title} must have at least 1 upper case character',
        hasNumber: '{title} must have at least 1 number',
        hasSpecial: '{title} must have at least 1 special character'
    },
    /**
     * Returns an object containing the score of a value.
     * @param {String} text - The text to score.
     * @return {Object} The score of the text.
     */
    score: function(text) {
        // Create the object that represents the score of the text
        var score = {
            value: 0,
            isMinimum: false,
            hasLower: false,
            hasUpper: false,
            hasNumber: false,
            hasSpecial: false,
            isBonus: false,
            strength: 0
        };
        // If text is longer than minimum give 1 point.
        if (text.length > this.minimum){
            score.value++;
            score.isMinimum = true;
        } else {
            score.value = 1;
            score.isMinimum = false;
        }
        // If text has lowercase characters give 1 point.
        if ( text.match(/[a-z]/) ) {
            if(score.isMinimum) {
                score.value++;
            }
            score.hasLower = true;
        }
        // If text has uppercase characters give 1 point.
        if ( text.match(/[A-Z]/) ) {
            if(score.isMinimum) {
                score.value++;
            }
            score.hasUpper = true;
        }
        // If text has at least one number give 1 point.
        if (text.match(/\d+/)) {
            if(score.isMinimum) {
                score.value++;
            }
            score.hasNumber = true;
        }
        // If text has at least one special caracther give 1 point.
        if ( text.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/) ) {
            if(score.isMinimum) {
                score.value++;
            }
            score.hasSpecial = true;
        }
        // If text is longer than minimumBonus give another 1 point.
        if (text.length > this.minimumBonus) {
            score.value++;
            score.isBonus = true;
        }
        // Set the percentage value.
        score.strength = Math.ceil((score.value / 6) * 100);
        // Return the score object.
        return score;
    },
    /**
     * Returns an object containing the score and validation of a value.
     * @param {String} text - The text to score.
     * @return {Object} The score and validation of the text.
     */
    strength: function (text) {
        var result = {
                message: this.messages[0],
                minimum: this.minimum,
                minimumBonus: this.minimumBonus,
                score: {},
                valid: false,
                errors: []
            };
        result.score = this.score(text);
        result.message = this.messages[result.score.value];
        if (!this.score.isMinimum) {
            this.errors.push(this.errors.isMinimum);
        }
        if (!this.score.hasLower) {
            this.errors.push(this.errors.hasLower);
        }
        if (!this.score.hasUpper) {
            this.errors.push(this.errors.hasUpper);
        }
        if (!this.score.hasSpecial) {
            this.errors.push(this.errors.hasSpecial);
        }
        if (!this.score.hasNumber) {
            this.errors.push(this.errors.hasNumber);
        }
        if (result.score.value > 4) {
          result.valid = true;
        } 
        return result;
    },
    /**
     * The method that is called by ApproveJs to perform the test.
     * @param {String} value - The value to test.
     * @return {Object} The result object of the test.
     */
    validate: function(value, pars) {
        this.minimum = pars.min || this.minimum;
        this.minimumBonus = pars.bonus || this.minimumBonus;
        if (pars.hasOwnProperty('config') && pars.config.hasOwnProperty(messages)) {
            this.errors = pars.config.messages;
        }
        return this.strength(value);
    },
};
approve.addTest(strength, 'strength');