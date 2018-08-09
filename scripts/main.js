import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';

H5P.ThreeSixtyImageExplorer = (function (EventDispatcher) {
  function ThreeSixtyImageExplorer(params, contentId) {
    EventDispatcher.call(this);
    this.params = params;
    this.contentId = contentId;
  }

  ThreeSixtyImageExplorer.prototype.attach = function ($wrapper) {
    // Render react component into our element
    ReactDOM.render(<App instance={this} />, $wrapper.get(0));
  };

  return ThreeSixtyImageExplorer;
})(H5P.EventDispatcher);