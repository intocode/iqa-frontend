import { Badge } from '../components/Badge/Badge';

export default {
  title: 'Example/Badge',
  component: Badge,
  argTypes: {
    color: {
      options: ['danger', 'warning'],
      control: { type: 'radio' },
    },
  },
};

const Template = (args) => <Badge {...args}>Уведомление</Badge>;

export const Default = Template.bind({});
Default.args = {};
