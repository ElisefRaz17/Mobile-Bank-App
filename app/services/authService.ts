import { fetchAuthSession } from 'aws-amplify/auth';

export const getAccessToken = async (): Promise<string | null> => {
  try {
    const session = await fetchAuthSession();
    // Return the idToken or accessToken JWT
    return session.tokens?.accessToken?.toString() ?? null;
  } catch (err) {
    console.error('Error fetching user session', err);
    return null;
  }
};