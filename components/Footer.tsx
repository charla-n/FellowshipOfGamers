import * as React from 'react'
import * as Moment from "moment";

const Footer = ({
    Resource,
}) => {
    return (
        <footer>
            <div className={"footer"}>
                <div className={"container"}>
                    <div className={"clearfix"}>
                        <div className={"footer-logo"}><a href="/">Fellowship of Gamers</a></div>
                        <dl className={"footer-nav"}>
                            <dt className={"nav-title"}>{Resource ? Resource.about : ""}</dt>
                            <dd className={"nav-item"}><a href="#">{Resource ? Resource.theproject : ""}</a></dd>
                            <dd className={"nav-item"}><a href="#">{Resource ? Resource.theteam : ""}</a></dd>
                            <dd className={"nav-item"}><a href="#">{Resource ? Resource.thevision : ""}</a></dd>
                        </dl>
                        <dl className={"footer-nav"}>
                            <dt className={"nav-title"}>{Resource ? Resource.socialnetworks : ""}</dt>
                            <dd className={"nav-item"}><a href="https://www.facebook.com/Fellowship-Of-Gamers-1718230745137230/">Facebook</a></dd>
                            <dd className={"nav-item"}><a href="https://twitter.com/FellowshipGamer">Twitter</a></dd>
                        </dl>
                        <dl className={"footer-nav"}>
                            <dt className={"nav-title"}>{Resource ? Resource.contact : ""}</dt>
                            <dd className={"nav-item"}><a href="#">{Resource ? Resource.basicinformation : ""}</a></dd>
                            <dd className={"nav-item"}><a href="#">{Resource ? Resource.feedback : ""}</a></dd>
                        </dl>
                        <dl className={"footer-nav"}>
                            <dt className={"nav-title"}>{Resource ? Resource.policy : ""}</dt>
                            <dd className={"nav-item"}><a href="#">{Resource ? Resource.privacypolicy : ""}</a></dd>
                            <dd className={"nav-item"}><a href="#">{Resource ? Resource.termconditions : ""}</a></dd>
                        </dl>
                    </div>
                    <div className={"footer-copyright text-center"}>&copy; {Moment().year()}- Fellowship of Gamers - {Resource ? Resource.allrightreserved : ""}.</div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;