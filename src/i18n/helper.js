import ob from 'object-path';
/**
 * add more locales here
 */
import en from './en';
import ru from './ru';

/**
 * and there
 */
let result = {
    en, ru
};

var retriever = function (path) {
    let str = ob.get(result[locale.locale], path);
    if (!str) console.warn('looks like no i18n str found!');
    return str;
}
let locale = null;
class LocaleSingleton {  
    constructor() {
        if(!locale){
            locale = this;
        }
        this.locale = 'en';
        return locale;
    }
}

var setLocale = function (newLocale) {
    locale.locale = newLocale;
}

var getLocale = function() {
    return locale.locale;
}

locale = new LocaleSingleton();

export default { retriever, getLocale, setLocale }