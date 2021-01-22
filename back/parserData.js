module.exports = {
    parseData: (data) => {
        const items = [...data.matchAll(/[^\n0-9]+?:/gm)].map(e => {
            return e[0].replace(':', '').trim();
        });
        const itemsWithVal = [];

        items.reduce((current, next) => {
            const regExp = new RegExp(`(?<=${current}:)[^]*(?=${next}:)`, 'g'); 
            itemsWithVal.push({ name: current, value: data.match(regExp)[0].replace(/\n/, '') });
            return next;
        });

        const regExpForLast = new RegExp(`(?<=${items[items.length - 1]}:)[^]*`, 'g'); 
        itemsWithVal.push({ name: items[items.length - 1], value:  data.match(regExpForLast)[0].replace(/\n/, '') } )

        return {items: itemsWithVal, countTasks: [...data.matchAll(/^-/gm)].length };
    },
    parseToDate: (data) => {
        let fileData = '';
        data.forEach(e => {
            if (e.name.length !== 0) fileData += `${e.name}:${e.value}\n`
        })
        return fileData;
    }
}