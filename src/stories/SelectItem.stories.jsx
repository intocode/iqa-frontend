import { SelectItem } from '../components/ui';

export default {
  component: SelectItem,
  title: 'Select/Item',
  decorators: [
    (Story) => (
      <div style={{ width: 400, margin: 'auto', marginBottom: 20 }}>
        <Story />
      </div>
    ),
  ],
};

// const Template = (args) => <SelectItem {...args} />

export const Default = (args) => (
  <SelectItem {...args}>default item</SelectItem>
);

export const Selected = (args) => (
  <SelectItem selected {...args}>
    selected item
  </SelectItem>
);
