# ApproveJs
#### A simple validation library that doesn't interfere
![release](https://img.shields.io/github/release/charlgottschalk/approvejs.svg) ![npm](https://img.shields.io/npm/v/approvejs.svg) [![CDNJS](https://img.shields.io/cdnjs/v/approvejs.svg)](https://cdnjs.com/libraries/approvejs) [![Build Status](https://travis-ci.org/CharlGottschalk/approvejs.svg?branch=master)](https://travis-ci.org/CharlGottschalk/approvejs) ![downloads](https://img.shields.io/npm/dt/approvejs.svg)

---

ApproveJs doesn't automatically attach itself to input change events or form submit events. It also doesn't manipulate the DOM for you by automatically displaying errors. This allows you to automate validation how you want.

With a single method (`approve.value()`), you can decide how to handle validation.

If you like to be in control or have a little OCD like me, ApproveJs is for you.

ApproveJs is also easily extended with [custom tests](https://charlgottschalk.github.io/approvejs/docs/custom-tests).

---

### Installation

##### Standalone

[Download Latest Release](https://github.com/CharlGottschalk/approvejs/archive/master.zip)

Unzip `master.zip` into your desired folder and add a `script` tag to the library before the end of your closing `<body>` tag

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

##### cdnjs

Add a `script` tag to the library CDN url before the end of your closing `<body>` tag

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/approvejs/[version]/approve.min.js"></script>
```

Get the cdn urls from [here](https://cdnjs.com/libraries/approvejs)

*Many thanks to [cdnjs](https://cdnjs.com/) who kindly hosts ApproveJS through a reliable CDN*

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

Read [documentation here](https://charlgottschalk.github.io/approvejs/docs/).

If you would like to contribute to the project, please read [contributing](https://charlgottschalk.github.io/approvejs/docs/contributing/).
