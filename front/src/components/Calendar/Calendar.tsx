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

function getWeeksFromDays(arr: Array<Data>): Array<Data> {
  let newArr: Array<Data> = [];
   
  let moodVal = 0;
  arr.forEach(element => {
    if (element.date.dayOfWeek === 0 || newArr.length === 0) {
      if (newArr.length === 0) {
        newArr.push(Object.assign({}, element));
      } else {
        const currentMoodVal = (moodVal / (newArr[newArr.length - 1].toDate.dayOfWeek - newArr[newArr.length - 1].date.dayOfWeek));

        const currentMood = currentMoodVal === 2 ? 'ideally' : currentMoodVal < 2 && currentMoodVal >= 1 ? 'good' : 
                          currentMoodVal < 1 && currentMoodVal >= 0 ? 'normal' : currentMoodVal < 0 && 
                          currentMoodVal >= -1 ? 'bad' : 'awful';  

        let flagSetMood = false;
        newArr[newArr.length - 1].items = newArr[newArr.length - 1].items.map(e => {
          if (e.name.toUpperCase() === 'MOOD') {
            flagSetMood = true;
            e.value = currentMood;
          }
          return e;
        });
        
        if (!flagSetMood) newArr[newArr.length - 1].items.push({name: 'Mood', value: currentMood});
        newArr.push(Object.assign({}, element));
        moodVal = 0;
      }
    } else {
      newArr[newArr.length - 1].countTasks += element.countTasks;
      newArr[newArr.length - 1].toDate.day = element.date.day;   
      newArr[newArr.length - 1].toDate.month = element.date.month;   
      newArr[newArr.length - 1].toDate.year = element.date.year;   
      newArr[newArr.length - 1].toDate.dayOfWeek = element.date.dayOfWeek;   
      element.items.forEach(e => {
        if (e.name.toUpperCase() === 'MOOD') {
          if (/ideally/gi.exec(e.value)) moodVal += 2;
          if (/good/gi.exec(e.value)) moodVal += 1;
          if (/bad/gi.exec(e.value)) moodVal += -1;
          if (/awful/gi.exec(e.value)) moodVal += -2;
        } else {
          newArr[newArr.length - 1].items.push(e);
        }
      });   
    }
  });
  return newArr;
}

function getMonthsFromDays(arr: Array<Data>): Array<Data> {
  let newArr: Array<Data> = [];
   
  let moodVal = 0;
  let currentMonth: number;
  arr.forEach(element => {
    if (element.date.month !== currentMonth || newArr.length === 0) {
      if (newArr.length === 0) {
        currentMonth = element.date.month;
        newArr.push(Object.assign({}, element));
      } else {
        const currentMoodVal = (moodVal / (newArr[newArr.length - 1].toDate.day - newArr[newArr.length - 1].date.day));

        const currentMood = currentMoodVal === 2 ? 'ideally' : currentMoodVal < 2 && currentMoodVal >= 1 ? 'good' : 
                          currentMoodVal < 1 && currentMoodVal >= 0 ? 'normal' : currentMoodVal < 0 && 
                          currentMoodVal >= -1 ? 'bad' : 'awful';  

        let flagSetMood = false;
        newArr[newArr.length - 1].items = newArr[newArr.length - 1].items.map(e => {
          if (e.name.toUpperCase() === 'MOOD') {
            flagSetMood = true;
            e.value = currentMood;
          }
          return e;
        });
        
        if (!flagSetMood) newArr[newArr.length - 1].items.push({name: 'Mood', value: currentMood});
        newArr.push(Object.assign({}, element));
        moodVal = 0;
      }
    } else {
      newArr[newArr.length - 1].countTasks += element.countTasks;
      newArr[newArr.length - 1].toDate.day = element.date.day;   
      newArr[newArr.length - 1].toDate.month = element.date.month;   
      newArr[newArr.length - 1].toDate.year = element.date.year;   
      newArr[newArr.length - 1].toDate.dayOfWeek = element.date.dayOfWeek;   
      element.items.forEach(e => {
        if (e.name.toUpperCase() === 'MOOD') {
          if (/ideally/gi.exec(e.value)) moodVal += 2;
          if (/good/gi.exec(e.value)) moodVal += 1;
          if (/bad/gi.exec(e.value)) moodVal += -1;
          if (/awful/gi.exec(e.value)) moodVal += -2;
        } else {
          newArr[newArr.length - 1].items.push(e);
        }
      });   
    }
  });
  return newArr;
}

const Calendar: React.FC<CalendarProps> = (props) => {
  let [currentCell, setCurrentCell] = useState<any>();
  
  let arrOfDoneTasksByDays: Array<Data> = [
    { items: [{name: 'Mood', value: ' bad'}], countTasks: 1, date: {day: 17, month: 1, year: 2021, dayOfWeek: 0}, toDate: {day: 17, month: 1, year: 2021, dayOfWeek: 0}},
    { items: [{name: 'Mood', value: ' awful'}], countTasks: 2, date: {day: 18, month: 1, year: 2021, dayOfWeek: 1}, toDate: {day: 18, month: 1, year: 2021, dayOfWeek: 1}},
    { items: [{name: 'Mood', value: ' ideally'}], countTasks: 5, date: {day: 19, month: 1, year: 2021, dayOfWeek: 2}, toDate: {day: 19, month: 1, year: 2021, dayOfWeek: 2}},
    { items: [{name: 'Mood', value: ' ideally'}], countTasks: 10, date: {day: 20, month: 1, year: 2021, dayOfWeek: 3}, toDate: {day: 20, month: 1, year: 2021, dayOfWeek: 3}},
    { items: [{name: 'Mood', value: ' ideally'}], countTasks: 10, date: {day: 20, month: 1, year: 2021, dayOfWeek: 4}, toDate: {day: 20, month: 1, year: 2021, dayOfWeek: 4}},
    { items: [{name: 'Mood', value: ' ideally'}], countTasks: 10, date: {day: 20, month: 1, year: 2021, dayOfWeek: 5}, toDate: {day: 20, month: 1, year: 2021, dayOfWeek: 5}},
    { items: [{name: 'Mood', value: ' ideally'}], countTasks: 10, date: {day: 20, month: 1, year: 2021, dayOfWeek: 6}, toDate: {day: 20, month: 1, year: 2021, dayOfWeek: 6}},
    { items: [{name: 'Mood', value: ' ideally'}], countTasks: 30, date: {day: 21, month: 1, year: 2021, dayOfWeek: 0}, toDate: {day: 21, month: 1, year: 2021, dayOfWeek: 0}},
    { items: [{name: 'Mood', value: ' ideally'}], countTasks: 30, date: {day: 22, month: 1, year: 2021, dayOfWeek: 1}, toDate: {day: 22, month: 1, year: 2021, dayOfWeek: 1}},
  ];
  let arrOfDoneTasksByWeeks: Array<Data> = getWeeksFromDays(arrOfDoneTasksByDays);
  let arrOfDoneTasksByMonths: Array<Data> = getMonthsFromDays(arrOfDoneTasksByDays);

  function getCellInfo(index: number): void {
    setCurrentCell(
      <div>{ index }</div>
    );
  }

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

    arrOfElements.push(
      <div className={ classAndMood } key={ index } onClick={ () => { getCellInfo(index) } }>
        <p className="Calendar-cell-text">{ outElement.countTasks }</p>
      </div>
    );    
  });

  let view = currentCell ? currentCell : <div className="Calendar">{ arrOfElements }</div>

  return <>{ view }</>;
}

export default Calendar;