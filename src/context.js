import React, { Component } from "react";
import items from "./data.js";

const RoomContext = React.createContext();

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedrooms: [],
    featuredRoom: [],
    loading: [],
  };
  //getData
  componentDidMount() {
    //this.getData
    let rooms = this.formatData(items);
    // console.log(rooms);
    let featuredRoom = rooms.filter((room) => room.featured === true);
    // console.log(featuredRoom);
    this.setState({
      rooms,
      featuredRoom,
      sortedrooms: rooms,
      loading: false,
    });
  }
  formatData(items) {
    let tempItems = items.map((item) => {
      let id = item.sys.id;
      let images = item.fields.images.map((image) => image.fields.file.url);
      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  }
  render() {
    return (
      <RoomContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;
export { RoomConsumer, RoomProvider, RoomContext };
