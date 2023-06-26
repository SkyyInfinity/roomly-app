import Title from "../components/layouts/Title";
import { ScrollView, View, ToastAndroid } from "react-native";
import CustomButton from '../components/buttons/CustomButton';
import { useAuth } from './../providers/AuthProviders';
import AuthService from "../services/Auth.service";

const Settings = () => {
    const { setIsLoggedIn, setAuthPending } = useAuth();

    function showToast(message) {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    }

    const handleLogout = async () => {
        setAuthPending(true);
        const response = await AuthService.logout();

        console.log('logout', response);
        if(response) {
            showToast(response.message);
            setIsLoggedIn(false);
        }
        setAuthPending(false);
    }

	return <>
        <Title title="Paramètres"/>
        <ScrollView className="h-full py-4 bg-white dark:bg-black">
            <View className="px-4 flex flex-col gap-y-2">
                <CustomButton color="tertiary" onPress={handleLogout}>Se déconnecter</CustomButton>
            </View>
        </ScrollView>
	</>;
};

export default Settings;
