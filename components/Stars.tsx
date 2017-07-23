import * as React from "react";
import * as Update from 'immutability-helper';
import Common from '../utils/Common';

export interface StarsProps {
    Value: number;
    Classes: string;
    Size?: string;
    onClick?: any;
}

export class Stars extends React.Component<StarsProps, {}> {

    constructor() {
        super();

        this.one = this.one.bind(this);
        this.two = this.two.bind(this);
        this.three = this.three.bind(this);
        this.four = this.four.bind(this);
        this.five = this.five.bind(this);
    }

    one(val) {
        if (this.props.onClick) {
            this.props.onClick(1);
        }
    }

    two(val) {
        if (this.props.onClick) {
            this.props.onClick(2);
        }
    }

    three(val) {
        if (this.props.onClick) {
            this.props.onClick(3);
        }
    }

    four(val) {
        if (this.props.onClick) {
            this.props.onClick(4);
        }
    }

    five(val) {
        if (this.props.onClick) {
            this.props.onClick(5);
        }
    }

    render() {

        const style = {
            display: 'inline',
        };
        const { Value } = this.props;
        let ret;

        if (Value === 0) {
            ret = (<div style={style}>
                <button className={'invisible-btn'} type={'button'} onClick={this.one}><i className={`fa fa-star-o ${this.props.Size}`}></i></button>
                <button className={'invisible-btn'} type={'button'} onClick={this.two}><i className={`fa fa-star-o ${this.props.Size}`}></i></button>
                <button className={'invisible-btn'} type={'button'} onClick={this.three}><i className={`fa fa-star-o ${this.props.Size}`}></i></button>
                <button className={'invisible-btn'} type={'button'} onClick={this.four}><i className={`fa fa-star-o ${this.props.Size}`}></i></button>
                <button className={'invisible-btn'} type={'button'} onClick={this.five}><i className={`fa fa-star-o ${this.props.Size}`}></i></button>
            </div>);
        } else if (Value > 0 && Value <= 0.5) {
            ret = (<div style={style}>
                <i className={"fa fa-star-half-o"}></i>
                <i className={`fa fa-star-o ${this.props.Size}`}></i>
                <i className={`fa fa-star-o ${this.props.Size}`}></i>
                <i className={`fa fa-star-o ${this.props.Size}`}></i>
                <i className={`fa fa-star-o ${this.props.Size}`}></i>
            </div>);
        } else if (Value > 0.5 && Value <= 1) {
            ret = (<div style={style}>
                <button className={'invisible-btn'} type={'button'} onClick={this.one}><i className={`fa fa-star ${this.props.Size}`}></i></button>
                <button className={'invisible-btn'} type={'button'} onClick={this.two}><i className={`fa fa-star-o ${this.props.Size}`}></i></button>
                <button className={'invisible-btn'} type={'button'} onClick={this.three}><i className={`fa fa-star-o ${this.props.Size}`}></i></button>
                <button className={'invisible-btn'} type={'button'} onClick={this.four}><i className={`fa fa-star-o ${this.props.Size}`}></i></button>
                <button className={'invisible-btn'} type={'button'} onClick={this.five}><i className={`fa fa-star-o ${this.props.Size}`}></i></button>
            </div>);
        } else if (Value > 1 && Value <= 1.5) {
            ret = (<div style={style}>
                <i className={`fa fa-star ${this.props.Size}`}></i>
                <i className={"fa fa-star-half-o"}></i>
                <i className={`fa fa-star-o ${this.props.Size}`}></i>
                <i className={`fa fa-star-o ${this.props.Size}`}></i>
                <i className={`fa fa-star-o ${this.props.Size}`}></i>
            </div>);
        } else if (Value > 1.5 && Value <= 2) {
            ret = (<div style={style}>
                <button className={'invisible-btn'} type={'button'} onClick={this.one}><i className={`fa fa-star ${this.props.Size}`}></i></button>
                <button className={'invisible-btn'} type={'button'} onClick={this.two}><i className={`fa fa-star ${this.props.Size}`}></i></button>
                <button className={'invisible-btn'} type={'button'} onClick={this.three}><i className={`fa fa-star-o ${this.props.Size}`}></i></button>
                <button className={'invisible-btn'} type={'button'} onClick={this.four}><i className={`fa fa-star-o ${this.props.Size}`}></i></button>
                <button className={'invisible-btn'} type={'button'} onClick={this.five}><i className={`fa fa-star-o ${this.props.Size}`}></i></button>
            </div>);
        } else if (Value > 2 && Value <= 2.5) {
            ret = (<div style={style}>
                <i className={`fa fa-star ${this.props.Size}`}></i>
                <i className={`fa fa-star ${this.props.Size}`}></i>
                <i className={"fa fa-star-half-o"}></i>
                <i className={`fa fa-star-o ${this.props.Size}`}></i>
                <i className={`fa fa-star-o ${this.props.Size}`}></i>
            </div>);
        } else if (Value > 2.5 && Value <= 3) {
            ret = (<div style={style}>
                <button className={'invisible-btn'} type={'button'} onClick={this.one}><i className={`fa fa-star ${this.props.Size}`}></i></button>
                <button className={'invisible-btn'} type={'button'} onClick={this.two}><i className={`fa fa-star ${this.props.Size}`}></i></button>
                <button className={'invisible-btn'} type={'button'} onClick={this.three}><i className={`fa fa-star ${this.props.Size}`}></i></button>
                <button className={'invisible-btn'} type={'button'} onClick={this.four}><i className={`fa fa-star-o ${this.props.Size}`}></i></button>
                <button className={'invisible-btn'} type={'button'} onClick={this.five}><i className={`fa fa-star-o ${this.props.Size}`}></i></button>
            </div>);
        } else if (Value > 3 && Value <= 3.5) {
            ret = (<div style={style}>
                <i className={`fa fa-star ${this.props.Size}`}></i>
                <i className={`fa fa-star ${this.props.Size}`}></i>
                <i className={`fa fa-star ${this.props.Size}`}></i>
                <i className={"fa fa-star-half-o"}></i>
                <i className={`fa fa-star-o ${this.props.Size}`}></i>
            </div>);
        } else if (Value > 3.5 && Value <= 4) {
            ret = (<div style={style}>
                <button className={'invisible-btn'} type={'button'} onClick={this.one}><i className={`fa fa-star ${this.props.Size}`}></i></button>
                <button className={'invisible-btn'} type={'button'} onClick={this.two}><i className={`fa fa-star ${this.props.Size}`}></i></button>
                <button className={'invisible-btn'} type={'button'} onClick={this.three}><i className={`fa fa-star ${this.props.Size}`}></i></button>
                <button className={'invisible-btn'} type={'button'} onClick={this.four}><i className={`fa fa-star ${this.props.Size}`}></i></button>
                <button className={'invisible-btn'} type={'button'} onClick={this.five}><i className={`fa fa-star-o ${this.props.Size}`}></i></button>
            </div>);
        } else if (Value > 4 && Value <= 4.5) {
            ret = (<div style={style}>
                <i className={`fa fa-star ${this.props.Size}`}></i>
                <i className={`fa fa-star ${this.props.Size}`}></i>
                <i className={`fa fa-star ${this.props.Size}`}></i>
                <i className={`fa fa-star ${this.props.Size}`}></i>
                <i className={"fa fa-star-half-o"}></i>
            </div>);
        } else if (Value > 4.5 && Value <= 5) {
            ret = (<div style={style}>
                <button className={'invisible-btn'} type={'button'} onClick={this.one}><i className={`fa fa-star ${this.props.Size}`}></i></button>
                <button className={'invisible-btn'} type={'button'} onClick={this.two}><i className={`fa fa-star ${this.props.Size}`}></i></button>
                <button className={'invisible-btn'} type={'button'} onClick={this.three}><i className={`fa fa-star ${this.props.Size}`}></i></button>
                <button className={'invisible-btn'} type={'button'} onClick={this.four}><i className={`fa fa-star ${this.props.Size}`}></i></button>
                <button className={'invisible-btn'} type={'button'} onClick={this.five}><i className={`fa fa-star ${this.props.Size}`}></i></button>
            </div>);
        }

        return (
            <div className={this.props.Classes}>
                {ret}
            </div>    
        );
    }
}

export default Stars;