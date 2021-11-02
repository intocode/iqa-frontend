import { Paper } from '../components/Paper/Paper';

export default {
  title: 'Example/Paper',
  component: Paper,
};

const Template = (args) => <Paper {...args}>Tag text</Paper>;

export const Default = Template.bind({});
Default.args = {};
