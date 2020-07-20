export const QueryConstants = {
  refreshTokenQuery: `
    query refreshToken($refreshToken: String!) {
      refreshToken(data: { refreshToken: $refreshToken }) {
        error
        data {
          accessToken
          refreshToken
        }
        message
      }
    }
  `,
};
