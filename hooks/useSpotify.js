import {signIn, useSession} from 'next-auth/react';
import { useEffect } from 'react';
import { spotifyApi } from '../libs/spotify';

function useSpotify() {
  const { data: session } = useSession();

  useEffect(() => {
    if(session){
      if(session.error === "RefreshAccessTokenError"){
        signIn();
      }

      spotifyApi.setAccessToken(session.user.accessToken);
    }
  }, [session])

  return session;
}

export default useSpotify;