const fs = require('fs');
const _ = require('lodash');

const notes = require('./notes.js');
const yargs = require('yargs');
var command = process.argv[2];
var argv = yargs.argv;
console.log('Command', command);
console.log('yargs', argv);

if(command === 'add'){
  var note = notes.addNotes(argv.title, argv.body);
  if(note !== undefined)
  {
    console.log('New Note Added');
    notes.printNotes(note);
  }
  else {
    console.log('Duplicate Note already exists. Please use a different name');
  }
}
  else if(command === 'list'){
  notes.getAll();
}
  else if(command === 'read'){
  var note = notes.readNote(argv.title);
  if(note === undefined)
  console.log('Note not found');
  else {
    console.log('Note Found:');
    notes.printNotes(note);
  }
}
  else if(command === 'delete'){
  var isNoteRemoved = notes.deleteNote(argv.title);
  var message = isNoteRemoved ? 'Note Removed' : 'Note Not Found';
  console.log(message);
}
  else {
    console.log('Command not recognized');
  }
