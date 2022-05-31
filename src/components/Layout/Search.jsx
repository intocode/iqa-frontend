import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { Input } from '../ui';
import {
  selectQuestionsSearch,
  fetchQuestionsSearch,
} from '../../features/search/searchQuestionSlice';

const StyledSearch = styled.div`
  width: 225px;
  margin-left: 20px;
  position: relative;

  .questions {
    margin-top: 5px;
    position: absolute;
    width: 225px;
    border-radius: 3px;
    background-color: #ffffff;
    box-shadow: 0 4px 12px rgb(0 0 0 / 10%);
    z-index: 100;
  }

  input {
    border-color: #409eff;
  }

  .question {
    border-bottom: 1px solid #9fa0a1;
    padding: 15px;
  }

  .question:hover {
    background-color: #ecf5ff;
  }

  .question-tittle {
    color: #000;
    font-weight: bold;
  }
  .question-text {
    color: #6c757d;
    font-size: 14px;
  }
`;

const Search = ({ nodeRef }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const search = useSelector(selectQuestionsSearch);
  const [question, setQuestion] = useState('');
  const [examination, setExamination] = useState(false);

  const handleSearch = (e) => {
    setQuestion(e.target.value);
  };

  useEffect(() => {
    if (question) {
      dispatch(fetchQuestionsSearch(question));
      setExamination(true);
    }
  }, [question, dispatch]);

  useEffect(() => {
    setExamination(false);
    setQuestion('');
  }, [location.key]);

  const { REACT_APP_FEATURE_SEARCH } = process.env;

  return (
    <StyledSearch>
      {REACT_APP_FEATURE_SEARCH && (
        <Input
          onChange={(e) => handleSearch(e)}
          value={question}
          placeholder="Поиск вопроса..."
          ref={nodeRef}
        />
      )}
      {examination && (
        <div className="questions">
          {search.map((item) => (
            <div key={item._id} className="question">
              <Link className="question-tittle" to={`/question/${item._id}`}>
                {item.question}
              </Link>
              <div className="question-text">
                {item.comment.substr(0, 30)}...
              </div>
            </div>
          ))}
        </div>
      )}
    </StyledSearch>
  );
};

Search.propTypes = {
  nodeRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(HTMLInputElement) }),
  ]),
};

Search.defaultProps = {
  nodeRef: null,
};

export default Search;
