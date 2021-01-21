function parseData(data) {
    const items = [...data.matchAll(/[^ \n0-9]+?:/gm)].map(e => {
        return e[0].replace(':', '').trim();
    });
    const itemsWithVal = [];

    items.reduce((current, next) => {
        const regExp = new RegExp(`(?<=${current}:).*(?=${next}:)`, 'gms'); 
        itemsWithVal.push({ name: current, value: data.match(regExp)[0].replace(/\n/, '').replace(/\n$/, '') });
        return next;
    });

    const regExpForLast = new RegExp(`(?<=${items[items.length - 1]}:).*`, 'gms'); 
    itemsWithVal.push({ name: items[items.length - 1], value:  data.match(regExpForLast)[0].replace(/\n/, '') } )

    // if (/ideally/gi.exec(e.value)) e.value = 'ideally';
    // if (/good/gi.exec(e.value)) e.value = 'good';
    // if (/normal/gi.exec(e.value)) e.value = 'normal';
    // if (/bad/gi.exec(e.value)) e.value = 'bad';
    // if (/awful/gi.exec(e.value)) e.value = 'awful';

    return {items: itemsWithVal, countOfTasks: [...data.matchAll(/^-/gm)].length };
}
