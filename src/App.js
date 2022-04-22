import "./App.css";
import Menu from "./Menu";
import Body from "./Body";
import { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.handleItemMenuClicked = this.handleItemMenuClicked.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    this.state = {
      itemMenu: 0,
      apellido: "",
    };
  }

  handleItemMenuClicked(item) {
    this.setState({
      itemMenu: item,
      apellido: "",
    });
  }

  handleSearch(lastName) {
    this.setState({
      apellido: lastName,
      itemMenu: 2,
    });
  }

  render() {
    return (
      <>
        <Menu search={this.handleSearch} handler={this.handleItemMenuClicked} />
        <Body apellido={this.state.apellido} item={this.state.itemMenu} />
      </>
    );
  }
}
