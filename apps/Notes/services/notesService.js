import { storageService } from '../../../services/storageService.js';
import { utilService } from '../../../services/utilService.js';

export const notesService = {
    query,
    getNoteById,
    removeNote,
    addNote,
    updateNote,
};

const NOTES_KEY = 'notes';

// app data
let gNotes;

_createNotes();

function createNote(type, title, info) {
    if (type==='vidNote') {
        info.content = info.content.replace('watch?v=', 'embed/')
        console.log(info.content);
    }
    return {
        id: utilService.makeId(),
        type,
        title,
        info,
        label: '',
        isPinned: false,
        createdAt: Date.now(),
        style: {
            backgroundColor: '',
            // fontColor: '',
            // fontWeight: 'regular'
        },
    };
}

function query() {
    return Promise.resolve(gNotes);
}

function getNoteById(noteId) {
    const notes = gNotes.find((note) => noteId === note.id);
    return Promise.resolve(notes);
}

function updateNote(note) {
    const noteToUpdate = {
        ...note
    };
    const notesCopy = [...gNotes];
    const noteIdx = notesCopy.findIndex(note => note.id === noteToUpdate.id);
    notesCopy[noteIdx] = noteToUpdate;
    gNotes = notesCopy;
    storageService.save(gNotes, NOTES_KEY);
    return Promise.resolve(noteToUpdate);
}

function addNote(note) {
    note['id'] = utilService.makeId()
    gNotes.push(note)
    storageService.save(gNotes, NOTES_KEY);
    return Promise.resolve();
}

function removeNote(noteId) {
    gNotes = gNotes.filter((note) => noteId !== note.id);
    storageService.save(gNotes, NOTES_KEY);
    return Promise.resolve();
}

function _createNotes() {
    // Try loading from localStorage
    gNotes = storageService.load(NOTES_KEY);
    if (!gNotes || !gNotes.length) {
        // Nothing in localStorage, use demo data
        gNotes = _getDemoNotes();
        storageService.save(gNotes, NOTES_KEY);
    }
}

function _getDemoNotes() {
    return [
        createNote('txtNote', 'note about Tamir', {content: 'Tamir is Esh!' }),
        createNote('txtNote', 'note about Eran', {content: 'Eran is Water!' }),
        createNote('txtNote', 'note about Margad', {content: 'Margad is Earth!' }),
        createNote('imgNote', 'Pinky and the Brain', {content: 'https://www.indiewire.com/wp-content/uploads/2018/11/Pinky-and-the-Brain.jpeg' }),
        createNote('vidNote', 'Lhasa - La Maree Haute', {content: 'https://www.youtube.com/watch?v=NIq3qLaHCIs&ab_channel=WebDevSimplified' })
        // createNote("NoteVid", 'aa', {'agaga' url: "", title: "nice song" }),
        // createNote("NoteTodos", 'dd', {
        //     label: "things for sprint",
        //     todos: [
        //         { id: utilService.makeId(), txt: "finish preview", doneAt: null },
        //         {
        //             id: utilService.makeId(),
        //             txt: "buy tamir a gift",
        //             doneAt: Date.now(),
        //         },
        //     ],
        // }),
    ];
}