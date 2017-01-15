import React, { Component } from 'react';

const filestackCDN = 'https://cdn.filestackcontent.com/';

export default class Add extends Component {
  constructor (props) {
    super(props);

    this.state = {
      handle: '',
      manipulation: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  filestack () {
    return new Promise((resolve, reject) => {
     filepicker.pick (
       {
         mimetype: 'image/*',
         container: 'modal',
         services: ['COMPUTER', 'FACEBOOK', 'INSTAGRAM', 'URL', 'IMGUR', 'PICASA'],
         openTo: 'COMPUTER'
       },
       function (Blob) {
         console.log(JSON.stringify(Blob));
         const handle = Blob.url.substring(Blob.url.lastIndexOf('/') + 1);
         resolve(handle);
       },
       function (FPError) {
         console.log(FPError.toString());
         reject(FPError.toString());
       }
     );
   });
  }

  getManipulation () {
    return `${filestackCDN}resize=w:${this.width.value},h:${this.height.value}` +
      `${this.fitCrop.checked ? ',fit:crop' : ''}` +
      `/crop=d:[${this.xaxis.value},${this.yaxis.value},${this.wcrop.value},${this.hcrop.value}]` +
      `/rounded_corners=blur:${this.blur.value}/`;
  }

  handleClick () {
    this.filestack().then(handle => this.setState({
      handle,
      manipulation: this.getManipulation()
    }));
  }

  handleChange () {
    this.setState({
      manipulation: this.getManipulation()
    });
  }

  handleSubmit () {
    const { handle, manipulation } = this.state;
    return fetch('http://localhost:3000/photos', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.title.value,
        handle: handle,
        manipulation: manipulation
      })
    })
    .then(response => response.json());
  }

  render () {
    const { handle, manipulation } = this.state;
    return (
      <div className=".col-md-offset-4 media-list">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h2 className="panel-title text-center">
            <span className="glyphicon glyphicon-sunglasses"></span> Edit Photos
            </h2>
          </div>
          <div className="panel-body" onChange={this.handleChange}>
            <form name="document-form" onSubmit={this.handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" ref={(input) => this.title = input} className="form-control" placeholder="Enter the title..."/>
              </div>
              <div className="form-group">
                <label htmlFor="resize-photo" id="resize-label">Resize Photo</label>
                <input type="number" ref={(input) => this.width = input} className="form-control" placeholder="500" defaultValue="500"/> X
                <input type="number" ref={(input) => this.height = input} className="form-control" placeholder="500" defaultValue="500"/>
                <div className="checkbox">
                  <label><input type="checkbox" ref={(input) => this.fitCrop = input} onClick={this.handleChange}/> fit:crop? </label>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="crop-photo" id="resize-label">Crop Photo</label>
                <input type="number" ref={(input) => this.xaxis = input} className="form-control" placeholder="0" defaultValue="0"/> X-axis
                <input type="number" ref={(input) => this.yaxis = input} className="form-control" placeholder="0" defaultValue="0"/> Y-axis
                <input type="number" ref={(input) => this.wcrop = input} className="form-control" placeholder="500" defaultValue="500"/> Width
                <input type="number" ref={(input) => this.hcrop = input} className="form-control" placeholder="500" defaultValue="500"/> Height
              </div>
              <div className="form-group">
                <label htmlFor="blur-border" id="blur-border">Blur Border</label>
                <input id="blur" type="text" ref={(input) => this.blur = input} className="form-control" placeholder="0" defaultValue="1"/>
              </div>
              <div className="form-group">
                <label htmlFor="picture">Photo</label>
                <div className={`thumbnail ${ handle? '': 'off' }`}>
                  <img src={handle ? manipulation + handle : ''} className="img-rounded"></img>
                </div>
                <div className="text-center dropup">
                  <button type="button" className="btn btn-default filepicker" onClick={this.handleClick}>
                  Upload <span className="caret"></span>
                  </button>
                </div>
              </div>
              <button type="submit" className="btn btn-filestack btn-block submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
