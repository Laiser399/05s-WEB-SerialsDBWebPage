import React from "react";
import "./SearchPanel.css";


export default class SearchPanel extends React.Component {

    constructor(props) {
        super(props);
        this.inputTextChanged = this.inputTextChanged.bind(this);
    }

    inputTextChanged(e) {
        this.props.onSearchTextChanged(e.target.value);
    }

    render() {
        return (
            <div className="search_panel">
                Поиск:
                <input className="search_input" 
                    type="text" 
                    onChange={this.inputTextChanged} />
            </div>
        );
    }
} 



