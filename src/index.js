import React from 'react';
import ReactDOM from 'react-dom';


import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <div>
        <h1>Hello React</h1>
    </div>,
    document.getElementById('root')
);
registerServiceWorker();
