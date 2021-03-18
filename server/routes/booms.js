const express = require("express");
const router = express.Router();
const passport = require('passport')
const { isStaff } = require("./helpers/authRoles");
const { ObjectId } = require('bson');
const Booms = require("../modelsMongoDB/Booms");

// Create Booms
router.post("/post", passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
  const {
    student,
    previousStudies,
    position,
    company,
    country,
    incomeImprovement,
    whatYouDidBefore,
    thanks,
    comments,
    createdAt,
    status
  } = req.body;
  Booms.create({
    student,
    previousStudies,
    position,
    company,
    country,
    incomeImprovement,
    whatYouDidBefore,
    thanks,
    comments,
    createdAt,
    status
  })
    .then(response => {
      res.json(response);
    })
    .catch((error) =>
      res.status(400).json({
        error: error,
      })
    );
});

//Get Booms for id
router.get('/list/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const boom = await Booms.findById(id)
    res.json(boom)
  } catch (e) {
    res.status(500).send({
      message: 'error'
    });
    next(e);
  }
})

// Get Boom by status or get all Booms
router.get('/listAll', passport.authenticate('jwt', { session: false }), isStaff,
  async (req, res, next) => {
    try {
        const { status } = req.query;
        let requests;
        if(status){
            requests = await Booms.find({'status': status})
                                  .limit(30)
                                  .sort({createdAt: -1});
        } else {
            requests = await Booms.find()
                             .limit(30)
                             .sort({createdAt: -1});
        }
        res.json(requests);
    } catch (e) {
        res.status(500).json({message: "There has been an error."});
        next(e);
    }
});

//change boom status
router.put('/changeStatus/:id', passport.authenticate('jwt', { session: false }), isStaff,
  async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status, createdAt } = req.body;
        await Booms.updateOne({'_id': id}, {status, createdAt});
        Booms.findById(id)
        .then(boom => {
          res.json(boom);
        })
    } catch (e) {
        res.status(500).json({message: "There has been an error."});
        next(e);
    }
});

//Delete Boom
router.delete('/list/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const boom = await Booms.deleteOne({"_id": ObjectId(id)})
    res.json(boom)
  } catch (e) {
    res.status(500).send({
      message: 'error'
    });
    next(e);
  }
})

module.exports = router;
