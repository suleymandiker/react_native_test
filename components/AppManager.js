import React, { Component } from 'react';
import {SafeAreaView, Text, View, FlatList} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppStatusBar from "./statusBar";
import { getDecks,saveDeck, getInitialData,ResetDecks,setReminder } from '../utils/api'
import { styles } from '../utils/styles'
import { receiveDecks } from '../actions'
import { connect } from 'react-redux'

const Tab = createBottomTabNavigator();

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item1',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];

const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);


function Feed() {
    const renderItem = ({ item }) => (
        <Item title={item.title} />
    );
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <AppStatusBar backgroundColor="dimgray" barStyle="light-content" />
            <Text>Feed!</Text>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>My Decksssss</Text>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />

            </SafeAreaView>
        </View>
    );
}

function Profile() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Profile!</Text>
        </View>
    );
}

function Notifications() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Notifications!</Text>
        </View>
    );
}


function MayTabs() {
    return (
      <Tab.Navigator
          initialRouteName="Home"
          activeColor="#f0edf6"
          inactiveColor="#3e2465"
          barStyle={{ backgroundColor: "maroon" }}
      >

<Tab.Screen name={"Feed"} component={Feed} options={{
    tabBarLabel: "Home",
    tabBarIcon: ({color,size}) => (
        <MaterialCommunityIcons name={"home"} color={color} size={size} />
    ),
}} />
          <Tab.Screen name={"Notifications"} component={Notifications} options={{
              tabBarLabel: "Updates",
              tabBarIcon: ({color,size}) => (
                  <MaterialCommunityIcons name={"bell"} color={color} size={size} />
              ),
          }} />

          <Tab.Screen name={"Profile"} component={Profile} options={{
              tabBarLabel: "Profile",
              tabBarIcon: ({color,size}) => (
                  <MaterialCommunityIcons name={"account"} color={color} size={size} />
              ),
          }} />







      </Tab.Navigator>
    )
}


class AppManager extends Component {

    componentDidMount() {
        //ResetDecks()
        setReminder()
        getDecks().then((results) => {
            this.props.dispatch(receiveDecks(results))
            if (!results) {
                saveDeck(getInitialData());
                getDecks().then((decks) => console.log(decks));
            }
        })

    }

    render() {
        return (
            <NavigationContainer>
                <MayTabs />
            </NavigationContainer>
        );
    }

}


function mapStateToProps(decks) {
    return {
        decks: Object.keys(decks).map((deck) => decks[deck] )
    }
}

export default connect(mapStateToProps)(AppManager)
