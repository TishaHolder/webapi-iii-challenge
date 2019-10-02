//require the yarn express module
const express = require('express');

//create user router
const router = express.Router();

//import user database file
const userDB = require('./userDb.js');
const postDB = require('../posts/postRouter.js');

/********************************************END POINTS****************************************/

router.post('/', validateUser, (req, res) => {

});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {

    res.status(200).json( {message: 'success'} );

});

router.get('/', (req, res) => {

    userDB.get()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error => {
        res.status(500).json( {error: 'The users informatio could not be retrieved.'} );
    })

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

    const userId = req.params.id;
    
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
    const userInformation = req.body;   
    const userName = userInformation.name; 

    if(userInformation.length === 0){
        res.status(400).json( {message: 'Missing user data.'} )
    }
    else if (userName.length === 0){
        res.status(400).json( {message: 'Missing required name field.'} );
    }
    else {
        next();
    }

};

function validatePost(req, res, next) {

    const postInformation = req.body;
    const postText = postInformation.text;

    if(postInformation.length === 0){
        res.status(400).json( {message: 'Missing post data.'} )
    }
    else if (postText){
        res.status(400).json( {message: 'Missing required text field.'} );
    }
    else {
        next();
    }
};

//exports the router so it is available to the main server file
module.exports = router;
