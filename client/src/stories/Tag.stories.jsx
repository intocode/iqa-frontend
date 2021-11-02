import { Tag } from '../components/Tag/Tag';
import styled from 'styled-components';

export default {
  title: 'Example/Tag',
  component: Tag,
  argTypes: {
    color: {
      options: ['success', 'gray', 'danger', 'warning'],
      control: { type: 'radio' },
    },
  },
};

const Template = (args) => <Tag {...args}>Tag text</Tag>;

export const Default = Template.bind({});
Default.args = {};

const StyledDecorator = styled.div`
  & > div {
    margin-left: 15px;
  }
`;
export const All = () => {
  return (
    <StyledDecorator>
      <Tag color="success">success</Tag>
      <Tag color="danger">danger</Tag>
      <Tag color="gray">gray</Tag>
      <Tag color="warning">warning</Tag>
    </StyledDecorator>
  );
};

export const NoGuttersAll = () => {
  return (
    <StyledDecorator>
      <Tag color="success" noGutters={true}>
        success
      </Tag>
      <Tag color="danger" noGutters>
        danger
      </Tag>
      <Tag color="gray" noGutters>
        gray
      </Tag>
      <Tag color="warning" noGutters>
        warning
      </Tag>
    </StyledDecorator>
  );
};
