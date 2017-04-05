---
title: Configuration
collection: root
author: Charl Gottschalk
date: 04/04/2017
version: 0.1.0
draft: false
sort: 6
---

# Configuration

### Stop Testing

By default, ApproveJs will continue testing every rule and return all tests' error messages. For example:

```javascript
var rules = {
   required: true,
   email: true
};

var result = approve.value('', rules);
```

The above code will check whether the value is present (`required = true`) and whether it is a valid email address (`email = true`). Should the value fail the `required` rule, ApproveJs will continue and also test the `email` rule, returning errors for both tests.

It makes sense though, that if the value fails the `required` test, that it will automatically fail the `email` test, so you might want to stop testing and return only the errors for the failed `required` test. For this we use the `stop` property which will stop all testing after the first failed rule, i.e.

```javascript
var rules = {
   stop: true,
   required: true,
   email: true
};

var result = approve.value('', rules);
```

Now, should the `required` rule fail\*, ApproveJS will stop all testing and return only the error messages for the `required` rule.

_\*Property order cannot be guaranteed, hence tests might not run in the order in which they appear in the rules object._

### Ignore `null` Values

By default, ApproveJs tests will fail if the given value is `null`. For example:

```javascript
var rules = {
   required: true,
   email: true
};

var result = approve.value(null, rules);
```

The above test will fail because the value is `null`.

In certain cases, where fields should be tested only if a value is given, such as an address field that might be `null`, we can ignore testing the value. For example:

**Below test will pass**

```javascript
var rules = {
   ignoreNull: true,
   required: true,
   email: true
};

var result = approve.value(null, rules);
```

**Below test will fail**

```javascript
var rules = {
   required: true,
   email: true
};

var result = approve.value(null, rules);
```

### Custom Error Messages

Each test in ApproveJs has its own default error message. If you want to return a custom message for a test, you can pass the message in the constraint. For example:

```javascript
var rules = {
   email: {
      message: 'Email is not a valid email address'
   }
};

var result = approve.value('user@domain.com', rules);
```

Now, if the test should fail, your message will be passed along with the result.

For tests that expect parameters, the code is the same:

***Single parameter tests***

```javascript
var rules = {
   min: {
      min: 5,
      message: 'The text must be at least 5 characters'
   }
};
```

***Multiple parameter tests***

```javascript
var rules = {
   range: {
      min: 5,
      max: 20,
      message: 'The text must be at least 5 characters, and no more than 20 characters'
   }
};
```

If you do not pass a custom error message with your rules, the default message for each test will be used. 

### Title

ApproveJs automatically formats all error messages for you by replacing placeholders with values. Each default message has a `{title}` placeholder. This placeholder is replaced with the title of your value, but before ApproveJs can format the message, you need to provide the title, otherwise it will simply be replaced with an empty string.

You can pass the title of your value by adding a `title` property to the rules object:

```javascript
var rules = {
   title: 'Username',
   test: constraint
};
```

### Test Configuration

Some tests might have configurable options. For instance, in addition to the default error message, the [`strength`](/approvejs/docs/tests/#strength) test returns other errors regarding the score. Those error messages can be replaced with your own.

To send configuration along to the test, simply add a `config` property to the test constraints in the [rules object](/approvejs/docs/validation/#rules-object), and ApproveJs will pass it to the test.

For configurable options, check the [built-in tests](/approvejs/docs/tests) *Options*.

###### Example

For the strength test, let's configure the default score error messages:

```javascript
var rules = {
   strength: {
      min: 8,
      bonus: 10,
      // Config
      config: {
         // Configurable property
         messages: {
            isMinimum: '{title} must be a minimum of {min} characters',
            hasLower: '{title} must have at least 1 lower case character',
            hasUpper: '{title} must have at least 1 upper case character',
            hasNumber: '{title} must have at least 1 number',
            hasSpecial: '{title} must have at least 1 special character'
         }
      }
   }
};
var result = approve.value('Some Text', rules);
```