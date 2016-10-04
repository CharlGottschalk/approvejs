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