import { gql, useQuery } from '@apollo/client';
import { Layout, Spinner, Text } from '@ui-kitten/components';
import React, { useContext, useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TokenContext } from '../../Contexts/TokenContext';
import { UserContext } from '../../Contexts/UserContext';
import { QueryText } from '../../views/Me/TextConstants';
import userImage from './../../assets/images/userImage.jpg';

export const UserInfo = () => {
  const { tokens } = useContext(TokenContext);
  const { user, setUser } = useContext(UserContext);
  let render;
  try {
    const { loading, error, data } = useQuery(
      gql`
        ${QueryText}
      `,
      {
        fetchPolicy: 'network-only',
        context: {
          headers: {
            authorization: `Bearer ${tokens.accessToken}`,
          },
        },
      },
    );
    useEffect(() => {
      if (!loading && data) {
      }
    }, [loading]);

    render = loading ? (
      <Layout style={styles.container}>
        <Spinner size="giant" />
      </Layout>
    ) : (
      <Layout style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.headerImage} source={userImage} />
        </View>
        <View style={styles.infoContainer}>
          <Text category="h2" style={styles.title}>
            {user.name}
          </Text>
          <View style={styles.specifiedInfo}>
            <Text category="p1" style={styles.boxTitle}>
              Datos Personales:
            </Text>
            <View style={styles.textContainer}>
              <Text category="p1" style={styles.header}>
                Documento:
              </Text>
              <Text category="p2" style={styles.text}>
                {user.userID}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text category="p1" style={styles.header}>
                Correo:
              </Text>
              <Text category="p2" style={styles.text}>
                {user.email}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text category="p1" style={styles.header}>
                Telefono:
              </Text>
              <Text category="p2" style={styles.text}>
                {user.phone}
              </Text>
            </View>
          </View>
        </View>
      </Layout>
    );
  } catch (e) {
    render = (
      <Layout style={styles.container}>
        <Text category="h2">Algo Salio Mal</Text>
      </Layout>
    );
  }
  return render;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '80%',
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    flex: 1,
    width: null,
    height: null,
    borderRadius: 500,
    resizeMode: 'contain',
  },
  imageContainer: {
    height: 200,
    width: 200,
    borderRadius: 500,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoContainer: {
    width: '100%',
    alignItems: 'center',
  },
  specifiedInfo: {
    backgroundColor: '#ffffff',
    width: '80%',
    padding: '5%',
    borderRadius: 15,
    borderColor: '#adc8e8',
    borderWidth: 2,
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    color: '#EA3F6A',
  },
  boxTitle: {
    color: '#EA3F6A',
    marginBottom: 10,
    fontSize: 18,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'space-around',
    marginTop: 5,
  },
  text: {
    marginLeft: 10,
  },
  header: {
    color: '#adc8e8',
  },
});
