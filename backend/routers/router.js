const router = require("express").Router();
const userRouters = require("./userRouters");
const projectRouters = require("./projectRouter");

router.use("/user", userRouters);
router.use("/project", projectRouters);

module.exports = router;
