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
  if (type === 'vidNote') {
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
      // fontColor: '',
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
    ...note,
  };
  if (noteToUpdate.type==='vidNote'){
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
    if (note.type==='vidNote'){
      note.info.content=createEmbededLink(note.info.content);
    }
  gNotes.push(note);
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
    createNote("txtNote", "Haiku for Eran", { content: "O snail,\nClimb Mount Fuji\nBut slowly, slowly!"}),
    createNote("txtNote", "Haiku for Margad", { content: " Trusting the Buddha,\n good and bad\n I bid farewell\n To the departing year!"}),
    createNote("txtNote", "Haiku for Tamir", { content: "Everything I touch,\nwith tenderness, alas,\npricks like a bramble." }),
    createNote("vidNote", "Lhasa - La Maree Haute", {
      content: "https://www.youtube.com/watch?v=hRofRbkGi5k&ab_channel=UtkanBoyacioglu",
    }),createNote("imgNote", "Snufkin playing his harmonica", {
      content:
        "https://pbs.twimg.com/ext_tw_video_thumb/1106065230281478144/pu/img/nFxTCyjOx2bOkSYL.jpg",
    }),
    createNote("todoNote", "things for sprint", {content:'finish preview, buy tamir a burger, take a shower'})
  ];
}
