import { Tag } from "../components/Tag/Tag";
import styled from "styled-components";

export default {
  title: "Example/Tag",
  component: Tag,
  argTypes: {
    color: {
      options: ["success", "gray", "danger", "warning"],
      control: { type: "radio" },
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
export const All = (args) => {
  return (
    <StyledDecorator>
      <Tag {...args} color="success">
        success
      </Tag>
      <Tag {...args} color="danger">
        danger
      </Tag>
      <Tag {...args} color="gray">
        gray
      </Tag>
      <Tag {...args} color="warning">
        warning
      </Tag>
    </StyledDecorator>
  );
};
