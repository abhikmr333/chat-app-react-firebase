import ThemeSelector from "./ThemeSelector";

const Header = () => {
    return (
        <div className="flex justify-between border-b-1 ">
            <header className="flex ">ChatApp </header>
            <ThemeSelector />
        </div>
    );
};

export default Header;
