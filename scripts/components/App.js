import React from 'react';
import { path } from 'ramda';
import GraphicsEngine from "../helpers/GraphicsEngine";

class App extends React.Component {
  constructor({instance}) {
    super();
    const relativeImagePath = path(['file', 'path'], instance.params);
    const imagePath = H5P.getPath(relativeImagePath, instance.contentId);
    if (!imagePath) {
      return;
    }

    // Init graphics engine
    const wrapperElement = React.createRef(); //provide a way to access DOM
    const graphicsEngine = new GraphicsEngine(imagePath);
    graphicsEngine.initializeMovementListeners();

    graphicsEngine.addElement();

    this.instance = instance;
    this.imagePath = imagePath;
    this.graphicsEngine = graphicsEngine;
    this.wrapperElement = wrapperElement;
  }

  renderGraphics() {
    this.graphicsEngine.render();
    requestAnimationFrame(this.renderGraphics.bind(this));
  }

  componentDidMount() {
    // Initialize render cycle
    this.wrapperElement.current.appendChild(this.graphicsEngine.getWrapper());
    this.graphicsEngine.resize();
    this.renderGraphics();

    // Initialize resize listener
    this.instance.on('resize', () => {
      this.graphicsEngine.resize();
    })
  }


  render () {
    if (!this.imagePath) {
      return (<h1>No waffles...</h1>);
    }

    return (
      <div className="h5p-three-sixty-wrapper" ref={this.wrapperElement}></div>
    );
  }
}

export default App;
