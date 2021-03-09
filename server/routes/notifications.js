const express = require('express');
const router = express.Router();
var admin = require('firebase-admin');
var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

router.post('/sendToOne/:registrationToken', async (req, res, next) => {
    try {
        const { registrationToken } = req.params;
        const { title, description } = req.body;

        var message = {
            data: { title, description },
            token: registrationToken
        };
            
        admin.messaging().send(message)
        .then((response) => {
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });

    } catch (e) {
        res.status(500).json({message: "There has been an error."});
        next(e);
    }
})

router.post('/sendToMany', async (req, res, next) => {
    try {
        const { title, description, registrationTokens } = req.body;   
        const message = {
           data: { title, description },
           tokens: registrationTokens,
        }
        admin.messaging().sendMulticast(message)
        .then( response => {
            console.log(response.successCount + ' messages were sent successfully');
        })
    } catch (e) {
        res.status(500).json({message: "There has been an error."});
        next(e);
    }
})

module.exports = router;
