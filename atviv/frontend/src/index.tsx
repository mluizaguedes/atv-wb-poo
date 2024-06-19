import React from 'react';
import ReactDOM from 'react-dom';
import Roteador from './componentess/roteador';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode> {/* modo estrito do react, que ajuda a identificar problemas potenciais na aplicação */}
    <Roteador />
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals(); // chama a função reportWebVitals para medir a performance da aplicação