const themeSelector = () => {
    const switchTheme = () => {
        console.log("light");
    };

    return <button onClick={switchTheme}> Theme </button>;
};

export default themeSelector;
