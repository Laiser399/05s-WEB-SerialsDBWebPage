import React from "react";
import "./PagePanel.css";


export default class PagePanel extends React.Component {

    constructor(props) {
        super(props);

        this.onPageSelected = this.onPageSelected.bind(this);
        this.onPageSelectedBySelect = this.onPageSelectedBySelect.bind(this);
    }

    onPageSelected(e) {
        this.props.onPageSelected(+e.target.innerHTML);
    }

    onPageSelectedBySelect(e) {
        let newPage = +e.target.options[e.target.selectedIndex].value;
        this.props.onPageSelected(newPage);
    }

    render() {
        let pages = [...Array(this.props.pagesCount).keys()].map(i =>
            <option key={i} value={i + 1}>{i + 1}</option>);

        return (
            <div className="page_panel">
                {this.getLeftButtons()}
                <div className="page_nav_button cur_page_button">
                    {this.props.currentPage}
                </div>
                {this.getRightButtons()}
                <select className="page_select" value={this.props.currentPage} onChange={this.onPageSelectedBySelect}>
                    {pages}
                </select>
            </div>
        );
    }

    getLeftButtons() {
        let leftButtons = []
        if (this.props.currentPage === 2) {
            leftButtons = [
                <div key={1}
                    className="page_nav_button page_button"
                    onClick={this.onPageSelected}>1</div>
            ];
        }
        else if (this.props.currentPage === 3) {
            leftButtons = [
                <div key={1}
                    className="page_nav_button page_button"
                    onClick={this.onPageSelected}>1</div>,
                <div key={2}
                    className="page_nav_button page_button"
                    onClick={this.onPageSelected}>2</div>
            ];
        }
        else if (this.props.currentPage > 3) {
            leftButtons = [
                <div key={1}
                    className="page_nav_button page_button"
                    onClick={this.onPageSelected}>1</div>,
                <div key={2}
                    className="page_nav_button page_space">...</div>,
                <div key={3}
                    className="page_nav_button page_button"
                    onClick={this.onPageSelected}>{this.props.currentPage - 1}</div>
            ];
        }
        return leftButtons;
    }

    getRightButtons() {
        let rightButtons = [];
        if (this.props.pagesCount - this.props.currentPage === 1) {
            rightButtons = [
                <div key={1}
                    className="page_nav_button page_button"
                    onClick={this.onPageSelected}>{this.props.pagesCount}</div>
            ];
        }
        else if (this.props.pagesCount - this.props.currentPage === 2) {
            rightButtons = [
                <div key={1}
                    className="page_nav_button page_button"
                    onClick={this.onPageSelected}>{this.props.pagesCount - 1}</div>,
                <div key={2}
                    className="page_nav_button page_button"
                    onClick={this.onPageSelected}>{this.props.pagesCount}</div>
            ];
        }
        else if (this.props.pagesCount - this.props.currentPage > 2) {
            rightButtons = [
                <div key={1}
                    className="page_nav_button page_button"
                    onClick={this.onPageSelected}>{this.props.currentPage + 1}</div>,
                <div key={2}
                    className="page_nav_button page_space">...</div>,
                <div key={3}
                    className="page_nav_button page_button"
                    onClick={this.onPageSelected}>{this.props.pagesCount}</div>
            ];
        }

        return rightButtons;
    }
}