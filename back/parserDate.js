function getDayOfWeek(date) {
    return Number.parseFloat((new Date(`${date.month}.${date.day}.${date.year}`)).getDay());
}

function getWeekNumber(d) {
    d = new Date(`${d.month}.${d.day}.${d.year}`);
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    let yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    let weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    return [d.getUTCFullYear(), weekNo];
}

function moodFromNumToStr(currentMoodVal) {
    const currentMood = currentMoodVal >= 1.5 ? 'ideally' : currentMoodVal < 1.5 && currentMoodVal >= 0.5 ? 'good' : 
                        currentMoodVal < 0.5 && currentMoodVal >= -0.5 ? 'normal' : currentMoodVal < -0.5 && 
                        currentMoodVal >= -1.5 ? 'bad' : 'awful';
    return currentMood;     
}

function moodFromStrToNum(value) {
    let moodVal = 0;
    if (/ideally/gi.exec(value)) moodVal += 2;
    if (/good/gi.exec(value)) moodVal += 1;
    if (/bad/gi.exec(value)) moodVal += -1;
    if (/awful/gi.exec(value)) moodVal += -2;
    return moodVal;
}

module.exports = {
    getWeeksFromDays: (arrInJSON) => {
        let arr = JSON.parse(arrInJSON);
        let newArr = [];
        let moodVal = 0;
        let ordNumWeek;

        arr.forEach(element => {
            let currentYearWeek = getWeekNumber(element.date);
            if (getDayOfWeek(element.date) === 0  || newArr.length === 0 || 
                (ordNumWeek[0] !== currentYearWeek[0]) || (ordNumWeek[1] !== currentYearWeek[1])) 
            {
                if (newArr.length > 0 && ((ordNumWeek[0] !== currentYearWeek[0]) || 
                    (ordNumWeek[1] !== currentYearWeek[1]))) 
                {
                    const currentMoodVal = moodVal / (getDayOfWeek(newArr[newArr.length - 1].toDate) - 
                                           getDayOfWeek(newArr[newArr.length - 1].date) + 1);
                    const currentMood = moodFromNumToStr(currentMoodVal);
            
                    let flagSetMood = false;
                    newArr[newArr.length - 1].items = newArr[newArr.length - 1].items.map(e => {
                    if (e.name.toUpperCase() === 'MOOD') {
                        flagSetMood = true;
                        e.value = currentMood;
                    }
                    return e;
                    });
                    
                    if (!flagSetMood) newArr[newArr.length - 1].items.push({name: 'Mood', value: currentMood});
                }
                moodVal = 0;
                ordNumWeek = getWeekNumber(element.date);
                newArr.push(element);
                element.items.forEach(e => {
                    if (e.name.toUpperCase() === 'MOOD') moodVal += moodFromStrToNum(e.value);
                })
            } else {
                newArr[newArr.length - 1].toDate = element.date;
                newArr[newArr.length - 1].countTasks += element.countTasks;
                element.items.forEach(outElement => {
                    if (outElement.name.toUpperCase() === 'MOOD') moodVal += moodFromStrToNum(outElement.value);
                    else {
                        let flagHasItem = false;
                        newArr[newArr.length - 1].items.forEach((innerElement, index) => {
                            if (!flagHasItem && innerElement.name === outElement.name) {
                                flagHasItem = true;
                                let lineBreak = '';
                                if (/^\n/.exec(outElement.value)) lineBreak = '\n';
                                newArr[newArr.length - 1].items[index].value += `${lineBreak}${outElement.value}`;
                            }
                        });
                        if (!flagHasItem) {
                            newArr[newArr.length - 1].items.push(outElement);
                        }
                    }
                })
            }   

            if (element === arr[arr.length - 1]) {
                const currentMoodVal = moodVal / (getDayOfWeek(newArr[newArr.length - 1].toDate) - 
                                       getDayOfWeek(newArr[newArr.length - 1].date) + 1);
                const currentMood = moodFromNumToStr(currentMoodVal);
          
                let flagSetMood = false;
                newArr[newArr.length - 1].items = newArr[newArr.length - 1].items.map(e => {
                  if (e.name.toUpperCase() === 'MOOD') {
                    flagSetMood = true;
                    e.value = currentMood;
                  }
                  return e;
                });
                
                if (!flagSetMood) newArr[newArr.length - 1].items.push({name: 'Mood', value: currentMood});
            }  
        });

        return newArr;
    },
    getMonthsFromDays: (arrInJSON) => {
        let arr = JSON.parse(arrInJSON);
        let newArr = [];
        let moodVal = 0;
        let currentYear;
        let currentMonth;

        arr.forEach(element => {
            if (getDayOfWeek(element.date) === 0  || newArr.length === 0 || 
                currentMonth !== element.date.month || currentYear !== element.date.year) 
            {
                if (newArr.length > 0 && (currentMonth !== element.date.month || 
                    currentYear !== element.date.year)) 
                {
                    const currentMoodVal = moodVal / (getDayOfWeek(newArr[newArr.length - 1].toDate) - 
                                           getDayOfWeek(newArr[newArr.length - 1].date) + 1);
                    const currentMood = moodFromNumToStr(currentMoodVal);
            
                    let flagSetMood = false;
                    newArr[newArr.length - 1].items = newArr[newArr.length - 1].items.map(e => {
                    if (e.name.toUpperCase() === 'MOOD') {
                        flagSetMood = true;
                        e.value = currentMood;
                    }
                    return e;
                    });
                    
                    if (!flagSetMood) newArr[newArr.length - 1].items.push({name: 'Mood', value: currentMood});
                }
                moodVal = 0;
                currentMonth = element.date.month;
                currentYear = element.date.year;
                newArr.push(element);
                element.items.forEach(e => {
                    if (e.name.toUpperCase() === 'MOOD') moodVal += moodFromStrToNum(e.value);
                })
            } else {
                newArr[newArr.length - 1].toDate = element.date;
                newArr[newArr.length - 1].countTasks += element.countTasks;
                element.items.forEach(outElement => {
                    if (outElement.name.toUpperCase() === 'MOOD') moodVal += moodFromStrToNum(outElement.value);
                    else {
                        let flagHasItem = false;
                        newArr[newArr.length - 1].items.forEach((innerElement, index) => {
                            if (!flagHasItem && innerElement.name === outElement.name) {
                                flagHasItem = true;
                                let lineBreak = '';
                                if (/^\n/.exec(outElement.value)) lineBreak = '\n';
                                newArr[newArr.length - 1].items[index].value += `${lineBreak}${outElement.value}`;
                            }
                        });
                        if (!flagHasItem) {
                            newArr[newArr.length - 1].items.push(outElement);
                        }
                    }
                })
            }   

            if (element === arr[arr.length - 1]) {
                const currentMoodVal = moodVal / (getDayOfWeek(newArr[newArr.length - 1].toDate) - 
                                       getDayOfWeek(newArr[newArr.length - 1].date) + 1);
                const currentMood = moodFromNumToStr(currentMoodVal);
          
                let flagSetMood = false;
                newArr[newArr.length - 1].items = newArr[newArr.length - 1].items.map(e => {
                  if (e.name.toUpperCase() === 'MOOD') {
                    flagSetMood = true;
                    e.value = currentMood;
                  }
                  return e;
                });
                
                if (!flagSetMood) newArr[newArr.length - 1].items.push({name: 'Mood', value: currentMood});
            }  
        });

        return newArr; 
    }
}

