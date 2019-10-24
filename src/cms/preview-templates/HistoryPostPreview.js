import React from 'react';
import PropTypes from 'prop-types';
import { HistoryPostTemplate } from '../../templates/history-post';

const HistoryPostPreview = ({ entry, widgetFor }) => (
  <HistoryPostTemplate
    content={widgetFor('body')}
    description={entry.getIn(['data', 'description'])}
    title={entry.getIn(['data', 'title'])}
  />
);

HistoryPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default HistoryPostPreview;
