import styled from 'styled-components';
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

const StyledDecorator = styled.div`
  & > div {
    margin-bottom: 15px;
  }
`;

export const All = (args) => (
  <StyledDecorator>
    <Alert {...args} color="primary">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate harum
      ipsam magnam maxime quia quod repellendus sapiente unde ut.
    </Alert>
    <Alert {...args} color="warning">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate harum
      ipsam magnam maxime quia quod repellendus sapiente unde ut.
    </Alert>
    <Alert {...args} color="success">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate harum
      ipsam magnam maxime quia quod repellendus sapiente unde ut.
    </Alert>
    <Alert {...args} color="gray">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate harum
      ipsam magnam maxime quia quod repellendus sapiente unde ut.
    </Alert>
    <Alert {...args} color="danger">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate harum
      ipsam magnam maxime quia quod repellendus sapiente unde ut.
    </Alert>
    <Alert {...args} color="primary" contrast>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate harum
      ipsam magnam maxime quia quod repellendus sapiente unde ut.
    </Alert>
    <Alert {...args} color="warning" contrast>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate harum
      ipsam magnam maxime quia quod repellendus sapiente unde ut.
    </Alert>
    <Alert {...args} color="success" contrast>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate harum
      ipsam magnam maxime quia quod repellendus sapiente unde ut.
    </Alert>
    <Alert {...args} color="gray" contrast>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate harum
      ipsam magnam maxime quia quod repellendus sapiente unde ut.
    </Alert>
    <Alert {...args} color="danger" contrast>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate harum
      ipsam magnam maxime quia quod repellendus sapiente unde ut.
    </Alert>
  </StyledDecorator>
);
