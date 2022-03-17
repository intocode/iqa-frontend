import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';
import { Typography, Tag } from '../../components/ui';

const StyledTag = styled.div`
  display: flex;
  & > div {
    margin-right: 10px;
  }
  & > div:last-child {
    margin-right: 0;
  }
`;

export const QuestionHeader = ({ question, isCompactMode }) => {
  const { REACT_APP_FEATURE_TAGS } = process.env;

  return (
    <div>
      {!isCompactMode && (
        <div className="row mb-4">
          <div className="col">
            <div className="d-flex align-items-center">
              <img
                src={question.user?.avatar?.thumbnail}
                alt=""
                className="avatar"
              />
              <span className="mx-2">{question.user.name}</span>
              <Typography variant="small" color="gray">
                добавлен {dayjs(question.createdAt).fromNow()}
              </Typography>
            </div>
          </div>
          <StyledTag className="col-auto d-none d-md-block">
            {REACT_APP_FEATURE_TAGS &&
              question.tags.map((tag) => (
                <Tag noGutters key={tag.name}>
                  {tag.name}
                </Tag>
              ))}
          </StyledTag>
        </div>
      )}
    </div>
  );
};

QuestionHeader.propTypes = {
  isCompactMode: PropTypes.bool.isRequired,
  question: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.shape({
        thumbnail: PropTypes.string,
        full: PropTypes.string,
      }),
    }).isRequired,

    tags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};
