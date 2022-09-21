import { Tag } from 'antd';
import 'assets/bootstrap-placeholder.css';
import { Paper } from 'components/ui';

const Placeholder = () => {
  return (
    <Paper className="mb-4">
      <div className="placeholder-glow row justify-content-between p-2 mb-3">
        <div className="col-5 placeholder placeholder-xs" />
        <div className="col-4">
          <Tag className="placeholder col-12">&nbsp;</Tag>
        </div>
      </div>
      <div className="placeholder-glow mb-3">
        <div className="placeholder col-12" />
        <div className="placeholder col-12" />
      </div>
      <div className="placeholder-glow">
        <div className="placeholder col-1" /> <div className="placeholder col-3" />{' '}
        <div className="placeholder col-3" /> <div className="placeholder col-2" />
      </div>
    </Paper>
  );
};

export const QuestionsListPlaceholder = () => {
  const placeholders = new Array(4).fill(null);
  return (
    <>
      {placeholders.map((_, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <Placeholder key={idx} />
      ))}
    </>
  );
};
