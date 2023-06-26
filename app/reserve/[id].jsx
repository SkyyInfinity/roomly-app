import { View, ScrollView, Text } from "react-native";
import Title from "../../components/layouts/Title";
import { useLocalSearchParams } from "expo-router";

const CreateReservation = () => {
    const { id } = useLocalSearchParams();

	return <>
        <Title back title={`Réserver ${id}`}/>
        <ScrollView className="h-full bg-white">
            <View className="p-4 flex-col">
                <Text className="">Créer une réservation</Text>
            </View>
        </ScrollView>
    </>;
};

export default CreateReservation;
