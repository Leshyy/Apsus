import { TextNote } from './TextNote.jsx';
import { ImgNote } from './ImgNote.jsx';
import { VidNote } from './VidNote.jsx';
import { TodoListNote } from './TodoListNote.jsx';


export function DynamicCmpPreview({ currCmp, title , info}) {
    switch (currCmp) {
        case 'textNote':
            return <TextNote title={title} info={info} />
        case 'imgNote':
            return <ImgNote title={title} info={info} />
        case 'videoNote':
            return <VidNote title={title} info={info} />
        case 'todoNote':
            return <TodoListNote title={title} info={info}/>
    }
    return <h4>Error! Please select note type!</h4>
}
