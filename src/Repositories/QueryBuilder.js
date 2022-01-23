const categoryRepositories = require('./CategoryRepositories/CategoryRepositories.js');
const notesRepositories = require('./NotesRepositories/NotesRepositories.js');

const database = {
    notes: notesRepositories,
    category: categoryRepositories
};


module.exports.getAll = function (name) {
    return database[name][name];
}

module.exports.getItemById = function (name, id) {
    return database[name][name].filter(item => item.id == id)[0] || {};
}

module.exports.createNewPosition = function (name, data) {
    data.id = database[name][name].length;
    database[name][name].push(data);

    return data;
}

module.exports.getItemAndUpdate = function (name, id, data) {
    let index = -1;

    for (let i = 0; i < database[name][name].length; i++) {
        if (database[name][name][i].id == id) {
            database[name][name][i] = { ...database[name][name][i], ...data }
            index = i;
        }
    }
    console.log(index == -1 ? {} : database[name][name]);
    return index == -1 ? {} : database[name][name][index];
}

module.exports.deleteElementById = function (name, id) {
    let check = false;
    database[name][name] = database[name][name].filter(item => {
        if (item.id == id) {
            check = true;
            return false;
        }
        return true;
    })

    return check;
}

module.exports.deleteElementsById = function (name, array) {
    let check = false;

    console.log(array);
    database[name][name] = database[name][name].filter(item => {
        if (array.indexOf(item.id) + 1) {
            check = true;
            return false;
        }

        return true;
    })

    return check;
}