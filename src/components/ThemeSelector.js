import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { switchTheme } from "../redux/features/themeSlice";

const ThemeSelector = () => {
    const currentTheme = useSelector((store) => store.theme.currentTheme);
    const dispatch = useDispatch();

    const changeTheme = () => {
        dispatch(switchTheme());
    };

    return <button onClick={changeTheme}> Theme </button>;
};

export default ThemeSelector;
