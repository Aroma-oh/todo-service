import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import uuid from "react-uuid";
import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    isSameMonth,
    isSameDay,
    addDays,
    format,
    addMonths,
    parse,
} from "date-fns";

const BgContainer = styled.div`
    z-index: 1000;
    background-color: rgba(45, 45, 45, 0.3);

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const CalendarContainer = styled.div`
    position: absolute;
    top: 23%;
    left: 62%;
    width: 330px;
    min-width: 60px;
    height: 50%;

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;

    background-color: ${(props) => props.theme.colors.containerBgColor};
    border-radius: 30px;
`;

const Header = styled.div`
    width: 100%;
    min-width: 60px;
    height: 14%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    background-color: ${(props) => props.theme.colors.mainBgColor};
    border-radius: 30px 30px 0px 0px;

    .text {
        font-size: 1.3rem;
        font-weight: 600;
        margin: 0px 24px;
        cursor: pointer;
    }
    .year {
        font-size: 1rem;
        font-weight: 500;
        margin: 0px 36px;
    }
`;

const Body = styled.div`
    width: 100%;
    height: 86%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    .text-today {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: baseline;
    }
    .text-current:hover {
        cursor: pointer;
        transition: 0.2s ease-in-out;
        transform: scale(1.03);
        /* color: rgb(99, 22, 22) */
    }

    .calendar-list {
        display: flex;
        flex-wrap: wrap;
        overflow-y: scroll;

        .calendar__item {
            width: 330px;
            height: 200px;
            padding: 2%;
            padding-top: 8%;
            margin-bottom: 5%;

            .header {
                width: 100%;
                height: 10%;
                margin-bottom: 0.95rem;

                text-align: center;
                font-size: 1em;
                font-weight: 500;

                color: ${(props) => props.theme.colors.textColor};
            }
            .body {
                width: 100%;
                height: 89%;

                display: flex;
                flex-direction: column;
                .row {
                    width: 100%;
                    height: 100%;

                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    .col {
                        width: 15%;
                        height: 100%;
                        margin-bottom: 0.13rem;

                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                        align-items: center;

                        :hover {
                            font-weight: 700;
                        }

                        font-size: 0.7rem;
                        span {
                            z-index: 10000;
                            padding-top: 5px;
                        }
                        .not-valid {
                            color: gray;
                        }
                        .today {
                            color: red;
                        }
                    }
                    .col.cell.selected {
                        background: ${(props) => props.theme.colors.postColor};
                        border-radius: 16px;
                    }
                }
            }
        }
    }
    .calendar-list::-webkit-scrollbar {
        display: none;
    }
`;

const RenderHeader = ({ currentMonth }) => {
    return (
        <div className="header row">
            {currentMonth.toLocaleString("en-US", { month: "long" })}
        </div>
    );
};

const RenderCells = ({ currentMonth, selectedDate, onDateClick }) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart); // 현재 월의, 첫 주의, 시작일 -> 전월의 일요일일 수도 있음
    const endDate = endOfWeek(monthEnd); // 현재 월의, 마지막 주의, 마지막일
    const rows = []; // 한 달의 모든 주
    let days = []; // 한 주
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, "d");
            const cloneDay = day; // 이벤트 핸들러의 실행시점 차이를 해결하기 위해 day를 저장해둠
            days.push(
                <div
                    className={`col cell ${
                        !isSameMonth(day, monthStart)
                            ? "disabled"
                            : isSameDay(day, selectedDate)
                            ? "selected" // 오늘 날짜 표시
                            : "not-valid" // 이번달이 아니면 색상을 다르게 주기 위함
                    }`}
                    key={day}
                    onClick={() => onDateClick(cloneDay)}
                >
                    <span
                        className={
                            format(currentMonth, "M") !== format(day, "M")
                                ? "text not-valid"
                                : isSameMonth(day, monthStart) &&
                                  isSameDay(day, selectedDate)
                                ? "text today"
                                : ""
                        }
                    >
                        {formattedDate}
                    </span>
                </div>
            );
            day = addDays(day, 1); // 7일간 반복문을 돌기 위해 1일씩 증가
        }
        rows.push(
            <div className="row" key={day}>
                {days}
            </div> // 7일의 반복문이 끝나면 한 주를 추가해줌
        );
        days = [];
    }
    return <div className="body">{rows}</div>;
};

export const Calendar = () => {
    const currentDate = new Date(); // 오늘의 날짜 정보
    const currentDateClone = new Date();
    const [selectedDate, setSelectedDate] = useState(new Date());

    const onDateClick = (day) => {
        setSelectedDate(day);
    };

    let currentMonth = new Date(format(currentDate, "yyyy")); // 올해 1월
    let months = []; // 올해 1월 ~ 12월

    const monthRef = useRef(null);

    const handleScroll = () => {
        // 스크롤 좌표를 가져올 때
        console.log("scrollTop:", monthRef.current.scrollTop);
        console.log("scrollLeft:", monthRef.current.scrollLeft);

        // 스크롤 좌표를 설정할 때
        monthRef.current.scrollTop = 100;
        monthRef.current.scrollLeft = 50;
    };

    for (let i = 0; i < 12; i++) {
        months.push(
            <div
                className="calendar__item"
                key={uuid()}
                ref={
                    format(currentMonth, "MM") ===
                    format(currentDateClone, "MM")
                        ? monthRef
                        : null
                }
                // style={{ width: "330px", height: "200px" }}
                onScroll={handleScroll}
            >
                <RenderHeader currentMonth={currentMonth} />
                <RenderCells
                    currentMonth={currentMonth}
                    selectedDate={selectedDate}
                    onDateClick={onDateClick}
                />
            </div>
        );
        currentMonth = addMonths(currentMonth, 1);
    }

    useEffect(() => {
        if (monthRef.current !== null) {
            monthRef.current.scrollIntoView({ behavior: "auto" });
        }
    }, []);

    const scrollCurrentMonth = () => {
        if (monthRef.current !== null) {
            monthRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <BgContainer>
                <CalendarContainer>
                    <Header
                        onClick={() => {
                            scrollCurrentMonth();
                            setSelectedDate(new Date());
                        }}
                    >
                        <div className="text">
                            {currentDate.toLocaleString("en-US", {
                                month: "long",
                            })}
                            {format(currentDate, " dd")}
                        </div>
                        <div className="text year">
                            {format(currentDate, " yyyy")}
                        </div>
                    </Header>
                    <Body>
                        <div className="calendar-list">{months}</div>
                    </Body>
                </CalendarContainer>
            </BgContainer>
        </>
    );
};
