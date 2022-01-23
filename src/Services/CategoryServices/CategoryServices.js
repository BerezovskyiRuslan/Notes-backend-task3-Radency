const errorHandler = require('../../Helper/errorHandler.js');
//const Category = require('../../Repositories/CategoryRepositories/CategoryRepositories.js')
const queryBuider = require('../../Repositories/QueryBuilder.js')
module.exports.getAllCategory = async function (req, res) {
    try {

        let category = await queryBuider.getAll('category');

        res.status(200).json(category);
    } catch (e) {
        errorHandler(res, e);
    }
}