import ob from 'object-path';
/**
 * add more locales here
 */
import en from './en';
import ru from './ru';

/**
 * and there
 */
var result = {
    en: en,
    ru: ru
};

var retriever = function (path) {
    var str = ob.get(result[locale], path);
    return str;
}
var locale = 'en';

var setLocale = function (newLocale) {
    locale = newLocale;
}

var getLocale = function() {
    return locale;
}

function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
   }

export default { 
    retriever: retriever,
    getLocale: getLocale,
    setLocale: setLocale,
    isFunction: isFunction 
}