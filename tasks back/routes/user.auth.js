const router = require("express").Router();
const { User } = require("../modules/users");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { Security } = require("../modules/blockUsers");

router.post("/", async (req, res) => {
  // validate users input
  try {
    const { errors } = validateLogin(req.body);
    if (errors) {
      res.status(400).send(error.details[0].message);
      return;
    }

    //validate system
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      res.status(400).send("Invalid email or password");
      return;
    }

    // check if user is temporarily block
    const loginAttempt = await Security.findOne({ email: req.body.email });

    if (loginAttempt) {
      let newdate = Date.now() - loginAttempt.timeStamp.date;
      if (
        loginAttempt &&
        loginAttempt.timeStamp.attempts >= 2 &&
        newdate < 24 * 60 * 60 * 1000
      ) {
        res
          .status(403)
          .send("User is temporarily blocked, please try again later");
        return;
      }
    }
    // compare passwords
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      //increment login attempts for the user
      if (!loginAttempt) {
        const failedFlag = new Security({
          email: req.body.email,
          timeStamp: { attempts: 1, date: Date.now },
        });
        await failedFlag.save();
      } else {
        loginAttempt.timeStamp.attempts++;
        await loginAttempt.save();
      }
      res.status(400).send("Invalid email or password");
      return;
    }
    //if login successful , reset login attempts for the user

    await Security.deleteOne({ email: req.body.email });
    //process successful login

    const token = user.generateAuthToken();
    //response
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
function validateLogin(user) {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .max(255)
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string()
      .min(8)
      .max(1024)
      .required()
      .pattern(new RegExp("(?=.[0-9])"))
      .pattern(new RegExp("(?=.*[A-Z])"))
      .pattern(new RegExp("(?=.*[a-z])"))
      .pattern(new RegExp("[!@#$%^&]")),
  }).required();
  return schema.validate(user);
}
module.exports = router;
