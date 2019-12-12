import React from 'react';
import "./App.css";
import SpaceBlock from "./SpaceBlock";
import Serial from "./Serial/Serial";
import SeasonsContainer from "./SeasonsContainer/SeasonsContainer";
import SearchPanel from "./header/SearchPanel";
import PagePanel from "./header/PagePanel";
import SortPanel from "./header/SortPanel";
import RecentAddedSeries from "./RecentAddedSeries/RecentAddedSeries";


export default class App extends React.Component {
  SERIALS_PER_PAGE = 24;

  
  constructor(props) {
    super(props);
    this.searchString = "";
    this.needShowSeasons = false;
    this.state = {
      sortedSerials: [],
      filteredSerials: [],
      pagesCount: 1,
      currentPage: 1,
      selectedIdSerial: undefined
    };

    this.onSearchTextChanged = this.onSearchTextChanged.bind(this);
    this.onPageSelected = this.onPageSelected.bind(this);
    this.onSortChanged = this.onSortChanged.bind(this);
    this.onSerialClick = this.onSerialClick.bind(this);
  }

  componentDidMount() {
    this.initSerials();
    this.initLastAddedSeries();
  }

  async initSerials() {
    let req = new XMLHttpRequest();
    req.open("GET", "/api/get-serials", true);
    req.onload = (e) => {
      if (req.status ===200) {
        let arr = JSON.parse(req.responseText);
        let serials = arr.map(item => { return {
          id: item.id,
          name: item.name,
          official_site: item.official_site,
          mark: item.mark,
          genres: item.genres.map(genre => genre.name)
        }});

        let sortedSerials = this.getSortedSerials(serials, "name_asc");
        let pagesCount = Math.ceil(sortedSerials.length / this.SERIALS_PER_PAGE);
        this.setState({
          sortedSerials: sortedSerials,
          filteredSerials: sortedSerials,
          pagesCount: pagesCount
        });
      }
      else {
        alert("Error downloading serials data.")
      }
    };
    req.send();
  }

  async initLastAddedSeries() {
    let req = new XMLHttpRequest();
    req.open("GET", "/api/get-last-added-series", true);
    req.onload = (e) => {
      if (req.status === 200) {
        let seriesArr = JSON.parse(req.responseText);
        seriesArr.forEach(serie => serie.releaseDate = new Date(serie.releaseDate));
        this.setState({
          lastAddedSeries: seriesArr
        });
      }
      else {
        console.log("Error downloading last added series.");
      }
    };
    req.send();
  }

  getSortedSerials(serials, sortType) {
    let comparator = null;
    switch (sortType) {
      case "name_desc":
          comparator = (a, b) => b.name.localeCompare(a.name);
          break;
      case "mark_asc":
          comparator = (a, b) => b.mark < a.mark ? 1 : -1;
          break;
      case "mark_desc":
          comparator = (a, b) => a.mark < b.mark ? 1 : -1;
          break;
      default:
      case "name_asc":
        comparator = (a, b) => a.name.localeCompare(b.name);
        break;
    }
    return serials.sort(comparator);
  }

  getFilteredSerials(serials, filterString) {
    let matchStrings = filterString.split(" ")
        .map(str => str.trim().toLowerCase())
        .filter(str => str.length > 0);
    
    if (matchStrings.length === 0) {
      return serials;
    }
    else {
      return serials.filter(serial => {
        for (let i = 0; i < matchStrings.length; ++i) {
          if (!serial.name.toLowerCase().includes(matchStrings[i]))
            return false;
        }
        return true;
      });
    }
  }

  // events
  onSearchTextChanged(string) {
    this.searchString = string;
    let filtered = this.getFilteredSerials(this.state.sortedSerials, string);
    let pagesCount = Math.max(1, Math.ceil(filtered.length / this.SERIALS_PER_PAGE));
    
    this.setState({
      filteredSerials: filtered,
      pagesCount: pagesCount,
      currentPage: 1
    });
  }

  onPageSelected(page) {
    this.setState({
      currentPage: page
    });
  }

  onSortChanged(sort) {
    let sortedSerials = this.getSortedSerials(this.state.sortedSerials, sort);
    let filteredSerials = this.getFilteredSerials(sortedSerials, this.searchString);

    this.setState({
      sortedSerials: sortedSerials,
      filteredSerials: filteredSerials
    });
  }

  onSerialClick(id) {
    this.needShowSeasons = true;
    this.setState({
      selectedIdSerial: id
    });
  }

  // render
  render() {
    let lastAddedSeries = this.state.lastAddedSeries;

    let start = (this.state.currentPage - 1) * this.SERIALS_PER_PAGE;
    let end = start + this.SERIALS_PER_PAGE;

    let serialsList = this.state.filteredSerials.slice(start, end).map(serial =>
        <Serial key={serial.id} data={serial} onSerialClick={this.onSerialClick}/>);

    let needShowSeasons = this.needShowSeasons;
    this.needShowSeasons = false;
    

    return (
      <div className="main_container">
        <header>
          <SearchPanel onSearchTextChanged={this.onSearchTextChanged}/>
          <PagePanel pagesCount={this.state.pagesCount} 
            currentPage={this.state.currentPage}
            onPageSelected={this.onPageSelected}/>
          <SortPanel onSortChanged={this.onSortChanged}/>
        </header>
        
        <RecentAddedSeries series={lastAddedSeries} onSerialClick={this.onSerialClick}/>
        {serialsList}
        <SpaceBlock height="54px"/>
        <SeasonsContainer idSerial={this.state.selectedIdSerial} needShowSeasons={needShowSeasons}/>
      </div>
    );
  }
}


