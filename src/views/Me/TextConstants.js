export const QueryText = `
query Profile{
  user{
    me{
      userID
      phone
      username
      email
      firstName
      secondName
      secondLastname
      firstLastname
      secondLastname
    }
  }
}
`;

export const RefreshToken = `
query refreshToken ($refreshToken:String!){
  refreshToken(data:{refreshToken:$refreshToken}){
    error
    data{
      accessToken
      refreshToken
    }
    message
  }
}
`;
