import { useState } from "react";
import todoFetch from "../axios/config";
import { useUserContext } from "../hook/useUserContext";
import useToast from "../hook/useToast";
import { useNavigate } from "react-router-dom";

import Input from "../components/Input";
import ButtonRegister from "../components/ButtonRegister";

const NewProject = () => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const { user, setUser } = useUserContext();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            const obj = {
                name,
            };

            const res = await todoFetch.post("project/new", obj, {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            });

            useToast(res.data.message);
            navigate("/");
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

    return (
        <div className="new center">
            <h2>Crie Seu Projeto Aqui</h2>
            <form onSubmit={handleSubmit}>
                <Input
                    label={"Nome do projeto"}
                    placeholder="Digite o nome do projeto"
                    value={name}
                    set={setName}
                />
                <ButtonRegister loading={loading} />
            </form>
        </div>
    );
};

export default NewProject;
