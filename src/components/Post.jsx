import { useState } from 'react';
import styled from 'styled-components';
import { EditDeletePopup } from './EditDeletePopup';
import { useDispatch } from 'react-redux';
import { updateTodo } from '../slices/todosSlice';
import { format } from 'date-fns';

const PostContainer = styled.div`
  position: relative;
  width: 400px;
  height: auto;
  margin: 18px;
  border-radius: 24px;
  background-color: ${(props) => props.theme.colors.postColor};

  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 14px 25px;
    margin-left: 0px;
    gap: 10px;

    width: 100%;
    height: 56.56px;
    left: 0px;
    top: 3px;

    color: ${(props) => props.theme.colors.textColor};
    font-weight: 500;
    font-size: 1.2rem;
    text-decoration: none;
    margin-left: 3.7%;
    > h3 {
      display: flex;
      flex-direction: row;
      align-items: baseline;
    }
    .date {
      margin: 0.8rem;
      font-size: 0.8rem;
      font-weight: 400;
    }
    > i {
      font-size: 1.8rem;
      margin-right: 24px;
      cursor: pointer;
    }
  }
  .content {
    margin: 0 18px;
    padding: 12px 27px;

    color: ${(props) => props.theme.colors.textColor};
    font-weight: 400;
    font-size: 1rem;
  }
`;

const PostFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 25px;
  gap: 10px;
  width: 100%;

  color: ${(props) => props.theme.colors.textColor};

  .label {
    border-radius: 100%;
    background-color: ${(props) => props.color};
    width: 30px;
    height: 30px;
  }
`;

export const Post = ({ id, title, content, tag, tagColor, done, date }) => {
  const dispatch = useDispatch();

  /** D-day 계산 */
  const today = format(new Date(), 'yyyy-MM-dd');
  const targetDate = date;
  // 하루 차이의 경우 날짜 기준으로는 두 날짜의 차이가 0으로 계산되어, 밀리초 단위로 차이 계산하고 일수차이를 계산해준다.
  const timeDifference = new Date(targetDate) - new Date(today);
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  console.log(`daysDifference: ${daysDifference}`);
  const dDay =
    daysDifference === 0
      ? 'Do it today !'
      : daysDifference > 0
      ? `D-${daysDifference}`
      : `D+${Math.abs(daysDifference)}`; // D-day 값 계산

  /** edit 모달 오픈에 관여하는 상태와 핸들러 */
  const [isOn, setIsOn] = useState(false);
  const openEditModalHandler = () => {
    setIsOn(!isOn);
  };

  return (
    <PostContainer>
      <div key={id}>
        <div className="title">
          <h3>
            {title}
            <p className="date">{dDay}</p>
          </h3>
          <i
            onClick={() => {
              openEditModalHandler();
            }}
            className="fa-solid fa-ellipsis"
          ></i>
        </div>
        <div className="content">{content}</div>
        {isOn ? (
          <EditDeletePopup
            id={id}
            openEditModalHandler={openEditModalHandler}
          />
        ) : null}
        <PostFooter color={tagColor}>
          <div className="label" />
          <div className="activeBox">
            <input
              type="checkbox"
              checked={done}
              onClick={() => {
                dispatch(
                  updateTodo({
                    id,
                    title,
                    content,
                    tag,
                    tagColor,
                    done: !done,
                  })
                );
              }}
            />
            <label>{done === true ? 'Done' : 'Active'}</label>
          </div>
        </PostFooter>
      </div>
    </PostContainer>
  );
};
