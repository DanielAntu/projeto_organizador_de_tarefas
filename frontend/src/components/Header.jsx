import { NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "../hook/useUserContext";

import "./Header.css";

const Header = () => {
    const { setUser, user } = useUserContext();

    const navigate = useNavigate();

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <header>
            <div className="head">
                <h1>Organizador de Tarefas 2.0</h1>
            </div>
            <nav>
                <ul>
                    {user && (
                        <>
                            <li>
                                <NavLink to={"/"}>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/new"}>Novo Projeto</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/profile"}>Perfil</NavLink>
                            </li>
                        </>
                    )}
                    {!user && (
                        <>
                            <li>
                                <NavLink to={"/register"}>Cadastrar</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/login"}>Entrar</NavLink>
                            </li>
                        </>
                    )}
                    {user && (
                        <li>
                            <button onClick={logout}>Sair</button>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
