//require the yarn express module
const express = require('express');

//create user router
const router = express.Router();

//import user database file
const userDB = require('./userDb.js');


/********************************************END POINTS****************************************/

router.post('/', (req, res) => {

});

router.post('/:id/posts', validateUserId, (req, res) => {

    res.status(200).json( {message: 'success'} );

});

router.get('/', (req, res) => {

});

router.get('/:id', validateUserId, (req, res) => {

    res.status(200).json( {message: 'success'} );

});

router.get('/:id/posts', validateUserId, (req, res) => {

    res.status(200).json( {message: 'success'} );

});

router.delete('/:id', validateUserId, (req, res) => {

    res.status(200).json( {message: 'success'} );

});

router.put('/:id', validateUserId, (req, res) => {

    res.status(200).json( {message: 'success'} );

});

//custom middleware

//local middleware 
function validateUserId(req, res, next) {

    const userId = req.headers.id;
    
    userDB.getById(userId)
    .then (user => {
        if(users.length === 0){
            res.status(400).json( {message: 'Invalid user id.'} );
        }
        else {
            user = req.user;
            next();
        }
    })
    .catch(error => {
        res.status(500).json( {error: 'There was an error retrieving the user from the database.'} );
    })    

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

//exports the router so it is available to the main server file
module.exports = router;
