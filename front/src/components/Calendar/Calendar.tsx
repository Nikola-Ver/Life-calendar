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
  
  let arrOfDoneTasksByDays: Array<Data> = [
    { items: [{name: 'Mood', value: ' awful'}], countTasks: 15, date: {day: 17, month: 1, year: 2021, dayOfWeek: 0}, toDate: {day: 17, month: 1, year: 2021, dayOfWeek: 0}},
    { items: [{name: 'Mood', value: ' awful'}], countTasks: 2, date: {day: 18, month: 1, year: 2021, dayOfWeek: 1}, toDate: {day: 18, month: 1, year: 2021, dayOfWeek: 1}},
    { items: [{name: 'Mood', value: ' ideally'}], countTasks: 5, date: {day: 19, month: 1, year: 2021, dayOfWeek: 2}, toDate: {day: 19, month: 1, year: 2021, dayOfWeek: 2}},
    { items: [{name: 'Mood', value: ' ideally'}], countTasks: 10, date: {day: 21, month: 1, year: 2021, dayOfWeek: 3}, toDate: {day: 21, month: 1, year: 2021, dayOfWeek: 3}},
    { items: [{name: 'Mood', value: ' ideally'}], countTasks: 10, date: {day: 22, month: 1, year: 2021, dayOfWeek: 4}, toDate: {day: 22, month: 1, year: 2021, dayOfWeek: 4}},
    { items: [{name: 'Mood', value: ' ideally'}], countTasks: 10, date: {day: 23, month: 1, year: 2021, dayOfWeek: 5}, toDate: {day: 23, month: 1, year: 2021, dayOfWeek: 5}},
    { items: [{name: 'Mood', value: ' ideally'}], countTasks: 10, date: {day: 24, month: 1, year: 2021, dayOfWeek: 6}, toDate: {day: 24, month: 1, year: 2021, dayOfWeek: 6}},
    { items: [{name: 'Mood', value: ' ideally'}], countTasks: 30, date: {day: 25, month: 1, year: 2021, dayOfWeek: 0}, toDate: {day: 25, month: 1, year: 2021, dayOfWeek: 0}},
    { items: [{name: 'Mood', value: ' ideally'}], countTasks: 30, date: {day: 26, month: 1, year: 2021, dayOfWeek: 1}, toDate: {day: 26, month: 1, year: 2021, dayOfWeek: 1}},
  ];
  let arrOfDoneTasksByWeeks: Array<Data> = [
      {
        items: [
            {
                name: "Dad",
                value: "- invited me to fish with his friends and my godfather"
            },
            {
                name: "I",
                value: "- repeated JS & Node\n- at 01:15 AM go to bed\n- updated the FileWatcher program\n- started writing a new React project in ts\n- repeated hooks for react\n- took a walk with my friends (Artem & Andrey)\n- tried to install a program for Artem's dad (program to diagnostic audi with VOG wire)\n- went to bed at 09:00 PM\n- at 11:40 PM woke up"
            },
            {
                name: "Mood",
                value: " good"
            }
        ],
        countTasks: 10,
        date: {day: 17, month: 1, year: 2021, dayOfWeek: 0}, toDate: {day: 24, month: 1, year: 2021, dayOfWeek: 0}
    },
    { items: [{name: 'Mood', value: ' awful'}], countTasks: 15, date: {day: 17, month: 1, year: 2021, dayOfWeek: 0}, toDate: {day: 24, month: 1, year: 2021, dayOfWeek: 0}},
  ];
  let arrOfDoneTasksByMonths: Array<Data> = [
    { items: [{name: 'Mood', value: ' ideally'}], countTasks: 15, date: {day: 17, month: 1, year: 2021, dayOfWeek: 0}, toDate: {day: 17, month: 1, year: 2021, dayOfWeek: 0}},
  ];

  const arrOfElements: Array<any> = [];
  const arrOfDoneTasks: Array<Data> = props.viewType === 0 ? arrOfDoneTasksByDays : props.viewType === 1 ? 
                                    arrOfDoneTasksByWeeks : arrOfDoneTasksByMonths;

  arrOfDoneTasks.forEach((outElement, index) => {
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
      arrOfDoneTasks[index].items.forEach(e => {
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