import "./App.css";
import { useState } from "react";
import styled, { css, ThemeProvider } from "styled-components";
import GlobalStyle from "./style/GlobalStyle";
import { light, dark, colorSet } from "./style/theme";
import { Header } from "./components/Header";
import { Nav } from "./components/Nav";
import { Main } from "./components/Main";
import { CreateModal } from "./components/CreateModal";
import { postData } from "./data/postData";

function App() {
    const [themeMode, setThemeMode] = useState("light");
    const theme = themeMode === "light" ? light : dark;
    const [isDarkMode, setIsDarkMode] = useState(false);

    const [data, setData] = useState(postData);
    const dataHandler = (newData) => {
        postData.push(newData);
        openModalHandler();
        console.log(data);
    };
    const dataResetHandler = () => {
        setData(postData);
        setSelectedTag("");
    };

    /* 
    ๐ ๋ฌธ์ 
    data state๋ฅผ ๋ฐ๊ฟ๋ฒ๋ ค์ hide - non ์ฌ์ด ์ ํ์ด ์๋์ 
        if (!isHide) {
                setData(data);
    ๐ ํด๊ฒฐ
    ํธ๋ค๋ฌ ๋ง๊ณ  post๋ฅผ ๋ ๋์ํค๋ ๊ณณ์์ hide state๋ฅผ ์ฐธ์กฐํ์ฌ done์ ๋ ๋ํ ์ง ๋ง์ง๋ฅผ ๊ฒฐ์ ํจ 
    */
    const [isHide, setIsHide] = useState(false);
    // const hideHandler = (isHide, setIsHide) => {
    //     if (!isHide) {
    //         setData(data);
    //     } else if (isHide) {
    //         setData([...data].filter((el) => el.done === false));
    //     }
    /**
     * ๋ฐ์ดํฐ๋ฅผ ์์ ๋๊ฒ ์๋๋ผ
     * ๋ ๋ ์์ ์ done์ด ์จ
     */
    // if (isHide) {
    //     setData(data);
    // } else {
    //     setData([...data].filter((el) => el.done === false));
    // }
    //     setIsHide(!isHide);
    //     console.log(isHide);
    // };

    const doneHandler = (val, id) => {
        if (val) {
            setData(data.filter((data) => data.id !== id));
        } else {
            setData(postData);
        }
        console.log(data);
    };

    const toggleHandler = () => {
        setIsDarkMode(!isDarkMode);
        setThemeMode(themeMode === "light" ? "dark" : "light");
    };

    const [selectedTag, setSelectedTag] = useState("");
    const tagHandler = (label) => {
        setSelectedTag(label);
        const filterTag = postData.filter((el) => el.tag === label);
        setData(filterTag);
    };

    const [isOpen, setIsOpen] = useState(false);
    const openModalHandler = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <ThemeProvider theme={theme} colorSet={colorSet}>
                <GlobalStyle />
                {/* <TodoContainer> */}
                <Header
                    selectedTag={selectedTag}
                    tagHandler={tagHandler}
                    isOpen={isOpen}
                    openModalHandler={openModalHandler}
                    dataResetHandler={dataResetHandler}
                />
                <Nav
                    isDarkMode={isDarkMode}
                    toggleHandler={toggleHandler}
                    selectedTag={selectedTag}
                    tagHandler={tagHandler}
                    //hideHandler={hideHandler}
                    isHide={isHide}
                    setIsHide={setIsHide}
                />
                <Main
                    data={data}
                    setData={setData}
                    doneHandler={doneHandler}
                    isHide={isHide}
                    openModalHandler={openModalHandler}
                />
                <CreateModal
                    type="create"
                    isOpen={isOpen}
                    openModalHandler={openModalHandler}
                    selectedTag={selectedTag}
                    tagHandler={tagHandler}
                    dataHandler={dataHandler}
                    data={data}
                />
                {/* </TodoContainer> */}
            </ThemeProvider>
        </>
    );
}

export default App;