//   function getMonthsFromDays(arr: Array<Data>): Array<Data> {
//     let newArr: Array<Data> = [];
     
//     let moodVal = 0;
//     let currentMonth: number;
  
//     arr.forEach(element => {
//       if (element.date.month !== currentMonth && newArr.length > 0) {
//         const currentMoodVal = (moodVal / (newArr[newArr.length - 1].toDate.day - newArr[newArr.length - 1].date.day));
//         const currentMood = currentMoodVal >= 1.5 ? 'ideally' : currentMoodVal < 1.5 && currentMoodVal >= 0.5 ? 'good' : 
//                           currentMoodVal < 0.5 && currentMoodVal >= -0.5 ? 'normal' : currentMoodVal < -0.5 && 
//                           currentMoodVal >= -1.5 ? 'bad' : 'awful';  
  
//         let flagSetMood = false;
//         newArr[newArr.length - 1].items = newArr[newArr.length - 1].items.map(e => {
//           if (e.name.toUpperCase() === 'MOOD') {
//             flagSetMood = true;
//             e.value = currentMood;
//           }
//           return e;
//         });
        
//         if (!flagSetMood) newArr[newArr.length - 1].items.push({name: 'Mood', value: currentMood});
//         newArr.push(element);
//         moodVal = 0;
//       } else {
//         let countMinus = 0;
//         if (newArr.length === 0) {
//           currentMonth = element.date.month;
//           newArr.push(element);
//           countMinus = newArr[0].countTasks;
//         } 
//         newArr[newArr.length - 1].countTasks += element.countTasks - countMinus;
//         newArr[newArr.length - 1].toDate = element.date;    
//         element.items.forEach(e => {
//           if (e.name.toUpperCase() === 'MOOD') {
//             if (/ideally/gi.exec(e.value)) moodVal += 2;
//             if (/good/gi.exec(e.value)) moodVal += 1;
//             if (/bad/gi.exec(e.value)) moodVal += -1;
//             if (/awful/gi.exec(e.value)) moodVal += -2;
//           } else {
//             newArr[newArr.length - 1].items.push(e);
//           }
//         });   
  
