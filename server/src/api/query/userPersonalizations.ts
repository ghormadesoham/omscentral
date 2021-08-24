import { QueryResolvers } from '../../graphql';
import { UserPersonalization } from '../../models';

type Resolver = QueryResolvers['userPersonalizations'];

export const resolver: Resolver = async (_, { types, values, user_ids }) => {
  return UserPersonalization.eagerQuery().modify((qb) => {
    types.length && qb.whereIn('type', types);
    values.length && qb.whereIn('value', values);
    user_ids.length && qb.whereIn('user_id', user_ids);
  });
};
