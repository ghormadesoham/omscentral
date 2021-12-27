import { forbidden } from '@hapi/boom';
import { allow, deny, rule, shield } from 'graphql-shield';

import { logger } from '../components';
import { appConfig } from '../config';
import { Context } from '../types';

const isSignedIn = rule()((_, __, { req }: Context) => !!req.userId);

const isSelf = rule()(
  (_, { id }: { id: string }, { req }: Context) => id === req.userId,
);

export const permissions = shield(
  {
    Query: {
      '*': deny,
      config: allow,
      course: allow,
      courses: allow,
      programs: allow,
      review: allow,
      reviews: allow,
      semesters: allow,
      specializations: allow,
      user: isSelf,
      userPersonalization: allow, // user is validated
    },
    Mutation: {
      '*': deny,
      upsertUser: isSignedIn,
      upsertUserPersonalization: isSignedIn,
      updateUser: isSignedIn,
      updateUserPersonalization: isSignedIn,
      insertReview: isSignedIn,
      updateReview: isSignedIn,
      deleteReview: isSignedIn,
      reportReview: isSignedIn,
      learnMore: isSignedIn,
    },
  },
  {
    fallbackRule: allow,
    fallbackError: (error: any): any => {
      error && logger.error('permissions:', error);
      if (appConfig.environment === 'local') {
        throw forbidden(error);
      } else {
        throw forbidden();
      }
    },
  },
);
