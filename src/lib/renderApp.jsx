import React from 'react';
import ReactDOM from 'react-dom/client';

export function renderApp(AppComponent) {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <AppComponent />
    </React.StrictMode>,
  );
}
