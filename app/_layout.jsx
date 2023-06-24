import { Slot } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from "react-native";
import FocusedStatusBar from "../components/FocusedStatusBar";
import { useFonts } from 'expo-font';
import { Provider } from "../context/Auth";
import { usePathname } from "expo-router";

const GlobalLayout = () => {
    const pathname = usePathname();
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
    
    if(pathname === '/login' || pathname === '/register') {
        return (
            <Provider>
                <SafeAreaView className="flex-1">
                    {/* Status bar */}
                    <FocusedStatusBar backgroundColor="#fff"/>
                    {/* Screens */}
                    <Slot/>
                </SafeAreaView>
            </Provider>
        );
    }

	return (
        <Provider>
            <SafeAreaView className="flex-1">
                {/* Status bar */}
                <FocusedStatusBar backgroundColor="#fff"/>
                {/* Screens */}
                <Slot/>
                {/* Footer */}
                <Text className='
                    p-4 
                    bg-white
                    dark:bg-black
                    border-t
                    border-slate-200 
                    dark:border-gray-900
                    flex 
                    flex-row gap-2 
                    text-black
                    dark:text-white
                    text-center
                    font-ralewaylight
                    text-lg
                '>&copy;{new Date().getFullYear()} Roomly.</Text>
            </SafeAreaView>
        </Provider>
	);
};

export default GlobalLayout;
