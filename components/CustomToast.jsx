import { View, Text } from "react-native";

const CustomToast = (toast) => {

    const classes = {
        container: {
            success: 'bg-green-100',
            danger: 'bg-red-100',
            warning: 'bg-yellow-100',
            info: 'bg-blue-100',
            default: 'bg-primary',
        },
        text: {
            success: 'text-green-500',
            danger: 'text-red-500',
            warning: 'text-yellow-500',
            info: 'text-blue-500',
            default: 'text-black'
        }
    }

	return (
        <View 
            className={`py-4 px-8 rounded-lg ${toast.type ? classes.container[toast.type] : classes.container.default}`}
        >
            <Text 
                className={`font-ralewaymedium text-sm ${toast.type ? classes.text[toast.type] : classes.text.default}`}
            >{toast.message}</Text>
        </View>
    );
};

export default CustomToast;
