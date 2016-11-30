/**
 * The result object containing the outcome of the strength test.
 */
function Score(strength) {
    this.strength = strength;
    this.points = 0;
    this.isMinimum = false;
    this.hasLower = false;
    this.hasUpper = false;
    this.hasNumber = false;
    this.hasSpecial = false;
    this.isBonus = false;
    this.percent = 0;
    this.valid = false;
    this.errors = [];
}
/** 
 * Checks if a value is a strong password string.
 */
export default {
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
    strengths: {
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
     */
    _getScore: function(text) {
        // Create the object that represents the score of the text
        var result = new Score(this.strengths[0]);
        // If text is longer than minimum give 1 point.
        // If text is longer than minimumBonus give another 1 point.
        if (text.length > this.minimumBonus) {
            result.points += 2;
            result.isBonus = true;
            result.isMinimum = true;
        } else if (text.length > this.minimum){
            result.points++;
            result.isMinimum = true;
        } else {
            result.points = 1;
            result.isMinimum = false;
        }
        // If text has lowercase characters give 1 point.
        result.hasLower = text.match(/[a-z]/) === null ? false : true;
        if(result.isMinimum && result.hasLower) {
            result.points++;
        }
        // If text has uppercase characters give 1 point.
        result.hasUpper = text.match(/[A-Z]/) === null ? false : true;
        if(result.isMinimum && result.hasUpper) {
            result.points++;
        }
        // If text has at least one number give 1 point.
        result.hasNumber = text.match(/\d+/) === null ? false : true;
        if(result.isMinimum && result.hasNumber) {
            result.points++;
        }
        // If text has at least one special caracther give 1 point.
        result.hasSpecial = text.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/) === null ? false : true;
        if(result.isMinimum && result.hasSpecial) {
            result.points++;
        }
        // Set the percentage value.
        result.percent = Math.ceil((result.points / 6) * 100);
        // Return the score object.
        return result;
    },
    /**
     * Returns an object containing the score and validation of a value.
     */
    _getStrength: function (text) {
        var result = this._getScore(text);
        result.strength = this.strengths[result.points];
        if (!result.isMinimum) {
            result.errors.push(this.errors.isMinimum);
        }
        if (!result.hasLower) {
            result.errors.push(this.errors.hasLower);
        }
        if (!result.hasUpper) {
            result.errors.push(this.errors.hasUpper);
        }
        if (!result.hasSpecial) {
            result.errors.push(this.errors.hasSpecial);
        }
        if (!result.hasNumber) {
            result.errors.push(this.errors.hasNumber);
        }
        if (result.points > 4) {
          result.valid = true;
        } 
        return result;
    },
    /**
     * The method that is called by ApproveJs to perform the test.
     */
    validate: function(value, pars) {
        this.minimum = pars.min || this.minimum;
        this.minimumBonus = pars.bonus || this.minimumBonus;
        if (pars.hasOwnProperty('config') && pars.config.hasOwnProperty('messages')) {
            for (var message in pars.config.messages) {
                if (pars.config.messages.hasOwnProperty(message)) {
                    this.errors[message] = pars.config.messages[message];
                }
            }
        }
        return this._getStrength(value);
    }
};
