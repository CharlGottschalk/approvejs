export default {
    'TESTS':{
        'REQUIRED': '{title} is required',
        'EMAIL': '{title} must be a valid email address',
        'URL': '{title} must be a valid web address',
        'ALPHANUMERIC': '{title} may only contain [A-Za-z] and [0-9]',
        'NUMERIC': '{title} may only contain [0-9]',
        'ALPHA': '{title} may only contain [A-Za-z]',
        'DECIMAL': '{title} must be a valid decimal',
        'CURRENCY': '{title} must be a valid currency value', 
        'IP': '{title} must be a valid IP address',
        'MIN': '{title} must be a minimum of {min} characters',
        'MAX': '{title} must be a maximum of {max} characters',
        'RANGE': '{title} must be a minimum of {min} and a maximum of {max} characters',
        'EQUAL': '{title} must be equal to {field}',
        'FORMAT': '{title} did not pass the [{regex}] test',
        'TIME': '{title} is not a valid time',
        'DATE': '{title} is not a valid date',
        'TRUTHY': '{title} is not valid',
        'FALSY': '{title} is not valid'
    },
    'CC':{
        'MESSAGE':'{title} is not a valid credit card number'
    },
    'STR':{
        'MESSAGE': '{title} did not pass the strength test.',
        'IS_MINIMUM': '{title} must be at least {min} characters',
        'HAS_LOWER': '{title} must have at least 1 lower case character',
        'HAS_UPPER': '{title} must have at least 1 upper case character',
        'HAS_NUMBER': '{title} must have at least 1 number',
        'HAS_SPECIAL': '{title} must have at least 1 special character',
    }
}