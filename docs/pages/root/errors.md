---
title: Errors
collection: root
author: Charl Gottschalk
date: 04/04/2017
version: 0.1.0
draft: false
sort: 5
---

# Errors

### Accessing Errors

You can access errors returned by the result in a few ways:

##### Errors Property

The `result.errors` property is an array containing all errors from all tests.

```javascript
var i = result.errors.length;
while(i--) {
    console.log(result.errors[i]);
}
```

##### .each Method

The result object exposes an `each()` method for easily getting to errors. This will loop through the `result.errors` property.
This method takes a single argument, a callback function that will pass an error as its first parameter.

```javascript
result.each(function(error) {
    console.log(error);
});
```

##### .filter Method

The result object exposes a `filter()` method for easily getting to errors of a specific test. This is useful if you only want to display errors for certain tests. The method takes two arguments, the first is the name of the test to filter for, and the second is a callback function that will pass an error as its first parameter i.e.

```javascript
result.filter('strength', function(error) {
    console.log(error);
});
```

##### Test Properties

The result will contain a property for each rule with the same name, that has its own properties regarding the outcome of the test. This allows you to easily access a specific test's result.

```javascript
{
    **default**
    email: {
        approved: boolean,
        errors: []
    }
}
```

This allows you to do the following as an example:

```javascript
if (!result.email.approved) {
    var i = result.email.errors.length;
    while (i--) {
        console.log(result.email.errors[i]);
    }
}
```

### Error Formatting

All default errors are automatically formatted to display correctly.

For instance, the `range` test's default error message is `'{title} must be a minimum of {min} and a maximum of {max} characters'`. As you can see, the message contains three placeholders, `{title}`, `{min}` and `{max}`. These placeholders are automatically replaced with the correct values when added to the result. 

`{min}` will be replaced by the range test's `min:?` constraint, and `{max}` with the `max:?` constraint. `{title}` will be replaced with the `title:?` property in the [**rules**](/approvejs/validation/#rules-object) object, or an empty string if the `{title:?}` property is absent.

###### Example

The rule, without the `title:?` property

```javascript
var rule = {
    range: {
        min: 5,
        max: 20
    }
};

var result = approve.value('Some text', rule);
```

will return the following result if the test fails

```javascript
{
    approved: false,
    errors: [
        'must be a minimum of 5 and a maximum of 20 characters'
    ]
}
```

If we include the `title:?` property

```javascript
var rule = {
    title: 'Username',
    range: {
        min: 5,
        max: 20
    }
};
```

the result will now be

```javascript
{
    approved: false,
    errors: [
        'Username must be a minimum of 5 and a maximum of 20 characters'
    ]
}
```
