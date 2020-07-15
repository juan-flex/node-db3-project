const db = require('../data/dbConfig')

module.exports = {
    find,
    findById,
    findSteps,
    addStep, 
    add, 
    update, 
    remove,
}

// finds all schemes
function find() {
    return db('schemes');
}

// finds specific scheme by id
function findById(id) {
    return db('schemes').where({ id }).first();
}

// finds all steps for specific scheme
function findSteps(id) {
    return db('steps').where({ scheme_id: id });
}

// adds new step for specific scheme
function addStep(step, scheme_id) {
    return db('steps').insert(step)
        .then(scheme_id => {
            return findSteps(scheme_id)
        })
}

// adds new scheme
function add(scheme) {
    return db('schemes').insert(scheme)
        .then(ids => {
            return findById(ids[0]);
        });
}

// updates existing scheme
function update(changes, id) {
    return db('schemes').where({ id }).update(changes);
}

// removes exisiting scheme
function remove(id) {
    return db('schemes').where({ id }).del();
}