import React, { Component } from "react";
import items from "./data.js";

const RoomContext = React.createContext();

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedrooms: [],
    featuredRoom: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  };
  //getData
  componentDidMount() {
    //this.getData
    let rooms = this.formatData(items);
    // console.log(rooms);
    let featuredRoom = rooms.filter((room) => room.featured === true);
    let maxPrice = Math.max(...rooms.map((item) => item.price));
    let maxSize = Math.max(...rooms.map((item) => item.size));
    this.setState({
      rooms,
      featuredRoom,
      sortedRooms: rooms,
      loading: false,
      //
      price: maxPrice,
      maxPrice,
      maxSize,
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
  handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState(
      {
        // type:{type} ,capacity:{capacity}
        [name]: value,
      },
      this.filterRooms
    );
  };
  filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      maxSize,
      minSize,
      breakfast,
      pets,
    } = this.state;
    // all the rooms
    let tempRoom = [...rooms];
    // parse value
    capacity = parseInt(capacity);
    price = parseInt(price);

    // console.log(tempRoom);
    // filter by type
    if (type !== "all") {
      tempRoom = tempRoom.filter((room) => room.type === type);
    }
    // filter by capacity
    if (capacity !== 1) {
      tempRoom = tempRoom.filter((room) => room.capacity >= capacity);
    }
    // filter by price
    tempRoom = tempRoom.filter((room) => room.price < price);

    //filter by size
    tempRoom = tempRoom.filter(
      (room) => room.size >= minSize && room.size <= maxSize
    );
    //filter by breakfast
    if (breakfast) {
      tempRoom = tempRoom.filter((room) => room.breakfast === true);
    }
    //filter by pets
    if (pets) {
      tempRoom = tempRoom.filter((room) => room.pets === true);
    }
    this.setState({
      sortedrooms: tempRoom,
    });
  };

  getRoom = (slug) => {
    let tempRoom = [...this.state.rooms];
    const room = tempRoom.find((room) => room.slug === slug);
    return room;
  };
  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange,
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

// higher order component
export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {(value) => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}

export { RoomConsumer, RoomProvider, RoomContext };
