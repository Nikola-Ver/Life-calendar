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

    return (
        <div className="Cell-tuning">
            <div className="Cell-tuning-fields">
                <input className="Cell-tuning-fields-title" type="text" placeholder="Title"/>
                <TextareaAutosize className="Cell-tuning-fields-text" placeholder="Done tasks"/>
                <div className="Cell-tuning-fields-button" onClick={ () => { addNewTasks() } }>Add new</div>
            </div>
            <div className="Cell-tuning-mood">
                <div className="Mood-awful"></div>
                <div className="Mood-bad"></div>
                <div className="Mood-normal"></div>
                <div className="Mood-good"></div>
                <div className="Mood-ideally"></div>
            </div>
        </div>
    );
}

export default Tuning;