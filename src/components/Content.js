import React from 'react'
import PropTypes from 'prop-types'
import { debounce } from 'lodash';


export class HTMLContent extends React.Component {
  constructor(props) {
    super(props);
    // using ref's to handle iframe version and makes easier to find element
    this.scriptRef = React.createRef();
    // update get triggered on every change, debouce will prevent frequent updates
    this.debouncedUpdate = debounce(this.handleUpdate, 2000);
    this.newScript =null;
  }
  componentDidMount() {
    this.addScripts();
  }

  /**
   * add scripts will handle all the logic to add the script to
   * page view.
   */
  addScripts() {
    // let { content } = this.props;
    // let scriptContent = content || '';
    // /**
    //  * to handle all sort of scripts,
    //  * let's create a dummy html and see how it renders them
    //  * once we have that, we will find all script and copy them
    //  * in our view.
    //  */
    // let htmlEle = document.createElement('html');
    // htmlEle.innerHTML = scriptContent;
    // let scriptElms = htmlEle.getElementsByTagName('script');
    // for (let element of scriptElms) {
    //   let scriptEle = document.createElement('script');
    //   if (element.attributes && element.attributes.src) {
    //     Array.from(element.attributes).forEach(attr => {
    //       scriptEle[attr.name] = attr.value;
    //     });
    //   } else {
    //     scriptEle.innerHTML = element.innerHTML;
    //   }
    //   this.scriptRef.current.appendChild(scriptEle);
    // }
    console.log(this.scriptRef)
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
    // /**
    //  * only trigger update if content of scripts is changed
    //  */
    // let content = (this.props.content || '').trim();
    // let oldContent = (prevProps.content || '').trim();
    // if (oldContent !== content) {
    //   this.debouncedUpdate();
    // }
    let elem= this.scriptRef.current.getElementsByClassName("hold-my-scripts");
    console.log(elem, this.newScript)
    if(elem && elem[0] && this.newScript){
      elem[0].appendChild(this.newScript)
    }

  }
  processContent(content){
    let htmlEle = document.createElement('div');
    htmlEle.innerHTML = content.props && content.props.value;
    let scriptElms = htmlEle.getElementsByTagName('script');
    console.log(scriptElms)
    if(scriptElms && scriptElms.length){


    let scriptHolder =  document.createElement('div');
    scriptHolder.className="hold-my-scripts"
    scriptElms[0].parentNode.insertBefore(scriptHolder, scriptElms[0])
    let scriptEle = document.createElement('script');
    let element = scriptElms[0];
    if (element.attributes && element.attributes.src) {
      Array.from(element.attributes).forEach(attr => {
        scriptEle[attr.name] = attr.value;
      });
    } else {
      scriptEle.innerHTML = element.innerHTML;
    }
    this.newScript= scriptEle
    element.parentNode.removeChild(element);
  }
  console.log(htmlEle.innerHTML)
    return htmlEle.innerHTML
  }

  render() {

    return <div ref={this.scriptRef}  dangerouslySetInnerHTML={{__html:this.processContent(this.props.content)}} />;
  }
}

const Content = ({ content, className }) => (
  <div className={className}>{content}</div>
)

Content.propTypes = {
  content: PropTypes.node,
  className: PropTypes.string,
}

HTMLContent.propTypes = Content.propTypes

export default Content
