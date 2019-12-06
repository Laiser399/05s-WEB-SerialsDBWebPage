import React from 'react';
import SpaceBlock from "../SpaceBlock";
import "./RecentAddedSeries.css";
import NewSerie from "./NewSerie";

export default class RecentAddedSeries extends React.Component {

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(idSerial) {
        if (this.props.onSerialClick) {
            this.props.onSerialClick(idSerial);
        }
    }

    render() {
        let block = <></>;
        if (this.props.series) {
            let i = 0;
            let series = this.props.series.map(serie => {
                return <NewSerie key={i++}
                    idSerial={serie.idSerial}
                    serialName={serie.serialName}
                    seasonNumber={serie.seasonNumber}
                    serieNumber={serie.serieNumber}
                    date={serie.releaseDate}
                    onClick={this.onClick}/>
            });
            block = (
                <div className="new_series_list">
                    {series}
                </div>
            );
        }

        return (
            <div className="new_series_container">
                <SpaceBlock height="60px"/>
                {block}
            </div>
        );
    }
}