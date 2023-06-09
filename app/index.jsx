import Title from "../components/Title";
import { ScrollView, View, Text } from "react-native";
import CustomButton from "../components/buttons/CustomButton";

const Home = () => {

	return <>
        <Title title="Explorer"/>
        <ScrollView className="h-full py-4 bg-white dark:bg-black">
            <View className="pb-6">
                <Text className="px-4 font-custombold text-3xl text-black dark:text-white mb-4">Les salles</Text>
            </View>
            <View className="px-4 mt-4">
                <CustomButton to="/settings" color="secondary">Paramètres</CustomButton>
            </View>
        </ScrollView>
	</>;
};

export default Home;
