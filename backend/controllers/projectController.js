const Project = require("../models/Projects");
const User = require("../models/User");
const { getUser, getProject } = require("../utils/getDateDb");

const createId = (itens) => {
    const ids = [];
    if (itens.length === 0) {
        return 1;
    }
    itens.forEach((item) => {
        ids.push(item.id);
    });

    return Math.max(...ids) + 1;
};

// projeto
const createProject = async (req, res) => {
    const userId = req.user.id;
    const { name } = req.body;

    try {
        const user = await getUser(User, userId);

        if (!user) {
            res.status(404).json({ error: "Usuário não encontrado." });
            return;
        }

        if (!name) {
            res.status(400).json({ error: "O nome do projeto é obrigatório." });
            return;
        }

        const obj = {
            name,
            todos: JSON.stringify([]),
            userId: user.id,
        };

        const project = await Project.create(obj);

        project.todos = JSON.parse(project.todos);

        res.status(201).json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Ocorreu um erro no sistema. tente mais tarde",
        });
    }
};

const getAllProjectsSave = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await getUser(User, userId);

        if (!user) {
            res.status(404).json({ error: "Usuário não encontrado." });
            return;
        }

        const projects = await Project.findAll({
            where: {
                userId: user.id,
            },
        });

        projects.forEach((project) => {
            project.todos = JSON.parse(project.todos);
        });

        res.status(200).json(projects);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Ocorreu um erro no sistema. tente mais tarde",
        });
    }
};

const getProjectById = async (req, res) => {
    const userId = req.user.id;
    const id = req.params.id;

    try {
        const user = await getUser(User, userId);

        if (!user) {
            res.status(404).json({ error: "Usuário não encontrado." });
            return;
        }

        const project = await getProject(Project, id, user);

        if (!project) {
            res.status(404).json({ error: "Projeto não encontrado." });
            return;
        }

        project.todos = JSON.parse(project.todos);

        res.status(200).json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Ocorreu um erro no sistema. tente mais tarde",
        });
    }
};

const editProject = async (req, res) => {
    const userId = req.user.id;
    const id = req.params.id;
    const { name } = req.body;

    try {
        const user = await getUser(User, userId);

        if (!user) {
            res.status(404).json({ error: "Usuário não encontrado." });
            return;
        }

        const project = await getProject(Project, id, user);

        if (!project) {
            res.status(404).json({ error: "Projeto não encontrado." });
            return;
        }

        if (!name) {
            res.status(400).json({ error: "O nome é obrigatório." });
            return;
        }

        await project.update({ name });

        project.todos = JSON.parse(project.todos);

        res.status(200).json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Ocorreu um erro no sistema. tente mais tarde",
        });
    }
};

const deleteProject = async (req, res) => {
    const userId = req.user.id;
    const id = req.params.id;

    try {
        const user = await getUser(User, userId);

        if (!user) {
            res.status(404).json({ error: "Usuário não encontrado." });
            return;
        }

        const project = await getProject(Project, id, user);

        if (!project) {
            res.status(404).json({ error: "Projeto não encontrado." });
            return;
        }

        await project.destroy();

        project.todos = JSON.parse(project.todos);

        res.status(200).json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Ocorreu um erro no sistema. tente mais tarde",
        });
    }
};

// todo individual
const newTodo = async (req, res) => {
    const userId = req.user.id;
    const id = req.params.id;
    const { todo } = req.body;

    try {
        const user = await getUser(User, userId);

        if (!user) {
            res.status(404).json({ error: "Usuário não encontrado." });
            return;
        }

        const project = await getProject(Project, id, user);

        if (!project) {
            if (!project) {
                res.status(404).json({ error: "Projeto não encontrado." });
                return;
            }
        }

        const todos = JSON.parse(project.todos);

        if (!todo) {
            res.status(400).json({
                error: "A descrição da tarefa é obrigatória",
            });
            return;
        }

        const todoObj = {
            id: createId(todos),
            description: todo,
            notInit: true,
            doing: false,
            finish: false,
        };

        todos.push(todoObj);

        await project.update({ todos: JSON.stringify(todos) });

        project.todos = JSON.parse(project.todos);

        res.status(200).json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Ocorreu um erro no sistema. tente mais tarde",
        });
    }
};

const doing = async (req, res) => {
    const userId = req.user.id;
    const id = req.params.id;
    const todoId = req.params.todoId;

    try {
        const user = await getUser(User, userId);

        if (!user) {
            res.status(404).json({ error: "Usuário não encontrado." });
            return;
        }

        const project = await getProject(Project, id, user);

        if (!project) {
            if (!project) {
                res.status(404).json({ error: "Projeto não encontrado." });
                return;
            }
        }

        const todos = JSON.parse(project.todos);

        const todo = todos.find((todo) => todo.id === +todoId);
        if (!todo) {
            res.status(404).json({ error: "Tarefa não encontrada." });
            return;
        }
        todo.notInit = false;
        todo.doing = true;
        todo.finish = false;

        await project.update({ todos: JSON.stringify(todos) });

        project.todos = JSON.parse(project.todos);

        res.status(200).json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Ocorreu um erro no sistema. tente mais tarde",
        });
    }
};

