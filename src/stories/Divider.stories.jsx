import { Divider } from '../components/Divider';

export default {
  title: 'Example/Divider',
  component: Divider,
};

const Template = (args) => <Divider {...args} />;

export const Default = Template.bind({});

export const Present = () => (
  <div
    style={{
      padding: 20,
      width: 400,
      margin: 'auto',
      border: '1px solid #E4E7ED',
      borderRadius: 4,
    }}
  >
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis, voluptas.
    <Divider />
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, voluptatum!
  </div>
);
