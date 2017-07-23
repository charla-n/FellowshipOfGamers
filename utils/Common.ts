import * as Constants from './Constants';
import * as lodash from 'lodash';

export default class Common {

    static MaxCaptchaIteration: number = 10;
    static MaxPopoverIteration: number = 10;
    CaptchaIteration: number;
    PopoverIteration: number;

    constructor() {
        this.CaptchaIteration = 0;
        this.PopoverIteration = 0;
    }

    initCaptcha(control, callback) {
        if ((<any>window).grecaptcha !== undefined) {
            this._initCaptcha(control, callback);
        } else {
            setTimeout(() => {
                if (!(<any>window).grecaptcha && this.CaptchaIteration < Common.MaxCaptchaIteration) {
                    this.CaptchaIteration++;
                    this.initCaptcha(control, callback);
                } else if (!(<any>window).grecaptcha && this.CaptchaIteration >= Common.MaxCaptchaIteration) {
                    return;
                } else if ((<any>window).grecaptcha) {
                    this._initCaptcha(control, callback);
                }
            }, 1000);
        }
    }

    reloadCaptcha() {
        (<any>window).grecaptcha.reset();
    }

    private _initCaptcha(control, callback) {
        (<any>window).grecaptcha.render(control,
            {
                "callback": callback,
                "sitekey": Constants.SITEKEY,
            }
        );
    }

    injectRecaptcha() {
        const script = document.createElement("script");

        script.async = true;
        script.src = "https://www.google.com/recaptcha/api.js?render=explicit";

        document.body.appendChild(script);
    }

    shouldBeAuthed(props: any) {
        if (!props.Authed) {
            props.router.push('/Login');
        }
    }

    shouldNotBeAuthed(props: any) {
        if (props.Authed) {
            props.router.push('/');
        }
    }

    static buildError(data) {
        if (data.responseJSON) {
            var ret = [];

            if (Array.isArray(data.responseJSON)) {
                for (let val of data.responseJSON) {
                    ret.push((val.Field !== null ? val.Field + ": " : "") + val.Message);
                }
            } else {
                if (data.responseJSON.error_description !== undefined) {
                    return data.responseJSON.error_description;
                }
            }
            return ret;
        }
        return [data.statusText];
    }

    static buildSuccess(data) {
        if (data) {
            return data.message;
        }
        return [];
    }

    static buildAuthorizationHeader(token) {
        return {
            name: "Authorization",
            value: `Bearer ${token}`,
        };
    }

    static buildBaseNotification(title, message, action = null, dismissSeconds = 5) {
        return {
            title: title,
            message: message,
            position: 'tr',
            autoDismiss: dismissSeconds,
            action: action
        };
    }
}