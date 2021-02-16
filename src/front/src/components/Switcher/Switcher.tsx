import React, { useState } from 'react';
import './Switcher.css';

interface SwitcherProps {
  setNewViewType: React.Dispatch<React.SetStateAction<number>>;
}

const Switcher: React.FC<SwitcherProps> = (props) => {
  let [classSwitcher, setClassSwitcher] = useState<string>('Switcher');
  function switchButton() {
    if (/ active/.exec(classSwitcher)) {
      setClassSwitcher(classSwitcher.replace(' active', ''));
    } else {
      setClassSwitcher(classSwitcher + ' active');
    }
  }

  return (
    <div className={classSwitcher}>
      <div className='Switcher-content'>
        <div
          className='Switcher-button'
          onClick={() => {
            switchButton();
          }}
        ></div>
      </div>
      <div className='Switcehr-options'>
        <div
          className='Swticher-text'
          onClick={() => {
            props.setNewViewType(0);
            switchButton();
          }}
        >
          Days
        </div>
        <div
          className='Swticher-text'
          onClick={() => {
            props.setNewViewType(1);
            switchButton();
          }}
        >
          Weeks
        </div>
        <div
          className='Swticher-text'
          onClick={() => {
            props.setNewViewType(2);
            switchButton();
          }}
        >
          Months
        </div>
      </div>
    </div>
  );
};

export default Switcher;
