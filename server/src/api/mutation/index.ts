import { MutationResolvers } from '../../graphql';
import { resolver as deleteReview } from './deleteReview';
import { resolver as insertReview } from './insertReview';
import { resolver as learnMore } from './learnMore';
import { resolver as reportReview } from './reportReview';
import { resolver as updateReview } from './updateReview';
import { resolver as updateUser } from './updateUser';
import { resolver as upsertUser } from './upsertUser';

export const Mutation: MutationResolvers = {
  deleteReview,
  insertReview,
  learnMore,
  reportReview,
  updateReview,
  updateUser,
  upsertUser,
};
