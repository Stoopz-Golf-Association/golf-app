import { Autocomplete, ComboboxItem, OptionsFilter } from '@mantine/core';

const optionsFilter: OptionsFilter = ({ options, search }) => {
  const splittedSearch = search.toLowerCase().trim().split(' ');
  return (options as ComboboxItem[]).filter((option) => {
    const words = option.label.toLowerCase().trim().split(' ');
    return splittedSearch.every((searchWord) =>
      words.some((word) => word.includes(searchWord))
    );
  });
};

function GolfCourse() {
  return (
    <Autocomplete
      label="Golf Course"
      placeholder="Enter Name of Golf Course"
      data={[
        'Jimmy Clay Golf Course',
        'Roy Kizer Golf Course',
        'Lions Municipal Golf Course',
        'Riverside Golf Course',
        'Hancock Golf Course',
        'Morris Williams Golf Course',
        'Harvey Penick Golf Campus',
        'Grey Rock Golf and Tennis',
        'Wetlands Golf Course',
        'Les Vieux Chenes Golf Course',
        'Farm d Allie Golf Club',
        'Muni Lafayette Golf Course - Hebert Municipal Golf Course',
        'Koasati Pines Golf Course',
        'Atchafalaya Golf Course',
        'Bayou Bend Golf Course',
      ]}
      filter={optionsFilter}
    />
  );
}
export default GolfCourse;
