import React from 'react';
import {View, Text, Button, Platform} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Icon from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home!</Text>
        </View>
    );
}

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!!</Text>
        </View>
    );
}


const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#f0edf6"
            inactiveColor="#3e2465"
            barStyle={{ backgroundColor: "maroon" }}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={ {tabBarLabel:"Home2",
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        {Platform.OS === "ios" ? (
                            <Icon
                                style={[{ color: tintColor }]}
                                size={25}
                                name={"ios-home"}
                            />
                        ) : (
                            <Icon
                                style={[{ color: tintColor }]}
                                size={25}
                                name={"md-home"}
                            />
                        )}
                    </View>
                ),
            }}/>
            <Tab.Screen name="Settings" component={SettingsScreen} options={{
                tabBarLabel:"Settings",
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        {Platform.OS === "ios" ? (
                            <Icon
                                style={[{ color: tintColor }]}
                                size={25}
                                name={"ios-add"}
                            />
                        ) : (
                            <Icon
                                style={[{ color: tintColor }]}
                                size={25}
                                name={"md-add"}
                            />
                        )}
                    </View>
                ),
            }} />
        </Tab.Navigator>
    );
}


function Home(props) {

    return (

        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>


    );

}

export default  Home;
