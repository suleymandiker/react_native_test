import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList,SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { getDecks,saveDeck, getInitialData,ResetDecks,setReminder } from '../utils/api'
import Card from '../shared/card'
import { Feather } from "@expo/vector-icons";
import { styles } from '../utils/styles'

class Decklist extends Component {

    render() {
        return (
            <SafeAreaView>
                <Text>Selam</Text>
            </SafeAreaView>

        );
    }

}


function mapStateToProps(decks) {
    return {
        decks: Object.keys(decks).map((deck) => decks[deck] )
    }
}

export default connect(mapStateToProps)(Decklist)
