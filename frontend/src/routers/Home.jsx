import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { VscFolder } from "react-icons/vsc";
import { BsPencilFill, BsXLg } from "react-icons/bs";
import todoFetch from "../axios/config";
import { useUserContext } from "../hook/useUserContext";
import useToast from "../hook/useToast";

import "./Home.css";

const Home = () => {
    const [projects, setProjects] = useState([]);
    const [name, setName] = useState("");
    const [idShow, setIdShow] = useState("");
    const inputRef = useRef(null);

    const { user, setUser } = useUserContext();

    const navigate = useNavigate();

    const clickShowForm = (id) => {
        setIdShow(id);
    };

    const getProjects = async () => {
        try {
            const res = await todoFetch.get("project/projectsave", {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            });

            setProjects(res.data);
        } catch (error) {
            if (error.response.status === 401) {
                setUser(null);
                localStorage.removeItem("user");
                navigate("/login");
            }
        }
    };

    useEffect(() => {
        getProjects();
        if (idShow && inputRef.current) {
            inputRef.current.focus();
        }
    }, [idShow]);

    const handleSubmit = async (e, project) => {
        e.preventDefault();
        try {
            const obj = {
                name: name || project.name,
            };

            const res = await todoFetch.patch(
                `project/projectsave/${project.id}`,
                obj,
                {
                    headers: {
                        Authorization: `Bearer ${user}`,
                    },
                }
            );
            setIdShow("");
            project.name = res.data.name;
            setName("");
        } catch (error) {
            useToast(error.response.data.error, "error");
            if (error.response.status === 401) {
                setUser(null);
                localStorage.removeItem("user");
                navigate("/login");
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            const confirm = window.confirm("Deseja mesmo deletar esse projeto");
            if (!confirm) return;

            await todoFetch.delete(`project/projectsave/${id}`, {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            });
            setProjects((projects) =>
                projects.filter((project) => project.id !== id)
            );
        } catch (error) {
            useToast(error.response.data.error, "error");
            if (error.response.status === 401) {
                setUser(null);
                localStorage.removeItem("user");
                navigate("/login");
            }
        }
    };

    return (
        <div className="home">
            {projects &&
                projects.length > 0 &&
                projects.map((project) => (
                    <div className="card" key={project.id}>
                        <div className="name">
                            {idShow !== project.id && (
                                <>
                                    <VscFolder />{" "}
                                    <Link to={`/${project.id}`}>
                                        {project.name}
                                    </Link>
                                </>
                            )}
                            {idShow === project.id && (
                                <form
                                    onSubmit={(e) => handleSubmit(e, project)}>
                                    <input
                                        type="text"
                                        placeholder="Digite o nome"
                                        ref={inputRef}
                                        value={name || project.name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                </form>
                            )}
                        </div>
                        <div className="buttons-action">
                            <button
                                onClick={() => clickShowForm(project.id)}
                                className="action">
                                <BsPencilFill /> <span>Editar</span>
                            </button>
                            <button
                                className="action"
                                onClick={() => handleDelete(project.id)}>
                                <BsXLg /> <span>Deletar</span>
                            </button>
                        </div>
                    </div>
                ))}
            {projects.length === 0 && (
                <p className="not-todo">Você ainda não tem projeto salvo</p>
            )}
        </div>
    );
};

export default Home;
