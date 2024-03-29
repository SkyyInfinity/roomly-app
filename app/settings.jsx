import Title from "../components/layouts/Title";
import { ScrollView, View, Text } from "react-native";
import CustomButton from '../components/buttons/CustomButton';
import { useAuth } from './../providers/AuthProviders';
import AuthService from "../services/Auth.service";
import { useToast } from "react-native-toast-notifications";
import Constants from "expo-constants"
import Logo from '../assets/images/logo-text-secondary.svg';
import ArrowRightIcon from '../assets/images/icons/arrow-right-24-regular.svg';
import { Link } from "expo-router";
import CustomLinkIcon from "../components/link/CustomLinkIcon";

const Settings = () => {
    const toast = useToast();
    const { setIsLoggedIn, setAuthPending } = useAuth();

    function showToast(message) {
        toast.show(message, {
            type: 'success'
        });
        console.log('toast', toast.type);
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
        <ScrollView className="flex-1 bg-white flex-col">
            <View className="p-12 flex-row items-center !m-0 bg-primary-light">
                <View className="flex-1 pr-6">
                    <Logo width="100%"/>
                </View>
                <View className="flex-1">
                    <Text className="font-ralewaybold text-lg !m-0 leading-5">Roomly App</Text>
                    <Text className="text-sm font-ralewaylight text-textlighter">version {Constants.manifest.version}</Text>
                </View>
            </View>
            <View className="flex-1 p-4 pt-8">
                <Text className="font-ralewayextrabold text-2xl !m-0 leading-6">Aide</Text>
                <Text className="text-base font-ralewaylight text-textlighter mt-1">Consultez nos liens d'assistance.</Text>
                <View className="p-4 border border-slate-200 rounded-lg mt-4">
                    <CustomLinkIcon className="mb-2" to={process.env.API_URL.replace('api', '')} label="Foire aux questions"/>
                    <CustomLinkIcon to={process.env.API_URL.replace('api', '')} label="Nous contacter"/>
                </View>
            </View>
            <View className="p-4 flex-col !m-0">
                <View className="mt-4">
                    <CustomButton color="secondary" onPress={handleLogout}>Se déconnecter</CustomButton>
                </View>
            </View>
        </ScrollView>
	</>;
};

export default Settings;
