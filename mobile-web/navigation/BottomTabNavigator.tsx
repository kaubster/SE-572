import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import LoginScreen from '../screens/LoginScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList, LoginParamList } from '../types';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native';
import { ScaleFromCenterAndroid } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName='Login'
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      
      {/* <BottomTab.Screen
        name='Home'
        component={HomeScreen}
        options={{ title: "Welcome" }}
      /> */}

      <BottomTab.Screen
        name='Demo'
        component={LoginNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='ios-code' color={color} />
          ),
        }}
      />

      {/* <BottomTab.Screen
        name='Manage'
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='ios-code' color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name='Browse'
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='ios-code' color={color} />
          ),
        }}
      /> */}
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const HomeScreen = ({ navigation }) => {

  return (
    <Button
      title="Go to Jane's profile"
      onPress={() => navigation.navigate("Login", { name: "Jane" })}
    />
  );
};

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const LoginStack = createStackNavigator<LoginParamList>();

const LoginNavigator = ({ navigation }) => {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name='LoginScreen'
        component={LoginScreen}
        options={{ headerTitle: "Film DB App" }}
      />
    </LoginStack.Navigator>
  );
};

const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        // children={() => <TabOneScreen jwtToken={propValue} />}
        options={{ headerTitle: 'Add/Modify Films' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Browse Films Database' }}
      />
    </TabTwoStack.Navigator>
  );
}
