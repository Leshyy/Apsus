import { storageService } from '../../../services/storageService.js';
import { utilService } from '../../../services/utilService.js';

export const notesService = {
  query,
  getNoteById,
  removeNote,
  addNote,
  updateNote,
  pinNote
};

const NOTES_KEY = 'notes';

// app data
let gNotes;

_createNotes();

function createEmbededLink(link) {
  link = link.replace('watch?v=', 'embed/');
  console.log('link after replace', link)
  if (link.split('').findIndex((char) => char === '&') === -1) {
    console.log(link);
    return link;
  } else {
    link = link.slice(
      0,
      link.split('').findIndex((char) => char === '&')
    );
    console.log(link);
    return link;
  }
}

function createNote(type, title, info) {
  if (type === 'videoNote') {
    info.content = createEmbededLink(info.content);
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
      backgroundColor: 'darkseagreen',
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

function pinNote(noteId){
  this.getNoteById(noteId).then(note=>{
    if(!note.isPinned) {
      note.isPinned=true
   } else {note.isPinned=false
   }
   storageService.save(gNotes, NOTES_KEY);
  })
  return Promise.resolve()
}

function updateNote(note) {
  const noteToUpdate = {
    ...note,
  };
  if (noteToUpdate.type==='videoNote'){
    noteToUpdate.info.content=createEmbededLink(noteToUpdate.info.content);
  }
  const notesCopy = [...gNotes];
  const noteIdx = notesCopy.findIndex((note) => note.id === noteToUpdate.id);
  notesCopy[noteIdx] = noteToUpdate;
  gNotes = notesCopy;
  storageService.save(gNotes, NOTES_KEY);
  return Promise.resolve(noteToUpdate);
}

function addNote(note) {
  note["id"] = utilService.makeId();
    if (note.type==='videoNote'){
      note.info.content=createEmbededLink(note.info.content);
    }
  gNotes.unshift(note);
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
    createNote("textNote", "Haiku for Eran", { content: "O snail,\nClimb Mount Fuji\nBut slowly, slowly!"}),
    createNote("textNote", "Haiku for Tamir", { content: "Everything I touch,\nwith tenderness, alas,\npricks like a bramble." }),
    createNote("todoNote", "things to do after sprint:", {content:'sleep, buy tamir a burger, take a shower,digest what you\'ve learned, have some icecream'}),
    createNote("textNote",  "אני גיטרה הרוח מנגן עלי", { content: "לא התייאשתי מימי\nכי מה שלא קרה במאי\nיקרה בעזרת השם ודאי\nביוני יולי" }),
    createNote("videoNote", "Lhasa - La Maree Haute", {
      content: "https://www.youtube.com/watch?v=hRofRbkGi5k&ab_channel=UtkanBoyacioglu",
    }),createNote("imgNote", "Snufkin playing his harmonica", {
      content:
        "https://pbs.twimg.com/ext_tw_video_thumb/1106065230281478144/pu/img/nFxTCyjOx2bOkSYL.jpg",
    })
  ];
}
