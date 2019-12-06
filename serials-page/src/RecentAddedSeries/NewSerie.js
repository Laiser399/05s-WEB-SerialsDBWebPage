import React from 'react';
import "./NewSerie.css";
import { prepareDate } from "../CommonFunctions";


export default class NewSerie extends React.Component {

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        if (this.props.onClick) {
            this.props.onClick(this.props.idSerial);
        }
    }

    render() {
        let dateStr = prepareDate(this.props.date);

        return (
            <div className="new_serie_container" onClick={this.onClick}>
                <div className="upper">
                    {this.props.serialName}
                </div>
                <div className="under">
                    <div className="new_serie_number">
                        {this.props.seasonNumber} сезон {this.props.serieNumber} серия
                    </div>
                    <div className="new_serie_date">
                        {dateStr}
                    </div>
                </div>
            </div>
        );
    }
}