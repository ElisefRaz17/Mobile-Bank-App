// src/aws-exports.js
const AwsConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.EXPO_PUBLIC_COGNITO_USER_POOL_ID,
      userPoolClientId: process.env.EXPO_PUBLIC_COGNITO_CLIENT_ID,
      region: process.env.EXPO_PUBLIC_AWS_REGION,
    },
  },
};
export default AwsConfig;
