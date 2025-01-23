import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonRegister from "../components/ButtonRegister";
import Input from "../components/Input";
import todoFetch from "../axios/config";
import useToast from "../hook/useToast";
import { useUserContext } from "../hook/useUserContext";

import "./Login.css";

const Login = () => {
    const [identify, setidentify] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { setUser } = useUserContext();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const obj = {
                identify,
                password,
            };

            const res = await todoFetch.post("user/login", obj);
            useToast(res.data.message);
            localStorage.setItem("user", res.data.token);
            setUser(res.data.token);
            navigate("/");
        } catch (error) {
            useToast(error.response.data.error, "error");
        }
        setLoading(false);
    };

    return (
        <div className="login center">
            <h2>Preencha o formulario para entrar</h2>
            <form onSubmit={handleSubmit}>
                <Input
                    name={"identify"}
                    label={"E-mail ou usuário"}
                    placeholder="Digite seu e-mail ou usuário"
                    value={identify}
                    set={setidentify}
                />
                <Input
                    type="password"
                    name={"password"}
                    label={"Senha do usuário"}
                    placeholder="Digite sua senha"
                    value={password}
                    set={setPassword}
                />
                <ButtonRegister loading={loading} />
            </form>
            <p>
                Não tem conta faça o seu cadastro{" "}
                <Link to={"/register"}>clique aqui</Link>
            </p>
        </div>
    );
};

export default Login;
