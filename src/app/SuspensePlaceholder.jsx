import styled from 'styled-components';
import '../assets/bootstrap-placeholder.css';
import { Paper } from '../components/ui';

const StyledPlaceholder = styled.div`
  max-width: 820px;
  & > div {
    margin: 20px 0;
  }
`;

export const LazyPlaceholder = () => {
  return (
    <StyledPlaceholder className="m-auto">
      <Paper className="mb-4">
        <div
          className="placeholder-glow row justify-content-between m-auto mb-5"
          style={{ height: '30px' }}
        >
          <div className="col-4 placeholder placeholder-xs" />
          <div className="col-4 placeholder placeholder-xs" />
        </div>
        <div className="placeholder-glow mb-3" style={{ marginBottom: '20px' }}>
          <div className="placeholder col-12" />
          <div className="placeholder col-12" />
        </div>
        <div className="placeholder-glow mb-5 mt-5">
          <div className="placeholder col-12 mb-2 mt-2" />
          <div className="placeholder col-12 mb-2 mt-2" />
          <div className="placeholder col-12 mb-2 mt-2" />
          <div className="placeholder col-12 mb-2 mt-2" />
        </div>
        <div className="placeholder-glow row justify-content-between m-auto mb-3 mt-5">
          {' '}
          <div className="placeholder col-2" />{' '}
          <div className="placeholder col-3" />{' '}
          <div className="placeholder col-3" />{' '}
          <div className="placeholder col-2" />{' '}
        </div>
      </Paper>
    </StyledPlaceholder>
  );
};
