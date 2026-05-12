import { fetchUserAttributes } from "aws-amplify/auth";

export const getUserId = async () => {
  try {
    const attributes = await fetchUserAttributes();
    // The 'sub' is the unique identifier for the Cognito user
    return attributes.sub;
  } catch (error) {
    console.error("Error fetching user attributes:", error);
  }
};
