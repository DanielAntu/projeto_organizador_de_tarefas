import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";
import useToast from "../hook/useToast";
import todoFetch from "../axios/config";

import "./Register.css";
import ButtonRegister from "../components/ButtonRegister";

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setusername] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            const obj = {
                firstName,
                lastName,
                username,
                email,
                password1,
                password2,
            };

            const res = await todoFetch.post("user/register", obj);
            useToast(res.data.message);
            navigate("/login");
        } catch (error) {
            useToast(error.response.data.error, "error");
        }
        setLoading(false);
    };

    return (
        <div className="register center">
            <h2>Preencha o formulário para se cadastrar</h2>
            <form onSubmit={handleSubmit}>
                <Input
                    name={"first-name"}
                    label={"Primeiro Nome"}
                    placeholder="Digite seu nome"
                    value={firstName}
                    set={setFirstName}
                />
                <Input
                    name={"last-name"}
                    label={"Sobrenome"}
                    placeholder="Digite seu sobrenome"
                    value={lastName}
                    set={setLastName}
                />
                <Input
                    name={"username"}
                    label={"Nome do usuário"}
                    placeholder="Digite seu nome de usuário"
                    value={username}
                    set={setusername}
                />
                <Input
                    type="email"
                    name={"email"}
                    label={"E-mail"}
                    placeholder="Digite seu E-mail"
                    value={email}
                    set={setEmail}
                />
                <Input
                    type="password"
                    name={"password1"}
                    label={"Senha"}
                    placeholder="Digite sua senha"
                    value={password1}
                    set={setPassword1}
                />
                <Input
                    type="password"
                    name={"password2"}
                    label={"Confirmação de Senha"}
                    placeholder="Digite sua senha novamente"
                    value={password2}
                    set={setPassword2}
                />

                <ButtonRegister loading={loading} />
            </form>
            <p>
                Ja esta cadastrado faça o seu login{" "}
                <Link to={"/login"}>Clique aqui</Link>
            </p>
        </div>
    );
};

export default Register;
