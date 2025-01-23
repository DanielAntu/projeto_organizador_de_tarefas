import React from "react";

const Input = ({
    name,
    label,
    type = "text",
    placeholder = "",
    value,
    set,
}) => {
    return (
        <div className="form-control">
            <label htmlFor={name}>{label}:</label>
            <input
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                value={value || ""}
                onChange={(e) => set(e.target.value)}
            />
        </div>
    );
};

export default Input;
