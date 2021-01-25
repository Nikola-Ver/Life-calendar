import './Tuning.css';
import TextareaAutosize from 'react-textarea-autosize';

interface TuningProps {
    arrOfDoneTasks: any,
    setArrOfDoneTasks: any,
    index: number
}

const Tuning: React.FC<TuningProps> = (props) => {
    function addNewTasks(): void {
        const titleDiv = document.getElementsByClassName('Cell-tuning-fields-title')[0] as any;
        const textDiv = document.getElementsByClassName('Cell-tuning-fields-text')[0] as any;
        
        const newTitle = titleDiv.value;
        const newTasks = textDiv.value;

        titleDiv.value = '';
        textDiv.value = '';
        titleDiv.style.height = '44px';
        textDiv.style.height = '35px';

        const content = document.getElementsByClassName('Cell-tuning')[0];
        let contentElement = document.createElement('div');
        contentElement.className = 'Calendar-cell-info-content-element';

        let elementRemove = document.createElement('div');
        elementRemove.className = 'Editor-delete Calendar-cell-info-content-element-remove';
        elementRemove.onclick = (e: any) => { e.target.parentElement.remove() };
        contentElement.appendChild(elementRemove);

        let newTitleDiv = document.createElement('div');
        newTitleDiv.className = 'Calendar-cell-info-content-title Editable';
        newTitleDiv.innerText = newTitle ;
        let newTextDiv = document.createElement('div');
        newTextDiv.className = 'Calendar-cell-info-content-text Editable';
        newTextDiv.innerText = newTasks;

        contentElement.appendChild(newTitleDiv);
        contentElement.appendChild(newTextDiv);

        content.before(contentElement);
    }

    let flagActive = false;
    let ideally = 'Mood-ideally mood';
    let good = 'Mood-good mood';
    let normal = 'Mood-normal mood';
    let bad = 'Mood-bad mood';
    let awful = 'Mood-awful mood';
    props.arrOfDoneTasks[0][props.index].items.forEach((e: any) => {
        if (e.name.toUpperCase() === 'MOOD') {
            flagActive = true;
            if (/ideally/gi.exec(e.value)) ideally += ' active';
            if (/good/gi.exec(e.value)) good += ' active';
            if (/normal/gi.exec(e.value)) normal += ' active';
            if (/bad/gi.exec(e.value)) bad += ' active';
            if (/awful/gi.exec(e.value)) awful += ' active';
        }
    });
    if (!flagActive) {
        normal += ' active';
    }

    function changeMood(e: any): void {
        const moodDivs = document.getElementsByClassName('mood');
        for (let i = 0; i < moodDivs.length; i++) {
            if (moodDivs[i].classList.contains('active')) moodDivs[i].classList.remove('active');
        }
        e.target.classList.add('active');
    }

    return (
        <div className="Cell-tuning">
            <div className="Cell-tuning-fields">
                <TextareaAutosize className="Cell-tuning-fields-title" placeholder="Title"/>
                <TextareaAutosize className="Cell-tuning-fields-text" placeholder="Completed tasks"/>
                <div className="Cell-tuning-fields-button" onClick={ () => { addNewTasks() } }>Add new</div>
            </div>
            <div className="Cell-tuning-mood">
                <div onClick={ (e) => { changeMood(e) } } className={awful}></div>
                <div onClick={ (e) => { changeMood(e) } } className={bad}></div>
                <div onClick={ (e) => { changeMood(e) } } className={normal}></div>
                <div onClick={ (e) => { changeMood(e) } } className={good}></div>
                <div onClick={ (e) => { changeMood(e) } } className={ideally}></div>
            </div>
        </div>
    );
}

export default Tuning;