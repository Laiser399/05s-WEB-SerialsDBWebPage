import React from "react";
import "./SerieRow.css";
import { prepareDate } from "../CommonFunctions";


export default class SerieRow extends React.Component {


    render() {
        let dateStr = prepareDate(new Date(this.props.releaseDate));
        
        return (
            <tr>
                <td className="serie_number">{this.props.number} серия</td>
                <td>{this.props.name}</td>
                <td className="release_date">{dateStr}</td>
                <td className="serie_download">
                    <a href={this.props.torrent}><img className="serie_download_icon" src="/download-icon.svg" alt="Скачать" /></a>
                </td>
            </tr>
        );
    }
}



