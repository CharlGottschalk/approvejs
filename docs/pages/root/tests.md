---
title: Tests
collection: root
author: Charl Gottschalk
date: 04/04/2017
version: 0.1.0
draft: false
sort: 7
---

# Tests

ApproveJs ships with various tests built in to get you started right away.

- [Results](#results)
- [Available Tests](#tests)

<a name="results"></a>

### Results

All tests return a default object as a [result](/approvejs/validation/#test-results).

<a name="tests"></a>

### Available Tests:

[required](#required)
[email](#email)
[url](#url)
[cc](#cc)
[alphaNumeric](#alphaNumeric)
[numeric](#numeric)
[alpha](#alpha)
[decimal](#decimal)
[currency](#currency)
[ip](#ip)
[min](#min)
[max](#max)
[range](#range)
[equal](#equal)
[format](#format)
[time](#time)
[date](#date)
[truthy](#truthy)
[falsy](#falsy)
[strength](#strength)

---

<a name="required"></a>

`required`

Checks if the value is not empty or null or undefined.

**Parameters:** *none*  

**Result:** *default*

**Message:** `'{title} is required'`

###### Example:

```javascript
var rule = {
    required: true
};
var result = approve.value('value', rule);
```

---

<a name="email"></a>

`email`

Checks if the value is a valid email address.

**Parameters:** *none*

**Result:** *default*

**Message:** `'{title} must be a valid email address'`

###### Example:

```javascript
var rule = {
    email: true
};
var result = approve.value('user@domain.com', rule);
```

---

<a name="url"></a>

`url`

Check if the value is a valid web address.

**Parameters:** *none*

**Result:** *default*

**Message:** `'{title} must be a valid web address'`

###### Example:

```javascript
var rule = {
    url: true
};
var result = approve.value('http://www.domain.com', rule);
```

---

<a name="cc"></a>

`cc`

Checks if the value is a valid credit card number.

**Parameters:** *none*

**Result:**

```javascript
{
    **default**
    cc: {
        scheme: string
    }
}
```

`scheme`: The credit card scheme i.e. `'American Express'`

**Message:** `'{title} is not a valid credit card number'`

###### Example:

```javascript
var rule = {
    cc: true
};
var result = approve.value('000000000000000', rule);
```

---

<a name="alphaNumeric"></a>

`alphaNumeric`

Checks if the value contains both letters and numbers.

**Parameters:** *none*

**Result:** *default*

**Message:** `'{title} may only contain [A-Za-z] and [0-9]'`

###### Example:

```javascript
var rule = {
    alphaNumeric: true
};
var result = approve.value('Some Text 123', rule);
```

---

<a name="numeric"></a>

`numeric`

Checks if the value is a number.

**Parameters:** *none*

**Result:** *default*

**Message:** `'{title} may only contain [0-9]'`

###### Example:

```javascript
var rule = {
    numeric: true
};
var result = approve.value(123, rule);
```

---

<a name="alpha"></a>

`alpha`

Checks if the value contains only letters.

**Parameters:** *none*

**Result:** *default*

**Message:** `'{title} may only contain [A-Za-z]'`

##### Example:

```javascript
var rule = {
    alpha: true
};
var result = approve.value('Some Text', rule);
```

---

<a name="decimal"></a>

`decimal`

Checks if the value is a valid decimal.

**Parameters:** *none*

**Result:** *default*

**Message:** `'{title} must be a valid decimal'`

###### Example:

```javascript
var rule = {
    decimal: true
};
var result = approve.value(10.50, rule);
```

---

<a name="currency"></a>

`currency`

Checks if the value is a valid currency value.

**Parameters:** *none*

**Result:** *default*

**Message:** `'{title} must be a valid currency value'`

###### Example:

```javascript
var rule = {
    currency: true
};
var result = approve.value(9.99, rule);
```

---

<a name="ip"></a>

`ip`

Checks if the value is a valid ipv4 or ipv6 address.

**Parameters:** *none*

**Result:** *default*

**Message:** `'{title} must be a valid IP address'`

###### Example:

```javascript
var rule = {
    ip: true
};
var result = approve.value('192.16.118.25', rule);
```

---

<a name="min"></a>

`min`

Checks if the value has a minimum of _n_ characters.

**Parameters:**

- `min`: minimum length

**Result:** *default*

**Message:** `'{title} must be a minimum of {min} characters'`

###### Example:

```javascript
var rule = {
    min: 5
};
var result = approve.value('Some Text', rule);
```

---

<a name="max"></a>

`max`

Checks if the value has a maximum of _n_ characters.

**Parameters:**

- `max`: maximum length 

**Result:** *default*

**Message:** `'{title} must be a maximum of {max} characters'`

###### Example:

```javascript
var rule = {
    max: 20
};
var result = approve.value('Some Text', rule);
```

---

<a name="range"></a>

`range`

Checks if a string's character length or a number is between a minimum and maximum.

*The value to test must be a `typeof === 'string'` or `typeof === 'number'`. Any other type will fail the test.*

**Parameters:** 

- `min`: minimum length
- `max`: maximum length

**Result:** *default*

**Message:** `'{title} must be a minimum of {min} and a maximum of {max} characters'`

###### Example: 

```javascript
var rule = {
    range: {
        min: 5,
        max: 20
    }
};
// Test a string's length
var length = approve.value('Some Text', rule);
// Test a number
var number = approve.value(15, rule);
```

---

<a name="equal"></a>

`equal`

Checks if the value equals another value.

**Parameters:** 

- `value`: The other value to compare with.
- `field`: The name of the other value for correctly formatting errors.

**Result:** *default*

**Message:** `'{field} must be equal to {title}'`

###### Example:

```javascript
var rule = {
    title: 'Password'
    equal: {
        value: 'Other text',
        field: 'Confirm Password'
    }
};
var result = approve.value('Some Text', rule);
```

---

<a name="format"></a>

`format`

Checks if the value passes a custom regular expression.

**Parameters:** 

- `regex`: a regular expression to test against

**Result:** *default*

**Message:** `'{title} did not pass the [{regex}] test'`

###### Example:

```javascript
var rule = {
    format: /^[A-Za-z]+$/
};
var result = approve.value('Some Text', rule);
```

---

<a name="time"></a>

`time`

Checks if the value is a valid string representing time in a 24 hour format (*hh:mm:ss*).

**Parameters:** *none*

**Result:** *default*

**Message:** `'{title} is not a valid time'`

###### Example:

```javascript
var rule = {
    time: true
};
var result = approve.value('12:25:30', rule);
```

---

<a name="date"></a>

`date`

Checks if the value is a valid string representing a date (*YYYY[/-]MM[-/]DD*).

**Parameters:**

- `format`: The date format to use when testing
    - `ymd`: '[YY]YY[-/]MM[-/]DD'
    - `dmy`: 'DD[-/]MM[-/][YY]YY'

**Result:** *default*

**Message:** `'{title} is not a valid date'`

###### Example:

```javascript
var rule = {
    date: 'ymd'
};
var result = approve.value('2016-10-01', rule);
```

---

<a name="truthy"></a>

`truthy`

Checks if the value is truthy (*'Yes'*, *'1'*, *'true'*, *'ok[ay]'*).

**Parameters:** *none*

**Result:** *default*

**Message:** `'{title} is not valid'`

###### Example:

```javascript
var rule = {
    truthy: true
};
var result = approve.value('Yes', rule);
```

---

<a name="falsy"></a>

`falsy`

Checks if the value is not truthy (*'No'*, *'0'*, *'false'*).

**Parameters:** *none*

**Result:** *default*

**Message:** `'{title} is not valid'`

###### Example:

```javascript
var rule = {
    falsy: true
};
var result = approve.value('No', rule);
```

---

<a name="strength"></a>

`strength`

Checks if the value is a strong password like string.

It checks based on a 6 point score:

- value >= minimum required length ? +1 point
- value contains at least one lowercase character ? +1 point\*
- value contains at least one uppercase character ? +1 point\*
- value contains at least one numeric character ? +1 point\*
- value contains at least one special character ? +1 point\*
- value >= minimum bonus length ? +1 point\*

\*Point is only awarded if value >= minimum length.


**Parameters:**

- `min`: The minimum length a password must be. Default `8`.
- `bonus`: The minimum length a password must be, higher than `min` for a bonus point. Default `10`.

**Options:**

- `messages`: The default error messages for the password score.
   * `isMinimum`: `'{title} must be at least {min} characters'`
   * `hasLower`: `'{title} must have at least 1 lower case character'`
   * `hasUpper`: `'{title} must have at least 1 upper case character'`
   * `hasNumber`: `'{title} must have at least 1 number'`
   * `hasSpecial`: `'{title} must have at least 1 special character'`

**Result:** 

```javascript
{
    **default**
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

- `result.strength.strength`: The strength of the string based on points.
   * 0: 'Very Weak',
   * 1: 'Weak',
   * 2: 'Better',
   * 3: 'Almost',
   * 4: 'Acceptable',
   * 5: 'Strong',
   * 6: 'Very Strong'
- `result.strength.points`: The calculated points
- `result.strength.isMinimum`: Length >= minimum
- `result.strength.hasLower`: Has at least one lower case character
- `result.strength.hasUpper`: Has at least one upper case character
- `result.strength.hasNumber`: Has at least one number
- `result.strength.hasSpecial`: Has at least one special character
- `result.strength.isBonus`: Length >= bonus length
- `result.strength.percent`: The strength percentage (%) 0 to 100


**Message:** `'{title} did not pass the strength test.'`

###### Example:

```javascript
var rule = {
    strength: {
        min: 8,
        bonus: 10
    }
};
var result = approve.value('Some Text 123', rule);
```

---

### Remember

You can pass multiple tests with your rules object:

```javascript
var rule = {
    required: true,
    format: /^[A-Za-z]+$/,
    min: 5,
    max: 20
};
```