import * as React from 'react';
import * as Moment from 'moment';
import renderField from "../components/Field";

export interface AgePickerProps {
    format: string;
    yearsText: string;
    monthsText: string;
    daysText: string;
    yearsToGoBack: number;
}

export class AgePicker extends React.Component<AgePickerProps, {}> {

    years: Array<any>;

    constructor() {
        super();

        this.years = null;
        this.getYears = this.getYears.bind(this);
    }

    getYears() {
        if (!this.years) {

            this.years = [];
            let currentYear = Moment().year();

            for (var i = 0; i < this.props.yearsToGoBack; i++) {
                this.years.push({
                    value: i, text: i.toString()
                });
            }
        }
        return this.years;
    }

    render() {

        var content;
        var order = this.props.format.split(',');

        order.map((val, idx) => {
            if (val === 'Y') {
                return (
                    <div className={"col-xs-4"}>
                        <select>

                        </select>
                    </div>    
                );
            }
        });

        return (
            <div>
                <div className={"row"}>
                    <div className={"col-xs-4"}>

                    </div>
                </div>
                <div className={"clearfix"}></div>
            </div> 
        );
    }
}

export default AgePicker;