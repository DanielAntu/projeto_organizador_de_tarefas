import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useToast from "../hook/useToast";
import todoFetch from "../axios/config";
import { useUserContext } from "../hook/useUserContext";
import Input from "../components/Input";
import ButtonRegister from "../components/ButtonRegister";

import "./Profile.css";

const Profile = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setusername] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [loading, setLoading] = useState(false);

    const { user, setUser } = useUserContext();

    const navigate = useNavigate();

    const getProfile = async () => {
        setLoading(true);
        try {
            const res = await todoFetch.get("user/profile", {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            });
            setFirstName(res.data.firstName);
            setLastName(res.data.lastName);
            setusername(res.data.username);
            setEmail(res.data.email);
        } catch (error) {
            useToast(error.response.data.error, "error");
            if (error.response.status === 401) {
                setUser(null);
                localStorage.removeItem("user");
                navigate("/login");
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        getProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const obj = {
                firstName,
                lastName,
                username,
                email,
                password1,
                password2,
            };

            const res = await todoFetch.put("user/edit", obj, {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            });

            useToast(res.data.message);
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
        <div className="profile center">
            <h2>Seu Perfil</h2>
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
        </div>
    );
};

export default Profile;
