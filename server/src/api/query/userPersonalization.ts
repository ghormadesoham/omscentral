import { notFound } from '@hapi/boom';

import { getUserPersonalization } from '../../functions';
import { QueryResolvers } from '../../graphql';

type Resolver = QueryResolvers['userPersonalization'];

export const resolver: Resolver = async (_, { id }) => {
  const userPersonalization = await getUserPersonalization(id);
  if (!userPersonalization) {
    throw notFound();
  }
  return userPersonalization;
};
