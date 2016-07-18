approve.configure({
	/*
     * Change the default message for the 'required' test.
     */
    required: {
        message: '{title} is required'
    },
    /*
     * Change the default message for the 'email' test.
     */
    email: {
        message: '{title} must be a valid email address'
    },
    /*
     * Change the default message for the 'url' test.
     */
    url: {
        message: '{title} must be a valid web address'
    },
    /*
     * Change the default message for the 'cc' test.
     */
    cc: {
        message: '{title} must be a valid credit card number'
    },
    /*
     * Change the default message for the 'alphaNumeric' test.
     */
    alphaNumeric: {
        message: '{title} may only contain [A-Za-z] and [0-9]'
    },
    /*
     * Change the default message for the 'numeric' test.
     */
    numeric: {
        message: '{title} may only contain [0-9]'
    },
    /*
     * Change the default message for the 'alpha' test.
     */
    alpha: {
        message: '{title} may only contain [A-Za-z]'
    },
    /*
     * Change the default message for the 'decimal' test.
     */
    decimal: {
        message: '{title} must be a valid decimal'
    },
    /*
     * Change the default message for the 'currency' test.
     */
    currency: {
        message: '{title} must be a valid currency value'
    },
    /*
     * Change the default message for the 'ip' test.
     */
    ip: {
        message: '{title} must be a valid IP address'
    },
    /*
     * Change the default message for the 'min' test.
     */
    min: {
        message: '{title} must be a minimum of {min} characters'
    },
    /*
     * Change the default message for the 'max' test.
     */
    max: {
        message: '{title} must be a maximum of {max} characters'
    },
    /*
     * Change the default message for the 'range' test.
     */
    range: {
        message: '{title} must be a minimum of {min} and a maximum of {max} characters'
    },
    /*
     * Change the default message for the 'equal' test.
     */
    equal: {
        message: '{title} must be equal to {field}'
    },
    /*
     * Change the default message for the 'format' test.
     */
    format: {
        message: '{title} did not pass the [{regex}] test'
    }
    /*
     * Update the config for the 'strength' test.
     */
    strength: {
    	// Change default error message.
        message: '{title} did not pass the [{regex}] test',
        // Change minimum required length.
        minimum: 8,
        // Change minimum required length for a bonus point.
	    minimumBonus: 10,
	    // Change the default messages representing the strength of a value.
	    messages: {
	        0: 'Very Weak',
	        1: 'Weak',
	        2: 'Better',
	        3: 'Almost',
	        4: 'Acceptable',
	        5: 'Strong',
	        6: 'Very Strong'
	    }
    }
});