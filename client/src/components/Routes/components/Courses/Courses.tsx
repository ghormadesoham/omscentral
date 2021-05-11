import Container from '@material-ui/core/Container';
import { Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Alert from '@material-ui/lab/Alert';
import React, { useContext, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';
import { FirebaseContext } from 'src/components/Firebase/Firebase';
import Loading from 'src/components/Loading';
import { NotificationContext } from 'src/components/Notification';
import Paper from 'src/components/Paper';
import { paths } from 'src/constants';
import { Nullable } from 'src/core';
import useSpecializationCourses from 'src/core/hooks/useSpecializationCourses';
import useLocal from 'src/core/utils/useLocalStorage';
import useSession from 'src/core/utils/useSessionStorage';
import { Course, Semester, Specialization } from 'src/graphql';

import Requirement from './components/Requirement';
import Table from './components/Table';
import Toolbar from './components/Toolbar';
import { useStyles } from './Courses.styles';

interface Props {
  loading?: boolean;
  courses?: Course[];
  semesters?: Semester[];
  onSpecializationChange: (changeTo: Nullable<Specialization>) => void;
  specialization?: Specialization;
  specializations?: Specialization[];
}

const Courses: React.FC<Props> = ({
  loading,
  courses,
  semesters,
  onSpecializationChange,
  specialization,
  specializations,
}) => {
  const classes = useStyles();
  const sm = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));
  const history = useHistory();
  const notification = useContext(NotificationContext)!;
  const firebase = useContext(FirebaseContext);
  const [filter, setFilter] = useSession('/c:f', '');
  const [size, setSize] = useLocal<'small' | 'medium'>('/c:s', 'medium');

  useEffect(() => {
    sm && setSize('small');
  }, [sm, setSize]);

  const bySpec = useSpecializationCourses(specializations);

  const filterBy: (course: Course) => boolean = useMemo(
    () => (course) =>
      (!specialization || bySpec.get(specialization.id)!.has(course.id)) &&
      (!filter ||
        [course.id, course.department, course.name, ...course.aliases]
          .join(' ')
          .toLocaleLowerCase()
          .includes(filter.toLocaleLowerCase())),
    [filter, specialization, bySpec],
  );

  const filtered = useMemo(
    () => (courses || []).filter(filterBy),
    [courses, filterBy],
  );

  const handleCourseClick = (course: Course) => {
    if (course.metric?.reviews.count) {
      firebase.analytics.logEvent('select_content', {
        content_type: 'course',
        content_id: course.id,
      });
      history.push(paths.course(course.id));
    } else {
      notification.warning('There are no reviews for this course.');
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!courses?.length) {
    return null;
  }

  return (
    <Container component="main" maxWidth="xl" data-cy="courses">
      <Paper>
        <Toolbar
          specializations={specializations}
          specialization={specialization}
          onSpecializationChange={onSpecializationChange}
          filter={filter}
          onFilterChange={setFilter}
        />
        {specialization != null && (
          <Alert severity="warning" className={classes.alert}>
            Refer to degreeaudit.gatech.edu for the definitive list of courses
            required for this specialization.
          </Alert>
        )}
        {specialization ? (
          specialization.requirements.map((requirement, i) => (
            <Table
              before={
                <Requirement index={i} requirement={requirement} size={size} />
              }
              courses={filtered.filter((course) =>
                requirement.courses.includes(course.id),
              )}
              semesters={semesters || []}
              key={i}
              onClick={handleCourseClick}
              size="small"
            />
          ))
        ) : (
          <Table
            courses={filtered}
            semesters={semesters || []}
            onClick={handleCourseClick}
            size="small"
          />
        )}
      </Paper>
    </Container>
  );
};

export default Courses;
