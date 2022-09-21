import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Input } from 'antd';
import { selectQuestionsSearch, fetchQuestionsSearch } from 'features/search/searchQuestionSlice';
import SearchIcon from 'components/icons/SearchIcon';

const StyledSearch = styled.div`
  width: 300px;
  margin-left: 20px;
  position: relative;

  .questions {
    margin-top: 5px;
    position: absolute;
    width: 100%;
    border-radius: 3px;
    background-color: #ffffff;
    box-shadow: 0 4px 12px rgb(0 0 0 / 10%);
    z-index: 100;
  }

  input {
    border-color: #909399;
    height: 40px;
  }

  input::placeholder {
    font-size: 14px;
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

  .search-icon {
    position: absolute;
    top: 11px;
    right: 7px;
  }
`;

const Search = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const search = useSelector(selectQuestionsSearch);
  const [question, setQuestion] = useState('');
  const [examination, setExamination] = useState(false);

  const ref = useRef(null);

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
        <>
          <Input
            onChange={(e) => handleSearch(e)}
            value={question}
            placeholder="Поиск..."
            ref={ref}
          />

          <SearchIcon />
        </>
      )}
      {examination && (
        <div className="questions">
          {search.map((item) => (
            <div key={item._id} className="question">
              <Link className="question-tittle" to={`/question/${item._id}`}>
                {item.question}
              </Link>
              <div className="question-text">{item.comment.substr(0, 30)}...</div>
            </div>
          ))}
        </div>
      )}
    </StyledSearch>
  );
};

export default Search;
