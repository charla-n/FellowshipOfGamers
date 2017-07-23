declare var require;

import * as Cookie from "js-cookie";
import * as Moment from 'moment';
var momentLocalizer = require('react-widgets/lib/localizers/moment')

export class Locale {

    static localeKEY: string = "FSG_LOCALE_COOKIE";

    constructor() {

        let lang = Cookie.get(Locale.localeKEY);

        if (!lang) {
            let locale = navigator.language;

            if (locale !== null && locale !== undefined) {
                locale = locale.toLowerCase();

                this.SetLocaleOrDefault(locale, false);
            } else {
                this.SetDefault();
            }
        } else {
            let langLower = lang.toLowerCase();

            this.SetLocaleOrDefault(langLower, true);
        }
    }

    SetLocaleOrDefault = (locale, fromCookie: boolean) => {
        if (!fromCookie) {
            Cookie.set(Locale.localeKEY, locale, {
                expires: 365,
            });
        }
        Moment.locale(locale);
        momentLocalizer(Moment);
    }

    SetDefault = () => {
        Moment.locale('en-us');
        momentLocalizer(Moment);
        Cookie.set(Locale.localeKEY, "en-us", {
            expires: 365,
        });
    }
}

export default Locale;