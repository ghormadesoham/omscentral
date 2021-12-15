import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { AuthContext } from 'src/components/Auth';
import { useUserPersonalizationQuery } from 'src/graphql';

import UserPersonalization from './UserPersonalization';

const UserPersonalizationContainer: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { data } = useUserPersonalizationQuery({
    variables: {
      id: user!.uid,
    },
    fetchPolicy: 'no-cache',
  });
  // TODO: fix 500 server side error
  // This file uses same logic as used in UserProfile.container.tsx
  // however, for UserProfile.container.tsx, 500 error is not seen
  // I mean in both cases, data is undefined and loading is true
  // when the relevant code is called for first time. i.e queried data is still
  // TODO in flight.
  // However, for UserProfile case, this method is called again and
  // this time
  //  the queried data is available with loading = false
  // This is good.
  // TODO:get the same behavior  for user personalization, the first hit results in 500 error.

  return (
    <>
      <Helmet title="My Preferences">
        <meta name="description" content="User personalization settings." />
      </Helmet>
      <UserPersonalization userPersonalization={data?.userPersonalization} />
    </>
  );
};

export default UserPersonalizationContainer;
