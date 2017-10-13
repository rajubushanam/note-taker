const fs = require('fs');
const _ = require('lodash');

const notes = require('./notes.js');
const yargs = require('yargs');
const titleOptions ={
  describe: 'Title of Note',
  demand: true,
  alias: 't'
}
const bodyOptions = {
  describe: 'Body of Note',
  demand: true,
  alias: 'b'
}
var command = process.argv[2];
var argv = yargs.command
('add', 'Adding a Note',
{
  title:titleOptions,
  body:bodyOptions
})
.command('read', 'Reading a Note',
{
  title:titleOptions
})
.command('list', 'Listing all Notes')
.command('delete', 'Delete the Note',
{
  title:titleOptions
})
.help()
.argv;

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
  var notesList = notes.getAll();
  debugger;
  console.log(`List of Notes : ${notesList.length}`);
  notesList.forEach(note => notes.printNotes(note));
  //console.log(`Note ${note.title} ${note.body}`);
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
