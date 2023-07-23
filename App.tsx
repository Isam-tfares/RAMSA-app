import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import Login from './interfaces/Login';
import Home from './interfaces/clients/Home';
import Demandes from './interfaces/clients/Demandes';
import Profile from './interfaces/clients/Profile';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Factures from './interfaces/clients/Factures';

function NotificationIcon({ count }) {
  return (
    <View style={styles.notificationContainer}>
      <Image
        style={styles.notificationIcon}
        source={require('./assets/notifications.png')}
      />
      {count > 0 && <Text style={styles.notificationCount}>{count}</Text>}
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [isLogined, setLogined] = useState(false);

  const notificationCount = 3; // Replace this with the actual notification count

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const Tab = createBottomTabNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        {isLogined ? (
          <Tab.Navigator
            tabBarOptions={{
              style: {
                backgroundColor: '#f1f1f1',
              },
              tabStyle: {
                justifyContent: 'center',
                paddingTop: 10,
              },
              labelStyle: {
                fontSize: 14,
                fontWeight: 'bold',
                marginTop: 5,
                marginBottom: 5,
              },
              activeTintColor: '#22ace2',
              inactiveTintColor: '#888',
            }}
            screenOptions={{
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
                  {/* <NotificationIcon count={notificationCount} /> */}
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
  notificationContainer: {
    position: 'relative',
  },
  notificationIcon: {
    width: 30,
    height: 30,
  },
  notificationCount: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#1c488c',
    borderRadius: 10,
    width: 20,
    height: 20,
    textAlign: 'center',
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default App;
