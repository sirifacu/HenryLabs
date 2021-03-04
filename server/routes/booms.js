const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

// Create Booms
router.post("/post", (req, res, next) => {
  let { student, job, company, description } = req.body;
  Booms.create({
    id: uuidv4(),
    student,
    job,
    company,
    description,
  })
    .then((response) => {
      res.status(200).send(response);
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
    res.json(jobs);
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
    const boom = await Booms.findByPk(id);
    res.json(boom);
  } catch (e) {
    res.status(500).send({
      message: "error",
    });
    next(e);
  }
});

module.exports = router;
