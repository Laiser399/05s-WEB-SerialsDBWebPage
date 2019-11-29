import React from "react";
import "./SortPanel.css";


export default class SortPanel extends React.Component {

    constructor(props) {
        super(props);
        this.sortChanged = this.sortChanged.bind(this);
    }

    sortChanged(e) {
        this.props.onSortChanged(e.target.value);
    }

    render() {
        return (
            <div className="sort_panel">
                Сортировка:
                <select className="sort_select" onChange={this.sortChanged}>
                    <option value="name_asc">Название, с начала</option>
                    <option value="name_desc">Название, с конца</option>
                    <option value="mark_asc">Оценка, по возрастанию</option>
                    <option value="mark_desc">Оценка, по убыванию</option>
                </select>
            </div>
        );
    }
}