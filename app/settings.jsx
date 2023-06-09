import Title from "../components/Title";
import { ScrollView, View, Text, TextInput } from "react-native";
import CustomButton from '../components/buttons/CustomButton';
import { useState } from "react";

const Settings = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = (e) => {
        console.log(e.target);
        console.log(firstName);
        console.log(lastName);
    }

	return <>
        <Title title="Paramètres"/>
        <ScrollView className="h-full py-4 bg-white dark:bg-black">
            <View className="px-4 flex flex-col gap-y-2">
                <View className="flex flex-col gap-y-2 flex-1">
                    <Text className="text-slate-600 dark:text-slate-400">Nom</Text>
                    <TextInput 
                        className="bg-slate-100 dark:bg-slate-900 text-black dark:text-white py-2 px-4 rounded-lg m-0" 
                        value={lastName} 
                        onChange={(e) => console.log('lastName', e.target)}
                    />
                </View>
                <View className="flex flex-col gap-y-2 flex-1">
                    <Text className="text-slate-600 dark:text-slate-400">Prénom</Text>
                    <TextInput 
                        className="bg-slate-100 dark:bg-slate-900 text-black dark:text-white py-2 px-4 rounded-lg" 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </View>
                <View className="pt-4">
                    <CustomButton onPress={handleSubmit} type="submit" color="secondary">Enregister</CustomButton>
                </View>
            </View>
            <View className="px-4">
            </View>
            <Text>{firstName}</Text>
            <Text>{lastName}</Text>
        </ScrollView>
	</>;
};

export default Settings;
