import styled from 'styled-components';
import '../assets/bootstrap-placeholder.css';
import { Tag } from '../components/ui';

const StyledPlaceholder = styled.div`
  max-width: 820px;
  background-color: white;
  margin: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Placeholder = () => {
  return (
    <StyledPlaceholder className="mb-4">
      <div className="placeholder-glow d-flex justify-content-between pt-3 m-2 mb-4">
        <div className="placeholder placeholder-lg col-5 m-1" />
        <div className="col-4 m-1">
          <Tag className="placeholder col-12" noGutters>
            &nbsp;
          </Tag>
        </div>
      </div>
      <div className="placeholder-glow m-3">
        <div className="placeholder placeholder-lg col-12 mb-1" />
        <div className="placeholder placeholder-lg col-12 mb-1" />
        <div className="placeholder placeholder-lg col-12 mb-1" />
        <div className="placeholder placeholder-lg col-12 mb-1" />
        <div className="placeholder placeholder-lg col-12 mb-1" />
      </div>
      <div className="placeholder-glow d-flex justify-content-between m-2 p-2">
        <div className="placeholder col-2" />
        <div className="placeholder col-2" />
        <div className="placeholder col-2" />
        <div className="placeholder col-2" />
      </div>
    </StyledPlaceholder>
  );
};

export const LazyPlaceholder = () => {
  const placeholders = new Array(3).fill(null);
  return (
    <>
      {placeholders.map((_, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <Placeholder key={idx} />
      ))}
    </>
  );
};
