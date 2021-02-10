import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'ract-router-dom';

import App from './components/App';

ReactDOM.render(
<Router>
    <App />
</Router>, 
document.getElementById('root')
);
