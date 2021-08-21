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
