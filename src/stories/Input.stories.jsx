import { useState } from 'react';
import { Input } from '../components/ui';

export default {
  title: 'Input',
  component: Input,
};

const Template = (args) => {
  const [state, setState] = useState('');

  const handleChange = (ev) => {
    setState(ev.target.value);
  };

  return <Input value={state} onChange={handleChange} {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'placeholder...',
};

export const WithValue = Template.bind({});
WithValue.args = {
  value: 'some text...',
};

export const WithPassword = Template.bind({});
WithPassword.args = {
  value: 'some text...',
  type: 'password',
};
