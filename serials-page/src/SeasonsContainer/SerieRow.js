import React from "react";
import "./SerieRow.css";


export default class SerieRow extends React.Component {


    render() {
        let date = new Date(this.props.releaseDate);
        let day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        
        return (
            <tr>
                <td className="serie_number">{this.props.number} серия</td>
                <td>{this.props.name}</td>
                <td className="release_date">{day}.{month}.{date.getFullYear()}</td>
                <td className="serie_download">
                    <a href={this.props.torrent}><img className="serie_download_icon" src="/download-icon.svg" alt="Скачать" /></a>
                </td>
            </tr>
        );
    }
}



