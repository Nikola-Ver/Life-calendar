import React, { useState } from 'react';
import './App.css';
import Calendar from '../Calendar/Calendar';
import Switcher from '../Switcher/Switcher';

const App: React.FC = (props) => {
  let [viewType, setViewType] = useState<number>(0);
  let [currentCell, setCurrentCell] = useState<any>();
  let switcher = <Switcher setNewViewType={setViewType} />;

  if (currentCell) switcher = <></>;

  return (
    <>
      {switcher}
      <Calendar
        viewType={viewType}
        currentCell={currentCell}
        setCurrentCell={setCurrentCell}
      />
    </>
  );
};

export default App;
