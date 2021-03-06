const express = require("express");
const router = express.Router();
const Booms = require("../modelsMongoDB/Booms");

// Create Booms
router.post("/post", (req, res, next) => {
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

//list Booms
router.get("/list", async (req, res, next) => {
  try {
    const booms = await Booms.findAll();
    res.json(booms);
  } catch (e) {
    res.status(500).send({
      message: "There has been an error",
    });
    next(e);
  }
});

//Get Booms for id
router.get("/list/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const boom = await Booms.findById(id);
    res.json(boom);
  } catch (e) {
    res.status(500).send({
      message: "error",
    });
    next(e);
  }
});

module.exports = router;
