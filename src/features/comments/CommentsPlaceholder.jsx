import '../../assets/bootstrap-placeholder.css';
import { Paper } from '../../components/ui';

const Placeholder = () => {
  return (
    <Paper className="mb-3">
      <div className="placeholder-glow row justify-content-between p-2 mb-3">
        <div className="col-5 placeholder placeholder-lg" />
      </div>
      <div className="placeholder-glow mb-3">
        <div className="placeholder col-12" />
        <div className="placeholder col-10" />
      </div>
    </Paper>
  );
};

export const CommentsPlaceholder = () => {
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
