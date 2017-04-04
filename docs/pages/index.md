---
title: Home
collection: home
author: Charl Gottschalk
date: 04/04/2017
version: 0.1.0
draft: false
---

# ApproveJs

#### Simple JavaScript validation that doesn't interfere

---

ApproveJs doesn't automatically attach itself to input change events or form submit events. It also doesn't manipulate the DOM for you by automatically displaying errors. This allows you to automate validation how you want.

With a single method (`approve.value()`), you can decide how to handle validation.

##### As easy as:

```javascript
var rules = {
    required: true,
    email: true
};

var result = approve.value('user@domain.com', rules);
```

{{{snippet 'get-started'}}}