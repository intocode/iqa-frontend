import { useState } from 'react';
import { Input } from '../components/Input';

export default {
  title: 'Example/Input',
  component: Input,
};

const Template = (args) => {
  const [state, setState] = useState('');

  const handleChange = (ev) => {
    setState(ev.target.value);
  };

  return (
    <>
      <Input value={state} onChange={handleChange} {...args} />
      {state}
    </>
  );
};

export const Default = Template.bind({});

Default.args = {
  placeholder: '',
  style: {},
  type: '',
  name: '',
};
