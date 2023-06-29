import { Slot } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusedStatusBar from "../components/FocusedStatusBar";
import { useFonts } from 'expo-font';
import { useSegments } from "expo-router";
import TabBar from "../components/layouts/TabBar";
import AuthProvider from "../providers/AuthProviders";
import { ToastProvider } from 'react-native-toast-notifications';
import CustomToast from "../components/CustomToast";
import Constants from "expo-constants";

const GlobalLayout = () => {
    const segments = useSegments();
    const [fontsLoaded] = useFonts({
        'Raleway_300Light': require('../assets/fonts/Raleway-Light.ttf'),
        'Raleway_400Regular': require('../assets/fonts/Raleway-Regular.ttf'),
        'Raleway_500Medium': require('../assets/fonts/Raleway-Medium.ttf'),
        'Raleway_700Bold': require('../assets/fonts/Raleway-Bold.ttf'),
        'Raleway_800ExtraBold': require('../assets/fonts/Raleway-ExtraBold.ttf'),
    });

    if(!fontsLoaded) {
        return null;
    }

	return (
        <AuthProvider>
            <ToastProvider 
                placement="bottom"
                duration={6000}
                offset={Constants.statusBarHeight + 32}
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
