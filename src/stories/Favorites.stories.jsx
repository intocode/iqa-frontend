import React from 'react';
import Favorites from '../components/ui/Favorites';

export default {
  title: 'Example/Favorites',
  component: Favorites
};

const Template = (args) => <Favorites {...args}/>;

export const colorOn = Template.bind({});
colorOn.args = {
  colorOn: true,
};

export const colorOff = Template.bind({});
colorOff.args = {
  colorOff: true,
};