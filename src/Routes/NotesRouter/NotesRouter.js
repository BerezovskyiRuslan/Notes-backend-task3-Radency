const express = require('express');

const service = require('../../Services/NotesServices/NotesServices.js');

const router = express.Router();

router.get('/', service.getAllNotes);
router.get('/stats', service.getStatsNotes);
router.get('/:id', service.getItemNote);

router.post('/', service.createNewNote);

router.patch('/:id', service.updateItemNote);

router.delete('/all', service.deleteAllNotes);
router.delete('/:id', service.deleteItemNote);

module.exports = router;