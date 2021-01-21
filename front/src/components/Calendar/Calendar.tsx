import './Calendar.css';
import { useState } from 'react';

interface CalendarProps {
    viewType: number;   
}

interface Data {
  items: Array<{
    name: string,
    value: string
  }>,
  countTasks: number,
  date: {
    day: number,
    month: number,
    year: number,
    dayOfWeek: number
  },
  toDate: {
    day: number,
    month: number,
    year: number,
    dayOfWeek: number
  }
}


const Calendar: React.FC<CalendarProps> = (props) => {
  let [currentCell, setCurrentCell] = useState<any>();
  // 0 - days, 1 - weeks, 2 - months
  let [arrOfDoneTasks, setArrOfDoneTasks] = useState<Array<Array<Data>>>([[], [], []]);

  if (
    arrOfDoneTasks[0].length === 0 && 
    arrOfDoneTasks[1].length === 0 && 
    arrOfDoneTasks[2].length === 0
  ) {
    fetch('./index.js', 
      {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setArrOfDoneTasks(data);
      });
  }
       
  const arrOfElements: Array<any> = [];

  arrOfDoneTasks[props.viewType].forEach((outElement, index) => {
    let mood = 'normal';
    outElement.items.forEach(innerElement => {
      if (innerElement.name.toUpperCase() === 'MOOD') {
        if (/ideally/gi.exec(innerElement.value)) mood = 'ideally';
        if (/good/gi.exec(innerElement.value)) mood = 'good';
        if (/normal/gi.exec(innerElement.value)) mood = 'normal';
        if (/bad/gi.exec(innerElement.value)) mood = 'bad';
        if (/awful/gi.exec(innerElement.value)) mood = 'awful';
      } 
    });

    const classAndMood = `Calendar-cell ${mood}`;

    function getCellInfo(index: number): void {
      let viewComponents: any = [];
      arrOfDoneTasks[props.viewType][index].items.forEach(e => {
        if (e.name.toUpperCase() !== 'MOOD')
          viewComponents.push(
            <>
              <div className="Calendar-cell-info-content-title">
                { e.name }
              </div>
              <div className="Calendar-cell-info-content-text">
                { e.value }
              </div>
            </>
          );
      });

      setCurrentCell(
        <div className="Calendar-cell-info">
          <div className="Calendar-cell-info-close" onClick={ () => { setCurrentCell(null) } }></div>
          <div className="Calendar-cell-info-content">{ viewComponents }</div>
        </div>
      );
    }

    arrOfElements.push(
      <div 
        className={ classAndMood } 
        title={ `${outElement.date.day}.${outElement.date.month}.${outElement.date.year} - ` + 
                `${outElement.toDate.day}.${outElement.toDate.month}.${outElement.toDate.year}` } 
        key={ index } 
        onClick={ () => { getCellInfo(index) } }
      >
        <p className="Calendar-cell-text">{ outElement.countTasks }</p>
      </div>
    );    
  });

  let view = currentCell ? currentCell : <div className="Calendar">{ arrOfElements }</div>

  return <>{ view }</>;
}

export default Calendar;