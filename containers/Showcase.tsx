declare var require;

import * as React from 'react'
import { connect } from 'react-redux';
import * as Update from 'immutability-helper';
import Common from '../utils/Common';
import * as constants from "../utils/Constants";
import renderField from "../components/Field";
import * as types from "../actions/actionTypes";
import { Link } from 'react-router';
import Parallax from 'react-springy-parallax';
import { fetchShowcaseResource } from '../actions/resourceAction';

export interface ShowcaseProps {
    Resource: any;
    ResourceShouldUpdate: boolean;
    FetchResource: any;
}

export class Showcase extends React.Component<ShowcaseProps, {}> {

    parallax: any;

    constructor() {
        super();
    }

    componentDidMount() {
        this.props.FetchResource();
    }

    componentWillReceiveProps(nextprops: ShowcaseProps) {
        if (nextprops.ResourceShouldUpdate && !this.props.ResourceShouldUpdate) {
            this.props.FetchResource();
        }
    }

    render() {

        const styles = {
            fontSize: 22,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }

        return (
            <div style={{ marginTop: '-5px' }}>
                <Parallax ref={(control) => this.parallax = control} pages={4}>
                    <Parallax.Layer offset={0} speed={0} factor={4}
                        style={{ backgroundImage: 'url("img/73653-OEFBRW-176.svg")', backgroundSize: 'cover' }}>
                    </Parallax.Layer>

                    <Parallax.Layer
                        offset={0}
                        speed={0.5}
                        style={styles}
                        >
                        <div style={{ position: 'absolute', top: '0px', left: '5px' }}>
                            <h3><b>Fellowship of Gamers</b></h3>
                        </div>
                    </Parallax.Layer>

                    <Parallax.Layer
                        offset={0}
                        speed={-0.25}
                        style={styles}
                        >
                        <div style={{
                            width: '33%',
                            whiteSpace: 'pre-wrap',
                            fontFamily: 'Menlo-Regular, Menlo, monospace',
                            fontSize: 14,
                            lineHeight: '10px',
                            textAlign: 'center',
                        }}>
                            <h1>{this.props.Resource ? this.props.Resource.showcaseoffset1title : ''}</h1>
                            <br />
                            <p>
                                <img style={{ width: '30%' }} src="img/xbox-gamepad.png" />
                            </p>
                        </div>
                    </Parallax.Layer>

                    <Parallax.Layer
                        offset={0}
                        speed={0.5}
                        style={styles}
                        >
                        <div style={{ marginLeft: '60%', marginTop: '12%', textAlign: 'center', width: '25%', fontSize: '28px' }}>
                            <p>
                                <span>{this.props.Resource ? this.props.Resource.showcaseoffset1text2 : ''}</span>
                            </p>
                            <br />
                            <p>
                                <img style={{ width: '30%' }} src="img/octopus.png" />
                            </p>
                        </div>
                    </Parallax.Layer>

                    <Parallax.Layer
                        offset={0}
                        speed={0.5}
                        style={styles}
                        >
                        <div style={{ marginRight: '60%', marginTop: '12%', textAlign: 'center', width: '25%', fontSize: '28px' }}>
                            <p>
                                <span>{this.props.Resource ? this.props.Resource.showcaseoffset1text1 : ''}</span>
                            </p>
                            <br />
                            <p>
                                <img style={{ width: '30%' }} src="img/augmented-reality.png" />
                            </p>
                        </div>
                    </Parallax.Layer>

                    <Parallax.Layer
                        offset={0}
                        speed={0.5}
                        style={styles}
                    >
                        <div style={{ position: 'absolute', top: '5px', right: '5px' }}>
                            <a href={'https://twitter.com/FellowshipGamer'} style={{ marginRight: '10px' }}>
                                <img width={29} src={'img/Twitter_Logo_White_On_Blue.png'} />
                            </a>
                            <a href={'https://www.facebook.com/Fellowship-Of-Gamers-1718230745137230/'}>
                                <img src={'img/FB-f-Logo__blue_29.png'} />
                            </a>
                            <Link to={'/Home'} className={"btn btn-transparent"}>
                                <i className={"fa fa-sign-in"} aria-hidden="true"></i>
                                <span> {this.props.Resource ? this.props.Resource.showcasevisitwebsite : ''}</span><i> ({this.props.Resource ? this.props.Resource.showcasecomingsoon : ''})</i>
                            </Link>
                        </div>
                    </Parallax.Layer>

                    <Parallax.Layer
                        offset={1}
                        speed={-0.25}
                        style={styles}
                    >
                        <div style={{
                            width: '33%',
                            whiteSpace: 'pre-wrap',
                            fontFamily: 'Menlo-Regular, Menlo, monospace',
                            fontSize: 14,
                            lineHeight: '10px',
                            textAlign: 'center',
                        }}>
                            <h1>{this.props.Resource ? this.props.Resource.showcaseoffset2title : ''}</h1>
                            <i>({this.props.Resource ? this.props.Resource.showcasecomingsoon : ''})</i>
                            <br /><br/>
                            <p>
                                <img style={{ width: '30%' }} src="img/firewall.png" />
                            </p>
                        </div>
                    </Parallax.Layer>

                    <Parallax.Layer
                        offset={1}
                        speed={0.5}
                        style={styles}
                    >
                        <div style={{ marginRight: '60%', marginTop: '12%', textAlign: 'center', width: '25%', fontSize: '28px' }}>
                            <p>
                                <span>{this.props.Resource ? this.props.Resource.showcaseoffset2text1 : ''}</span>
                            </p>
                            <br />
                            <p>
                                <img style={{ width: '30%' }} src="img/megaphone.png" />
                            </p>
                        </div>
                    </Parallax.Layer>

                    <Parallax.Layer
                        offset={1}
                        speed={0.5}
                        style={styles}
                    >
                        <div style={{ marginLeft: '60%', marginTop: '12%', textAlign: 'center', width: '25%', fontSize: '28px' }}>
                            <p>
                                <span>{this.props.Resource ? this.props.Resource.showcaseoffset2text2 : ''}</span>
                            </p>
                            <br />
                            <p>
                                <img style={{ width: '30%' }} src="img/connections.png" />
                            </p>
                        </div>
                    </Parallax.Layer>

                    <Parallax.Layer
                        offset={2}
                        speed={-0.25}
                        style={styles}
                    >
                        <div style={{
                            width: '33%',
                            whiteSpace: 'pre-wrap',
                            fontFamily: 'Menlo-Regular, Menlo, monospace',
                            fontSize: 14,
                            lineHeight: '10px',
                            textAlign: 'center',
                        }}>
                            <h1>{this.props.Resource ? this.props.Resource.showcaseoffset3title : ''}</h1>
                            <br />
                            <p>
                                <img style={{ width: '30%' }} src="img/internet.png" />
                            </p>
                        </div>
                    </Parallax.Layer>

                    <Parallax.Layer
                        offset={2}
                        speed={0.5}
                        style={styles}
                    >
                        <div style={{ marginRight: '60%', marginTop: '12%', textAlign: 'center', width: '25%', fontSize: '28px' }}>
                            <p>
                                <span>{this.props.Resource ? this.props.Resource.showcaseoffset3text1 : ''}</span>
                                <br/>
                                <i style={{ fontSize: '14px' }}>({this.props.Resource ? this.props.Resource.showcasemobileapptext : ''})</i>
                            </p>
                            <br />
                            <p>
                                <img style={{ width: '20%' }} src="img/android-logo.png" />
                                <img style={{ width: '20%' }} src="img/apple.png" />
                                <img style={{ width: '20%' }} src="img/windows-logo-silhouette.png" />
                            </p>
                        </div>
                    </Parallax.Layer>

                    <Parallax.Layer
                        offset={2}
                        speed={0.5}
                        style={styles}
                    >
                        <div style={{ marginLeft: '60%', marginTop: '12%', textAlign: 'center', width: '25%', fontSize: '28px' }}>
                            <p>
                                <span>{this.props.Resource ? this.props.Resource.showcaseoffset3text2 : ''}</span>
                                <br />
                                <i style={{ fontSize: '14px' }}>({this.props.Resource ? this.props.Resource.showcasecomingsoon : ''})</i>
                            </p>
                            <br />
                            <p>
                                <img style={{ width: '30%' }} src="img/internet (2).png" />
                            </p>
                        </div>
                    </Parallax.Layer>

                    <Parallax.Layer
                        offset={3}
                        speed={-0.25}
                        style={styles}
                    >
                        <div style={{
                            width: '33%',
                            whiteSpace: 'pre-wrap',
                            fontFamily: 'Menlo-Regular, Menlo, monospace',
                            fontSize: 14,
                            lineHeight: '10px',
                            textAlign: 'center',
                        }}>
                            <h1>{this.props.Resource ? this.props.Resource.showcaseoffset4title : ''}</h1>
                            <br />
                            <p>
                                <input className={'form-control'} type={'email'} placeholder={'your@email.com'} />
                                <button style={{ width: '100%' }} className={'btn btn-primary'}>{this.props.Resource ? this.props.Resource.showcaseoffset4newsletterbtn : ''}</button>
                            </p>
                        </div>
                        <div style={{ position: 'absolute', bottom: '0px' }}>
                            <div dangerouslySetInnerHTML={{ __html: this.props.Resource ? this.props.Resource.creditlinkshowcase : '' }}></div>
                        </div>
                    </Parallax.Layer>

                </Parallax>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        Resource: state.resourceShowcaseReducer.Resource,
        ResourceShouldUpdate: state.resourceShowcaseReducer.ResourceShouldUpdate,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        FetchResource: () => dispatch(fetchShowcaseResource()),
    }
}

let showcase = connect(mapStateToProps, mapDispatchToProps)(Showcase); 

export default showcase;