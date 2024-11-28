require("dotenv/config");
const mongoose = require("mongoose");
const chalk = require("chalk");
const connection = require("./dbServices");
const cors = require("cors");
const path = require("path");
connection();
//const { checkFirstRun } = require("./initialData/initialData");
//checkFirstRun();
const enableAllCorsRequests = cors();

const express = require("express");
const morgan = require("morgan");
const { User } = require("./modules/users");
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(enableAllCorsRequests);

app.use("/tasks/users", require("./routes/userRoute"));
app.use("/tasks/users/login", require("./routes/user.auth"));
app.use("/tasks/users", require("./routes/userRoute"));
app.use("/tasks/jobs", require("./routes/JobesRoutes"));
// app.use("/tasks/jobs", require("./routes/JobesRoutes"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(chalk.blue(`listening to port ${PORT}`)));
