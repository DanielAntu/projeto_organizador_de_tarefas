import { useState, useEffect, useRef } from "react";
import {
    BsPencilFill,
    BsXLg,
    BsCopy,
    BsListOl,
    BsArrowClockwise,
    BsCheckLg,
} from "react-icons/bs";

import "./TodoArea.css";

const TodoArea = ({
    todos,
    name,
    setName,
    editTodo,
    deleteTodo,
    copyTodo,
    doing,
    notInit,
    finish,
}) => {
    const [idShow, setIdShow] = useState("");
    const inputRef = useRef(null);

    const showForm = (id) => {
        setIdShow(id);
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [idShow]);

    return (
        <div className="area">
            {todos &&
                todos.length > 0 &&
                todos.map((todo) => (
                    <div className="row" key={todo.id}>
                        {idShow !== todo.id && <p>{todo.description}</p>}
                        {idShow === todo.id && (
                            <form
                                onSubmit={(e) => editTodo(e, todo, setIdShow)}>
                                <input
                                    type="text"
                                    placeholder="Digite sua tarefa"
                                    ref={inputRef}
                                    value={name || todo.description}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </form>
                        )}
                        <div className="buttons-action">
                            {!todo.notInit && (
                                <button
                                    className="action"
                                    onClick={() => notInit(todo.id)}>
                                    <BsListOl /> <span>Não Iniciado</span>
                                </button>
                            )}
                            {!todo.doing && (
                                <button
                                    className="action"
                                    onClick={() => doing(todo.id)}>
                                    <BsArrowClockwise />
                                    <span>Em andamento</span>
                                </button>
                            )}
                            {!todo.finish && (
                                <button
                                    className="action"
                                    onClick={() => finish(todo.id)}>
                                    <BsCheckLg />
                                    <span>Finalizado</span>
                                </button>
                            )}
                            <button
                                className="action"
                                onClick={() => showForm(todo.id)}>
                                <BsPencilFill /> <span>Editar</span>
                            </button>
                            <button
                                className="action"
                                onClick={() => copyTodo(todo.id)}>
                                <BsCopy /> <span>Copiar</span>
                            </button>
                            <button
                                className="action"
                                onClick={() => deleteTodo(todo.id)}>
                                <BsXLg /> <span>Deletar</span>
                            </button>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default TodoArea;
