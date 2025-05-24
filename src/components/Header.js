import ThemeSelector from "./ThemeSelector";
import { APP_LOGO } from "../utils/constants";

const Header = () => {
    return (
        <header className="flex justify-between bg-gradient-to-r from-[#2c3e50] to-[#bdc3c7]">
            <div className="flex items-center ml-auto mr-auto">
                <img className="h-11 " src={APP_LOGO} alt="chatapp logo" />
                <p className="font-extrabold text-3xl text-gray-200">chatapp</p>
            </div>

            <ThemeSelector />
        </header>
    );
};

export default Header;
