import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { switchTheme } from "../redux/features/themeSlice";
import { DARK_THEME_ICON, LIGHT_THEME_ICON } from "../utils/constants";

const ThemeSelector = () => {
    const currentTheme = useSelector((store) => store.theme.currentTheme);
    const dispatch = useDispatch();

    const changeTheme = () => {
        dispatch(switchTheme());
    };

    return (
        <button onClick={changeTheme}>
            <img
                className="h-8"
                src={currentTheme === "light" ? DARK_THEME_ICON : LIGHT_THEME_ICON}
                alt="theme selector"
            />
        </button>
    );
};

export default ThemeSelector;
