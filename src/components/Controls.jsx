import AddButton from "./AddButton";
import colors from "../assets/colors.json";
import Color from "./Colors";

const Controls = () => {
    return (
        <div id="controls">
            <AddButton />
            {colors.map((color) => (
                <Color key={color.id} color={color} />
            ))}
        </div>
    );
};

export default Controls;
