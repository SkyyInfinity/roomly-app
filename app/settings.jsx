import Title from "../components/Title";
import { ScrollView, View } from "react-native";
import CustomButton from '../components/buttons/CustomButton';
import { useAuth } from "../context/Auth";

const Settings = () => {
    const { signOut } = useAuth();

	return <>
        <Title title="Paramètres"/>
        <ScrollView className="h-full py-4 bg-white dark:bg-black">
            <View className="px-4 flex flex-col gap-y-2">
                <CustomButton color="tertiary" onPress={() => signOut()}>Se déconnecter</CustomButton>
            </View>
        </ScrollView>
	</>;
};

export default Settings;
