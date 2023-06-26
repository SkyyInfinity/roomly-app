import { View, Text, Image } from "react-native";
import CustomButton from "../buttons/CustomButton";
import { useState } from "react";
import HeartIcon from '../../assets/images/icons/fluent-heart-24-regular.svg';

const RoomCard = ({room}) => {
    const [expanded, setExpanded] = useState(false);

    const handleFavorite = () => {
        console.log('favorite');
    }

	return (
        <View className="border border-slate-200 rounded-xl overflow-hidden mb-4 relative">
            <CustomButton  onPress={handleFavorite} color="primary" className="absolute top-4 right-4 z-10 w-[42px] h-[42px] bg-white rounded-full !p-0">
                <HeartIcon />
            </CustomButton>
            <View className="w-full" style={{height: 200}}>
                <Image style={{width: '100%', height: '100%', objectFit: 'cover'}} source={{uri: room.image}}/>
            </View>
            <View className="p-4 flex flex-col">
                <Text className="text-lg mb-4 font-ralewayextrabold">{room.name}</Text>
                <Text 
                    onPress={() => setExpanded(!expanded)} 
                    style={{lineHeight: 22}} 
                    className={`relative text-base font-ralewaylight text-textlighter ${!expanded ? 'max-h-[88px]' : 'max-h-max' }`}
                >
                    {room.description}
                </Text>
            </View>
            <View>
                <CustomButton isCard={true} color="secondary">Réserver maintenant</CustomButton>
            </View>
        </View>
    );
};

export default RoomCard;
