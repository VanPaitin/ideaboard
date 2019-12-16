import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import IdeasContainer from './components/IdeasContainer';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Idea board</h1>
      </header>
      <IdeasContainer/>
    </div>
  );
}

export default App;
