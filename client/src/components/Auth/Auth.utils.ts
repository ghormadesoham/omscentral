import { User } from 'firebase/auth';
import { UserInputType, UserPersonalizationInputType } from 'src/graphql';

export const toInput = (user: User): UserInputType => {
  const [providerData] = user.providerData;

  const email = user.email || providerData!.email || null;

  const name =
    user.displayName ||
    providerData!.displayName ||
    (email && email.split('@').shift()) ||
    null;

  const photo_url = user.photoURL || providerData!.photoURL || null;

  return {
    id: user.uid,
    auth_provider: providerData!.providerId,
    email,
    name,
    photo_url,
    last_signed_in: new Date().getTime(),
  };
};
export const toUserPersonalizationInput = (
  user: User,
): UserPersonalizationInputType => {
  return {
    id: user.uid, // reuse user id
    type: 'email_frequency',
    value: 'daily',
    user_id: user.uid,
  };
};
