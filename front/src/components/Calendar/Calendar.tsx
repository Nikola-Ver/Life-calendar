import { type } from 'os';
import './Calendar.css';

interface CalendarProps {
    viewType: number;   
} 

const Calendar: React.FC<CalendarProps> = (props) => {
  let data = [{ items: [{name: 'Mood', value: ' good'}], countTasks: 10}];
  let arr = [];
  for (let index = 0; index < 150; index++) {
    arr.push(<div className="Calendar-cell" key={ index }><p>{index}</p></div>);    
  }
  return (
    <div className="Calendar">
      {arr}
    </div>
  );
}

export default Calendar;