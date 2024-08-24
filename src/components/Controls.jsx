import React from "react";
import AddButton from "./AddButton";
import colors from "../assets/colors.json";
import Colors from "./Colors";

const Controls = () => {
    return (
        <div id="controls">
            <AddButton />
            {colors.map((color) => (
                <Colors key={color.id} color={color} />
            ))}
        </div>
    );
};

export default Controls;
