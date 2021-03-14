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
        const { title, body } = req.body;

        var message = {
            notification: { title, body },
            token: registrationToken
        };
            
        const notification = await admin.messaging().send(message)
        res.json({notification, message})

    } catch (e) {
        res.status(500).json({message: "There has been an error."});
        next(e);
    }
});

router.post('/sendToMany', async (req, res, next) => {
    try {
        const { title, body, registrationTokens } = req.body;
        if(registrationTokens.length){
            const message = {
                notification: { title, body },
                tokens: registrationTokens,
            }
    
            const notification = await admin.messaging().sendMulticast(message)
            res.json({notification, message})
        } else {
            res.status(404).json({message: "No hay tokens asociados."})
        }

    } catch (e) {
        res.status(500).json({message: "There has been an error."});
        next(e);
    }
})

module.exports = router;
