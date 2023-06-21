import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { AntDesign } from '@expo/vector-icons'; 

// <Title back title="Paramètres"/>

const Title = ({title, back}) => {
    const router = useRouter();
    const classes = {
        container: back ? "px-4 py-8 bg-white dark:bg-black flex flex-row gap-4 border-b border-slate-100 dark:border-slate-900" : "px-4 py-8 bg-white dark:bg-black border-b border-slate-100 dark:border-slate-900",
        text: "text-4xl text-black dark:text-white font-ralewayextrabold"
    }

    if(back) {
        return (
            <View className={classes.container}>
                <Text className={classes.text} onPress={() => {
                    router.back();
                }}>
                    <AntDesign name="arrowleft" size={36} color="black" />
                </Text>
                <Text className={classes.text}>
                    {title}
                </Text>
            </View>
        );
    }
	return (
		<View className={classes.container}>
			<Text className={classes.text}>
                {title}
            </Text>
		</View>
	);
};

export default Title;
