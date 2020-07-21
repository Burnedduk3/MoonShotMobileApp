export const queryConstants = {
  loginUsernamePassword: `
query auth($username: String!, $password: String!) {
  auth {
    login {
      loginWithUsernameAndPassword(
        data: { username: $username, password: $password }
      ) {
        error
        data {
          accessToken
          refreshToken
        }
        message
        user {
          id
          userID
          username
          role{
            name
          }
        }
      }
    }
  }
}

`,
};

export const TextConstants = {
  buttons: {
    loginButton: 'Entrar',
    backHome: 'Atras',
    forgotPassword: 'Olvide mi contraseña',
  },
  inputs: {
    inputUser: {
      placeholder: 'Usuario',
    },
    inputPassword: {
      placeholder: 'Contraseña',
    },
  },
  modal: {
    text: 'Credenciales Incorrectas',
    button: 'Listo!',
  },
  wrongUser: {
    text: 'Su rol no es el adecuado',
    button: 'Listo!',
  },
};
