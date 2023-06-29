import { TouchableOpacity, Text } from "react-native";
import { Link } from "expo-router";

const CustomButton = ({className, to, color, isCard, children, isIcon, onPress, ...otherProps}) => {

    const classes = {
        button: {
            primary: `w-full flex items-center justify-center bg-primary px-5 py-5 !m-0 ${isCard ? 'rounded-none' : 'rounded-lg'}`,
            secondary: `w-full flex items-center justify-center bg-secondary px-5 py-5 !m-0 ${isCard ? 'rounded-none' : 'rounded-lg'}`,
            tertiary: `w-full flex items-center justify-center bg-quaternary px-5 py-5 !m-0 ${isCard ? 'rounded-none' : 'rounded-lg'}`,
            error: `w-full flex items-center justify-center bg-red-100 px-5 py-5 !m-0 ${isCard ? 'rounded-none' : 'rounded-lg'}`,
            success: `w-full flex items-center justify-center bg-green-100 px-5 py-5 !m-0 ${isCard ? 'rounded-none' : 'rounded-lg'}`,
            info: `w-full flex items-center justify-center bg-blue-100 px-5 py-5 !m-0 ${isCard ? 'rounded-none' : 'rounded-lg'}`,
            warning: `w-full flex items-center justify-center bg-yellow-100 px-5 py-5 !m-0 ${isCard ? 'rounded-none' : 'rounded-lg'}`
        },
        text: {
            primary: 'text-black text-base text-center font-ralewaymedium',
            secondary: 'text-white text-base font-ralewaybold text-center font-ralewaymedium',
            tertiary: 'text-black text-base font-ralewaybold text-center font-ralewaymedium',
            error: 'text-red-500 text-base font-ralewaybold text-center font-ralewaymedium',
            success: 'text-green-500 text-base font-ralewaybold text-center font-ralewaymedium',
            info: 'text-blue-500 text-base font-ralewaybold text-center font-ralewaymedium',
            warning: 'text-yellow-500 text-base font-ralewaybold text-center font-ralewaymedium'
        }
    }

    const lineHeight = isIcon === true ? 24 : 18;
    
    if(to) {
        return (
            <TouchableOpacity {...otherProps} onPress={onPress} activeOpacity={0.7}>
                <Link className={`${classes.button[color]} ${classes.text[color]}${className ? ` ${className}` : ''}`} href={to}>{children}</Link>
            </TouchableOpacity>
        );
    }

	return (
		<TouchableOpacity {...otherProps} onPress={onPress} className={`${classes.button[color]}${className ? ` ${className}` : ''} `} activeOpacity={0.7}>
			<Text style={{lineHeight: lineHeight}} className={classes.text[color]}>{children}</Text>
		</TouchableOpacity>
	);
};

export default CustomButton;
