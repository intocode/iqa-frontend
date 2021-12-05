import styled from 'styled-components';
import { Alert } from '../components/ui';

export default {
  title: 'Alert',
  component: Alert,
  argTypes: {
    color: { control: 'color' },
  },
};

const StyledDecorator = styled.div`
  & > div {
    margin-bottom: 15px;
  }
`;

export const PlaygroundAlert = (args) => <Alert {...args} />;

PlaygroundAlert.args = {
  children: 'Lorem ipsum dolor!',
};

export const Default = () => (
  <StyledDecorator>
    <Alert color="primary">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate harum
      ipsam magnam maxime quia quod repellendus sapiente unde ut.
    </Alert>
    <Alert color="warning">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate harum
      ipsam magnam maxime quia quod repellendus sapiente unde ut.
    </Alert>
    <Alert color="success">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate harum
      ipsam magnam maxime quia quod repellendus sapiente unde ut.
    </Alert>
    <Alert color="gray">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate harum
      ipsam magnam maxime quia quod repellendus sapiente unde ut.
    </Alert>
    <Alert color="danger">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate harum
      ipsam magnam maxime quia quod repellendus sapiente unde ut.
    </Alert>
  </StyledDecorator>
);

export const Contrasted = () => (
  <StyledDecorator>
    <Alert color="primary" contrast>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate harum
      ipsam magnam maxime quia quod repellendus sapiente unde ut.
    </Alert>
    <Alert color="warning" contrast>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate harum
      ipsam magnam maxime quia quod repellendus sapiente unde ut.
    </Alert>
    <Alert color="success" contrast>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate harum
      ipsam magnam maxime quia quod repellendus sapiente unde ut.
    </Alert>
    <Alert color="gray" contrast>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate harum
      ipsam magnam maxime quia quod repellendus sapiente unde ut.
    </Alert>
    <Alert color="danger" contrast>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate harum
      ipsam magnam maxime quia quod repellendus sapiente unde ut.
    </Alert>
  </StyledDecorator>
);

export const InsideBlock = () => (
  <div style={{ width: 400, margin: 'auto' }}>
    <Default />
  </div>
);
