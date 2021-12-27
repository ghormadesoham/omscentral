import { badRequest } from '@hapi/boom';

import { upsertUserPersonalization } from '../../functions';
import { MutationResolvers } from '../../graphql';
import { id } from '../../utils';
import { userPersonalizationSchema } from '../schema';

type Resolver = MutationResolvers['upsertUserPersonalization'];

export const resolver: Resolver = async (
  _,
  { userPersonalization },
  { req },
) => {
  const { value, error } = await userPersonalizationSchema.validate(
    userPersonalization,
  );
  if (error) {
    throw badRequest(error.message);
  }

  return upsertUserPersonalization(id(), value);
};
