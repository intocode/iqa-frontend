import React from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { Viewer } from '@toast-ui/react-editor';
import { useSelector } from 'react-redux';
import { selectComments, selectCommentsSuccess } from './commentsSlice';

const StyledProfile = styled.div`
  display: flex;
  align-items: center;
  & > img {
    width: 36px;
    height: 36px;
    border-radius: 24px;
    margin-right: 10px;
  }
`;

const StyledCommentText = styled.div`
  .toastui-editor-contents {
    font-size: 16px;
  }
`;

const StyledTimeStamps = styled.p`
  font-size: 12px;
  color: #909399;
`;

const StyledSuccess = styled.div`
  padding: 0 10px;
  background-color: ${(props) => props.background || 'white'};
`;

const CommentsList = () => {
  const comments = useSelector(selectComments);
  const comm = useSelector(selectCommentsSuccess);

  return (
    <>
      {comments.map((comment) => {
        return (
          <StyledSuccess
            background={comm._id === comment._id && '#67C23A19'}
            key={comment._id}
          >
            <div className="row align-items-center my-3 bg-success">
              <div className="col">
                <StyledProfile>
                  <img src={comment.author?.avatar?.thumbnail} alt="" />
                  <div>
                    <p>{comment.author?.name}</p>
                    <StyledTimeStamps>
                      {dayjs(comment.createdAt).fromNow()}
                    </StyledTimeStamps>
                  </div>
                </StyledProfile>
              </div>
              <div className="col-auto">{/* тут должен быть рейтинг */}</div>
              <StyledCommentText>
                <Viewer initialValue={comment.text} />
              </StyledCommentText>
            </div>
          </StyledSuccess>
        );
      })}
    </>
  );
};

export default CommentsList;
