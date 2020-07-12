import React, { Component } from "react";
import { RoomContext } from "../context";

export default class FeaturedRoom extends Component {
  static contextType = RoomContext;
  render() {
    const { featuredRoom: rooms } = this.context;
    console.log(rooms);
    return <div>hello from featured room compoenent</div>;
  }
}
