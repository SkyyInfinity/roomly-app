import { ScrollView, View, Text } from "react-native";
import Title from "../components/Title";

const Favorites = () => {
	return <>
         <Title title="Favoris"/>
        <ScrollView className="h-full">
            <View>
                <Text>Favorites</Text>
            </View>
        </ScrollView>
    </>;
};

export default Favorites;