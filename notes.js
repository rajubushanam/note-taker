console.log('Notes Started');

const fs = require('fs');
var getNotes = () =>
{
  try{
    var notesString = fs.readFileSync('notes-data.json');
      notes = JSON.parse(notesString);
  }catch(e){
    notes = [];
  }
  return notes;
}

var saveNotes = (notes) =>
{
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

var addNotes = (title, body) => {
  var notes = getNotes();
  var note = {
    title,
    body
  };

var duplicateNotes = notes.filter(note => note.title === title);

if(duplicateNotes.length === 0)
{
notes.push(note);
saveNotes(notes);
return note;
}

};

var getAll = () => {
  console.log('Getting All Notes');
};

var readNote = (title) => {
  console.log('Reading' + title);
  var notes = getNotes();
  var notearray = notes.filter(note => note.title === title);
  return notearray[0];
};

var deleteNote = (title) => {
  var notes = getNotes();
  var afterDeletingNotes = notes.filter(note => note.title !== title);
  saveNotes(afterDeletingNotes);

  return notes.length !== afterDeletingNotes.length;
};

module.exports = {
  addNotes,
  getAll,
  readNote,
  deleteNote
};
