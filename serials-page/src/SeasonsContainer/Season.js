import React from "react";
import "./Season.css";
import SerieRow from "./SerieRow";
const ReactCSSTransitionGroup = require("react-addons-css-transition-group");


export default class Season extends React.Component {

    render() {
        let i = 0;
        let seriesRows = this.props.series.sort((s1, s2) => s1.number > s2.number ? 1 : -1).map(serie => 
            <SerieRow key={i++} 
                number={serie.number} 
                name={serie.name}
                releaseDate={serie.releaseDate}
                torrent={serie.torrent}/>);

        return (
            <ReactCSSTransitionGroup transitionName="display"
                transitionAppear={true} transitionAppearTimeout={500}
                transitionEnter={false} transitionLeave={false}>
                <div className="season">
                    <div className="season_panel">
                        <div className="left">
                            <div className="season_number">
                                {this.props.number} сезон
                            </div>
                            <div>
                                Кол-во вышедших серий: {this.props.series.length} (из {this.props.seriesCount})
                            </div>
                        </div>
                        <a href={this.props.torrent} className="download_season">
                            <img src="/download-icon.svg" alt="Скачать"/>
                        </a>
                    </div>
                    <table className="series_table">
                        <tbody>
                            {seriesRows}
                        </tbody>
                    </table>
                </div>
            </ReactCSSTransitionGroup>
        );
    }
}