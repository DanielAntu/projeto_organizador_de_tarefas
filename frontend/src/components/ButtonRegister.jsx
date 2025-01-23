import React from "react";

const ButtonRegister = ({ loading }) => {
    return (
        <>
            {!loading && (
                <button type="submit" className="btn-register">
                    Enviar
                </button>
            )}
            {loading && (
                <button type="submit" className="btn-register" disabled>
                    Carregando...
                </button>
            )}
        </>
    );
};

export default ButtonRegister;
