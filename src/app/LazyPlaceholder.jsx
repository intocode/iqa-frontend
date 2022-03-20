import styled from 'styled-components';
import '../assets/bootstrap-placeholder.css';

const StyledPlaceholder = styled.div`
  max-width: 820px;
  background-color: white;
  margin: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Placeholder = () => {
  return (
    <StyledPlaceholder className="mb-4">
      <div className=" placeholder">
        <div className="placeholder-xs pt-lg-4 pb-lg-4" />
        <div className="placeholder-xs pt-lg-4 pb-lg-5" />
        <div className="placeholder-xs pt-lg-5 pb-lg-5" />
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
