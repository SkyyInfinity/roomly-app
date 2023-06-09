import { Slot } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from "react-native";
import FocusedStatusBar from "../components/FocusedStatusBar";
import { useFonts } from 'expo-font';

const GlobalLayout = () => {
    const [fontsLoaded] = useFonts({
        'Raleway_300Light': require('../assets/fonts/Raleway-Light.ttf'),
        'Raleway_500Medium': require('../assets/fonts/Raleway-Bold.ttf'),
        'Raleway_700Bold': require('../assets/fonts/Raleway-Black.ttf'),
    });

    if(!fontsLoaded) {
        return null;
    }

	return (
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
                font-light
                text-lg
                font-customlight
            '>&copy;{new Date().getFullYear()} Roomly.</Text>
        </SafeAreaView>
	);
};

export default GlobalLayout;
