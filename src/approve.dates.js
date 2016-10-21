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
