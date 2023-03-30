import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

export const MainContainer = styled.div`
    display: flex;

    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
    padding: 24px 24px;
    gap: 4px;

    position: relative;
    width: 85vw;
    height: 100vh;
    left: 260px;
    top: 100px;

    border-radius: 16px 0px 0px 0px;
    background-color: ${(props) => props.theme.colors.mainBgColor};
`;

export const Main = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.todos);

    const [targetId, setTargetId] = useState(null);

    const openModalHandler = (id) => {
        setTargetId(id);
        dispatch(openModalHandler());
    };

    const dataHandler = (updateData) => {
        dispatch(
            dataHandler([
                ...data.slice(0, targetId - 1),
                updateData,
                ...data.slice(targetId),
            ])
        );
        openModalHandler();
    };
    return (
        <>
            <MainContainer>
                <Post />
            </MainContainer>
            <CreateModal type="edit" />
        </>
    );
};