//         if (arr[arr.length - 1] === element) {
//           const currentMoodVal = (moodVal / (newArr[newArr.length - 1].toDate.day - newArr[newArr.length - 1].date.day));
//           const currentMood = currentMoodVal >= 1.5 ? 'ideally' : currentMoodVal < 1.5 && currentMoodVal >= 0.5 ? 'good' : 
//                             currentMoodVal < 0.5 && currentMoodVal >= -0.5 ? 'normal' : currentMoodVal < -0.5 && 
//                             currentMoodVal >= -1.5 ? 'bad' : 'awful';  
          
//           let flagSetMood = false;
//           newArr[newArr.length - 1].items = newArr[newArr.length - 1].items.map(e => {
//             if (e.name.toUpperCase() === 'MOOD') {
//               flagSetMood = true;
//               e.value = currentMood;
//             }
//             return e;
//           });
          
//           if (!flagSetMood) newArr[newArr.length - 1].items.push({name: 'Mood', value: currentMood});
//         }
//       }
//     });
//     return newArr;
//   }

// [
//     [
//         {
//             "items": [
//                 {
//                     "name": "Mom",
//                     "value": "\r- bought me a USB stick\r"
//                 },
//                 {
//                     "name": "Dad",
//                     "value": "\r- made me and himself a haircut \r"
//                 },
//                 {
//                     "name": "I",
//                     "value": "\r"
//                 },
//                 {
//                     "name": "- dropped my files on my phone, then remove and install windows",
//                     "value": "\r  * install drivers\r\n  * made a nice file system\r\n- made my notes\r\n- woke up at 01:30 PM\r\n"
//                 }
//             ],
//             "countTasks": 5,
//             "date": {
//                 "day": 18,
//                 "month": 1,
//                 "year": 2021
//             },
//             "toDate": {
//                 "day": 18,
//                 "month": 1,
//                 "year": 2021
//             }
//         },
//         {
//             "items": [
//                 {
//                     "name": "I",
//                     "value": "\r- dropped files from my phone to laptop\r\n- playd WoT from 01:00 AM to 03:25 AM\r\n- at 03:55 AM go to bed\r\n- woke up at 12:00 PM\r\n- fixed program for git (Short-git)\r\n- cleared the laptop screen\r\n- cleaned the keyboard (laptop and PC), mouse, mouse pad\r\n- glued the battery to the board in the laptop\r\n- went to the store with my dad\r\n- played billiards\r\n- created a program for my tasks\r\n- had fun with a friend (Artem)\r\n- created my first tasks\r\n- played a WoT from 10:30 PM to 12:10 AM\r\n"
//                 }
//             ],
//             "countTasks": 14,
//             "date": {
//                 "day": 19,
//                 "month": 1,
//                 "year": 2021
//             },
//             "toDate": {
//                 "day": 19,
//                 "month": 1,
//                 "year": 2021
//             }
//         },
//         {
//             "items": [
//                 {
//                     "name": "Dad",
//                     "value": "\r- invited me to fish with his friends and my godfather\r"
//                 },
//                 {
//                     "name": "I",
//                     "value": "\r- repeated JS & Node\r\n- at 01:15 AM go to bed\r\n- updated the FileWatcher program\r\n- started writing a new React project in ts\r\n- repeated hooks for react\r\n- took a walk with my friends (Artem & Andrey)\r\n- tried to install a program for Artem's dad (program to diagnostic audi with VOG wire)\r\n- went to bed at 09:00 PM\r\n- at 11:40 PM woke up\r"
//                 },
//                 {
//                     "name": "Mood",
//                     "value": " good"
//                 }
//             ],
//             "countTasks": 10,
//             "date": {
//                 "day": 20,
//                 "month": 1,
//                 "year": 2021
//             },
//             "toDate": {
//                 "day": 20,
//                 "month": 1,
//                 "year": 2021
//             }
//         },
//         {
//             "items": [
//                 {
//                     "name": "Dad",
//                     "value": "\r- cheered up a lot\r"
//                 },
//                 {
//                     "name": "I",
//                     "value": "\r- thought about writing meal times\r\n- woke up at 00:30 AM\r\n- ate at 08:00 AM\r\n- at 10:00 AM went to bed\r\n- woke up at 02:30 PM\r\n- worked all day, created a life calendar\r\n- at 05:00 PM went to my grandmother with my Dad\r\n- had fun with my friend (Sergey)\r"
//                 },
//                 {
//                     "name": "Funny moments",
//                     "value": "\r- had fun with my friend (Sergey)\r"
//                 },
//                 {
//                     "name": "Mood",
//                     "value": " good"
//                 }
//             ],
//             "countTasks": 10,
//             "date": {
//                 "day": 21,
//                 "month": 1,
//                 "year": 2021
//             },
//             "toDate": {
//                 "day": 21,
//                 "month": 1,
//                 "year": 2021
//             }
//         }
//     ],
//     [],
//     []
// ]