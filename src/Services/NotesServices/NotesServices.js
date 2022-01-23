const errorHandler = require('../../Helper/errorHandler.js');
const queryBuider = require('../../Repositories/QueryBuilder.js');

module.exports.getAllNotes = async function (req, res) {
    try {

        const notes = await queryBuider.getAll('notes');

        res.status(200).json(notes);
        
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.getItemNote = async function (req, res) {
    try {

        const id = req.params.id;

        const itemNotes = await queryBuider.getItemById('notes', id)

        if (!Object.keys(itemNotes).length) {

            res.status(404).json({message: 'Note not Found.'});
        
            return;
        }

        res.status(200).json(itemNotes);
        
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.getStatsNotes = async function (req, res) {
    try {
        const notes = await queryBuider.getAll('notes');
        const category = await queryBuider.getAll('category');
        let condition = []; 

        for (let i = 0; i < category.length; i++) {
            condition[i] = {
                name: category[i].name,
                active: 0,
                archive: 0
            }

            for (let j = 0; j < notes.length; j++) {
                if (category[i].name == notes[j].category) {
                    if (notes[j].archive) {
                        condition[i].archive += 1;

                        continue;
                    }

                    condition[i].active += 1;
                }
            }
        }

        res.status(200).json(condition);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.createNewNote = async function (req, res) {
    try {
        let date = new Date();
        let month = date.toLocaleDateString('en-US', {
            month: 'long'
        })
        let day = date.getDate();
        let year = date.getFullYear();
        let name = req.body.name || 'New Note';
        let category = req.body.category || 'Task';
        let content = req.body.content || '';
        let created = month + ' ' + day + ', ' + year;
        let dates = content.match(/[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}/g) || [];
        
        let newNote = queryBuider.createNewPosition('notes', {
            name: name,
            created: created,
            category: category,
            content: content,
            dates: dates,
            archive: false
        })

        res.status(201).json(newNote);
    } catch (e) {
        errorHandler(e);
    }
}

module.exports.updateItemNote = async function (req, res) {
    try {
        const name = req.body.name || 'Edit Note';
        const category = req.body.category || 'Task';
        const content = req.body.content || '';
        const dates = content.match(/[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}/g) || [];
        const archive = req.body.archive;

        const updateNote = queryBuider.getItemAndUpdate(
            'notes', 
            req.params.id, 
            {
                name: name,
                category: category,
                content: content,
                dates: dates,
                archive: archive
            }
        );
        
        if (!Object.keys(updateNote).length) {

            res.status(404).json({ message: 'Note not found'});
            
            return;
        }

        res.status(200).json(updateNote);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.deleteItemNote = async function (req, res) {
    try {
        const id = req.params.id;

        const state = queryBuider.deleteElementById('notes', id);

        if (!state) {
            res.status(404).json({message: 'Note not Found.'});
        }

        res.status(200).json({ message: 'Note removed.' });
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.deleteAllNotes = async function (req, res) {
    try {

        const isArhive = req.body.isArchive;

        let notes = await queryBuider.getAll('notes');
        let arrayIdNotes = [];
        
        for (let i = 0; i < notes.length; i++) {

            if (notes[i].archive === isArhive) {

                arrayIdNotes = [...arrayIdNotes, notes[i].id];

            }

        }

        if (!arrayIdNotes.length) {
            res.status(404).json({ message: 'Notes not Found.' });
        }

        await queryBuider.deleteElementsById('notes', arrayIdNotes);

        res.status(200).json({ message: 'Notes removed.' });
        
    } catch (e) {
        errorHandler(res, e);
    }
}