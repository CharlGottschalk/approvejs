/**
 * The result object containing the outcome of the credit card test.
 */
function Card() {
    this.scheme = '';
    this.valid = false;
}

/** 
 * Checks if a value is a valid credit card.
 */
export default {
    /**
     * The default error message.
     */
    message: '{title} is not a valid credit card number',
    schemes: [
        {
            regex: /^(5610|560221|560222|560223|560224|560225)/,
            scheme: 'Australian Bank Card'
        },
        {
            regex: /^(2014|2149)/,
            scheme: 'Diner\'s Club'
        },
        {
            regex: /^36/,
            scheme: 'Diner\'s Club International'
        },
        {
            regex: /^(30[0-5]|36|38|54|55|2014|2149)/,
            scheme: 'Diner\'s Club / Carte Blanche'
        },
        {
            regex: /^35(2[89]|[3-8][0-9])/,
            scheme: 'Japanese Credit Bureau'
        },
        {
            regex: /^(5018|5020|5038|6304|6759|676[1-3])/,
            scheme: 'Maestro'
        },
        {
            regex: /^5[1-5]/,
            scheme: 'Mastercard'
        },
        {
            regex: /^(6304|670[69]|6771)/,
            scheme: 'Laser'
        },
        {
            regex: /^(6334|6767)/,
            scheme: 'Solo (Paymentech)'
        },
        {
            regex: /^(6011|622|64|65)/,
            scheme: 'Discover'
        },
        {
            regex: /^3[47]/,
            scheme: 'American Express'
        },
        {
            regex: /^(4026|417500|4508|4844|491(3|7))/,
            scheme: 'Visa Electron'
        },
        {
            regex: /^(4)/,
            scheme: 'Visa'
        }
    ],
    /**
     * Returns the name of the credit card scheme.
     * @param {Object} value - The credit card number to test.
     * @return {Object} The result of the test.
     */
    _getScheme: function(value) {
        value = (''+ value).replace(/\D/g, '');

        var i = this.schemes.length;
        while (i--) {
            if (this.schemes[i].regex.test(value)) {
                return this.schemes[i].scheme;
            }
        }

        return undefined;
    },
    /**
     * The method that is called by ApproveJs to perform the test.
     * @param {Object} value - The value to test.
     * @return {Object} The result object of the test.
     */
    validate: function(value) {
        value = (''+ value).replace(/\D/g, '');

        var card = new Card(), 
            i = value.length,
            sum = 0,
            mul = 1,
            ca;

        // Not enough numbers. Shortest currently is 12. 
        if (i < 12) {
            return false;
        }

        while (i--) {
            ca = value.charAt(i) * mul;
            sum += ca - (ca > 9) * 9;
            mul ^= 3;
        }

        card.valid = (sum % 10 === 0) && (sum > 0);
        card.scheme = this._getScheme(value);

        return card;
    }
};
