import React from 'react';
import ReactTV, { renderOnAppLoaded } from 'react-tv';
import { withFocusable, withNavigation } from 'react-tv-navigation';
import StreamingApp from './StreamingApp';
import './index.css';

const AppWithNavigation = renderOnAppLoaded(withNavigation(StreamingApp));

ReactTV.render(<AppWithNavigation />, document.querySelector('#root'));