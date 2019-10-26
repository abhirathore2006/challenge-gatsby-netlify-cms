import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

export class HTMLScript extends React.Component {
  constructor(props) {
    super(props);
    // using ref's to handle iframe version and makes easier to find element
    this.scriptRef = React.createRef();
    // update get triggered on every change, debouce will prevent frequent updates
    this.debouncedUpdate = debounce(this.handleUpdate, 2000);
  }
  componentDidMount() {
    this.addScripts();
  }

  /**
   * add scripts will handle all the logic to add the script to
   * page view.
   */
  addScripts() {
    let { content } = this.props;
    let scriptContent = content || '';
    /**
     * to handle all sort of scripts,
     * let's create a dummy html and see how it renders them
     * once we have that, we will find all script and copy them
     * in our view.
     */
    let htmlEle = document.createElement('html');
    htmlEle.innerHTML = scriptContent;
    let scriptElms = htmlEle.getElementsByTagName('script');
    for (let element of scriptElms) {
      let scriptEle = document.createElement('script');
      if (element.attributes && element.attributes.src) {
        Array.from(element.attributes).forEach(attr => {
          scriptEle[attr.name] = attr.value;
        });
      } else {
        scriptEle.innerHTML = element.innerHTML;
      }
      this.scriptRef.current.appendChild(scriptEle);
    }
  }
  /**
   * addScript add the script regardless of scripts presence so lets
   * remove all previous script
   * NOTE: this will get triggered only in preview.
   */
  removeScripts() {
    var child = this.scriptRef.current.lastElementChild;
    while (child) {
      this.scriptRef.current.removeChild(child);
      child = this.scriptRef.current.lastElementChild;
    }
  }

  handleUpdate = () => {
    this.removeScripts();
    this.addScripts();
  };

  componentDidUpdate(prevProps) {
    /**
     * only trigger update if content of scripts is changed
     */
    let content = (this.props.content || '').trim();
    let oldContent = (prevProps.content || '').trim();
    if (oldContent !== content) {
      this.debouncedUpdate();
    }
  }
  render() {
    return <div ref={this.scriptRef} />;
  }
}

HTMLScript.propTypes = {
  content: PropTypes.string
};
