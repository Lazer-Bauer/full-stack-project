const router = require("express").Router();
const { User, validateUser } = require("../modules/users");
const bcrypt = require("bcrypt");
const _ = require("lodash");

router.post("/", async (req, res) => {
  try {
    // validate user's input
    const { error } = validateUser(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    //validate system
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res
        .status(400)
        .send("This email is already in use please try another one ");
      return;
    }
    //process a new user
    const newUser = new User({
      ...req.body,
      password: await bcrypt.hash(req.body.password, 12),
    });
    await newUser.save();
    // response
    res.json(_.pick(newUser, ["id", "name", "email"]));
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/:id", async (req, res) => {
  const paramsId = req.params.id;
  // if (req.user?._id !== paramsId && !req.user?.isAdmin) {
  //   res.status(403).send("you need to be the registered or admin");
  //   return;
  // }
  const user = await User.findOne({
    _id: paramsId,
  });
  if (!user) {
    res.status(400).send("the user with the given id was not found");
    return;
  }
  res.status(200).send(user);
});

router.get("/", async (req, res) => {
  // if (!req.user.isAdmin) {
  //   return res
  //     .status(403)
  //     .send("Access denied, only admin user can get all users");
  // }
  try {
    const users = await User.find({ isAdmin: false });
    res.json(users);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

router.delete("/:id", async (req, res) => {
  const paramsId = req.params.id;
  if (req.user._id !== paramsId && !req.user.isAdmin) {
    res.status(403).send("You need to be the registered or the admin ");
    return;
  }
  const user = await User.findOneAndDelete({
    id: req.params.id,
  });
  if (!user) {
    res.status(400).send("The user with the given id was not found");
    return;
  }
  res.json(user);
});
module.exports = router;
