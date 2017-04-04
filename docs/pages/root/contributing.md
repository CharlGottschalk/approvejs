---
title: Contributing
collection: root
author: Charl Gottschalk
date: 04/04/2017
version: 0.1.0
draft: false
sort: 1
---

# Contributing

If you would like to contribute to ApproveJs, thank you. Here's how you do it.

1. [Fork](https://help.github.com/articles/fork-a-repo/) your own copy of the repo.
2. [Clone](https://help.github.com/articles/cloning-a-repository/) your newly forked copy to your local machine.
3. Open a terminal / command line and `cd` to the root directory.
4. Install dev dependencies. In your terminal, run `npm install`.

Once NPM has finished installing all dependecies, you can make any changes you want.

#### Adding tests

If your change includes a new test, add a separate file for it in `src/tests/`. It should be named `approve.[test name].js`.

Please use `src/tests/approve.creditcard.js` as an example.

#### Before you commit

##### 1. Bump the version

ApproveJs uses semantic versioning ([semver](http://semver.org/)) and each change requires the version to be incremented depending on the type of change.

The version looks like the following:

**1.0.2** or **[major].[minor].[patch]**

###### Bug / Issue

If you fixed a bug or an issue with the code you need to increment the **[patch]** by one (+1).

###### New Feature / Test

If you added a new feature or a new test, you need to increment the **[minor]** by one (+1).

###### Potential Incompatibillity

If you made a change that could possibly break previous versions of the library or is not backwards compatible, you need to increment the **[major]** by one (+1).

The version number needs to be bumped in the following files:

- `package.json` version property

##### 2. Lint

Before you compile the library, you need to lint to check for errors and potential problems in your code. Fix any problems that appear before continuing. 

In your terminal, run:

````
gulp lint
```

##### 3. Compile

Now you can compile the library. This will create the distribution (`dist/\*`) files.

In your terminal, run:

```
npm run build
```

##### 4. Test

Now you need to make sure the code doesn't break. 

In your terminal, run:

```
npm run test
```

Check to see if all tests pass, and fix any errors.

*If you created a new test or feature, make sure to add a `describe()` or `it()` for it in `test/tests.js`.*

ApproveJs uses [mocha](https://mochajs.org) and [chai](http://chaijs.com/) assertion library for testing.

##### 5. Commit

If everything checks out and all tests pass, commit the changes to your forked copy.

##### 6. Create a pull request

[Create a pull request](https://help.github.com/articles/creating-a-pull-request/) and describe in as much detail as possible the changes you made.

#### Note

###### Commenting

Please comment your code thoroughly. 

For an example, please see `src/tests/approve.creditcard.js`.