const notInit = async (req, res) => {
    const userId = req.user.id;
    const id = req.params.id;
    const todoId = req.params.todoId;

    try {
        const user = await getUser(User, userId);

        if (!user) {
            res.status(404).json({ error: "Usuário não encontrado." });
            return;
        }

        const project = await getProject(Project, id, user);

        if (!project) {
            if (!project) {
                res.status(404).json({ error: "Projeto não encontrado." });
                return;
            }
        }

        const todos = JSON.parse(project.todos);

        const todo = todos.find((todo) => todo.id === +todoId);
        if (!todo) {
            res.status(404).json({ error: "Tarefa não encontrada." });
            return;
        }
        todo.notInit = true;
        todo.doing = false;
        todo.finish = false;

        await project.update({ todos: JSON.stringify(todos) });

        project.todos = JSON.parse(project.todos);

        res.status(200).json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Ocorreu um erro no sistema. tente mais tarde",
        });
    }
};

const finish = async (req, res) => {
    const userId = req.user.id;
    const id = req.params.id;
    const todoId = req.params.todoId;

    try {
        const user = await getUser(User, userId);

        if (!user) {
            res.status(404).json({ error: "Usuário não encontrado." });
            return;
        }

        const project = await getProject(Project, id, user);

        if (!project) {
            if (!project) {
                res.status(404).json({ error: "Projeto não encontrado." });
                return;
            }
        }

        const todos = JSON.parse(project.todos);

        const todo = todos.find((todo) => todo.id === +todoId);
        if (!todo) {
            res.status(404).json({ error: "Tarefa não encontrada." });
            return;
        }
        todo.notInit = false;
        todo.doing = false;
        todo.finish = true;

        await project.update({ todos: JSON.stringify(todos) });

        project.todos = JSON.parse(project.todos);

        res.status(200).json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Ocorreu um erro no sistema. tente mais tarde",
        });
    }
};

const deleteTodo = async (req, res) => {
    const userId = req.user.id;
    const id = req.params.id;
    const todoId = req.params.todoId;

    try {
        const user = await getUser(User, userId);

        if (!user) {
            res.status(404).json({ error: "Usuário não encontrado." });
            return;
        }

        const project = await getProject(Project, id, user);

        if (!project) {
            if (!project) {
                res.status(404).json({ error: "Projeto não encontrado." });
                return;
            }
        }

        let todos = JSON.parse(project.todos);

        todos = todos.filter((todo) => todo.id !== +todoId);

        await project.update({ todos: JSON.stringify(todos) });

        project.todos = JSON.parse(project.todos);

        res.status(200).json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Ocorreu um erro no sistema. tente mais tarde",
        });
    }
};

const editTodo = async (req, res) => {
    const userId = req.user.id;
    const id = req.params.id;
    const todoId = req.params.todoId;
    const { description } = req.body;

    try {
        const user = await getUser(User, userId);

        if (!user) {
            res.status(404).json({ error: "Usuário não encontrado." });
            return;
        }

        const project = await getProject(Project, id, user);

        if (!project) {
            if (!project) {
                res.status(404).json({ error: "Projeto não encontrado." });
                return;
            }
        }

        const todos = JSON.parse(project.todos);

        const todo = todos.find((todo) => todo.id === +todoId);
        if (!todo) {
            res.status(404).json({ error: "Tarefa não encontrada." });
            return;
        }

        if (!description) {
            res.status(400).json({ error: "descrição é obrigatória." });
            return;
        }

        todo.description = description;

        await project.update({ todos: JSON.stringify(todos) });

        project.todos = JSON.parse(project.todos);

        res.status(200).json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Ocorreu um erro no sistema. tente mais tarde",
        });
    }
};

const copyTodo = async (req, res) => {
    const userId = req.user.id;
    const id = req.params.id;
    const todoId = req.params.todoId;

    try {
        const user = await getUser(User, userId);

        if (!user) {
            res.status(404).json({ error: "Usuário não encontrado." });
            return;
        }

        const project = await getProject(Project, id, user);

        if (!project) {
            if (!project) {
                res.status(404).json({ error: "Projeto não encontrado." });
                return;
            }
        }

        const todos = JSON.parse(project.todos);

        const todo = todos.find((todo) => todo.id === +todoId);
        if (!todo) {
            res.status(404).json({ error: "Tarefa não encontrada." });
            return;
        }

        const todoObj = {
            id: createId(todos),
            description: todo.description,
            notInit: true,
            doing: false,
            finish: false,
        };

        todos.push(todoObj);

        await project.update({ todos: JSON.stringify(todos) });

        project.todos = JSON.parse(project.todos);

        res.status(200).json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Ocorreu um erro no sistema. tente mais tarde",
        });
    }
};

module.exports = {
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
};
