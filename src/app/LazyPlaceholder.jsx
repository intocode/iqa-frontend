import styled from 'styled-components';
import '../assets/bootstrap-placeholder.css';
import { Paper } from '../components/ui';

const StyledPlaceholder = styled.div`
  max-width: 820px;
  & > div {
    margin: 20px 0;
  }
`;

const Placeholder = () => {
  return (
    <StyledPlaceholder className="m-auto">
      <Paper className="mb-4">
        <div className="placeholder-glow row justify-content-center m-auto mb-5 mt-5">
          <div className="placeholder-xs col-12" />
          <div className="placeholder-xs col-12" />
        </div>
        <div className="placeholder-glow mb-3" style={{ marginBottom: '20px' }}>
          <div className="placeholder-xs col-12" />
          <div className="placeholder-xs col-12" />
        </div>
        <div className=" placeholder-glow mb-5 mt-5">
          <div className="placeholder-xs col-12 mb-2 mt-2" />
          <div className="placeholder-xs col-12 mb-2 mt-2" />
          <div className="placeholder-xs col-12 mb-2 mt-2" />
          <div className="placeholder-xs col-12 mb-2 mt-2" />
        </div>
        <div className="placeholder-glow row justify-content-between m-auto mb-3 mt-5">
          {' '}
          <div className="placeholder-xs col-2" />{' '}
          <div className="placeholder-xs col-3" />{' '}
          <div className="placeholder-xs col-3" />{' '}
          <div className="placeholder-xs col-2" />{' '}
        </div>
      </Paper>
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
