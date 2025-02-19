//require the yarn express module
const express = require('express');

//create user router
const router = express.Router();

//import user database file
const userDB = require('./userDb.js');
const postDB = require('../posts/postDB.js');

/********************************************END POINTS****************************************/

router.post('/', validateUser, (req, res) => {

    const userInformation = req.body;

    userDB.insert(userInformation)
    .then(user => {
        res.status(201).json(user);
    })
    .catch( error => {
        res.status(500).json({error: 'There was an error while saving the user to the database.'});
    })

});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {  
    
    console.log("insert body", req.body);

    //posts table expects an object with user_id and text as arguments or field names
    const user_id = req.params.id;
    const postInformation = req.body;
    const text = postInformation.text;

    postDB.insert({text, user_id})
    .then(post => {
        
        res.status(201).json(post);
    })
    .catch (error => {
        console.log("insert post error", error);
        res.status(500).json( {error: 'There was an error adding the post to the database.'});

    })

});

router.get('/', (req, res) => {

    userDB.get()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error => {
        res.status(500).json( {error: 'The users information could not be retrieved.'} );
    })

});

router.get('/:id', validateUserId, (req, res) => {

    res.status(200).json(req.user);

});

router.get('/:id/posts', validateUserId, (req, res) => {

    const userId = req.params.id;

    userDB.getUserPosts(userId)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch (error => {
        res.status(500).json( {error: 'There was an error retrieving the posts from the database.'} );
    })   

});

router.delete('/:id', validateUserId, (req, res) => {

    const userId = req.params.id;

    userDB.remove(userId)
    .then(numDeleted => {
        if(numDeleted > 0){
            res.status(200).json( {message: 'The user record was successfully deleted.'} )
        }
        else {
            res.status(404).json( {message: 'The user was not deleted.'} );
        }
    })
    .catch(error => {
        res.status(500).json( {error: 'The user could not be removed.'});
    })

});

router.put('/:id', validateUserId, (req, res) => {

    const id = req.params.id;
    const changes = req.body;

    //****this didn't work because method is expecting an object with the changes to apply. req.body contains an object
    //while postBody.name contains a single value
    //const changes = postBody.name; 

    userDB.update(id, changes)
    .then(updateCount => {
        if(updateCount > 0){
            res.status(200).json ( {message: 'The user was successfully updated.'} );
        }
        else {
            res.status(404).json( {message: 'The user record was not updated.'} );
        }
    })
    .catch(error => {
        console.log("update error", error);
        res.status(500).json( {error: 'The user record could not be updated.'} );
    })
    

});

//custom middleware
//local middleware 
function validateUserId(req, res, next) {

    const userId = req.params.id;
    
    userDB.getById(userId)
    .then (user => {
        if(!user){
            console.log("invalid user", user);
            res.status(400).json( {message: 'Invalid user id.'} );
        }
        else {    
            req.user = user;        
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

    if(!req.body){
        res.status(400).json( {message: 'Missing user data.'} )
    }
    else if (!userName){
        res.status(400).json( {message: 'Missing required name field.'} );
    }
    else {
        next();
    }

};

function validatePost(req, res, next) {

    const postInformation = req.body;
    const postText = postInformation.text;

    if(!postInformation){
        res.status(400).json( {message: 'Missing post data.'} )
    }
    else if (!postText){
        res.status(400).json( {message: 'Missing required text field.'} );
    }
    else {
        next();
    }
};

//exports the router so it is available to the main server file
module.exports = router;
