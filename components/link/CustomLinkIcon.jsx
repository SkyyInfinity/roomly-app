import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import ArrowRightIcon from '../../assets/images/icons/arrow-right-24-regular.svg';

const CustomLinkIcon = ({to, label, ...otherProps}) => {

	return (
		<Link asChild href={to} {...otherProps}>
            <Pressable>
                <View className="flex-row items-center justify-between">
                    <View className="flex-1 items-start">
                        <Text className="!m-0 font-ralewaymedium text-base leading-4">{label}</Text>
                    </View>
                    <View className="w-[64px] items-end">
                        <ArrowRightIcon width={18} height={18} />
                    </View>
                </View>
            </Pressable>
        </Link>
	);
};

export default CustomLinkIcon;
