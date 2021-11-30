import React from 'react';
import CommentsLogo from '../components/ui/CommentsLogo';

export default {
  title: 'Example/CommentsLogo',
  component: CommentsLogo
};

const Template = (args) => <CommentsLogo {...args}/>;

export const Default = Template.bind({});
Default.args = {
  comments: "Обсуждение"
};

export const Comments = Template.bind({});
Comments.args = {
  comments: 260
}

