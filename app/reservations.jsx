import { ScrollView, View, Text } from "react-native";
import Title from "../components/Title";

const Reservations = () => {
	return <>
        <Title title="Réservations"/>
        <ScrollView className="h-full">
            <View>
                <Text>reservations</Text>
            </View>
        </ScrollView>
    </>;
};

export default Reservations;
