import React from 'react';
import PropTypes from 'prop-types';

export class HTMLScript extends React.Component {
  componentDidMount() {
    let { content } = this.props;
    let scriptContent = content || '';
    //html parsing is never safe, hence decided to use replace and then split to fetch all content
    scriptContent = scriptContent.replace(/<script>/g, '');
    let allScripts = scriptContent.split('</script>');
    let rootEle = document.getElementById(`script-holder-${this.props.holderId}`);
    allScripts.forEach(s => {
      let scriptEle = document.createElement('script');
      scriptEle.innerHTML = s;
      rootEle.append(scriptEle);
    });
  }
  render() {
    return <div id={`script-holder-${this.props.holderId}`} />;
  }
}

HTMLScript.propTypes = {
  content: PropTypes.string,
  holderId: PropTypes.string
};
