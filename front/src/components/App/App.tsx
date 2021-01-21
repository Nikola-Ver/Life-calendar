import React, { useState } from 'react';
import './App.css';
import Calendar from '../Calendar/Calendar';
import Switcher from '../Switcher/Switcher';

const App: React.FC = (props) => {
  let [viewType, setViewType] = useState<number>(0);

  return (
    <>
      <h1 className="App-title">{new Date().toDateString()}</h1>
      <Switcher setNewViewType={ setViewType } />
      <Calendar viewType={viewType}/>
    </>
  );
}

export default App;