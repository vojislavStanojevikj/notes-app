const yargs = require('yargs');
const notesService = require('./notes-service');

yargs.command({
    command: 'add',
    describe: 'Add new note',
    builder: {
        title: {
            describe: 'Note Title',
            type: 'string',
            demandOption: true
        },
        body: {
            describe: 'Note Body',
            type: 'string',
            demandOption: true
        }
    },
    handler(argv){
        notesService.addNote({title: argv.title, body: argv.body})
    }
});

yargs.command({
    command: 'remove',
    describe: 'Remove note',
    builder: {
        title: {
            describe: 'Note Title',
            type: 'string',
            demandOption: true
        }
    },
    handler(argv){
        notesService.removeNote(argv.title)
    }
});

yargs.command({
    command: 'read',
    describe: 'Read note',
    builder: {
        title: {
            describe: 'Note Title',
            type: 'string',
            demandOption: true
        }
    },
    handler(argv){
        notesService.readNote(argv.title)
    }
});

yargs.command({
    command: 'list',
    describe: 'List notes',
    handler(){
        notesService.listNotes()
    }
});

yargs.parse();

module.exports = yargs;