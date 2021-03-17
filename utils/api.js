import AsyncStorage from '@react-native-community/async-storage';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import {Alert, Linking} from 'react-native';

const REMINDER_KEY = 'MobileFlashcards:reminder'
const DECKS_STORAGE_KEY = 'MobileFlashcards'

export async function getDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((results) => {

        if (results)
        {
            return JSON.parse(results)
        }
        else
        {
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify({}))
            return ''
        }
    })
}

export async function saveDeck(deck) {
    await AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(deck));
}


export async function ResetDecks() {
    try {
        return AsyncStorage.removeItem(DECKS_STORAGE_KEY)
    } catch (error) {
        console.error('Error clearing app data.');
    }
}

export function getInitialData() {
    return {
        Space: {
            title: "Space",
            questions: [
                {
                    question: "What is the closest planet to the Sun?",
                    answer: "Mercury"
                },
                {
                    question: "Is the sun a star or a planet?",
                    answer: "Star"
                },
                {
                    question: "What planet is famous for the beautiful rings that surround it?",
                    answer:
                        "Saturn"
                }
            ]
        },
        Colors : {
            title: "Colors",
            questions: [
                {
                    question: "Which color signifies peace?",
                    answer:
                        "White"
                }
            ]
        },
    };
}

export function createDeck(deckTitle) {
    console.log('inside create')
    return {
        [deckTitle]: {
            title: deckTitle,
            questions: []
        }
    };
}

export function addQuestToDeck(title, card) {
    console.log('add quest');
    console.log(title);
    console.log(card);

    getDecks().then((decks) => {
        decks[title] = {
            ...decks[title],
            questions: [...decks[title].questions, card]

        }
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
    })
}


function createReminder() {
    return {
        title: 'Fllashcard reminder!',
        body: "Time to take up the quiz today",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}


export function setReminder() {

    AsyncStorage.getItem(REMINDER_KEY)
        .then(JSON.parse)
        .then((data) => {

            if (data === null)
            {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if( status !== 'granted')
                        {
                            Alert.alert(
                                "Access not allowed",
                                "Please go to settings and enable permissions for this device",
                                [
                                    { text: "Cancel", onPress:() => console.log('cancel') },
                                    { text: "Allow", onPress:() => Linking.openURL("app-settings:")}
                                ],
                                { cancelable : false}
                            );
                            return;
                        }
                        if (status === 'granted')
                        {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            Notifications.setNotificationHandler({
                                handleNotification: async () => ({
                                    shouldPlaySound: true,
                                    shouldShowAlert: true,
                                    shouldSetBadge: false
                                })
                            })

                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(19)
                            tomorrow.setMinutes(20)

                            Notifications.scheduleNotificationAsync({
                                content: createReminder(),
                                trigger: {
                                    hour: 19, minute: 20, repeats: true
                                }
                            })

                            AsyncStorage.setItem(REMINDER_KEY, JSON.stringify(true))
                        }
                    })
            }

        })
}


export function clearReminder() {
    return AsyncStorage.removeItem(REMINDER_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}
