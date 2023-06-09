import { TouchableOpacity, Text } from "react-native";
import { Link } from "expo-router";

const CustomButton = ({to, color, type, children, onPress}) => {

    const classes = {
        button: color === 'secondary' ? "bg-gray-100 dark:bg-gray-900 px-5 py-5 rounded-lg" : "bg-primary px-5 py-5 rounded-lg",
        text: color === 'secondary' ? "text-gray-800 dark:text-white font-bold text-center" : "text-gray-800 font-bold text-center"
    }

    if(to) {
        return (
            <TouchableOpacity onPress={onPress} className={classes.button} activeOpacity={0.7}>
                <Link className={classes.text} href={to}>{children}</Link>
            </TouchableOpacity>
        );
    }

	return (
		<TouchableOpacity onPress={onPress} className={classes.button} activeOpacity={0.7}>
			<Text className={classes.text}>{children}</Text>
		</TouchableOpacity>
	);
};

export default CustomButton;
