---
title: Upgrade Guide
collection: root
author: Charl Gottschalk
date: 04/04/2017
version: 0.1.0
draft: false
sort: 0
---

# Upgrade Guide

- [Upgrading to 3.\* from <= 2.\*](#upgrading-to-3)
- [Upgrading to 2.\* from <= 1.\*](#upgrading-to-2)
- [Upgrading to 1.\* from <= 0.0.6](#upgrading-to-1)

---

<a name="upgrading-to-3"></a>

## Upgrading To 3.\* From <= 2.\*

#### Test Properties

Each rule that is tested will now have it's own property in the result i.e.

Consider the following code:

```javascript
var rule = {
    required: true
};
var result = approve.value('lorem ipsum', rule);
```

The result will now look like:

```javascript
{
    approved: boolean,
    errors: [],
    failed: [],
    required: {
        approved: boolean,
        errors: []
    }
}
```

This allows you easier access to specific test results.

As a result of the above, tests such as [strength](/approvejs/tests/#strength) that return its own additional properties are no longer merged with the main result object, but instead are now part of the test's own properties i.e.

Before v3.\*

```javascript
{
    approved: boolean,
    errors: [],
    failed: [],
    strength: string,
    points: integer,
    isMinimum: boolean,
    hasLower: boolean,
    hasUpper: boolean,
    hasNumber: boolean,
    hasSpecial: boolean,
    isBonus: boolean,
    percent: integer
}
```

From v3.\*

```javascript
{
    approved: boolean,
    errors: [],
    failed: [],
    strength: {
        strength: string,
        points: integer,
        isMinimum: boolean,
        hasLower: boolean,
        hasUpper: boolean,
        hasNumber: boolean,
        hasSpecial: boolean,
        isBonus: boolean,
        percent: integer
    }
}
```

<a name="upgrading-to-2"></a>

## Upgrading To 2.\* From <= 1.\*

#### Date Test

The [date](/approvejs/tests/#date) test now expects a `format` parameter when testing a value. The format can either be `ymd` for testing `[YY]YY[-/]MM[-/]DD` or `dmy` when testing for `DD[-/]MM[-/][YY]YY`.

<a name="upgrading-to-1"></a>

## Upgrading To 1.\* From <= 0.0.6

#### Strength Test

The only major changes made is to the [strength](/approvejs/tests/#strength) test. The resulting properties after running this test has been renamed to make more sense and moved from the nested `.score` object to the root of the result.

Consider the following code:

```javascript
var rule = {
    strength: {
        min: 8,
        bonus: 10
    }
};
var result = approve.value('some text', rule);
```

###### The result (< v1) would look like the following:

```javascript
{
    approved: false,
    errors: [],
    message: 'Weak',
    minimum: 8,
    minimumBonus: 10,
    score: {
        value: 1,
        isMinimum: true,
        hasLower: true,
        hasUpper: false,
        hasNumber: false,
        hasSpecial: false,
        isBonus: false,
        strength: 0
    }
}
```

###### From v1.* the result will now be:

```javascript
{
    approved: false,
    errors: [],
    strength: 'Weak',
    points: 1,
    isMinimum: true,
    hasLower: true,
    hasUpper: false,
    hasNumber: false,
    hasSpecial: false,
    isBonus: false,
    percent: 0
}
```

1. `result.message` is now `result.strength`
2. `result.score.value` is now `result.points`
3. `result.score.isMinimum` is now `result.isMinimum`
4. `result.score.hasLower` is now `result.hasLower`
5. `result.score.hasUpper` is now `result.hasUpper`
6. `result.score.hasNumber` is now `result.hasNumber`
7. `result.score.hasSpecial` is now `result.hasSpecial`
8. `result.score.isBonus` is now `result.isBonus`
9. `result.score.strength` is now `result.percent`

#### Versioning

I initially used a custom versioning system, but to avoid confusion and follow the standard, ApproveJs will now follow proper semantic versioning ([semver](http://semver.org/)).