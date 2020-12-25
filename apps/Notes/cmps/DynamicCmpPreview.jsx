import { TextNote } from './TextNote.jsx';
import { ImgNote } from './ImgNote.jsx';
import { VidNote } from './VidNote.jsx';
import { TodoListNote } from './TodoListNote.jsx';


export function DynamicCmpPreview({ currCmp, title , info}) {
    switch (currCmp) {
        case 'txtNote':
            return <TextNote title={title} info={info} />
        case 'imgNote':
            return <ImgNote title={title} info={info} />
        case 'vidNote':
            return <VidNote title={title} info={info} />
        case 'todoListNote':
            return <TodoListNote title={title} info={info} />
    }
    return <p>Error</p>
}
