const fs = require('fs');
const chalk = require('chalk');

function dataStoreExists(dataFilePath) {
    return fs.existsSync(dataFilePath);
}

function printDataStoreEmptyMessage() {
    console.log(chalk.bgGreen('Datastore is empty'));
}
function printNoteNotFoundError(noteTitle) {
    console.error(chalk.bgRed('Note: '.concat(noteTitle).concat(' not found!')));
}

function printNote(note) {
    console.log(chalk.green(note.title));
    console.log(chalk.bgGreen(note.body));
}

module.exports = {
    dataFilePath: './data/data.json',
    addNote(note) {
        const dataObject = dataStoreExists(this.dataFilePath) ?
            JSON.parse(fs.readFileSync(this.dataFilePath).toString()) : [];
        const duplicateNote = dataObject
            .find(existingNote => note.title === existingNote.title);

        if (duplicateNote) {
            console.log(chalk.bgRed('Note title already exist!'));
        } else {
            console.log(chalk.bgGreen('Adding note...'));
            dataObject.push(note);
            fs.writeFileSync(this.dataFilePath, JSON.stringify(dataObject));
        }
    },
    removeNote(noteTitle) {
        if (!dataStoreExists(this.dataFilePath)) {
            printDataStoreEmptyMessage()
        } else {
            const dataObject = JSON.parse(fs.readFileSync(this.dataFilePath).toString());
            const newNotes = dataObject.filter(existingNote => noteTitle !== existingNote.title);

            if (newNotes.length === dataObject.length) {
                printNoteNotFoundError(noteTitle);
            } else {
                console.log(chalk.bgGreen('Removing note...'));
                fs.writeFileSync(this.dataFilePath, JSON.stringify(newNotes));
            }
        }
    },
    readNote(noteTitle) {
        if (!dataStoreExists(this.dataFilePath)) {
            printDataStoreEmptyMessage();
        } else {
            const dataObject = JSON.parse(fs.readFileSync(this.dataFilePath).toString());
            if (noteTitle) {
                const fetchedNote = dataObject.find(existingNote => noteTitle === existingNote.title)
                if (!fetchedNote) {
                    printNoteNotFoundError(noteTitle);
                } else {
                    printNote(fetchedNote);
                }
            } else {
                dataObject.forEach(existingNote => printNote(existingNote));
            }
        }
    },
    listNotes() {
        this.readNote()
    }
};