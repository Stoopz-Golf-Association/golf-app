import { Select, ComboboxItem, OptionsFilter } from '@mantine/core';
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
  setGolfCourse: (golfCourse: { value: string; id: number }) => void;
  golfCourse: { value: string; id: number };
}

function GolfCourse({ golfCourse, setGolfCourse }: GolfCourse) {
  const [golfCourseList, setGolfCourseList] = useState([]);

  useEffect(() => {
    const fetchGolfCourses = async () => {
      try {
        const result = await axios.get('/.netlify/functions/golfCourses');

        console.log(result);

        if (result.data && Array.isArray(result.data.golfCourses)) {
          setGolfCourseList(
            result.data.golfCourses.map(
              (course: { course_name: string; golfcourse_id: number }) => {
                return { value: course.course_name, id: course.golfcourse_id };
              }
            )
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
    <Select
      searchable
      label="Golf Course"
      placeholder="Name of Golf Course"
      data={golfCourseList}
      onChange={(value) => {
        const course = golfCourseList.find(
          (golfCourse: { value: string }) => golfCourse.value === value
        );
        setGolfCourse(course!);
      }}
      value={golfCourse.value}
      filter={optionsFilter}
    />
  );
}
export default GolfCourse;
