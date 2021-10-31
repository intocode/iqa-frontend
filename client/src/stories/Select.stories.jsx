import { Select } from '../components/Select';
import { SelectItem } from '../components/Select/SelectItem';
import { useState } from 'react';

export default {
  component: Select,
  title: 'Select/List',
  decorators: [
    (Story) => (
      <div style={{ width: 400, margin: 'auto', marginBottom: 20 }}>
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => <Select {...args} />;

export const Default = () => {
  const [value, setValue] = useState(null);

  return (
    <Select
      label={<b>Какой итем?</b>}
      value={value}
      onChange={(value) => setValue(value)}
    >
      <SelectItem value={1}>item 1</SelectItem>
      <SelectItem value={2}>item 2</SelectItem>
      <SelectItem value={3}>item 3</SelectItem>
    </Select>
  );
};
