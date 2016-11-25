# ApproveJs
#### A simple validation library that doesn't interfere
![semver 2.1.0](https://img.shields.io/badge/semver-2.1.0-green.svg) [![Build Status](https://travis-ci.org/CharlGottschalk/approvejs.svg?branch=master)](https://travis-ci.org/CharlGottschalk/approvejs)

---

ApproveJs doesn't automatically attach itself to input change events or form submit events. It also doesn't manipulate the DOM for you by automatically displaying errors. This allows you to handle validation how you want.

ApproveJs exposes a single method, `value()` and leaves you to decide when a value is validated and how errors are displayed.

Using ApproveJs, you can automate validation however you please.

If you like to be in control or have a little OCD like me, ApproveJs is for you.

ApproveJS is also easily extended with [custom tests](http://charlgottschalk.co.za/projects/approvejs/docs/master/custom-tests).

---

### Installation

##### Standalone

<a href="https://github.com/CharlGottschalk/approvejs/releases/latest"
style="color: #fff; background-color: #6496c8; margin: 0 10px 0 0; padding: 15px 45px; font-size: 32px; line-height: 1.8; box-shadow: 0 2px 2px rgba(204, 197, 185, 0.5);"> Download Latest Release </a>

Add a `script` tag to the library before the end of your closing `<body>` tag

```html
<script src="path/to/approve.min.js"></script>
```

##### Bower

In your terminal run:

```
$ bower install approvejs
```

Add a `script` tag to the library before the end of your closing `<body>` tag

```html
<script src="path/to/bower_components/approvejs/dist/approve.min.js"></script>
```


##### Node

In your terminal run:

```
$ npm install approvejs
```

or if you're using [Yarn](https://yarnpkg.com/)

```
$ yarn add approvejs
```

Require `approvejs`.

```javascript
var approve = require('approvejs');
```

---

### Usage

ApproveJS exposes a single method `value` that takes two parameters.

The first parameter is the value to validate and the second is the set of rules to test against.

```javascript
var rules = {
    required: true,
    email: true
};

var result = approve.value('user@domain.com', rules);
```

The returned `result` contains two properties:

```javascript
{
    approved: boolean,
    errors: []
}
```

#### Accessing Errors

You can access errors returned by the result in one of two ways:

##### Errors Property

```javascript
var i = result.errors.length;
while(i--) {
    console.log(result.errors[i]);
}
```

##### `.each` Method

The result object exposes an `each()` method for easily getting to errors.

```javascript
result.each(function(error) {
    console.log(error);
});
```

---

View the [project page](http://charlgottschalk.co.za/projects/approvejs) for [demos](http://charlgottschalk.co.za/projects/approvejs/demo) and [documentation](http://charlgottschalk.co.za/projects/approvejs/docs) on rules and extending ApproveJs with your own tests.

If you would like to contribute to the project, please read [contributing](http://charlgottschalk.co.za/projects/approvejs/docs/contributing).