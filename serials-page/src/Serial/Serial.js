import React from "react";
import "./Serial.css";



export default class Serial extends React.Component {


    constructor(props) {
        super(props);

        this.onSerialClick = this.onSerialClick.bind(this);
    }

    onSerialClick() {
        this.props.onSerialClick(this.props.data.id);
    }

    render() {
        return (
            <div className="serial_container">
                <div className="serial_data">
                    <div className="serial_name" onClick={this.onSerialClick}>
                        {this.props.data.name}
                    </div>
                    <div className="genres">
                        Жанр: {this.beautifyGenres(this.props.data.genres)}
                    </div>
                    <a href={this.props.data.official_site} className="off_site">
                        Официальный сайт
                    </a>
                </div>
                <div className="mark">
                    {this.props.data.mark.toFixed(1)}
                </div>
            </div>
        );
    }

    beautifyGenres(genres) {
        let res = "";
        genres.forEach(genre => {
            if (res.length > 0) res += ", ";
            res += genre;
        });
        return res;
    }
}