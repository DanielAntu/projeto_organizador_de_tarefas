import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { VscFolder } from "react-icons/vsc";
import { BsChevronLeft } from "react-icons/bs";
import todoFetch from "../axios/config";
import { useUserContext } from "../hook/useUserContext";
import useToast from "../hook/useToast";

import TodoArea from "../components/TodoArea";

import "./Project.css";

const Project = () => {
    const [project, setProject] = useState({});
    const [notInit, setNotInit] = useState([]);
    const [doing, setDoing] = useState([]);
    const [finished, setFinished] = useState([]);
    const [todo, setTodo] = useState("");
    const [name, setName] = useState("");

    const { id } = useParams();
    const { user, setUser } = useUserContext();

    const getTodos = async () => {
        try {
            const res = await todoFetch.get(`project/projectsave/${id}`, {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            });
            setProject(res.data);
            setNotInit(res.data.todos.filter((todo) => todo.notInit));
            setDoing(res.data.todos.filter((todo) => todo.doing));
            setFinished(res.data.todos.filter((todo) => todo.finish));
        } catch (error) {
            if (error.response.status === 401) {
                setUser(null);
                localStorage.removeItem("user");
                navigate("/login");
            }
        }
    };

    const editTodo = async (e, todo, setIdShow) => {
        e.preventDefault();

        try {
            const obj = {
                description: name || todo.description,
            };

            const res = await todoFetch.patch(
                `project/projectsave/${id}/edittodo/${todo.id}`,
                obj,
                {
                    headers: {
                        Authorization: `Bearer ${user}`,
                    },
                }
            );

            setNotInit(res.data.todos.filter((todo) => todo.notInit));
            setDoing(res.data.todos.filter((todo) => todo.doing));
            setFinished(res.data.todos.filter((todo) => todo.finish));

            setIdShow("");
            setName("");
        } catch (error) {
            if (error.response.status === 401) {
                setUser(null);
                localStorage.removeItem("user");
                navigate("/login");
            }
        }
    };

    const createTodo = async (e) => {
        e.preventDefault();
        try {
            const obj = {
                todo,
            };

            const res = await todoFetch.patch(
                `project/projectsave/${id}/newtodo`,
                obj,
                {
                    headers: {
                        Authorization: `Bearer ${user}`,
                    },
                }
            );

            setNotInit(res.data.todos.filter((todo) => todo.notInit));
            setTodo("");
        } catch (error) {
            useToast(error.response.data.error, "error");
            if (error.response.status === 401) {
                setUser(null);
                localStorage.removeItem("user");
                navigate("/login");
            }
        }
    };

    const deleteTodo = async (todoId) => {
        try {
            const confirm = window.confirm("Deseja mesmo deletar essa tarefa?");
            if (!confirm) return;
            const res = await todoFetch.patch(
                `project/projectsave/${id}/deletetodo/${todoId}`,
                undefined,
                {
                    headers: {
                        Authorization: `Bearer ${user}`,
                    },
                }
            );

            setNotInit(res.data.todos.filter((todo) => todo.notInit));
            setDoing(res.data.todos.filter((todo) => todo.doing));
            setFinished(res.data.todos.filter((todo) => todo.finish));
        } catch (error) {
            if (error.response.status === 401) {
                setUser(null);
                localStorage.removeItem("user");
                navigate("/login");
            }
        }
    };

    const copyTodo = async (todoId) => {
        try {
            const res = await todoFetch.patch(
                `project/projectsave/${id}/copytodo/${todoId}`,
                undefined,
                {
                    headers: {
                        Authorization: `Bearer ${user}`,
                    },
                }
            );
            setNotInit(res.data.todos.filter((todo) => todo.notInit));
            setDoing(res.data.todos.filter((todo) => todo.doing));
            setFinished(res.data.todos.filter((todo) => todo.finish));
        } catch (error) {
            if (error.response.status === 401) {
                setUser(null);
                localStorage.removeItem("user");
                navigate("/login");
            }
        }
    };

    const notInitFunc = async (todoId) => {
        try {
            const res = await todoFetch.patch(
                `project/projectsave/${id}/notinit/${todoId}`,
                undefined,
                {
                    headers: {
                        Authorization: `Bearer ${user}`,
                    },
                }
            );
            setNotInit(res.data.todos.filter((todo) => todo.notInit));
            setDoing(res.data.todos.filter((todo) => todo.doing));
            setFinished(res.data.todos.filter((todo) => todo.finish));
        } catch (error) {
            if (error.response.status === 401) {
                setUser(null);
                localStorage.removeItem("user");
                navigate("/login");
            }
        }
    };

    const doingFunc = async (todoId) => {
        try {
            const res = await todoFetch.patch(
                `project/projectsave/${id}/doing/${todoId}`,
                undefined,
                {
                    headers: {
                        Authorization: `Bearer ${user}`,
                    },
                }
            );
            setNotInit(res.data.todos.filter((todo) => todo.notInit));
            setDoing(res.data.todos.filter((todo) => todo.doing));
            setFinished(res.data.todos.filter((todo) => todo.finish));
        } catch (error) {
            if (error.response.status === 401) {
                setUser(null);
                localStorage.removeItem("user");
                navigate("/login");
            }
        }
    };

    const finish = async (todoId) => {
        try {
            const res = await todoFetch.patch(
                `project/projectsave/${id}/finish/${todoId}`,
                undefined,
                {
                    headers: {
                        Authorization: `Bearer ${user}`,
                    },
                }
            );
            setNotInit(res.data.todos.filter((todo) => todo.notInit));
            setDoing(res.data.todos.filter((todo) => todo.doing));
            setFinished(res.data.todos.filter((todo) => todo.finish));
        } catch (error) {
            if (error.response.status === 401) {
                setUser(null);
                localStorage.removeItem("user");
                navigate("/login");
            }
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <div className="project">
            <div className="header">
                <div className="name-project">
                    <Link to={"/"}>
                        <BsChevronLeft />
                    </Link>
                    <span>
                        <VscFolder className="past" />
                    </span>
                    <span>{project.name}</span>
                </div>
                <div className="create-todo">
                    <form onSubmit={createTodo}>
                        <input
                            type="text"
                            placeholder="Crie sua nova tarefa e click e enter para savar"
                            value={todo}
                            onChange={(e) => setTodo(e.target.value)}
                        />
                    </form>
                </div>
            </div>
            <div className="project-area">
                <h2>Tarefas não inciadas</h2>
                <TodoArea
                    todos={notInit}
                    name={name}
                    setName={setName}
                    editTodo={editTodo}
                    deleteTodo={deleteTodo}
                    copyTodo={copyTodo}
                    doing={doingFunc}
                    notInit={notInitFunc}
                    finish={finish}
                />
                <h2>Em andamento</h2>
                <TodoArea
                    todos={doing}
                    name={name}
                    setName={setName}
                    editTodo={editTodo}
                    deleteTodo={deleteTodo}
                    copyTodo={copyTodo}
                    doing={doingFunc}
                    notInit={notInitFunc}
                    finish={finish}
                />
                <h2>Finalizado</h2>
                <TodoArea
                    todos={finished}
                    name={name}
                    setName={setName}
                    editTodo={editTodo}
                    deleteTodo={deleteTodo}
                    copyTodo={copyTodo}
                    doing={doingFunc}
                    notInit={notInitFunc}
                    finish={finish}
                />
            </div>
        </div>
    );
};

export default Project;
