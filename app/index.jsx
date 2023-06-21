import { useState } from "react";
import Title from "../components/Title";
import { ScrollView, View, Text, TextInput } from "react-native";
import CustomButton from "../components/buttons/CustomButton";

const Home = () => {
    const [search, setSearch] = useState('');

	return <>
        <Title title="Explorer"/>
        <ScrollView className="h-full bg-white dark:bg-black">
            <View className="p-4">
                <TextInput
                    className="bg-quaternary border border-transparent font-ralewayregular text-base py-4 px-8 rounded-lg focus:border-primary focus:shadow-input"
                    onChangeText={setSearch}
                    value={search}
                    placeholder="Rechercher une salle..."
                    placeholderTextColor="#888888"
                />
            </View>
            <View className="px-4 mt-4">
                <CustomButton to="/settings" color="secondary">Paramètres</CustomButton>
            </View>
        </ScrollView>
	</>;
};

export default Home;
