const router = require("express").Router();
const {
    createProject,
    getAllProjectsSave,
    getProjectById,
    newTodo,
    doing,
    notInit,
    finish,
    deleteTodo,
    editTodo,
    copyTodo,
    editProject,
    deleteProject,
} = require("../controllers/projectController");
const verifyJwt = require("../middlewares/AuthMiddleware");

router.post("/new", verifyJwt, createProject);
router.get("/projectsave", verifyJwt, getAllProjectsSave);
router.get("/projectsave/:id", verifyJwt, getProjectById);
router.patch("/projectsave/:id", verifyJwt, editProject);
router.delete("/projectsave/:id", verifyJwt, deleteProject);
router.patch("/projectsave/:id/newtodo", verifyJwt, newTodo);
router.patch("/projectsave/:id/doing/:todoId", verifyJwt, doing);
router.patch("/projectsave/:id/notinit/:todoId", verifyJwt, notInit);
router.patch("/projectsave/:id/finish/:todoId", verifyJwt, finish);
router.patch("/projectsave/:id/deletetodo/:todoId", verifyJwt, deleteTodo);
router.patch("/projectsave/:id/edittodo/:todoId", verifyJwt, editTodo);
router.patch("/projectsave/:id/copytodo/:todoId", verifyJwt, copyTodo);

module.exports = router;
