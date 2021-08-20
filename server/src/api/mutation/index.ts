import { MutationResolvers } from '../../graphql';
import { resolver as deleteReview } from './deleteReview';
import { resolver as insertReview } from './insertReview';
import { resolver as updateReview } from './updateReview';
import { resolver as updateUser } from './updateUser';
import { resolver as updateUserPersonalization } from './updateUserPersonalization';
import { resolver as upsertUser } from './upsertUser';
import { resolver as upsertUserPersonalization } from './upsertUserPersonalization';

export const Mutation: MutationResolvers = {
  upsertUser,
  upsertUserPersonalization,
  updateUser,
  updateUserPersonalization,
  insertReview,
  updateReview,
  deleteReview,
};
