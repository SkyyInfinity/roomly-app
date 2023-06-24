import { useEffect, useState, useCallback } from "react";
import Title from "../components/Title";
import { ScrollView, View, Text, RefreshControl } from "react-native";
import CustomButton from "../components/buttons/CustomButton";
import TextInput from "../components/inputs/TextInput";
import RoomService from "../services/Room.service";
import RoomCard from "../components/rooms/RoomCard";
import StorageService from '../services/Storage.service';
import SearchIcon from '../assets/images/icons/fluent-search-24-regular.svg';

const Home = () => {
    const [search, setSearch] = useState('');
    const [rooms, setRooms] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [token, setToken] = useState(undefined);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        getRooms();
    }, []);

    const getRooms = async () => {
        await RoomService.getAll()
        .then((response) => {
            setRooms(response);
        })
        .catch((error) => console.log('c\'est une erreur', error))
        .finally(() => setLoading(false));
    }

    const handleSearch = () => {
        //FIXME: Search is not working
        // if (rooms.length > 0) {
        //     const filteredRooms = rooms.filter((room) => room.name.toLowerCase().includes(search.toLowerCase()));
        //     setRooms(filteredRooms);
        // }
        // else {
        //     getRooms();
        // }
    };

    const onRefresh = useCallback(() => {
        setRooms([]);
        setLoading(true);
        setRefreshing(true);
        getRooms();
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
            <Text>{token}</Text>
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
                    isLoading ? <Text className="py-3 px-6 text-center text-textlighter font-ralewayregular">Chargement...</Text> : rooms.length === 0 ? (
                        <Text className="py-3 px-6 text-center text-textlighter font-ralewayregular">Aucune salle trouvée</Text>
                    ) : (
                        rooms.map((room, index) => (
                            <RoomCard key={index} room={room}/>
                        ))
                    )
                }
            </View>
            <View className="px-4 mt-4">
                <CustomButton to="/settings" color="secondary">Paramètres</CustomButton>
            </View>
        </ScrollView>
	</>;
};

export default Home;
