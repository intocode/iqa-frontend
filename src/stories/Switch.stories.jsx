import { useState } from 'react';
import { Switch } from '../components/ui';

export default {
  title: 'Switch',
  component: Switch,
};

const Template = (args) => {
  return <Switch {...args} />;
};

export const Default = Template.bind({});
Default.args = {};

export const Click = () => {
  const [isCompactMode, setIsCompactMode] = useState(false);
  return (
    <Switch
      on={isCompactMode}
      onChange={() => setIsCompactMode(!isCompactMode)}
      disabled={false}
    />
  );
};
