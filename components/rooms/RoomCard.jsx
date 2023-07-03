import { View, Text, Image } from "react-native";
import CustomButton from "../buttons/CustomButton";
import { useState } from "react";
import HeartIcon from '../../assets/images/icons/fluent-heart-24-regular.svg';
import HeartFilledIcon from '../../assets/images/icons/favorites-24-filled.svg';
import Animated, { SlideInRight } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FavoriteService from "../../services/Favorite.service";
import { useAuth } from "../../providers/AuthProviders";
import { useToast } from "react-native-toast-notifications";
import { useRouter, usePathname } from "expo-router";

const RoomCard = ({room, index, isFavorite, favorite}) => {
    const [expanded, setExpanded] = useState(false);
    const { profile } = useAuth();
    const toast = useToast();
    const router = useRouter();
    const pathname = usePathname();

    const addFavorite = async (user_id, room_id) => {
        await AsyncStorage.getItem('@roomly_token')
        .then(async (token) => {
            if (token !== null) {
                try {
                    const response = await FavoriteService.add(token, user_id, room_id);
                    showToast('Ajouté aux favoris');
                    router.replace(pathname);

                } catch(error) {
                    toast.show(error.data.message, {
                        type: 'danger'
                    });
                }
            }
        })
    }

    const removeFavorite = async (id) => {
        await AsyncStorage.getItem('@roomly_token')
        .then(async (token) => {
            if (token !== null) {
                const response = await FavoriteService.remove(token, id);
                showToast('Retiré des favoris');
                router.replace(pathname);
            }
        })
    }

    function showToast(message) {
        toast.show(message, {
            type: 'success'
        });
    }

	return (
        <Animated.View entering={SlideInRight.delay(index * 100)} className={`border border-slate-200 rounded-xl overflow-hidden mb-4 relative ${room.is_reserved ? 'disabled pointer-events-none opacity-60' : ''}`}>
            <CustomButton 
                onPress={() => isFavorite ? removeFavorite(favorite) : addFavorite(profile.user.id, room.id)} 
                color="primary" 
                className={`absolute top-4 right-4 z-10 w-[48px] h-[48px] ${isFavorite ? 'bg-primary' : 'bg-white'} rounded-full !p-0`}
            >
                {
                    isFavorite ? <HeartFilledIcon /> : <HeartIcon />
                }
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
                {
                    room.is_reserved ? (
                        <CustomButton isCard={true} disabled color="tertiary">Cette salle est déjà reservé</CustomButton>
                    ) : (
                        <CustomButton isCard={true} to={`/reserve/${room.id}`} color="secondary">Réserver maintenant</CustomButton>
                    )
                }
            </View>
        </Animated.View>
    );
};

export default RoomCard;
