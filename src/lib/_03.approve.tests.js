    /**
     * Default tests.<br>
     * Each test has at least three members.<br>
     * <code>validate()</code> - the method which is called when testing a value.<br>
     * <code>message</code> - the property that holds the default error message.<br>
     * <code>expects</code> - the property that is either false if the test expects no parameters, or an array of strings representing the names of the expected parameters.<br>
     * Each test either returns a boolean or an object.
     * @memberOf approve
     * @namespace approve.tests
     */
    approve.tests = {
        /**
         * Checks if a value is present.
         * @example
         * approve.value('some value', {required: true});
         * @function required
         * @memberOf approve.tests
         * @inner
         */
        required: {
            validate: function(value) {
                return !!value;
            },
            message: '{title} is required',
            expects: false
        },
        /**
         * Checks if a value is a valid email address.
         * @example
         * approve.value('some value', {email: true});
         * @function email
         * @memberOf approve.tests
         * @inner
         */
        email: {
            regex: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i, // eslint-disable-line no-control-regex
            validate: function(value) {
                return this.regex.test(value);
            },
            message: '{title} must be a valid email address',
            expects: false
        },
        /**
         * Checks if a value is a valid web address.
         * @example
         * approve.value('some value', {url: true});
         * @function url
         * @memberOf approve.tests
         * @inner
         */
        url: {
            regex: /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i,
            validate: function(value) {
                return this.regex.test(value);
            },
            message: '{title} must be a valid web address',
            expects: false
        },
        /**
         * Checks if a value contains both letters and numbers.
         * @example
         * approve.value('some value', {alphaNumeric: true});
         * @function alphaNumeric
         * @memberOf approve.tests
         * @inner
         */
        alphaNumeric: {
            regex: /^[A-Za-z0-9]+$/i,
            validate: function(value) {
                return this.regex.test(value);
            },
            message: '{title} may only contain [A-Za-z] and [0-9]',
            expects: false
        },
        /**
         * Checks if a value contains only numbers.
         * @example
         * approve.value('some value', {numeric: true});
         * @function numeric
         * @memberOf approve.tests
         * @inner
         */
        numeric: {
            regex: /^[0-9]+$/,
            validate: function(value) {
                return this.regex.test(value);
            },
            message: '{title} may only contain [0-9]',
            expects: false
        },
        /**
         * Checks if a value contains only letters.
         * @example
         * approve.value('some value', {alpha: true});
         * @function alpha
         * @memberOf approve.tests
         * @inner
         */
        alpha: {
            regex: /^[A-Za-z]+$/,
            validate: function(value) {
                return this.regex.test(value);
            },
            message: '{title} may only contain [A-Za-z]',
            expects: false
        },
        /**
         * Checks if a value is a valid decimal.
         * @example
         * approve.value('some value', {decimal: true});
         * @function decimal
         * @memberOf approve.tests
         * @inner
         */
        decimal: {
            regex: /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/,
            validate: function(value) {
                return this.regex.test(value);
            },
            message: '{title} must be a valid decimal',
            expects: false
        },
        /**
         * Similar to 'decimal', but for currency values.
         * @example
         * approve.value('some value', {currency: true});
         * @function currency
         * @memberOf approve.tests
         * @inner
         */
        currency: {
            regex: /^\s*(\+|-)?((\d+(\.\d\d)?)|(\.\d\d))\s*$/,
            validate: function(value) {
                return this.regex.test(value);
            },
            message: '{title} must be a valid currency value',
            expects: false
        },
        /**
         * Checks if a value is a valid ipv4 or ipv6 address.
         * @example
         * approve.value('some value', {ip: true});
         * @function ip
         * @memberOf approve.tests
         * @inner
         */
        ip: {
            regex: {
                ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
                ipv4Cidr: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/([0-9]|[1-2][0-9]|3[0-2]))$/,
                ipv6: /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i,
                ipv6Cidr: /^s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:)))(%.+)?s*(\/([0-9]|[1-9][0-9]|1[0-1][0-9]|12[0-8]))?$/
            },
            validate: function(value) {
                return this.regex.ipv4.test(value) || this.regex.ipv6.test(value) || this.regex.ipv4Cidr.test(value) || this.regex.ipv6Cidr.test(value);
            },
            message: '{title} must be a valid IP address',
            expects: false
        },
        /**
         * Checks if a value is a minimum of n characters.
         * @param {Integer} min - The minimum allowed length.
         * @example
         * approve.value('some value', {min: 5});
         * @function min
         * @memberOf approve.tests
         * @inner
         */
        min: {
            validate: function(value, pars) {
                return typeof value === 'string' && value.length >= pars.min;
            },
            message: '{title} must be a minimum of {min} characters',
            expects: ['min']
        },
        /**
         * Checks if a value is a maximum of n characters.
         * @param {Integer} max - The maximum allowed length.
         * @example
         * approve.value('some value', {max: 20});
         * @function max
         * @memberOf approve.tests
         * @inner
         */
        max: {
            validate: function(value, pars) {
                return typeof value === 'string' && value.length <= pars.max;
            },
            message: '{title} must be a maximum of {max} characters',
            expects: ['max']
        },
        /**
         * Checks if a string's length or number is between a minimum and maximum.
         * @param {Integer} min - The minimum allowed length.
         * @param {Integer} max - The maximum allowed length.
         * @example
         * var rule = {
         *     range: {
         *         min: 5,
         *         max: 20
         *     }
         * };
         * approve.value('some value', rule);
         * @function range
         * @memberOf approve.tests
         * @inner
         */
        range: {
            validate: function(value, pars) {
                if (typeof value === 'string')
                {
                    return value.length >= pars.min && value.length <= pars.max;
                } else if (typeof value === 'number') {
                    return value >= pars.min && value <= pars.max;
                }
                return false;
            },
            message: '{title} must be a minimum of {min} and a maximum of {max} characters',
            expects: ['min', 'max']
        },
        /**
         * Checks if a value is the same as the value of another.
         * This test gets the value from a DOM &lt;input/&gt; element.
         * @param {String} field - The id of the DOM &lt;input/&gt; element to test against.
         * @example
         * var rule = {
         *     equal: 'password'
         * };
         * approve.value('some value', rule);
         * @function equal
         * @memberOf approve.tests
         * @inner
         */
        equal: {
            validate: function(value, pars) {
                return '' + value === '' + pars.value;
            },
            message: '{title} must be equal to {field}',
            expects: ['value', 'field']
        },
        /**
         * Checks if a value passes a given regular expression.
         * @param {RegExp} regex - The regular expression to test against. <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/RegExp" target="_blank">MDN</a>
         * @example
         * var rule = {
         *     format: /^[A-Za-z0-9]+$/i
         * };
         * approve.value('some value', rule);
         * @function format
         * @memberOf approve.tests
         * @inner
         */
        format: {
            validate: function(value, pars) {
                if (Object.prototype.toString.call(pars.regex) === '[object RegExp]') {
                    return pars.regex.test(value);
                }
                throw 'approve.value(): [format] - regex is not a valid regular expression.';
            },
            message: '{title} did not pass the [{regex}] test',
            expects: ['regex']
        },
        /**
         * Checks if a value is a valid time string.
         * @example
         * approve.value('12:25:30', {timeString: true});
         * @function time
         * @memberOf approve.tests
         * @inner
         */
        time: {
            regex: /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/,
            validate: function(value) {
                return this.regex.test(value);
            },
            message: '{title} is not a valid time',
            expects: false
        },
        /**
         * Checks if a value is a valid date (YYYY[-/]MM[-/]DD).
         * @example
         * approve.value('2016-10-01', {dateString: true});
         * @function date
         * @memberOf approve.tests
         * @inner
         */
        date: {
            regex: /^(?:\2)(?:[0-9]{2})?[0-9]{2}([\/-])(1[0-2]|0?[1-9])([\/-])(3[01]|[12][0-9]|0?[1-9])$/,
            validate: function(value) {
                return this.regex.test(value);
            },
            message: '{title} is not a valid date',
            expects: false
        },
        /**
         * Checks if a value is truthy ('yes', 'true', 'ok[ay]', '1').
         * @example
         * approve.value('yes', {truthy: true});
         * @function truthy
         * @memberOf approve.tests
         * @inner
         */
        truthy: {
            regex: /^(?:1|t(?:rue)?|y(?:es)?|ok(?:ay)?)$/,
            validate: function(value) {
                return this.regex.test(value);
            },
            message: '{title} is not valid',
            expects: false
        },
        /**
         * Checks if a value is falsy ('No', 'false', '0').
         * @example
         * approve.value('No', {falsy: true});
         * @function falsy
         * @memberOf approve.tests
         * @inner
         */
        falsy: {
            regex: /^(?:1|t(?:rue)?|y(?:es)?|ok(?:ay)?)$/,
            validate: function(value) {
                return !this.regex.test(value);
            },
            message: '{title} is not valid',
            expects: false
        }
    };