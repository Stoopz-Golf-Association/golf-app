import { Autocomplete, ComboboxItem, OptionsFilter } from '@mantine/core';
import { useEffect, useState } from 'react';
import axios from 'axios';

const optionsFilter: OptionsFilter = ({ options, search }) => {
  const splittedSearch = search.toLowerCase().trim().split(' ');
  return (options as ComboboxItem[]).filter((option) => {
    const words = option.label.toLowerCase().trim().split(' ');
    return splittedSearch.every((searchWord) =>
      words.some((word) => word.includes(searchWord))
    );
  });
};

interface GolfCourse {
  setGolfCourseName: (golfCourseName: string) => void;
  golfCourseName: string;
  setPar: (par: string) => void;
  setLocation: (location: string) => void;
}

function GolfCourse({
  golfCourseName,
  setGolfCourseName,
  setPar,
  setLocation,
}: GolfCourse) {
  const [golfCourseList, setGolfCourseList] = useState([]);

  useEffect(() => {
    const fetchGolfCourses = async () => {
      try {
        const result = await axios.get('/.netlify/functions/golfCourses');

        if (result.data && Array.isArray(result.data.golfCourses)) {
          setGolfCourseList(
            result.data.golfCourses.map((course: { course_name: string }) => {
              return course.course_name;
            })
          );

          setLocation(
            result.data.golfCourses.map((location: { location: string }) => {
              return location.location;
            })
          );
          setPar(
            result.data.golfCourse.map((par: { par: string }) => {
              return par.par;
            })
          );
        } else {
          console.error('Unexpected data format:', result.data);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchGolfCourses();
  }, []);

  return (
    <Autocomplete
      label="Golf Course"
      placeholder="Name of Golf Course"
      data={golfCourseList}
      onChange={setGolfCourseName}
      value={golfCourseName}
      filter={optionsFilter}
    />
  );
}
export default GolfCourse;
