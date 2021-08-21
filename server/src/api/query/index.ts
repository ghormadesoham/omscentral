import { QueryResolvers } from '../../graphql';
import { resolver as config } from './config';
import { resolver as course } from './course';
import { resolver as courses } from './courses';
import { resolver as programs } from './programs';
import { resolver as review } from './review';
import { resolver as reviews } from './reviews';
import { resolver as semesters } from './semesters';
import { resolver as specializations } from './specializations';
import { resolver as user } from './user';
import { resolver as userPersonalization } from './userPersonalization';

export const Query: QueryResolvers = {
  config,
  course,
  courses,
  programs,
  review,
  reviews,
  semesters,
  specializations,
  user,
  userPersonalization,
};
