import { Alert } from '../components/Alert';

export default {
  title: 'Example/Alert',
  component: Alert,
  argTypes: {
    color: {
      options: ['success', 'gray', 'danger', 'warning'],
      control: { type: 'radio' },
    },
  },
};

const Template = (args) => (
  <Alert {...args}>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate harum
    ipsam magnam maxime quia quod repellendus sapiente unde ut.
  </Alert>
);

export const Default = Template.bind({});
Default.args = {};

export const Contrasted = Template.bind({});
Contrasted.args = {
  contrast: true,
};

export const InsideBlock = (args) => (
  <div style={{ width: 400, margin: 'auto' }}>
    <Default {...args} />
  </div>
);
