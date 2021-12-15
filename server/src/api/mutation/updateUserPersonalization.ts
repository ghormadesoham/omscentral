import { badRequest, forbidden } from '@hapi/boom';

import { updateUserPersonalization } from '../../functions';
import { MutationResolvers } from '../../graphql';
import { userPersonalizationSchema } from '../schema';

type Resolver = MutationResolvers['updateUserPersonalization'];

export const resolver: Resolver = async (
  _,
  { userPersonalization },
  { req },
) => {
  if (req.userId !== userPersonalization.id) {
    throw forbidden();
  }

  const { value, error } = await userPersonalizationSchema.validate(
    userPersonalization,
  );
  if (error) {
    throw badRequest(error.message);
  }

  return updateUserPersonalization(req.userId, value);
};
