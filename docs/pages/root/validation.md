---
title: Validation
collection: root
author: Charl Gottschalk
date: 04/04/2017
version: 0.1.0
draft: false
sort: 4
---

# Validation

Validating values with ApproveJs is easy.

To run a test, ApproveJs exposes a single method called `value()` that requires two parameters. The first parameter is the value you wish to test, and the second parameter is an object containing the rules you wish to test against.

```javascript
approve.value('value', rules);
```

<a name="rules-object"></a>

### The Rules Object:

The rules object is how you will tell ApproveJs to test your value. It is a simple object containing the name of each test to perform as a property, and it's constraints as it's value. For example:

```javascript
var rules = {
    test: constraint
};
```

Let's pretend we want to approve a value against the `email` and `required` tests.

```javascript
var rules = {
    required: true,
    email: true
};

var result = approve.value('user@domain.com', rules);
```

The above code will check whether the value is present (`required = true`) and whether it is a valid email address (`email = true`).

You'll notice we only passed a boolean as the constraint for the `required` and `email` tests. That is because the `require` and `email` tests expect no constraints. Some tests, however, expect one or more constraints. For instance:

The `min` test that checks for a minimum length, expects an integer value to test against:

```javascript
var rules = {
    min: 5
};

var result = approve.value('This text is longer than 5 characters', rules);
```

We could also pass the constraint in an object, and ApproveJs will correctly pass it to the test, for example:

```javascript
var rules = {
    min: {
        min: 5
    }
};

var result = approve.value('This text is longer than 5 characters', rules);
```

That will do exactly the same thing, although, that seems like overkill. But hang on, there's a reason for that, [configuration](/configuration).

For tests that expect more than one constraint, an object containing those is required. For instance:

The `range` test that checks whether a value has a minimum of *n* characters and a maximum of *n* characters expects `min` and `max`. For example:

```javascript
var rules = {
    range: {
        min: 5,
        max: 20
    }
};

var result = approve.value('This text is longer than 5 characters', rules);
```

*If an expected constraint is not present in the rules, ApproveJs will throw an error to the console letting you know.*

<a name="test-results"></a>

### Test Results

ApproveJS returns a default object as a result.

```javascript
{
    approved: boolean,
    errors: [],
    failed: [],
    **tests**
}
```

`result.approved` will be `true` if all the tests passed, otherwise `false` .

`result.errors` is an array containing all error messages of all failed tests.

`result.failed` is an array containing a list of tests that failed i.e.

```javascript
{
    failed: [
        'required',
        'email'
    ]
}
```

The result will also contain a property for each test that was performed and its own errors i.e.

Consider the following code:

```javascript
var rules = {
    required: true,
    email: true
};

var result = approve.value('example@domain.com', rules);
```

The result will contain a property for each rule with the same name, that has its own properties regarding the outcome of the test i.e.

```javascript
{
    approved: boolean,
    errors: [],
    failed: [],
    required: {
        approved: boolean,
        errors: []
    },
    email: {
        approved: boolean,
        errors: []
    }
}
```

This allows you easier access to specific test results.

---

#### Note

Some tests, such as [strength](/tests#strength), might return additional properties with its result. Learn more from [built in tests](/tests).