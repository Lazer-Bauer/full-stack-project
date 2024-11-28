const router = require("express").Router();
const { authorize } = require("../middleWare/SecureRoute");
const { Job } = require("../modules/Jobs");
router.post("/", authorize, async (req, res) => {
  try {
    //process a new user
    console.log(req.body);
    const newJob = new Job({
      ...req.body,
    });
    await newJob.save();
    // response
    res.json(newJob);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.get("/open", authorize, async (req, res) => {
  try {
    const job = await Job.find({ status: 0 });
    res.json(job); // Assuming you want to send the result back as JSON
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get("/pending", authorize, async (req, res) => {
  try {
    const job = await Job.find({ status: 1 });
    res.json(job); // Assuming you want to send the result back as JSON
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get("/completed", authorize, async (req, res) => {
  try {
    const job = await Job.find({ status: 2 });
    res.json(job); // Assuming you want to send the result back as JSON
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/alljobs", authorize, async (req, res) => {
  try {
    const job = await Job.find();
    res.json(job); // Assuming you want to send the result back as JSON
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get("/:id", async (req, res) => {
  const paramsId = req.params.id;

  const job = await Job.find({
    _id: paramsId,
  });

  res.json(job);
});
router.get("/", async (req, res) => {
  const paramsId = req.query.user_id;
  console.log(paramsId);
  const job = await Job.find({
    user_id: paramsId,
  });

  res.json(job);
});
router.patch("/:id", authorize, async (req, res) => {
  try {
    const paramsId = req.params.id;
    //process a new user
    console.log(req.body);
    const job = await Job.findById(paramsId);

    if (!job) {
      res.status(404).send("The job with the given ID was not found");
      return;
    }
    console.log(job);
    //job.content = req.body.content;
    job.comment = req.body.comment;
    job.status = req.body.status;

    console.log(job);
    await job.save();
    // response
    res.json(job);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.delete("/:id", authorize, async (req, res) => {
  const paramsId = req.params.id;
  const job = await Job.findById(paramsId);
  if (!job) {
    res.status(400).send("The job with the given ID was not found");
    return;
  }

  if (!req.user.isAdmin) {
    res.status(403).send("You need to be a admin");
    return;
  }
  const deleteJob = await Job.findOneAndDelete({
    _id: paramsId,
  });

  res.json(deleteJob);
});

router.put("/:id", authorize, async (req, res) => {
  const paramsId = req.params.id;
  console.log(req.body, paramsId);
  try {
    // validate system & process/
    const job = await Job.findOneAndUpdate(
      {
        _id: paramsId,
      },
      req.body,
      { new: true }
    );

    if (!job) {
      res
        .status(400)
        .send("The job with the given ID was not found or you are not a Admin");
      return;
    }

    // response
    res.json(job);
  } catch (err) {
    res.status(500).send(err);
  }
});
module.exports = router;
