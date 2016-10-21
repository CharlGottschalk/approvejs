/**
 * approve.js v1.1.1
 * A simple validation library that doesn't interfere.
 * Author: Charl Gottschalk
 * @license: MIT
 */

/** @namespace approve */
;(function(root, factory) {    // eslint-disable-line no-extra-semi
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(function() {
            // Also create a global in case some scripts
            // that are loaded still are looking for
            // a global even when an AMD loader is in use.
            return (root.approve = factory());
        });
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is self)
        root.approve = factory();
    }
}(this, function(root) {
    /**
     * The result object returned by the <code>approve.value()</code> method.
     * @memberOf approve
     * @ignore
     */
    function Result() {
        this.approved = true;
        this.errors = [];
        // Provides easy access to the loop for the errors.
        this.each = function(callback) {
            var isFunc = callback && callback.constructor && callback.call && callback.apply,
                i = this.errors.length;
            while (i--) {
                if (isFunc) {
                    callback(this.errors[i]);
                }
            }
        };
    }

    /** @constructor */
    var approve = {};

    /**
     * ApproveJs version
     * @memberOf approve
     * @ignore
     */
    approve.VERSION = '1.1.1';

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
         * Checks if a value is truthy ('yes', 'true', 'ok[ay]', '1').
         * @example
         * approve.value('yes', {truthy: true});
         * @function truthy
         * @memberOf approve.tests
         * @inner
         */
        truthy: {
            regex: /^(?:1|t(?:rue)?|y(?:es)?|ok(?:ay)?)$/i,
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
            regex: /^(?:1|t(?:rue)?|y(?:es)?|ok(?:ay)?)$/i,
            validate: function(value) {
                return !this.regex.test(value);
            },
            message: '{title} is not valid',
            expects: false
        }
    };
    /**
     * A helper function for formatting strings:
     * @example
     * this._format('i can speak {language} since i was {age}', {language:'javascript',age:10});
     * @example
     * this._format('i can speak {0} since i was {1}', 'javascript',10});
     * @return {String} The formatted string.
     * @memberOf approve
     * @ignore
     */
    approve._format = function(text, col) {
        col = typeof col === 'object' ? col : Array.prototype.slice.call(arguments, 1);
        return text.replace(/\{\{|\}\}|\{(\w+)\}/g, function (m, n) {
            if (m === "{{") { return "{"; }
            if (m === "}}") { return "}"; }
            return col[n];
        }).trim();
    };

    /**
     * The start of the validation process:
     * @example
     * var result = this._start(value, rules);
     * @param {Object} value - The value to test.
     * @param {Object} rules - The object containing the test constraints.
     * @return {Object} The result of the test.
     * @memberOf approve
     * @ignore
     */
    approve._start = function(value, rules) {
        // Instantiate a result object.
        var result = new Result(),
            // This is used to format the message with the value title.
            title = '';
        // Check if the rule has a title property?
        if (rules.hasOwnProperty('title')) {
            title = rules.title;
        }
        // Loop through given rules.
        for (var rule in rules) {
            if (rules.hasOwnProperty(rule) && rule !== 'title') {
                var constraint = rules[rule];
                // Check if rule exists in tests.
                if (this.tests.hasOwnProperty(rule)) {
                    // Set a pointer to the current test.
                    var params = {
                        constraint: constraint,
                        rule: rule,
                        title: title,
                        test: this.tests[rule],
                        value: value
                    };
                    this._test(params, result);
                } else {
                    throw 'approve.value(): ' + rule + ' test not defined.';
                }
            }
        }

        return result;
    };

    /**
     * Performs the actual testing of the value and returns the result including any errors.
     * @example
     * var result = this._test(params);
     * @param {Object} params - The parameters required for testing.
     * @param {Object} result - The result object
     * @memberOf approve
     * @ignore
     */
    approve._test = function(params, result) {
        // Create an args object for required parameters.
        var args = this._getArgs(params),
            // Test the value.
            ret = params.test.validate(params.value, args);
        // Check if the returned value is an object.
        if(typeof ret === 'object')
        {
            // An object was returned.
            // Check if the test was successful.
            result.approved = !ret.valid ? false : result.approved;
            // Add the error messages returned by the resluting object.
            if (ret.hasOwnProperty('errors')) {
                result.errors = result.errors.concat(this._formatMessages(ret.errors, params));
            }
            // Merge any properties from the resulting object with the main result to be returned.
            for (var prop in ret) {
                if (ret.hasOwnProperty(prop) && !result.hasOwnProperty(prop)) {
                    result[prop] = ret[prop];
                }
            }
        } else if (typeof ret !== 'boolean') {
            // We don't process if it's not a boolean or object.
            throw 'approve.value(): ' + params.rule + ' returned an invalid value';
        } else {
            result.approved = !ret ? false : result.approved;
        }
        if (!result.approved) {
            result.errors.push(this._formatMessage(params));
        }
    };

    /**
     * Helper method to loop over expected test parameters.
     * @example
     * this._eachExpected(params, function(expected) {
     *     // Do something with expected.
     * });
     * @param {Object} params - The parameters required for testing.
     * @param {Function} fn - The callback function called during loop.
     * @return {Void}
     * @memberOf approve
     * @ignore
     */
    approve._eachExpected = function(params, fn) {
        if (Array.isArray(params.test.expects)) {
            var expectsLength = params.test.expects.length,
                i = expectsLength;
            // This test expects paramaters.
            // Loop through the test's expected parameters and call the given function.
            while (i--) {
                fn(params.test.expects[i], expectsLength);
            }
        }
    };

    /**
     * Returns an object containing the arguments for a test's expected parameters.
     * @example
     * var pars = this._getArgs(params);
     * @param {Object} params - The parameters required for testing.
     * @return {Object} The object containing the arguments.
     * @memberOf approve
     * @ignore
     */
    approve._getArgs = function(params) {
        var pars = {};
        // Does the test for this rule expect any paramaters?
        this._eachExpected(params, function(expects, expectsLength) {
            // Check if the rule object has the required parameter.
            if (params.constraint.hasOwnProperty(expects)) {
                // Add the expected parameter value to the pars object.
                pars[expects] = params.constraint[expects];
            } else if (expectsLength <= 1 && /^[A-Za-z0-9]+$/i.test(params.constraint)) {
                // Set the parameter to the rule's value.
                pars[expects] = params.constraint;
            } else {
                throw 'approve.value(): ' + params.rule + ' expects the ' + expects + ' parameter.';
            }
        });


        // Does the rule have config?
        if (params.constraint.hasOwnProperty('config')) {
            // Add the config to the pars object.
            pars.config = params.constraint.config;
        }
        // Return the parameters object
        return pars;
    };

    /**
     * Returns an object containing placholder values to correctly format an error message.
     * @example
     * var format = this._getFormat(params);
     * @param {Object} params - The parameters required for testing.
     * @return {Object} The object used to format an error message.
     * @memberOf approve
     * @ignore
     */
    approve._getFormat = function(params) {
        var format = {};
        // Does the test for the rule expect parameters?
        this._eachExpected(params, function(expects) {
            // Check if the rule object has the required parameter.
            if (params.constraint.hasOwnProperty(expects)) {
                // Add the expected parameter's format to the parameter value.
                format[expects] = params.constraint[expects];
            }
            // Expected parameter not present, is the constraint formattable?
            if (/^[A-Za-z0-9]+$/i.test(params.constraint)) {
                format[expects] = params.constraint;
            }
        });
        format.title = params.title;
        // Return the formatted message.
        return format;
    };

    /**
     * Returns an array of formatted error messages returned by tests that return objects instead of booleans.
     * @example
     * var errors = this._formatMessages(['array', 'of', 'errors'], params);
     * @param {Array} errors - The array of unformatted errors returned by the test's result.
     * @param {Object} params - The parameters required for testing.
     * @return {Array} The formatted errors
     * @memberOf approve
     * @ignore
     */
    approve._formatMessages = function(errors, params) {
        var format = this._getFormat(params),
            i = errors.length;
        while (i--) {
            errors[i] = this._format(errors[i], format);
        }
        return errors;
    };

    /**
     * Returns the correctly formatted message representing the current test's failure.
     * @example
     * this._message(rule, rules, title);
     * @param {Object} params - The parameters required for testing.
     * @return {String} The correctly formatted error message
     * @memberOf approve
     * @ignore
     */
    approve._formatMessage = function(params) {
        var format = this._getFormat(params);
        var message;

        // Does the provided rule have a custom message?
        if (params.constraint.hasOwnProperty('message')) {
            // The rule has a custom message, return it.
            message = params.constraint.message;
            return this._format(message, format);
        }
        else {
            // The rule does not have a custom message.
            // Get the default message from the tests.
            message = params.test.message;
            return this._format(message, format);
        }
    };

    /**
     * Executes the tests based on given rules to validate a given value.<br><br>
     * Returns an object with at least two properties:<br>
     * <code>approved</code> : Boolean - <code>true</code> if test succeeded, otherwise <code>false</code>.<br>
     * <code>errors</code> : Array of String - holds a list of formatted errors.
     * @example
     * var result = approve.value('some value', {test: constraints});
     * if (result.approved) {
     *    // Value is approved - do something
     * } else {
     *    // Do something with the errors
     *    result.each(function(error) {
     *       console.log(error);
     *    });
     * }
     * @param {Object} value - The value to test against the rules.
     * @param {Object} rules - The constraints for the value being tested.
     * @return {Object} The object containing the result of the tests performed.
     * @memberOf approve
     */
    approve.value = function(value, rules) {

        // If rules is not an object, we cannot continue.
        if (typeof rules !== 'object') {
            throw 'approve.value(value, rules): rules is not a valid object.';
        }
        // Return the result object.
        return this._start(value, rules);
    };

    /**
     * Used to add custom tests.
     * @example
     * var test = {
     *    expects: false,
     *    message: '{title} did not pass the test.',
     *    validate: function(value) {
     *        return this.strength(value);
     *    },
     * };
     * approve.addTest(test, 'test_name');
     * @param {Object} obj - The test object to add.
     * @param {String} name - The name of the test.
     * @return void
     * @memberOf approve
     */
    approve.addTest = function(obj, name) {
        // If obj is not a valid object, we cannot continue.
        if (typeof obj !== 'object') {
            throw 'approve.addTest(obj, name): obj is not a valid object.';
        }
        try {
            // Check if the test name already exists.
            if (!this.tests.hasOwnProperty(name)) {
                // The name does not exist, add it to the tests.
                this.tests[name] = obj;
            }
        } catch (e) {
            throw 'approve.addTest(): ' + e.message;
        }
    };
    /**
     * The result object containing the outcome of the credit card test.
     */
    function Card() {
        this.scheme = '';
        this.valid = false;
    }
    /** 
     * Checks if a value is a valid credit card.
     * @example
     * var rule = {
     *     cc: true
     * };
     * approve.value('5105105105105100', rule);
     * @return {Object} An object with various properties relating to the value's score.
     * @function cc
     * @memberOf approve.tests
     * @inner
     */
    var cc = {
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
    approve.tests.cc = cc;

    // Set defaults
    approve._date = {
        formats: ['MM/DD/YY', 'MM/DD/YYYY']
    }

    // uncomment if using these rules
    //var moment = require('moment');

    /**
     * Checks if a value is a valid date.
     * @example
     * var rule = {
     *     date: {
     *         formats: ['MM/DD/YY', 'MM/DD/YYYY']
     *     }
     * };
     * approve.value('12/24/2016', rule);
     * @function date
     * @memberOf approve.tests
     * @inner
     */
    var date = {
        /**
         * Expects 'formats' as a  parameter.
         */
        expects: ['formats'],

        /**
         * The default error message.
         */
        message: '{title} is not a valid date.',

        /**
         * The method that is called by ApproveJs to perform the test.
         * @param {String} value - The value to test.
         * @param {object} value - The parameters to test with.
         * @return {Object} The result object of the test.
         */
        validate: function(val, pars){
            var format = pars.format || approve._date.formats;

            return moment(val, format, true).isValid();
        }
    }

    approve.tests.date = date;

    /**
     * Checks if a value is a valid date.
     * @example
     * var rule = {
     *     dateBefore: {
     *         before: '12/24/2016'
     *     }
     * };
     * approve.value('12/23/2016', rule);
     * @return {Object} An object with various properties relating to the value's score.
     * @function date
     * @memberOf approve.tests
     * @inner
     */
    var dateBefore = {
        /**
         * Expects the 'date' (and 'formats') as  parameters.
         */
        expects: ['date'],

        config: {
            formats: approve._date.formats
        },

        /**
         * The default error message.
         */
        message: '{title} should be before {date}.',

        /**
         * The method that is called by ApproveJs to perform the test.
         * @param {String} value - The value to test.
         * @param {object} value - The parameters to test with.
         * @return {Object} The result object of the test.
         */
        validate: function(val, pars){
            var date = pars.date;
            var format = typeof pars.config != 'undefined' ? pars.config.formats || this.config.formats : this.config.formats;

            var beforeDate = moment(date, format, true);

            // If it's not a valid date, error
            if (beforeDate === false)
                return false;

            return moment(val, format) < beforeDate;
        }
    }

    approve.tests.dateBefore = dateBefore;


    /**
     * Checks if a value is a valid date.
     * @example
     * var rule = {
     *     dateAfter: {
     *         before: '12/24/2016'
     *     }
     * };
     * approve.value('12/23/2016', rule);
     * @return {Object} An object with various properties relating to the value's score.
     * @function date
     * @memberOf approve.tests
     * @inner
     */
    var dateAfter = {
        /**
         * Expects the 'date' (and 'formats') as  parameters.
         */
        expects: ['date'],

        config: {
            formats: approve._date.formats
        },

        /**
         * The default error message.
         */
        message: '{title} should be after {date}.',

        /**
         * The method that is called by ApproveJs to perform the test.
         * @param {String} value - The value to test.
         * @param {object} value - The parameters to test with.
         * @return {Object} The result object of the test.
         */
        validate: function(val, pars){
            var date = pars.date;
            var format = typeof pars.config != 'undefined' ? pars.config.formats || this.config.formats : this.config.formats;

            var afterDate = moment(date, format, true);

            // If it's not a valid date, error
            if (afterDate === false)
                return false;

            return moment(val, format) > afterDate;
        }
    }

    approve.tests.dateAfter = dateAfter;

    /**
     * The result object containing the outcome of the strength test.
     * @param {string} strength - The initial strength.
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
            result.hasLower = text.match(/[a-z]/);
            if(result.isMinimum) {
                result.points++;
            }
            // If text has uppercase characters give 1 point.
            result.hasUpper = text.match(/[A-Z]/);
            if(result.isMinimum) {
                result.points++;
            }
            // If text has at least one number give 1 point.
            result.hasNumber = text.match(/\d+/);
            if(result.isMinimum) {
                result.points++;
            }
            // If text has at least one special caracther give 1 point.
            result.hasSpecial = text.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/);
            if(result.isMinimum) {
                result.points++;
            }
            // Set the percentage value.
            result.percent = Math.ceil((result.points / 6) * 100);
            // Return the score object.
            return result;
        },
        /**
         * Returns an object containing the score and validation of a value.
         * @param {String} text - The text to score.
         * @return {Object} The score and validation of the text.
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
         * @param {String} value - The value to test.
         * @return {Object} The result object of the test.
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
    approve.tests.strength = strength;

    /*
     * Return the main ApproveJs object.
     */
    return approve;
}));