import tests from './tests/approve.tests';

var Result = function() {
    this.approved = true;
    this.errors = [];
    this.failed = [];
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
    // Provides easy access to the loop for a test's errors.
    this.filter = function(test, callback) {
    	var isFunc = callback && callback.constructor && callback.call && callback.apply,
    		i = 0;
    	if (this.hasOwnProperty(test)) {
    		i = this[test].errors.length;
    		while (i--) {
	            if (isFunc) {
	                callback(this[test].errors[i]);
	            }
	        }
    	}
    };
};

/** @constructor */
export default {
	/**
	 * Default tests.<br>
	 */
	tests: tests,
	/**
	 * A helper function for formatting strings.
	 */
	_format: function(text, col) {
	    col = typeof col === 'object' ? col : Array.prototype.slice.call(arguments, 1);
	    return text.replace(/\{\{|\}\}|\{(\w+)\}/g, function (m, n) {
	        if (m === "{{") { return "{"; }
	        if (m === "}}") { return "}"; }
	        return col[n];
	    }).trim();
	},
	/**
	 * Checks whether the given rule is not a config property.
	 */
	_isRule: function(rule) {
		var props = [
			'title',
			'stop',
			'ignoreNull'
		];
		return props.indexOf(rule) < 0;
	},
	/**
	 * The start of the validation process.
	 */
	_start: function(value, rules) {
	    // Instantiate a result object.
	    var result = new Result(),
	        // This is used to format the message with the value title.
	        title = '',
	        // When true, tests will not continue after first failed test.
	        stop = false,
	        // When true, tests will not be executed if the value is null.
	        ignoreNull = false;
	    // Check if the rule has a title property?
	    if (rules.hasOwnProperty('title')) {
	        title = rules.title;
	    }
	    // Check if the rule has a stop property?
	    if (rules.hasOwnProperty('stop')) {
	        stop = rules.stop;
	    }
	    // Check if the rule has an ignoreNull property?
	    if (rules.hasOwnProperty('ignoreNull')) {
	        ignoreNull = rules.ignoreNull;
	    }
	    // Loop through given rules.
	    for (var rule in rules) {
	    	// Stop validating after each failed test
	    	if (stop && !result.approved) {
	    		break;
	    	}
	        if (rules.hasOwnProperty(rule) && this._isRule(rule)) {
	            var constraint = rules[rule];
	            // Check if rule exists in tests.
	            if (this.tests.hasOwnProperty(rule)) {
	                // Set a pointer to the current test.
	                var params = {
	                    constraint: constraint,
	                    rule: rule,
	                    title: title,
	                    test: this.tests[rule],
	                    value: value,
	                    ignoreNull: ignoreNull
	                };
	                this._test(params, result);
	            } else {
	                throw 'approve.value(): ' + rule + ' test not defined.';
	            }
	        }
	    }

	    return result;
	},
	/**
	 * Performs the actual testing of the value and returns the result including any errors.
	 */
	_test: function(params, result) {
		// Check if nulls should be ignored
		if (params.hasOwnProperty('ignoreNull')) {
			if (!params.value && params.ignoreNull) {
				return;
			}
		}
	    // Create an args object for required parameters.
	    var args = this._getArgs(params),
	        // Test the value.
	        ret = params.test.validate(params.value, args);

	    result[params.rule] = {
	    	approved: true,
	    	errors: []
	    };
	    // Check if the returned value is an object.
	    if(typeof ret === 'object')
	    {
	        // An object was returned.
	        // Check if the test was successful.
	        result.approved = !ret.valid ? false : result.approved;
	        result[params.rule].approved = ret.valid;
	        // Add the error messages returned by the resluting object.
	        if (ret.hasOwnProperty('errors')) {
	        	var messages = this._formatMessages(ret.errors, params);
	            result.errors = result.errors.concat(messages);
	            result[params.rule].errors = messages;
	        }
	        // Merge any properties from the resulting object with the main result to be returned.
	        for (var prop in ret) {
	            if (ret.hasOwnProperty(prop) && !result.hasOwnProperty(prop)) {
	                result[params.rule][prop] = ret[prop];
	            }
	        }
	    } else if (typeof ret !== 'boolean') {
	        // We don't process if it's not a boolean or object.
	        throw 'approve.value(): ' + params.rule + ' returned an invalid value';
	    } else {
	        result.approved = !ret ? false : result.approved;
	        result[params.rule].approved = ret;
	    }
	    if (!result.approved) {
	    	var message = this._formatMessage(params);
	        result.errors.push(message);
	        result[params.rule].errors.push(message);
	    }
	    if (!ret.valid) {
        	result.failed.push(params.rule);
        }
	},
	/**
	 * Helper method to loop over expected test parameters.
	 */
	_eachExpected: function(params, fn) {
	    if (Array.isArray(params.test.expects)) {
	        var expectsLength = params.test.expects.length,
	            i = expectsLength;
	        // This test expects paramaters.
	        // Loop through the test's expected parameters and call the given function.
	        while (i--) {
	            fn(params.test.expects[i], expectsLength);
	        }
	    }
	},
	/**
	 * Returns an object containing the arguments for a test's expected parameters.
	 */
	_getArgs: function(params) {
	    var pars = {};
	    // Does the test for this rule expect any paramaters?
	    this._eachExpected(params, function(expects, expectsLength) {
	        // Check if the rule object has the required parameter.
	        if (params.constraint.hasOwnProperty(expects)) {
	            // Add the expected parameter value to the pars object.
	            pars[expects] = params.constraint[expects];
	        } else if (expectsLength <= 1 && (/^[A-Za-z0-9]+$/i.test(params.constraint) || toString.call(params.constraint) === '[object RegExp]')) {
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
	},
	/**
	 * Returns an object containing placholder values to correctly format an error message.
	 */
	_getFormat: function(params) {
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
	},
	/**
	 * Returns an array of formatted error messages returned by tests that return objects instead of booleans.
	 */
	_formatMessages: function(errors, params) {
	    var format = this._getFormat(params),
	        i = errors.length;
	    while (i--) {
	        errors[i] = this._format(errors[i], format);
	    }
	    return errors;
	},
	/**
	 * Returns the correctly formatted message representing the current test's failure.
	 */
	_formatMessage: function(params) {
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
	},
	/**
	 * Executes the tests based on given rules to validate a given value.
	 */
	value: function(value, rules) {

	    // If rules is not an object, we cannot continue.
	    if (typeof rules !== 'object') {
	        throw 'approve.value(value, rules): rules is not a valid object.';
	    }
	    // Return the result object.
	    return this._start(value, rules);
	},
	/**
	 * Used to add custom tests.
	 */
	addTest: function(obj, name) {
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
	}
};
