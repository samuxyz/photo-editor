import React, { Component } from 'react';
import Thumbnail from '../components/Thumbnail';

export default class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {
      photoList: []
    };
  }

  componentDidMount () {
    return fetch('http://localhost:3000/photos')
      .then(response => response.json())
      .then(photoList => this.setState({ photoList }));
  }

  render () {
    const { photoList } = this.state;
    return (
      <div>
        { photoList.map((photo, i) => <Thumbnail key={i} {...photo} />) }
      </div>
    );
  }
}
