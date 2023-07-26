import React, { useState } from 'react';
import { Image, StyleSheet, View, } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import Login from './interfaces/Login';
import Home from './interfaces/clients/Home';
import Demandes from './interfaces/clients/Demandes';
import Profile from './interfaces/clients/Profile';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Factures from './interfaces/clients/Factures';

function App(): JSX.Element {
  const [isLogined, setLogined] = useState(false);
  const Tab = createBottomTabNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        {isLogined ? (
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: '#22ace2',
              tabBarInactiveTintColor: '#888',
              tabBarLabelStyle: {
                fontSize: 14,
                fontWeight: 'bold',
                marginTop: 5,
                marginBottom: 5,
              },
              tabBarItemStyle: {
                justifyContent: 'center',
                paddingTop: 10,
              },
              tabBarStyle: {
                display: 'flex',
              },
              headerStyle: {
                backgroundColor: 'white',
              },
              headerTintColor: '#1c488c',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerLeft: () => (
                <View style={styles.headerLeft}>
                  <Image
                    style={styles.logo}
                    source={require('./assets/ramsa-logo.png')}
                  />
                </View>
              ),
              headerRight: () => (
                <View style={styles.headerRight}>
                  <Image
                    style={styles.profileImage}
                    source={require('./assets/profile.jpg')}
                  />
                </View>
              ),
            }}
          >
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                title: 'Accueil',
                tabBarIcon: ({ size, focused, color }) => {
                  return focused ? (
                    <Image
                      style={{ width: 30, height: 30 }}
                      source={require('./assets/home.png')}
                    />
                  ) : (
                    <Image
                      style={{ width: 20, height: 20 }}
                      source={require('./assets/home-outline.png')}
                    />
                  );
                },
              }}
            />
            <Tab.Screen
              name="Demandes"
              component={Demandes}
              options={{
                title: 'Demandes',
                tabBarIcon: ({ size, focused, color }) => {
                  return focused ? (
                    <Image
                      style={{ width: 30, height: 30 }}
                      source={require('./assets/list.png')}
                    />
                  ) : (
                    <Image
                      style={{ width: 25, height: 25 }}
                      source={require('./assets/list-outline.png')}
                    />
                  );
                },
              }}
            />
            <Tab.Screen
              name="Factures"
              component={Factures}
              options={{
                title: 'Factures',
                tabBarIcon: ({ size, focused, color }) => {
                  return focused ? (
                    <Image
                      style={{ width: 25, height: 25 }}
                      source={require('./assets/factures.png')}
                    />
                  ) : (
                    <Image
                      style={{ width: 30, height: 30 }}
                      source={require('./assets/factures-outline.png')}
                    />
                  );
                },
              }}
            />
            <Tab.Screen
              name="Profile"
              options={{
                title: 'Profile',
                tabBarIcon: ({ size, focused, color }) => {
                  return focused ? (
                    <Image
                      style={{ width: 25, height: 25 }}
                      source={require('./assets/profile.png')}
                    />
                  ) : (
                    <Image
                      style={{ width: 25, height: 25 }}
                      source={require('./assets/profile-outline.png')}
                    />
                  );
                },
              }}
            >
              {() => <Profile setLogined={setLogined} />}
            </Tab.Screen>
          </Tab.Navigator>
        ) : (
          <Login isLogined={isLogined} setLogined={setLogined} />
        )}
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  headerLeft: {
    marginLeft: 10,
  },
  logo: {
    width: 55,
    height: 55,
  },
  headerRight: {
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 33,
    height: 33,
    borderRadius: 20,
    marginLeft: 10,
  },
});

export default App;
