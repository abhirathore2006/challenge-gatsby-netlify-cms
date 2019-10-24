import React from 'react';
import PropTypes from 'prop-types';

export class HTMLScript extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  componentDidMount() {}
  componentDidUpdate() {
    let { content } = this.props;
    setTimeout(() => {
      let el = document.createElement('html');
      el.innerHTML = content;
      let scriptTags = el.getElementsByTagName('script');
      console.log(scriptTags);
      for (let i = 0; i < scriptTags.length; i++) {
        let s = scriptTags[i];
        let scriptEle = document.createElement('script');
        if (s.attributes && s.attributes.src) {
          Array.from(s.attributes).forEach(attr => {
            scriptEle[attr.name] = attr.value;
          });
          this.myRef.current.appendChild(scriptEle);
        } else {
          scriptEle.innerHTML = s.innerHTML;
          this.myRef.current.appendChild(scriptEle);
        }
      }
      // if (content) {
      //   let scriptContent = content || '';
      //   // html parsing is never safe, hence decided to use replace and then split to fetch all content
      //   scriptContent = scriptContent.replace(/<script>/g, '');
      //   let allScripts = scriptContent.split('</script>');

      //   allScripts.forEach(s => {
      //     let scriptEle = document.createElement('script');
      //     scriptEle.innerHTML = s;
      //     this.myRef.current.appendChild(scriptEle);
      //   });
      // }
    }, 1000);
  }
  render() {
    return <div ref={this.myRef} />;
  }
}

HTMLScript.propTypes = {
  content: PropTypes.string,
  holderId: PropTypes.string
};
