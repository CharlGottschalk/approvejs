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
