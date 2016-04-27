import React, {Component} from 'react';

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    // let flagAdd = true;

    this.state = {
      flagAdd: true,
      elements: [
        'header',
        'header-container',
        'brand'
      ]
    };

    this.onScroll = this.onScroll.bind(this);
  };
  // this.init(['header', 'header-container', 'brand'])

  // init(elements) {
  //   this.elements = elements;
  // }
  onScroll() {
    this.offset();
  }

  add() {
    if (this.state.flagAdd) {
      for (var i = 0; i < this.state.elements.length; i++) {
        document.getElementById(this.state.elements[i]).className += " fixed theme";
      };
      this.setState({flagAdd: false});
    };
  };

  remove() {
    for (var i = 0; i < this.state.elements[i].length; i++) {
      document.getElementById(this.state.elements[i]).className =
        document.getElementById(this.state.elements[i]).className.replace( /(?:^|\s)fixed-theme(?!\S)/g , '' );
    };
    this.setState({flagAdd: true});
  };

  offset() {
    var yOffset = 0;
    var currentYOffset = window.pageYOffset;

    if (yOffset < currentYOffset) {
      this.add();
    } else if (currentYOffset == yOffset) {
      this.remove();
    };
  };

  render() {
    return (
      <div>
        <nav id="header" className="navbar navbar-inverse navbar-fixed-top">
          <div id="header-container" className="container navbar-container">
              <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                  </button>
                  <div><a id="brand" className="navbar-brand" href="#">CHYI WANG</a></div>
              </div>
              <div id="navbar" className="collapse navbar-collapse">
                  <ul className="nav navbar-nav pull-right">
                      <li className="active"><a href="#">ABOUT</a></li>
                      <li><a href="#about">FEATURED PROJECTS</a></li>
                      <li><a href="#contact">CONTACT</a></li>
                  </ul>
              </div>
          </div>
        </nav>
      </div>
    )
  }
};