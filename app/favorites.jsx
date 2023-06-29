import { ScrollView, View, Text, RefreshControl } from "react-native";
import Title from "../components/layouts/Title";
import { useEffect, useState, useCallback } from "react";
import FavoriteService from "../services/Favorite.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../providers/AuthProviders";
import RoomCard from "../components/rooms/RoomCard";

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const { profile } = useAuth();

    useEffect(() => {
        getFavorites();
    }, []);

    const getFavorites = async () => {
        setLoading(true);
        await AsyncStorage.getItem('@roomly_token')
        .then(async (token) => {
            if (token !== null) {
                const response = await FavoriteService.getAll(token, profile.user.id);
                if(response && !response.message) {
                    setFavorites(response);
                } else {
                    setFavorites([]);
                }
            }
        })
        setLoading(false);
    }

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        getFavorites();
        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
    }, []);

	return <>
         <Title title="Favoris"/>
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            className="h-full"
        >
            <View className="p-4 flex flex-col">
                {
                    isLoading ? (
                        <Text className="py-3 px-6 text-center text-textlighter font-ralewayregular">Chargement...</Text>
                    ) : favorites.length === 0 ? (
                        <Text className="py-3 px-6 text-center text-textlighter font-ralewayregular">Aucun favoris trouvé</Text>
                    ) : favorites.map((favorite, index) => {
                        return <RoomCard key={index} index={index} favorite={favorite.id} room={favorite.room} isFavorite={favorite.user.id === profile.user.id ? true : false} />
                    })
                }
            </View>
        </ScrollView>
    </>;
};

export default Favorites;