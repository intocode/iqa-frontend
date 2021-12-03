import styled from 'styled-components';
import { Paper } from '../components/ui';

export default {
  title: 'Paper',
  component: Paper,
};

const Template = (args) => (
  <Paper {...args}>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut
    blanditiis ea exercitationem harum ipsa laboriosam maxime mollitia obcaecati
    provident quod, ratione, voluptate! Corporis eius eligendi quaerat quasi
    sapiente voluptates?
  </Paper>
);

export const Default = Template.bind({});
Default.args = {};

const StyledDecorator = styled.div`
  margin: 0 auto;
  max-width: 780px;
`;

export const Centered = (args) => (
  <StyledDecorator>
    <Paper {...args}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos ea
      eos excepturi ipsum laudantium maxime provident quia ratione veritatis.
      Architecto libero, magnam magni molestias officia qui quos ratione veniam
      voluptatum.
    </Paper>
  </StyledDecorator>
);
