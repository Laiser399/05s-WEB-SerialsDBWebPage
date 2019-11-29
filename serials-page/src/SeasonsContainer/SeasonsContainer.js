import React from "react";
import "./SeasonsContainer.css";
import Season from "./Season";


export default class SeasonsContainer extends React.Component {

    constructor(props) {
        super(props);
        this.cachedSeasonsByIdSerial = new Map();
        this.cachedSeriesByIdSeason = new Map();
        this.isShowed = false;

        this.onShowTabClicked = this.onShowTabClicked.bind(this);
    }

    // methods
    showTab() {
        let obj = document.getElementById("seasons-content");
        obj.classList.add("deployed");

        let angle = document.getElementById("angle");
        angle.classList.add("angle_rotated");

        this.isShowed = true;
    }

    hideTab() {
        let obj = document.getElementById("seasons-content");
        obj.classList.remove("deployed");

        let angle = document.getElementById("angle");
        angle.classList.remove("angle_rotated");

        this.isShowed = false;
    }

    onShowTabClicked() {
        if (this.isShowed) {
            this.hideTab();
        }
        else {
            this.showTab();
        }
    }

    loadSeasonsDataIfNeed(idSerial) {
        if (!idSerial) return;
        if (this.cachedSeasonsByIdSerial.get(idSerial)) return;

        let req = new XMLHttpRequest();
        req.open("GET", `/api/get-seasons/${idSerial}`, true);
        req.onload = (e) => {
            if (req.status === 200) {
                let seasons = JSON.parse(req.responseText);
                this.cachedSeasonsByIdSerial.set(idSerial, seasons);
                seasons.forEach(season => this.loadSeriesDataIfNeed(season.id));
                this.setState({});
            }
            else {
                console.log(`Error downloading saesons for serial with id ${idSerial}.`);
            }
        };
        req.send();
    }

    loadSeriesDataIfNeed(idSeason) {
        if (!idSeason) return;
        if (this.cachedSeriesByIdSeason.get(idSeason)) return;

        let req = new XMLHttpRequest();
        req.open("GET", `/api/get-series/${idSeason}`, true);
        req.onload = (e) => {
            if (req.status === 200) {
                let series = JSON.parse(req.responseText);
                this.cachedSeriesByIdSeason.set(idSeason, series);
                this.setState({});
            }
            else {
                console.log(`Error downloading series for season id ${idSeason}.`);
            }
        };
        req.send();
    }

    render() {
        if (this.props.needShowSeasons) {
            this.showTab();
        }
        this.loadSeasonsDataIfNeed(this.props.idSerial);
        
        let seasonsList = [];
        let seasons = this.cachedSeasonsByIdSerial.get(this.props.idSerial);
        if (seasons) {
            let i = 0;
            seasonsList = seasons.sort((s1, s2) => s1.number > s2.number ? 1 : -1).map(season => {
                let series = this.cachedSeriesByIdSeason.get(season.id);
                if (!series) series = [];
                return <Season key={i++} 
                    number={season.number} 
                    seriesCount={season.seriesCount} 
                    torrent={season.torrent}
                    series={series}/>;
            });
        }

        return (
            <div id="seasons-content">
                <div className="show_seasons_button" onClick={this.onShowTabClicked}>
                    <img id="angle" className="angle_up" 
                        src="/angle-up-solid.svg" 
                        alt="Открыть/закрыть сезоны"/>
                </div>
                <div className="season_content">
                    {seasonsList}
                </div>
            </div>
        );
    }
}