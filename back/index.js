const express = require("express");
const app = express();
const PORT = 80;
const path = require('path');
const fs = require('fs');
const parserDate = require('./parserDate');
const parserData = require('./parserData');
const pathToTasks = require('./pathToTasks.json');

let tasks = [[], [], []]; // days, weeks, months
let flagInWork = false;

function updateTasks() {
    flagWork = true;
    tasks = [[], [], []];
    fs.readdir(pathToTasks, (err, files) => {
        files.forEach(file => {
            const filePath = `${pathToTasks}/${file}`;
            const date = file.match(/[0-9]+(?=\.)/g).map(e => Number.parseInt(e));
            tasks[0].push(
                Object.assign(
                    {}, 
                    parserData.parseData(`${fs.readFileSync(filePath)}`),
                    { 
                        date: {
                            day: date[0],
                            month: date[1],
                            year: date[2],
                        }, 
                        toDate: {
                            day: date[0],
                            month: date[1],
                            year: date[2],
                        } 
                    }
                )
            )
        });
        tasks[0].sort((current, next) => (
            Number.parseInt(current.date.year.toString() + (current.date.month.toString().length < 2 ? 
                `0${current.date.month.toString()}` : current.date.month.toString()) + (current.date.day.toString() < 2 ? 
                `0${current.date.day.toString()}` : current.date.day.toString())) - 
            Number.parseInt(next.date.year.toString() + (next.date.month.toString().length < 2 ? 
                `0${next.date.month.toString()}` : next.date.month.toString()) + (next.date.day.toString() < 2 ? 
                `0${next.date.day.toString()}` : next.date.day.toString())) 
        ));
        tasks[1] = parserDate.getWeeksFromDays(JSON.stringify(tasks[0]));
        tasks[2] = parserDate.getMonthsFromDays(JSON.stringify(tasks[0]));
    });
    flagInWork = false;
}

!flagInWork && updateTasks();

fs.watch(pathToTasks, (eventType, filename) => {
    !flagInWork && /[0-9]+?\.[0-9]+?\.[0-9]{4}\.txt/g.exec(filename) && updateTasks();
});

app.use(express.static(path.join(__dirname, '../front/build')));
app
  .get("*", async (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(tasks));
  })
  .listen(PORT);