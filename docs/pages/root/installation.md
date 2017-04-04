---
title: Installation
collection: root
author: Charl Gottschalk
date: 04/04/2017
version: 0.1.0
draft: false
sort: 3
---

# Installation

##### Standalone

{{{snippet 'download'}}}

Unzip `master.zip` and add a `script` tag to the library before the end of your closing `<body>` tag

    <script src="path/to/approve.min.js"></script>

##### cdnjs

Add a `script` tag to the library CDN url before the end of your closing `<body>` tag

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/approvejs/[version]/approve.min.js"></script>
```

Get the cdn urls from [here](https://cdnjs.com/libraries/approvejs)

*Many thanks to [cdnjs](https://cdnjs.com/) who kindly hosts ApproveJS through a reliable CDN*

##### Bower

In your terminal run:

```
$ bower install approvejs
```

Add a `script` tag to the library before the end of your closing `<body>` tag

    <script src="bower_components/approvejs/dist/approve.min.js"></script>

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