# ApproveJs
#### Simple value validation
![version 0.0.2](https://img.shields.io/badge/version-0.0.2-green.svg) ![Jasmine Passed](https://img.shields.io/badge/jasmine-passed-green.svg)

The purpose of this library is to provide a simple validation method without doing it automatically or manipulating the DOM. Instead, you are left to handle the validation of a value, and displaying validation errors yourself.

I created this library simply because I want to be in control of how validation errors are displayed and when any inputs are validated. I only needed a single method to validate a value against certain tests and return me a result regarding it's success. This library allows for that and as a result, I can automate the validation of inputs how I see fit, either with DOM/[jQuery](http://api.jquery.com/?s=events) events, with [Vue.js](http://vuejs.org/guide/events.html) bindings or any other way I want.

ApproveJs is also easily extendible with custom tests.

### Getting Started

1. Get the library

   Via Bower:

   ```
   $bower install approvejs
   ```

   Via download:

   [Download](https://github.com/CharlGottschalk/approvejs/releases)
2. Add the library before the end of your `</body>` tag

   ```html
   <script src="approve.min.js"></script>
   ```
3. Now you can approve / validate values

   ```javascript
   approve.value('hello world', {required: true});
   ```

---

View the [wiki](https://github.com/CharlGottschalk/approvejs/wiki) for more info and documentation on rules and extending ApproveJs with your own tests.
