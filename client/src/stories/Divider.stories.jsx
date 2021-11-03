import { Badge } from '../components/Badge/Badge';
import { Divider } from '../components/Divider/Divider';

export default {
  title: 'Example/Divider',
  component: Divider,
};

const Template = (args) => <Divider {...args} />;

export const Default = Template.bind({});

export const Present = () => {
  return (
    <div
      style={{
        width: 300,
        height: 20,
        margin: 'auto',
        border: '1px solid #E4E7ED',
        borderRadius: 4,
      }}
    >
      <Divider />
    </div>
  );
};
