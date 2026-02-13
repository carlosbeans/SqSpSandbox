export default function MainNavigation2() {
    const [value, setValue] = React.useState('one');

    return (
        <Tabs
      options={[
        {
          label: 'One',
          value: 'one'
        },
        {
          label: 'Two',
          value: 'two'
        },
        {
          label: 'Three',
          value: 'three'
        }
      ]}
      value={value}
      onChange={setValue}
    />
    );
}