import { storageService } from '../../../services/storageService.js';
import { utilService } from '../../../services/utilService.js';

export const notesService = {
    query,
    getNoteById,
    removeNote,
};

const NOTES_KEY = 'notes';

// app data
let gNotes;

_createNotes();

function createNote(type, info) {
    return {
        id: utilService.makeId(),
        isPinned: false,
        type,
        info,
        createdAt: Date.now(),
        style: {
            backgroundColor: '',
            fontColor: '',
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

function add() {}

function removeNote(noteId) {
    gNotes = gNotes.filter((note) => noteId !== note.id);
    storageService.save(gNotes, EMAIL_KEY);
    // return Promise.resolve(gNotes);
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
        createNote('NoteText', { txt: 'Tamir is Esh!' }),
        createNote('NoteText', { txt: 'Eran is Water!' }),
        createNote('NoteText', { txt: 'Margad is Earth!' }),
        // createNote("NoteImg", { url: "", title: "wow nice pic" }),
        // createNote("NoteVid", { url: "", title: "nice song" }),
        // createNote("NoteTodos", {
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
