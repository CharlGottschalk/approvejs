describe("ApproveJs", function() {

    it("should be accessible from 'approve' variable", function() {
        var is = approve.NAME === 'ApproveJs' ? true : false;
        expect(is).toBe(true);
    });

    it("should have the 'Strength' test", function() {
        var is = typeof approve.tests.strength === 'object' ? true : false;
        expect(is).toBe(true);
    });

    describe("Tests", function() {
	    // required
	    it("should be able to approve a required value", function() {
	        var is = approve.value('Hello', {required: true}).approved,
	            not = approve.value('', {required: true}).approved;
	        expect(is).toBe(true);
	        expect(not).toBe(false);
	    });
	    // email
	    it("should be able to approve an email address", function() {
	        var is = approve.value('user@domain.com', {email: true}).approved,
	            not = approve.value('fake.email', {email: true}).approved;
	        expect(is).toBe(true);
	        expect(not).toBe(false);
	    });
	    // url
	    it("should be able to approve a web address", function() {
	        var dom1 = approve.value('http://domain.com', {url: true}).approved,
	            dom2 = approve.value('http://www.domain.com', {url: true}).approved,
	            dom3 = approve.value('www.domain.com', {url: true}).approved,
	            dom4 = approve.value('www.domain.com/page', {url: true}).approved,
	            dom5 = approve.value('www.domain.com/?hello=world', {url: true}).approved,
	            dom6 = approve.value('www.domain.com/#fragment', {url: true}).approved,
	            is = dom1 && dom2 && dom3 && dom4 && dom5 && dom6,
	            not = approve.value('hello world', {url: true}).approved;
	        expect(is).toBe(true);
	        expect(not).toBe(false);
	    });
	    // cc
	    it("should be able to approve a credit card number", function() {
	        var amex = approve.value('347658560901701', {cc: true}).approved,
	            discover = approve.value('6011261363394257', {cc: true}).approved,
	            master = approve.value('6011261363394257', {cc: true}).approved,
	            visa = approve.value('4539326399580936', {cc: true}).approved,
	            is = amex && discover && master && visa,
	            not = approve.value('6356565786896346', {email: true}).approved;
	        expect(is).toBe(true);
	        expect(not).toBe(false);
	    });
	    // alphaNumeric
	    it("should be able to approve alpha numeric characters", function() {
	        var is = approve.value('000', {alphaNumeric: true}).approved,
	            not = approve.value('Hello World', {alphaNumeric: true}).approved;
	        expect(is).toBe(true);
	        expect(not).toBe(false);
	    });
	    // numeric
	    it("should be able to approve numeric characters", function() {
	        var is = approve.value('000', {numeric: true}).approved,
	            not = approve.value('aaa', {numeric: true}).approved;
	        expect(is).toBe(true);
	        expect(not).toBe(false);
	    });
	    // alpha
	    it("should be able to approve alpha characters", function() {
	        var is = approve.value('aaa', {alpha: true}).approved,
	            not = approve.value('000', {alpha: true}).approved;
	        expect(is).toBe(true);
	        expect(not).toBe(false);
	    });
	    // decimal
	    it("should be able to approve decimal values", function() {
	        var is = approve.value('10.000', {decimal: true}).approved,
	            not = approve.value('1,0', {decimal: true}).approved;     
	        expect(is).toBe(true);
	        expect(not).toBe(false);
	    });
	    // currency
	    it("should be able to approve currency values", function() {
	        var cur1 = approve.value('10.00', {currency: true}).approved,
	            cur2 = approve.value('10', {currency: true}).approved,
	            is = cur1 && cur2,
	            not = approve.value('10.000', {currency: true}).approved;
	        expect(is).toBe(true);
	        expect(not).toBe(false);
	    });
	    // ip
	    it("should be able to approve ip addresses", function() {
	        var ipv4 = approve.value('172.16.112.50', {ip: true}).approved,
	            ipv6 = approve.value('3ffe:1900:4545:3:200:f8ff:fe21:67cf', {ip: true}).approved,
	            is = ipv4 && ipv6,
	            not = approve.value('172.16.5.2.40', {ip: true}).approved;
	        expect(is).toBe(true);
	        expect(not).toBe(false);
	    });
	    // min
	    it("should be able to approve minimum length", function() {
	        var is = approve.value('123456', {min: 6}).approved,
	            not = approve.value('12345', {min: 6}).approved;
	        expect(is).toBe(true);
	        expect(not).toBe(false);
	    });
	    // max
	    it("should be able to approve maximum length", function() {
	        var is = approve.value('123456', {max: 6}).approved,
	            not = approve.value('1234567', {max: 6}).approved;
	        expect(is).toBe(true);
	        expect(not).toBe(false);
	    });
	    // range
	    it("should be able to approve length between minimum and maximum", function() {
	        var is = approve.value('1234567', {range: {min: 6, max: 8}}).approved,
	            tooShort = approve.value('12345', {range: {min: 6, max: 8}}).approved,
	            tooLong = approve.value('123456789', {range: {min: 6, max: 8}}).approved
	            not = !!tooShort && !!tooLong;
	        expect(is).toBe(true);
	        expect(not).toBe(false);
	    });
	    // equal
	    it("should be able to approve that values are equal", function() {
	        var eq1 = approve.value('123456', {equal: {field: 'equal1'}}).approved,
	            eq2 = approve.value(2001, {equal: 'equal2'}).approved,
	            is = eq1 && eq2,
	            not = approve.value('1234567', {equal: {field: 'equal1'}}).approved;
	        expect(is).toBe(true);
	        expect(not).toBe(false);
	    });
	    // format
	    it("should be able to approve with a custom format", function() {
	        var is = approve.value('AbCd', {format: {regex: /^[A-Za-z]+$/}}).approved,
	            not = approve.value('12345', {format: {regex: /^[A-Za-z]+$/}}).approved;
	        expect(is).toBe(true);
	        expect(not).toBe(false);
	    });
	    // strength
	    it("should be able to approve the strength of a password", function() {
	        var result = approve.value('th!sIsaStr0ngPas$w0rd', {strength: true}),
	        	is = result.approved,
	        	has = result.hasOwnProperty('score'),
	            not = approve.value('Pfft!', {strength: true}).approved;
	        expect(is).toBe(true);
	        expect(has).toBe(true);
	        expect(not).toBe(false);
	    });
	    // errors
	    it("should be able to correctly format an error message", function() {
	        var fromPar = approve.value('not an email', {email: true}, 'Email'),
	        	fromProp = approve.value('not an email', {email: true, title: 'Email'}),
	        	noTitle = approve.value('not an email', {email: true}),
	        	isFromPar = fromPar.errors[0] === 'Email must be a valid email address',
	        	isFromProp = fromProp.errors[0] === 'Email must be a valid email address',
	        	isNoTitle = noTitle.errors[0] === 'must be a valid email address';
	        expect(isFromPar).toBe(true);
	        expect(isFromProp).toBe(true);
	        expect(isNoTitle).toBe(true);
	    });
	    // config
	    it("should be configurable", function() {
	        var is = approve.tests.required.message === '{title} is a required value';
	        expect(is).toBe(true);
	    });

	});	
    
});
