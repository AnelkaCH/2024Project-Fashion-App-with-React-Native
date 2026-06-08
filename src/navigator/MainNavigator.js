import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';

import HomeScreen from '../screens/HomeScreen';
import AddProductScreen from '../screens/AddProductScreen';
import ShowProductScreen from '../screens/ShowProductScreen';
import ImageZoomScreen from '../screens/ImageZoomScreen';
import SplashScreen from '../screens/SplashScreen';
import EditProductScreen from '../screens/EditProductScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const DrawerNav = () => {
    return (
        <Drawer.Navigator initialRouteName='Home'>
            <Drawer.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    title: 'Daily Fashion',
                    headerStyle: {
                        backgroundColor: '#D1E5C2'
                    },
                    headerTitleAlign: 'center',
                    drawerIcon: config =>
                        <Icon
                            name="home"
                            type="antdesign"
                        />
                }}
            />
            <Drawer.Screen
                name='Add Product'
                component={AddProductScreen}
                options={{
                    title: 'Add Product',
                    headerStyle: {
                        backgroundColor: '#D1E5C2'
                    },
                    headerTitleAlign: 'center',
                    drawerIcon: config =>
                        <Icon
                            name="home"
                            type="antdesign"
                        />
                }}
            />
        </Drawer.Navigator>
    );
};

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Splash'>
                <Stack.Screen
                    name='Splash'
                    component={SplashScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name='Drawer'
                    component={DrawerNav}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name='ShowProduct'
                    component={ShowProductScreen}
                    options={{
                        title: 'Product',
                        headerStyle: {
                            backgroundColor: '#D1E5C2'},
                        headerTitleAlign: 'center',
        
                    }}
                />
                <Stack.Screen
                    name='ImageZoom'
                    component={ImageZoomScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name='EditProduct'
                    component={EditProductScreen}
                    options={{
                        title: 'Edit Product',
                        headerStyle: {
                            backgroundColor: '#D1E5C2'},
                        headerTitleAlign: 'center',
                    }}
                />

            </Stack.Navigator>
        </NavigationContainer >
    );
};
export default MainNavigator;