import { useEffect, useState, useCallback } from "react";
import Title from "../components/layouts/Title";
import { ScrollView, View, Text, RefreshControl } from "react-native";
import CustomButton from "../components/buttons/CustomButton";
import TextInput from "../components/inputs/TextInput";
import RoomService from "../services/Room.service";
import RoomCard from "../components/rooms/RoomCard";
import SearchIcon from '../assets/images/icons/fluent-search-24-regular.svg';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../providers/AuthProviders";

const Home = () => {
    const [search, setSearch] = useState('');
    const [rooms, setRooms] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const { profile } = useAuth();

    const userId = profile.user ? profile.user.id : null;

    useEffect(() => {
        getRooms(userId);
    }, []);

    const getRooms = async (user_id) => {
        setLoading(true);
        await AsyncStorage.getItem('@roomly_token')
        .then(async (token) => {
            if (token !== null) {
                const response = await RoomService.getAll(token, user_id);
                if(response) {
                    setRooms(response);
                    setLoading(false);
                }
            }
        })
    }

    const handleSearch = async (value) => {
        setLoading(true);
        await AsyncStorage.getItem('@roomly_token')
        .then(async (token) => {
            if (token !== null) {
                const response = await RoomService.getAll(token, userId);
                if(!value.length) {
                    setRooms(response);
                }
                const filteredRooms = response.filter((room) => room.name.toLowerCase().includes(search.toLowerCase()));
                if(filteredRooms.length) {
                    setRooms(filteredRooms);
                } else {
                    setRooms([]);
                }
                setLoading(false);
            }
        });
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        getRooms(userId);
        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
    }, []);

	return <>
        <Title title="Explorer"/>
        <ScrollView 
            stickyHeaderIndices={[0]} 
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            className="h-full bg-white dark:bg-black"
        >
            <View className="flex flex-row p-4 bg-white !m-0 flex-1">
                <TextInput
                    className="flex-1"
                    onChangeText={setSearch}
                    value={search}
                    placeholder="Rechercher une salle..."
                />
                <CustomButton isIcon className="flex-[0.2] !ml-2" color="primary" onPress={handleSearch}>
                    <SearchIcon width={24} height={24} />
                </CustomButton>
            </View>
            <View className="p-4 flex flex-col">
                {
                    isLoading ? (
                        <Text className="py-3 px-6 text-center text-textlighter font-ralewayregular">Chargement...</Text>
                    ) : rooms.length === 0 ? (
                        <View>
                            <Text className="py-3 px-6 text-center text-textlighter font-ralewayregular">
                                Aucune salle trouvée
                            </Text>
                            <Text onPress={() => {
                                getRooms(userId);
                                setSearch('');
                            }} className="py-3 px-6 text-center text-textlighter font-ralewayregular">
                                Cliquez ici pour rafraîchir
                            </Text>
                        </View>
                    ) : (
                        rooms.map((room, index) => {
                            
                            return (
                                <RoomCard key={index} index={index} room={room} favorite={room.favorite_id} isFavorite={ room.is_favorite ? true : false }/>
                            )
                        })
                    )
                }
            </View>
        </ScrollView>
	</>;
};

export default Home;