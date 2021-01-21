const express = require("express");

const app = express();
const PORT = 80;

app.use(express.static('D:\\Programming\\My\\Node js\\work\\Life-calendar\\front\\build'));

app
  .get("*", async (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(
            [ 
                [
                  { items: [{name: 'Mood', value: ' awful'}], countTasks: 15, date: {day: 17, month: 1, year: 2021, dayOfWeek: 0}, toDate: {day: 17, month: 1, year: 2021, dayOfWeek: 0}},
                  { items: [{name: 'Mood', value: ' awful'}], countTasks: 2, date: {day: 18, month: 1, year: 2021, dayOfWeek: 1}, toDate: {day: 18, month: 1, year: 2021, dayOfWeek: 1}},
                  { items: [{name: 'Mood', value: ' ideally'}], countTasks: 5, date: {day: 19, month: 1, year: 2021, dayOfWeek: 2}, toDate: {day: 19, month: 1, year: 2021, dayOfWeek: 2}},
                  { items: [{name: 'Mood', value: ' ideally'}], countTasks: 10, date: {day: 21, month: 1, year: 2021, dayOfWeek: 3}, toDate: {day: 21, month: 1, year: 2021, dayOfWeek: 3}},
                  { items: [{name: 'Mood', value: ' ideally'}], countTasks: 10, date: {day: 22, month: 1, year: 2021, dayOfWeek: 4}, toDate: {day: 22, month: 1, year: 2021, dayOfWeek: 4}},
                  { items: [{name: 'Mood', value: ' ideally'}], countTasks: 10, date: {day: 23, month: 1, year: 2021, dayOfWeek: 5}, toDate: {day: 23, month: 1, year: 2021, dayOfWeek: 5}},
                  { items: [{name: 'Mood', value: ' ideally'}], countTasks: 10, date: {day: 24, month: 1, year: 2021, dayOfWeek: 6}, toDate: {day: 24, month: 1, year: 2021, dayOfWeek: 6}},
                  { items: [{name: 'Mood', value: ' ideally'}], countTasks: 30, date: {day: 25, month: 1, year: 2021, dayOfWeek: 0}, toDate: {day: 25, month: 1, year: 2021, dayOfWeek: 0}},
                  { items: [{name: 'Mood', value: ' ideally'}], countTasks: 30, date: {day: 26, month: 1, year: 2021, dayOfWeek: 1}, toDate: {day: 26, month: 1, year: 2021, dayOfWeek: 1}},
                ],
                [
                  { items: [{name: "Dad",value: "- invited me to fish with his friends and my godfather"},{name: "I",value: "- repeated JS & Node\n- at 01:15 AM go to bed\n- updated the FileWatcher program\n- started writing a new React project in ts\n- repeated hooks for react\n- took a walk with my friends (Artem & Andrey)\n- tried to install a program for Artem's dad (program to diagnostic audi with VOG wire)\n- went to bed at 09:00 PM\n- at 11:40 PM woke up"},{name: "Mood",value: " good"}],countTasks: 10,date: {day: 17, month: 1, year: 2021, dayOfWeek: 0}, toDate: {day: 24, month: 1, year: 2021, dayOfWeek: 0}},
                  { items: [{name: 'Mood', value: ' awful'}], countTasks: 15, date: {day: 17, month: 1, year: 2021, dayOfWeek: 0}, toDate: {day: 24, month: 1, year: 2021, dayOfWeek: 0}},
                ],
              
                [
                  { items: [{name: 'Mood', value: ' ideally'}], countTasks: 15, date: {day: 17, month: 1, year: 2021, dayOfWeek: 0}, toDate: {day: 17, month: 1, year: 2021, dayOfWeek: 0}},
                ]
              ]
        ));
  })
  .listen(PORT);