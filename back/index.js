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

function updateTasks(flag) {
    flagWork = true;
    if (flag) {
        tasks = [[], [], []];
        fs.readdir(pathToTasks, (err, files) => {
            files.forEach(file => {
                const filePath = path.join(pathToTasks, file);
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
    } else {
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
    }
    flagInWork = false;
}

!flagInWork && updateTasks(true);

fs.watch(pathToTasks, (eventType, filename) => {
    !flagInWork && /[0-9]+?\.[0-9]+?\.[0-9]{4}\.txt/g.exec(filename) && updateTasks(true);
});

app.use(express.static(path.join(__dirname, '../front/build')));
app.use(express.json());
app
  .get("*", async (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(tasks));
  })

  .post("*", async (req, res) => {
    if (req.body.type) {
        if (req.body.type === 'EDIT') {
            tasks[0][req.body.index] = JSON.parse(req.body.item);
            flagInWork = true;
            fs.writeFileSync(path.join(pathToTasks, req.body.file), req.body.item);
            flagInWork = false;
    } else if (req.body.type === 'ADD') {
            tasks[0].push(JSON.parse(req.body.item));
            flagInWork = true;
            fs.writeFileSync(path.join(pathToTasks, req.body.file), req.body.item);
            flagInWork = false;
        } else if (req.body.type === 'DELETE') {
            tasks[0].splice(req.body.index, 1);
        }

        updateTasks(false);
        res.send("OK");
    } else {
      res.status(400).send("Bad request");
    }
  })

  .listen(PORT);