import styled from 'styled-components';
import { Tag } from '../components/Tag';

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
export const All = () => (
  <StyledDecorator>
    <Tag color="success">success</Tag>
    <Tag color="danger">danger</Tag>
    <Tag color="gray">gray</Tag>
    <Tag color="warning">warning</Tag>
  </StyledDecorator>
);

export const NoGuttersAll = () => (
  <StyledDecorator>
    <Tag color="success" noGutters>
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
