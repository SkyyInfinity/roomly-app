import { Slot } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusedStatusBar from "../components/FocusedStatusBar";
import { useFonts } from 'expo-font';
import { useSegments } from "expo-router";
import TabBar from "../components/layouts/TabBar";
import AuthProvider from "../providers/AuthProviders";
import { ToastProvider } from 'react-native-toast-notifications'
import CustomToast from "../components/CustomToast";
// import messaging from '@react-native-firebase/messaging';
// import { useEffect } from "react";
// import { Alert } from "react-native";

// Register background handler
// Get the notification
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//     // Extract the body
//     let message_body = remoteMessage.notification.body;
//     // Extract the title
//     let message_title = remoteMessage.notification.title;
//     // Extract the notification image 
//     let avatar = remoteMessage.notification.android.imageUrl;

//     // Add the notification to the messages array
//     setMessages(messages => GiftedChat.append(messages, {
//         _id: Math.round(Math.random() * 1000000),
//         text: message_body,
//         createdAt: new Date(),
//         user: {
//             _id: 2,
//             name: "PartyB",
//             avatar: avatar,
//         },
//     }));

//     // Send a notification alert
//     Alert.alert(message_title, message_body);
// });

const GlobalLayout = () => {
    const segments = useSegments();
    const [fontsLoaded] = useFonts({
        'Raleway_300Light': require('../assets/fonts/Raleway-Light.ttf'),
        'Raleway_400Regular': require('../assets/fonts/Raleway-Regular.ttf'),
        'Raleway_500Medium': require('../assets/fonts/Raleway-Medium.ttf'),
        'Raleway_700Bold': require('../assets/fonts/Raleway-Bold.ttf'),
        'Raleway_800ExtraBold': require('../assets/fonts/Raleway-ExtraBold.ttf'),
    });

    // useEffect(() => {
    //     // Get the notification message
    //     const subscribe = messaging().onMessage(async remoteMessage => {
    //         // Get the message body
    //         let message_body = remoteMessage.notification.body;
    //         // Get the message title
    //         let message_title = remoteMessage.notification.title;
    //         // Get message image
    //         let avatar = remoteMessage.notification.android.imageUrl;

    //         // Append the message to the current messages state
    //         setMessages(messages => GiftedChat.append(messages, {
    //             _id: Math.round(Math.random() * 1000000),
    //             text: message_body,
    //             createdAt: new Date(),
    //             user: {
    //                 _id: 2,
    //                 name: "PartyB",
    //                 avatar: avatar,
    //             },
    //         }));

    //         // Show an alert to the user
    //         Alert.alert(message_title, message_body);
    //     });

    //     return subscribe;
    // }, [messaging]);

    if(!fontsLoaded) {
        return null;
    }

	return (
        <AuthProvider>
            <ToastProvider 
                placement="bottom"
                duration={6000}
                offset={32}
                swipeEnabled={true}
                renderToast={CustomToast}
            >
                <SafeAreaView className="flex-1">
                    {
                        segments[0] === '(auth)' ? (
                            <>
                                {/* Status bar */}
                                <FocusedStatusBar backgroundColor="#61E8E1"/>
                                {/* Screens */}
                                <Slot/>
                            </>
                        ) : (
                            <>
                                {/* Status bar */}
                                <FocusedStatusBar backgroundColor="#fff"/>
                                {/* Screens */}
                                <Slot/>
                                {/* Footer */}
                                <TabBar/>
                            </>
                        )
                    }
                </SafeAreaView>
            </ToastProvider>
        </AuthProvider>
	);
};

export default GlobalLayout;
