---
title: Custom Tests
collection: root
author: Charl Gottschalk
date: 04/04/2017
version: 0.1.0
draft: false
sort: 8
---

# Custom Tests

Sometimes you may need a custom test that is not available in ApproveJs. 
Here is how you can extend the ApproveJs tests with your own.

An ApproveJs test is just an object with two required properties and one required function.

Let's create a new test that checks whether a value starts with a certain string and ends with another.

Start by instantiating a new object:

```javascript
var myTest = {};
```

Your test **MUST** have the following two properties:

`expects` - Expects is either false if your test expects no constraints or an array of strings with the names of the expected constraints. For example:

Our new test will expect `startsWith` and `endsWith`. Let's add them:

```javascript
var myTest = {
    expects = [
        'startsWith',
        'endsWith'
    ]
};
```

The next required property is `message`, which will hold the default error message to return if a value fails our test.

```javascript
var myTest = {
    expects = [
        'startsWith',
        'endsWith'
    ],
    message = '{title} must start with {startswith} and end with {endsWith}.'
};
```

_You'll notice three placeholders in the message. You can read more about that at [errors](/approvejs/errors/#error-formatting)._

Great, now we only need the required method that will perform our test when called by ApproveJs, `validate()`. ApproveJs will automatically call this function when testing a value against our test, and pass the value being tested as the first parameter, and the expected constraints as properties of an object, as the second parameter.

```javascript
var myTest = {
    expects = [
        'startsWith',
        'endsWith'
    ],
    message = '{title} must start with {startswith} and end with {endsWith}.',
    validate = function (value, pars) {
        return value.startsWith(pars.startsWith) && value.endsWith(pars.endsWith);
    }
};
```

And that's it. Now we can add the test to ApproveJs. That's easy too, thanks to the `addTest()` method. 

The `addTest()` method expects two parameters:

The first parameter is the test object, like the one we just created, and the second parameter is the name of the test, as it will be accessed by a [rules](/approvejs/validation/#rules-object) object.

```javascript
var myTest = {
    expects = [
        'startsWith',
        'endsWith'
    ],
    message = '{title} must start with {startswith} and end with {endsWith}.',
    validate = function (value, pars) {
        return value.startsWith(pars.startsWith) && value.endsWith(pars.endsWith);
    }
};
// Add the test to ApproveJs
approve.addTest(myTest, 'myTest');
```

Awesome! Now we can use our new test:

```javascript
// Let's instantiate a rules object.
var rule = {
    myTest: {
        startswith: 'Hello',
        endsWith: 'world'
    }
};
// Let's test a value with our new test.
var result = approve.value('Hello crazy world', rule);
```

---

That was simple, but what if we want to return more detail? For instance, the built-in [`strength`](/approvejs/tests/#strength) test returns a score object with the test result.

Well, that's easy. Your test's `validate()` function can simply return an object, which ApproveJs will merge with the result object of the main `approve.value()` function.

However, for it to work properly, your object **MUST** have the following.

`valid` - A boolean letting ApproveJs know whether your test succeeded or not, so you need to set this property to `true` if it succeeded, otherwise `false`.

`errors` - An array of strings containing the errrors of your test. ApproveJs will automatically merge the errors with the main result object and format them. 

_\*Remember to add at least the `{title}` placeholder in order for ApproveJs to correctly format the error message._

Continuing from the previous example, let's update it's validate function.

```javascript
var myTest = {
    expects = [
        'startsWith',
        'endsWith'
    ],
    message = '{title} must start with {startswith} and end with {endsWith}.',
    validate = function (value, pars) {
        var result = {
            valid: true,
            level: 'Puny Human!',
            errors: []
       };
       if (value.indexOf('Captain Picard') >= 0)
       {
            result.valid = true;
            result.level = 'Boss!';
       } else {
            return value.startsWith(pars.startsWith) && value.endsWith(pars.endsWith);
       }
       return result;
    }
};
```

Now let's test a value:

```javascript
// Let's instantiate a rules object.
var rule = {
    myTest: {
        startswith: 'Hello',
        endsWith: 'world'
    }
};
// Let's test a value with our new test.
var result = approve.value('Captain Picard', rule);
// Did we pass the test?
if (!result.approved) {
    // Nope we failed. Let's log the errors.
    result.each(function(error) {
        console.log(error);
    });
    // Let's just alert the level of this result as well.
    alert('You are a ' + result.myTest.level);
}
```

Notice how the level property of the custom test's result, was merged with the main result. Neat!.

And that's it.