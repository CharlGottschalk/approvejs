# ApproveJs
#### A simple validation library that doesn't interfere
![stable 1.0.2](https://img.shields.io/badge/stable-1.0.2-green.svg) [![Build Status](https://travis-ci.org/CharlGottschalk/approvejs.svg?branch=master)](https://travis-ci.org/CharlGottschalk/approvejs)

When I say, doesn't interfere, I mean it doesn't attach itself to input change events or form submit events. It also doesn't manipulate the DOM for you by automatically displaying errors.

ApproveJs exposes a single method, `value()` and leaves you to decide when a value is validated and how errors are displayed.

Using ApproveJs, you can automate validation however you please.

Personally, I use [Vue.js](http://vuejs.org/guide/events.html) and use bindings to handle when validation occurs and display any errors.

If you like to be in control or have a little OCD like me, ApproveJs is for you.

You can also easily [extend](https://github.com/CharlGottschalk/approvejs/wiki/Adding-Your-Own-Tests) ApproveJs with your own tests.

<h2 style="color:#ff0000;">Major Release v1.0.0</h2>

If you are using a version < 1.0.0, please read the [upgrade guide](https://github.com/CharlGottschalk/approvejs/wiki/Upgrade-Guide).

---

### Installation

##### Standalone

<a href="https://github.com/CharlGottschalk/approvejs/releases"
style="color: #fff; background-color: #6496c8; margin: 0 10px 0 0; padding: 15px 45px; font-size: 32px; line-height: 1.8; box-shadow: 0 2px 2px rgba(204, 197, 185, 0.5);"> Download Latest Release </a>

Add a `script` tag to the library before the end of your closing `<body>` tag

```html
<script src="approve.min.js"></script>
```

##### Bower

In your terminal run:

```
$ bower install approvejs
```

Add a `script` tag to the library before the end of your closing `<body>` tag

```html
<script src="bower_components/approvejs/dist/approve.min.js"></script>
```


##### Node

In your terminal run:

```
$ npm install approvejs
```

Require `approvejs`.

```javascript
var approve = require('approvejs');
```

---

View the [wiki](https://github.com/CharlGottschalk/approvejs/wiki) for more info and documentation on rules and extending ApproveJs with your own tests.

---

#### To Do:

- Add AJAX test
