import { colorSet } from "../style/theme";

const initialState = {
    initialTodos: [
        {
            id: 1,
            title: "오늘의 할일",
            content: "끝내주게 숨쉬기",
            tag: "entertainment",
            tagColor: colorSet.blue,
            done: true,
            date: new Date().toISOString(),
        },
        {
            id: 2,
            title: "todo 구현하기",
            content: "할수있다아 ~~ :>",
            tag: "study",
            tagColor: colorSet.green,
            done: false,
            date: new Date().toISOString(),
        },
        {
            id: 3,
            title: "뛰러가야징",
            content: "버티면 신기록 🏃🏻‍♀️🏃🏻‍♀️🏃🏻‍♀️",
            tag: "health",
            tagColor: colorSet.orange,
            done: false,
            date: new Date().toISOString(),
        },
    ],
    tags: [
        {
            color: "#FFDEFA",
            label: "work",
        },
        {
            color: "#C5E9D2",
            label: "study",
        },
        {
            color: "#D6E5FA",
            label: "entertainment",
        },
        {
            color: "#FCD4BC",
            label: "health",
        },
    ],
};

export const { initialTodos, tags } = initialState;
