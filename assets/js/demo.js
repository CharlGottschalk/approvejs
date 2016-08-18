new Vue({
    el: '#demo',
    data: {
        requiredTest: {
            class: {
                'has-error': false,
                'has-success': false
            },
            value: '',
            result: {},
            rules: {
                title: 'Required', 
                required: true
            }
        },
        emailTest: {
            class: {
                'has-error': false,
                'has-success': false
            },
            value: '',
            result: {},
            rules: {
                title: 'Email', 
                email: true
            }
        },
        urlTest: {
            class: {
                'has-error': false,
                'has-success': false
            },
            value: '',
            result: {},
            rules: {
                title: 'Url', 
                url: true
            }
        },
        ccTest: {
            class: {
                'has-error': false,
                'has-success': false
            },
            value: '',
            result: {},
            rules: {
                title: 'Credit Card', 
                cc: true
            }
        },
        alphaNumericTest: {
            class: {
                'has-error': false,
                'has-success': false
            },
            value: '',
            result: {},
            rules: {
                title: 'Alphanumeric', 
                alphaNumeric: true
            }
        },
        alphaTest: {
            class: {
                'has-error': false,
                'has-success': false
            },
            value: '',
            result: {},
            rules: {
                title: 'Alpha', 
                alpha: true
            }
        },
        numericTest: {
            class: {
                'has-error': false,
                'has-success': false
            },
            value: '',
            result: {},
            rules: {
                title: 'Numeric', 
                numeric: true
            }
        },
        decimalTest: {
            class: {
                'has-error': false,
                'has-success': false
            },
            value: '',
            result: {},
            rules: {
                title: 'Decimal', 
                decimal: true
            }
        },
        currencyTest: {
            class: {
                'has-error': false,
                'has-success': false
            },
            value: '',
            result: {},
            rules: {
                title: 'Currency', 
                currency: true
            }
        },
        ipTest: {
            class: {
                'has-error': false,
                'has-success': false
            },
            value: '',
            result: {},
            rules: {
                title: 'Ip', 
                ip: true
            }
        },
        minTest: {
            class: {
                'has-error': false,
                'has-success': false
            },
            value: '',
            result: {},
            rules: {
                title: 'Min', 
                min: 6
            }
        },
        maxTest: {
            class: {
                'has-error': false,
                'has-success': false
            },
            value: '',
            result: {},
            rules: {
                title: 'Max', 
                max: 8
            }
        },
        rangeTest: {
            class: {
                'has-error': false,
                'has-success': false
            },
            value: '',
            result: {},
            rules: {
                title: 'Range', 
                range: {
                    min: 6,
                    max: 8
                }
            }
        },
        equalTest: {
            class: {
                'has-error': false,
                'has-success': false
            },
            value: '',
            result: {},
            rules: {
                title: 'Password Confirmation', 
                equal: {
                    value: '',
                    field: 'Password'
                }
            }
        },
        formatTest: {
            class: {
                'has-error': false,
                'has-success': false
            },
            value: '',
            result: {},
            rules: {
                title: 'Format', 
                format: {
                    regex: /^[a-z]+$/
                }
            }
        },
        strengthTest: {
            class: {
                'has-error': false,
                'has-success': false
            },
            value: '',
            result: {},
            rules: {
                title: 'Password', 
                strength: {
                    min: 8,
                    bonus: 10
                }
            }
        }
    },
    methods: {
        run: function(test) {
            var result = approve.value(this[test].value, this[test].rules);
            this[test].class = this.getClass(result.approved);
            this[test].result = result;
        },
        getClass: function(approved) {
            return {
                'has-error': !approved,
                'has-success': approved
            };
        }
    },
    ready: function() {
    }
});