import './Calendar.css';
import Tuning from '../Tuning/Tuning';
import { useState } from 'react';

interface CalendarProps {
  viewType: number;
  currentCell: any;
  setCurrentCell: any
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
  },
  toDate: {
    day: number,
    month: number,
    year: number,
  }
}

let flagFirstIn = true;

const Calendar: React.FC<CalendarProps> = (props) => {
  // 0 - days, 1 - weeks, 2 - months
  let [arrOfDoneTasks, setArrOfDoneTasks] = useState<Array<Array<Data>>>([[], [], []]);

  // if (
  //   flagFirstIn &&
  //   arrOfDoneTasks[0].length === 0 &&
  //   arrOfDoneTasks[1].length === 0 &&
  //   arrOfDoneTasks[2].length === 0
  // ) {
  //   flagFirstIn = false;
  //   fetch('./index.js',
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json'
  //       }
  //     }
  //   )
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setArrOfDoneTasks(data);
  //     });
  // }

  if (
    arrOfDoneTasks[0].length === 0 &&
    arrOfDoneTasks[1].length === 0 &&
    arrOfDoneTasks[2].length === 0
  )
    setArrOfDoneTasks([[
      { items: [{ name: "Dad", value: "- invited me to fish with his friends and my godfather" }, { name: "I", value: "- repeated JS & Node\n- at 01:15 AM go to bed\n- updated the FileWatcher program\n- started writing a new React project in ts\n- repeated hooks for react\n- took a walk with my friends (Artem & Andrey)\n- tried to install a program for Artem's dad (program to diagnostic audi with VOG wire)\n- went to bed at 09:00 PM\n- at 11:40 PM woke up" }, { name: "Mood", value: " good" }], countTasks: 10, date: { day: 17, month: 1, year: 2021 }, toDate: { day: 17, month: 1, year: 2021 } },
      { items: [{ name: 'Mood', value: ' awful' }], countTasks: 2, date: { day: 18, month: 1, year: 2021 }, toDate: { day: 18, month: 1, year: 2021 } },
      { items: [{ name: 'Mood', value: ' ideally' }], countTasks: 5, date: { day: 19, month: 1, year: 2021 }, toDate: { day: 19, month: 1, year: 2021 } },
      { items: [{ name: 'Mood', value: ' ideally' }], countTasks: 10, date: { day: 21, month: 1, year: 2021 }, toDate: { day: 21, month: 1, year: 2021 } },
      { items: [{ name: 'Mood', value: ' ideally' }], countTasks: 10, date: { day: 22, month: 1, year: 2021 }, toDate: { day: 22, month: 1, year: 2021 } },
      { items: [{ name: 'Mood', value: ' ideally' }], countTasks: 10, date: { day: 23, month: 1, year: 2021 }, toDate: { day: 23, month: 1, year: 2021 } },
      { items: [{ name: 'Mood', value: ' ideally' }], countTasks: 10, date: { day: 24, month: 1, year: 2021 }, toDate: { day: 24, month: 1, year: 2021 } },
      { items: [{ name: 'Mood', value: ' ideally' }], countTasks: 30, date: { day: 25, month: 1, year: 2021 }, toDate: { day: 25, month: 1, year: 2021 } },
      { items: [{ name: 'Mood', value: ' ideally' }], countTasks: 30, date: { day: 26, month: 1, year: 2021 }, toDate: { day: 26, month: 1, year: 2021 } },
    ],
    [
      { items: [{ name: "Dad", value: "- invited me to fish with his friends and my godfather" }, { name: "I", value: "- repeated JS & Node\n- at 01:15 AM go to bed\n- updated the FileWatcher program\n- started writing a new React project in ts\n- repeated hooks for react\n- took a walk with my friends (Artem & Andrey)\n- tried to install a program for Artem's dad (program to diagnostic audi with VOG wire)\n- went to bed at 09:00 PM\n- at 11:40 PM woke up" }, { name: "Mood", value: " good" }], countTasks: 10, date: { day: 17, month: 1, year: 2021 }, toDate: { day: 24, month: 1, year: 2021 } },
      { items: [{ name: 'Mood', value: ' awful' }], countTasks: 15, date: { day: 17, month: 1, year: 2021 }, toDate: { day: 24, month: 1, year: 2021 } },
    ],
    [
      { items: [{ name: 'Mood', value: ' ideally' }], countTasks: 15, date: { day: 17, month: 1, year: 2021 }, toDate: { day: 17, month: 1, year: 2021 } },
    ]]);

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

    function saveAndExitFromCell(index: number, viewType: number): void {
      if (viewType === 0) {
        const calendar = document.getElementsByClassName('Calendar-cell-info-content')[0];
        const titles: any = calendar.getElementsByClassName('Calendar-cell-info-content-title');
        const texts: any = calendar.getElementsByClassName('Calendar-cell-info-content-text');
        let items: any = [];
        for (let i = 0; i < titles.length; i++)
          items.push({ name: titles[i].innerText, value: texts[i].innerText });
        arrOfDoneTasks[0][index].items.forEach(e => {
          if (e.name.toUpperCase() === 'MOOD') {
            items.push(e);
          }
        });
        let newArrOfDoneTasks = arrOfDoneTasks;
        newArrOfDoneTasks[0][index].items = items;
        const timeDiv = document.getElementById('time');
        const timeText = timeDiv?.innerText;
        if (timeText) {
          const dateFromText = new Date(timeText);
          if (dateFromText.toString() !== 'Invalid Date') {
            newArrOfDoneTasks[0][index].toDate.day = dateFromText.getDate();
            newArrOfDoneTasks[0][index].toDate.month = dateFromText.getMonth() + 1;
            newArrOfDoneTasks[0][index].toDate.year = dateFromText.getFullYear();
          }
        }

        fetch('./index.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            type: "EDIT",
            file: `${newArrOfDoneTasks[0][index].date.day < 10 ?
              `0${newArrOfDoneTasks[0][index].date.day.toString()}` :
              newArrOfDoneTasks[0][index].date.day}.${newArrOfDoneTasks[0][index].date.month < 10 ?
                `0${newArrOfDoneTasks[0][index].date.month.toString()}` :
                newArrOfDoneTasks[0][index].date.month}.${newArrOfDoneTasks[0][index].date.year}.txt`,// "25.25.2021.txt",
            index,
            item: JSON.stringify(newArrOfDoneTasks[0][index])
          })
        }).then(() => {
          fetch('./index.js',
            {
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
            }
          )
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              setArrOfDoneTasks(data);
            });
        });
      }

      props.setCurrentCell(null);
    }

    function deleteAndExitFromCell(index: number): void {
      let newArrOfDoneTasks = arrOfDoneTasks;

      fetch('./index.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          type: "DELETE",
          file: `${newArrOfDoneTasks[0][index].date.day < 10 ?
            `0${newArrOfDoneTasks[0][index].date.day.toString()}` :
            newArrOfDoneTasks[0][index].date.day}.${newArrOfDoneTasks[0][index].date.month < 10 ?
              `0${newArrOfDoneTasks[0][index].date.month.toString()}` :
              newArrOfDoneTasks[0][index].date.month}.${newArrOfDoneTasks[0][index].date.year}.txt`,// "25.25.2021.txt",
          index,
          item: null
        })
      }).then(() => {
        return newArrOfDoneTasks[0].splice(index, 1);
      }).then(() => {
        fetch('./index.js',
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          }
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setArrOfDoneTasks(data);
            return;
          });
      });

      props.setCurrentCell(null);
    }

    function getCellInfo(index: number): void {
      let viewComponents: any = [];
      let contentTitle = 'Calendar-cell-info-content-title';
      let contentText = 'Calendar-cell-info-content-text Editable';
      let deleteButton = <div className="Editor-delete" onClick={() => { deleteAndExitFromCell(index) }}></div>;
      let tuning = <Tuning setArrOfDoneTasks={setArrOfDoneTasks} arrOfDoneTasks={arrOfDoneTasks} index={index}/>;
      let deleteContentElementButton =
        <div
          onClick={(e: any) => { e.target.parentElement.remove() }}
          className="Editor-delete Calendar-cell-info-content-element-remove">
        </div>;
      if (props.viewType === 0) {
        contentTitle += ' Editable';
      } else {
        deleteContentElementButton = <></>;
        deleteButton = <></>;
        tuning = <></>;
      }
      arrOfDoneTasks[props.viewType][index].items.forEach(e => {
        if (e.name.toUpperCase() !== 'MOOD')
          viewComponents.push(
            <div className="Calendar-cell-info-content-element">
              {deleteContentElementButton}
              <div className={contentTitle}>
                {e.name}
              </div>
              <div className={contentText}>
                {e.value}
              </div>
            </div>
          );
      });


      let date = arrOfDoneTasks[props.viewType][index].date;
      let toDate = arrOfDoneTasks[props.viewType][index].toDate;
      let dateToday = <h1 id="time" className="App-title">{new Date(`${date.month}.${date.day}.${date.year}`).toDateString()}</h1>;
      if (date.month !== toDate.month || date.day !== toDate.day || date.year !== toDate.year) {
        dateToday =
          <h1 className="App-title-two">
            {new Date(`${date.month}.${date.day}.${date.year}`).toDateString()}<br />
            {new Date(`${toDate.month}.${toDate.day}.${toDate.year}`).toDateString()}
          </h1>;
      }

      props.setCurrentCell(
        <>
          {dateToday}
          <div className="Calendar-cell-info">
            <div className="Calendar-cell-info-close" onClick={() => { saveAndExitFromCell(index, props.viewType) }}></div>
            <div className="Calendar-cell-info-content">
              {viewComponents}
              {tuning}
            </div>
            {deleteButton}
          </div>
        </>
      );
    }

    arrOfElements.push(
      <div
        className={classAndMood}
        title={`${outElement.date.day}.${outElement.date.month}.${outElement.date.year} - ` +
          `${outElement.toDate.day}.${outElement.toDate.month}.${outElement.toDate.year}`}
        key={index}
        onClick={() => { getCellInfo(index) }}
      >
        <p className="Calendar-cell-text">{outElement.countTasks}</p>
      </div>
    );
  });

  let view = props.viewType === 0 ? props.currentCell ?
    <>
      { props.currentCell}
    </> :
    <>
      <h1 className="App-title">{new Date().toDateString()}</h1>
      <div className="Calendar">{arrOfElements}</div>
      <div className="Editor-add-new" onClick={() => { addNewCell() }}></div>
    </> : props.currentCell ? props.currentCell :
      <>
        <h1 className="App-title">{new Date().toDateString()}</h1>
        <div className="Calendar">{arrOfElements}</div>
      </>;

  function addNewCell(): void {
    fetch('./index.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        type: "ADD"
      })
    }).then(() => {
      fetch('./index.js',
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setArrOfDoneTasks(data);
        });
    });
  }

  return <>{view}</>;
}

export default Calendar;