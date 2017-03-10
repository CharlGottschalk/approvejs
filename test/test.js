'use strict';

var expect = require('chai').expect;
var approve = require('../dist/approve.js');

// The main library
describe('ApproveJs', function() {
    it('should be accessible from \'approve\' variable', function() {
        var is = approve ? true : false;
        expect(is).to.equal(true);
    });
    // The tests
    describe('Tests', function() {
	    // required
	    it('should be able to approve a required value', function() {
	        var is = approve.value('Hello', {required: true}).approved,
	            not = approve.value('', {required: true}).approved;
	        expect(is).to.equal(true);
	        expect(not).to.equal(false);
	    });
	    // email
	    it('should be able to approve an email address', function() {
	        var is = approve.value('user@domain.com', {email: true}).approved,
	            not = approve.value('fake.email', {email: true}).approved;
	        expect(is).to.equal(true);
	        expect(not).to.equal(false);
	    });
	    // url
	    it('should be able to approve a web address', function() {
	        var dom1 = approve.value('http://domain.com', {url: true}).approved,
	            dom2 = approve.value('http://www.domain.com', {url: true}).approved,
	            dom3 = approve.value('www.domain.com', {url: true}).approved,
	            dom4 = approve.value('www.domain.com/page', {url: true}).approved,
	            dom5 = approve.value('www.domain.com/?hello=world', {url: true}).approved,
	            dom6 = approve.value('www.domain.com/#fragment', {url: true}).approved,
	            is = dom1 && dom2 && dom3 && dom4 && dom5 && dom6,
	            not = approve.value('hello world', {url: true}).approved;
	        expect(is).to.equal(true);
	        expect(not).to.equal(false);
	    });
	    // cc
	    it('should be able to approve a credit card number', function() {
	    	var testnumbers = [
		            4222222222222,
		            4012888888881881,
		            4111111111111111,
		            5105105105105100,
		            5555555555554444,
		            3566002020360505,
		            3530111333300000,
		            6011000990139424,
		            6011111111111117,
		            6011601160116611,
		            38520000023237,
		            30569309025904,
		            378734493671000,
		            371449635398431,
		            378282246310005,
		            341111111111111,
		            5431111111111111,
		            5610591081018250,
		            5019717010103742,
		            6331101999990016
		        ],
	            is = true,
	            not = approve.value('6356565786896346', {cc: true}).approved;
	            var rule = {
	            	cc: true
	            };
	            for (var i = testnumbers.length - 1; i >= 0; i--) {
	            	if (!approve.value(testnumbers[i], rule).approved) {
	            		is = false;
	            	}
	            };
	        expect(is).to.equal(true);
	        expect(not).to.equal(false);
	    });
	    // alphaNumeric
	    it('should be able to approve alpha numeric characters', function() {
	        var is = approve.value('000', {alphaNumeric: true}).approved,
	            not = approve.value('Hello World', {alphaNumeric: true}).approved;
	        expect(is).to.equal(true);
	        expect(not).to.equal(false);
	    });
	    // numeric
	    it('should be able to approve numeric characters', function() {
	        var is = approve.value('000', {numeric: true}).approved,
	            not = approve.value('aaa', {numeric: true}).approved;
	        expect(is).to.equal(true);
	        expect(not).to.equal(false);
	    });
	    // alpha
	    it('should be able to approve alpha characters', function() {
	        var is = approve.value('aaa', {alpha: true}).approved,
	            not = approve.value('000', {alpha: true}).approved;
	        expect(is).to.equal(true);
	        expect(not).to.equal(false);
	    });
	    // decimal
	    it('should be able to approve decimal values', function() {
	        var is = approve.value('10.000', {decimal: true}).approved,
	            not = approve.value('1,0', {decimal: true}).approved;     
	        expect(is).to.equal(true);
	        expect(not).to.equal(false);
	    });
	    // currency
	    it('should be able to approve currency values', function() {
	        var cur1 = approve.value('10.00', {currency: true}).approved,
	            cur2 = approve.value('10', {currency: true}).approved,
	            is = cur1 && cur2,
	            not = approve.value('10.000', {currency: true}).approved;
	        expect(is).to.equal(true);
	        expect(not).to.equal(false);
	    });
	    // ip
	    it('should be able to approve ip addresses', function() {
	        var ipv4 = approve.value('172.16.112.50', {ip: true}).approved,
	        	ipv4Cidr = approve.value('172.16.112.50/11', {ip: true}).approved,
	            ipv6 = approve.value('3ffe:1900:4545:3:200:f8ff:fe21:67cf', {ip: true}).approved,
	            ipv6Cidr = approve.value('0000:0000:0000:0000:0000:0000:0000:0000/19', {ip: true}).approved,
	            is = ipv4 && ipv6 && ipv4Cidr && ipv6Cidr,
	            not = approve.value('172.16.5.2.40', {ip: true}).approved;
	        expect(is).to.equal(true);
	        expect(not).to.equal(false);
	    });
	    // min
	    it('should be able to approve minimum length', function() {
	        var is = approve.value('123456', {min: 6}).approved,
	            not = approve.value('12345', {min: 6}).approved;
	        expect(is).to.equal(true);
	        expect(not).to.equal(false);
	    });
	    // max
	    it('should be able to approve maximum length', function() {
	        var is = approve.value('123456', {max: 6}).approved,
	            not = approve.value('1234567', {max: 6}).approved;
	        expect(is).to.equal(true);
	        expect(not).to.equal(false);
	    });
	    // range
	    it('should be able to approve a string\'s length or number between minimum and maximum', function() {
	        var is = approve.value('1234567', {range: {min: 6, max: 8}}).approved,
	            tooShort = approve.value('12345', {range: {min: 6, max: 8}}).approved,
	            tooLong = approve.value('123456789', {range: {min: 6, max: 8}}).approved,
	            numFail = approve.value(10, {range: {min: 6, max: 8}}).approved,
	            numPass = approve.value(7, {range: {min: 6, max: 8}}).approved,
	            not = !!tooShort && !!tooLong;
	        expect(is).to.equal(true);
	        expect(not).to.equal(false);
	        expect(numFail).to.equal(false);
	        expect(numPass).to.equal(true);
	    });
	    // equal
	    it('should be able to approve that values are equal', function() {
	        var is = approve.value('123456', {equal: {value: '123456', field: 'is equal'}}).approved,
	            not = approve.value('1234567', {equal: {value: '123456', field: 'is not equal'}}).approved;
	        expect(is).to.equal(true);
	        expect(not).to.equal(false);
	    });
	    // format
	    it('should be able to approve with a custom format', function() {
	        var is = approve.value('AbCd', {format: /^[A-Za-z]+$/}).approved,
	            not = approve.value('12345', {format: /^[A-Za-z]+$/}).approved;
	        expect(is).to.equal(true);
	        expect(not).to.equal(false);
	    });
	    // time
	    it('should be able to approve time strings', function() {
	        var is = approve.value('12:25:30', {time: true}).approved,
	            not = approve.value('000', {time: true}).approved;
	        expect(is).to.equal(true);
	        expect(not).to.equal(false);
	    });
	    // date
	    it('should be able to approve date strings', function() {
	        var isymd = approve.value('2016-10-25', {date: 'ymd'}).approved,
	        	isdmy = approve.value('31/10/16', {date: {format: 'dmy'}}).approved,
	            notymd = approve.value('2016-25-23', {date: 'ymd'}).approved,
	            notdmy = approve.value('25-23-16', {date: {format: 'dmy'}}).approved;
	        expect(isymd).to.equal(true);
	        expect(isdmy).to.equal(true);
	        expect(notymd).to.equal(false);
	        expect(notdmy).to.equal(false);
	    });
	    // truthy
	    it('should be able to approve truthy values', function() {
	        var yes = approve.value('yes', {truthy: true}).approved,
	        	truth = approve.value('true', {truthy: true}).approved,
	        	one = approve.value('1', {truthy: true}).approved,
	        	ok = approve.value('ok', {truthy: true}).approved,
	        	is = yes && truth && one && ok,
	        	no = approve.value('no', {truthy: true}).approved,
	        	falsy = approve.value('false', {truthy: true}).approved,
	        	zero = approve.value('0', {truthy: true}).approved,
	        	notOk = approve.value('nope', {truthy: true}).approved,
	            not = !!no && !!falsy && !!zero && !!notOk;
	        expect(is).to.equal(true);
	        expect(not).to.equal(false);
	    });
	    // falsy
	    it('should be able to approve falsy values', function() {
	        var yes = approve.value('yes', {falsy: true}).approved,
	        	truth = approve.value('true', {falsy: true}).approved,
	        	one = approve.value('1', {falsy: true}).approved,
	        	ok = approve.value('ok', {falsy: true}).approved,
	        	not = !!yes && !!truth && !!one && !!ok,
	        	no = approve.value('no', {falsy: true}).approved,
	        	falsy = approve.value('false', {falsy: true}).approved,
	        	zero = approve.value('0', {falsy: true}).approved,
	        	notOk = approve.value('nope', {falsy: true}).approved,
	        	is = no && falsy && zero && notOk;
	            
	        expect(is).to.equal(true);
	        expect(not).to.equal(false);
	    });
	    // strength
	    it('should be able to approve the strength of a password', function() {
	    	var rule = {
	    		strength: {
	    			min: 6,
	    			bonus: 7
	    		}
	    	};
	        var result = approve.value('th!sIsaStr0ngPas$w0rd', rule),
	        	is = result.approved,
	        	has = result.strength.hasOwnProperty('points'),
	            not = approve.value('Pfft!', rule).approved;
	        expect(is).to.equal(true);
	        expect(has).to.equal(true);
	        expect(not).to.equal(false);
	    });
	    // multiple
	    it('should be able to approve multiple tests', function() {
	    	var rule = {
	    		required: true,
	    		min: 6,
	    		max: 12
	    	};
	        var is = approve.value('lorem ipsum', rule).approved,
	        	invalidMin = approve.value('lorem', rule).approved,
	        	invalidMax = approve.value('lorem ipsum dolar', rule).approved,
	        	not = approve.value('', rule).approved;
	        expect(is).to.equal(true);
	        expect(invalidMin).to.equal(false);
	        expect(invalidMax).to.equal(false);
	        expect(not).to.equal(false);
	    });
	    // stop
	    it('should be able to stop after first failed test if stop = true', function() {
	    	var rule = {
	    		stop: true,
	    		email: true,
	    		required: true
	    	};
	        var result = approve.value('', rule),
	        	stopped = result.errors.length === 1;

	        expect(stopped).to.equal(true);
	    });
	    // continue
	    it('should be able to continue all tests if stop = false', function() {
	    	var ruleFalse = {
	    		stop: false,
	    		required: true,
	    		email: true
	    	};
	    	var ruleAbsent = {
	    		required: true,
	    		email: true
	    	};
	        var resultFalse = approve.value('', ruleFalse),
	        	resultAbsent = approve.value('', ruleAbsent),
	        	continuedFalse = resultFalse.errors.length > 1,
	        	continuedAbsent = resultAbsent.errors.length > 1;

	        expect(continuedFalse).to.equal(true);
	        expect(continuedAbsent).to.equal(true);
	    });
	    // ignore null value
	    it('should be able to ignore null values', function() {
	    	var rule = {
	    		ignoreNull: true,
	    		email: true,
	    		required: true
	    	};
	        var result = approve.value(null, rule),
	        	ignored = result.errors.length === 0;

	        expect(ignored).to.equal(true);
	    });
	    // do not ignore null
	    it('should be able to test null values', function() {
	    	var rule = {
	    		email: true,
	    		required: true
	    	};
	        var result = approve.value(null, rule),
	        	ignored = result.errors.length > 0;

	        expect(ignored).to.equal(true);
	    });
	    // errors
	    it('should be able to correctly format an error message', function() {
	        var fromProp = approve.value('not an email', {email: true, title: 'Email'}),
	        	noTitle = approve.value('not an email', {email: true}),
	        	isFromProp = fromProp.errors[0] === 'Email must be a valid email address',
	        	isNoTitle = noTitle.errors[0] === 'must be a valid email address';
	        expect(isFromProp).to.equal(true);
	        expect(isNoTitle).to.equal(true);
	    });
	    // config
	    it('should be configurable', function() {
	    	var rule = {
	    		title: 'password',
	    		strength: {
	    			min: 6,
	    			bonus: 7,
	    			config: {
	    				messages: {
	    					hasLower: 'At least one lower case letter expected from {title}'
	    				}
	    			}
	    		}
	    	};
	        var result = approve.value('@THISI$ASTR0NGPASSW0RD', rule),
	        	is = result.errors[0] === 'At least one lower case letter expected from password';
	        expect(is).to.equal(true);
	    });
	    // =========================================
	    // Add additional / new test testing here
	    // =========================================

	    // it('should ...', function() {
	    // 	// Get test results
	    // 	expect(is).to.equal(true);
	    // 	expect(not).to.equal(false);
	    // });
	});
	describe('Results', function() {
		// result
	    it('should contain test result properties', function() {
	    	var rule = {
	    		required: true,
	    		email: true
	    	};
	        var is = approve.value('example@domain.com', rule).required.approved,
	        	not = approve.value('lorem ipsum', rule).email.approved;
	        expect(is).to.equal(true);
	        expect(not).to.equal(false);
	    });
	    // failed
	    it('should contain failed tests array', function() {
	    	var rule = {
	    		required: true,
	    		email: true
	    	};
	        var result = approve.value('', rule),
	        	is = result.failed.length > 0;
	        expect(is).to.equal(true);
	    });
	});
	// =========================================
    // Add additional / new feature testing here
    // =========================================

    // describe('[new_feature]', function() {
    // 	it('should ...', function() {
	   //  	// Test feature
	   //  	expect(is).to.equal(true);
	   //  	expect(not).to.equal(false);
	   //  });
    // });
});
