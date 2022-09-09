import { Viewer } from '@toast-ui/react-editor';
import { Tag } from 'antd';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Divider } from '../../../components/ui';
import { selectOpenedQuestion } from '../questionsSlice';

const StyledAvatar = styled.div`
  display: flex;
  align-items: center;

  & > img {
    width: 36px;
    height: 36px;
    margin-right: 10px;
    border-radius: 24px;
  }

  & > div {
    color: #909399;
    font-size: 12px;
    margin-left: 10px;
  }
`;

const StyledFullDescription = styled.div`
  .toastui-editor-contents {
    font-size: 16px;
  }
`;

export const QuestionPageContent = () => {
  const { REACT_APP_FEATURE_TAGS } = process.env;

  const question = useSelector(selectOpenedQuestion);

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <StyledAvatar>
          <img src={question.author?.avatar?.thumbnail} alt="" />
          <p>{question.author.name}</p>
          <div>добавлено {dayjs(question?.createdAt).fromNow()}</div>
        </StyledAvatar>
        {REACT_APP_FEATURE_TAGS && (
          <div className="d-flex">
            {question.tags.map((tag) => (
              <Tag key={tag} noGutters className="d-none d-md-block">
                {tag}
              </Tag>
            ))}
          </div>
        )}
      </div>

      <h2 className="my-3">{question.question}</h2>

      <StyledFullDescription>
        <Viewer initialValue={question.fullDescription} />
      </StyledFullDescription>
      <Divider className="my-4" />
    </>
  );
};
