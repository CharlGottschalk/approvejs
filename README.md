# ApproveJs
#### A simple validation library that doesn't interfere
![version 0.0.4](https://img.shields.io/badge/version-0.0.4-green.svg)

When I say, doesn't interfere, I mean it doesn't attach itself to input change events or form submit events. It also doesn't manipulate the DOM for you by automatically displaying errors.

ApproveJs exposes a single method, `value()` and leaves you to decide when a value is validated and how errors are displayed.

Using ApproveJs, you can automate validation however you please.

Personally, I use [Vue.js](http://vuejs.org/guide/events.html) and use bindings to handle when validation occurs and display any errors.

If you like to be in control, or have a little OCD like me, ApproveJs is for you.

You can also easily [extend](https://github.com/CharlGottschalk/approvejs/wiki/Adding-Your-Own-Tests) ApproveJs with your own tests.

### Getting Started

1. Get the library

   Via Bower:

   ```
   $ bower install approvejs
   ```

   or:

   <a href="https://github.com/CharlGottschalk/approvejs/releases"
      style="color: #fff; background-color: #6496c8; margin: 0 10px 0 0; padding: 15px 45px; font-size: 32px; line-height: 1.8; box-shadow: 0 2px 2px rgba(204, 197, 185, 0.5);"> Download Latest Release </a>

2. Add the library before the end of your closing `<body>` tag

   ```html
   <script src="approve.min.js"></script>
   ```
3. Approve some values

   ```javascript
   var result = approve.value('hello world', {required: true});

   if (result.approved) {
      // Value is approved - do something
   } else {
      // Do something with the errors
      result.each(function(error) {
         console.log(error);
      });
   }
   ```

---

View the [wiki](https://github.com/CharlGottschalk/approvejs/wiki) for more info and documentation on rules and extending ApproveJs with your own tests.
