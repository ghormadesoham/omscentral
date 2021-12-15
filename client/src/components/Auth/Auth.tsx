import { logEvent, setUserId, setUserProperties } from 'firebase/analytics';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Nullable } from 'src/core';
import storage from 'src/core/utils/storage';
import apollo from 'src/data/apollo';
import {
  useUpsertUserMutation,
  useUpsertUserPersonalizationMutation,
} from 'src/graphql';

import { FirebaseContext } from '../Firebase';
import { toInput, toUserPersonalizationInput } from './Auth.utils';

interface State {
  initializing: boolean;
  authenticated: boolean;
  user: Nullable<User>;
}

const initialState: State = {
  initializing: true,
  authenticated: false,
  user: null,
};

export const AuthContext = createContext<State>(initialState);

const Auth: React.FC = ({ children }) => {
  const firebase = useContext(FirebaseContext);
  const [state, setState] = useState<State>(initialState);
  const [upsertUser] = useUpsertUserMutation();
  const [upsertUserPersonalization] = useUpsertUserPersonalizationMutation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebase.auth, async (authUser) => {
      apollo.resetStore();

      setState({
        initializing: false,
        authenticated: Boolean(authUser),
        user: authUser,
      });

      if (!authUser) {
        storage('session').removeItem('token');
        return;
      }

      storage('session').setItem('token', await authUser.getIdToken());

      const result = await upsertUser({
        variables: {
          user: toInput(authUser),
        },
      });

      await upsertUserPersonalization({
        variables: {
          userPersonalization: toUserPersonalizationInput(authUser),
        },
      });

      if (result.errors && result.errors.length) {
        await signOut(firebase.auth);
        return;
      }

      if (firebase.analytics != null) {
        const user = result.data!.upsertUser;
        setUserId(firebase.analytics, user.id, { global: true });
        setUserProperties(firebase.analytics, { email: user.email });
        const method = user.auth_provider;
        logEvent(firebase.analytics, 'login', { method });
        if (!user.updated) {
          logEvent(firebase.analytics, 'sign_up', { method });
        }
      }
    });

    return () => unsubscribe();
  }, [firebase, upsertUser, upsertUserPersonalization]);

  return (
    <AuthContext.Provider value={{ ...state }}>{children}</AuthContext.Provider>
  );
};

export default Auth;
