import { useEffect, useState, useCallback } from "react";
import { ScrollView, View, Text, RefreshControl } from "react-native";
import Title from "../components/layouts/Title";
import CustomButton from "../components/buttons/CustomButton";
import ReservationService from "../services/Reservation.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReservationCard from "../components/reservations/ReservationCard";
import { useAuth } from "../providers/AuthProviders";

const Reservations = () => {
    const [isLoading, setLoading] = useState(true);
    const [reservations, setReservations] = useState([]);
    const [pastReservations, setPastReservations] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [mode, setMode] = useState('upcoming');
    const { profile } = useAuth();

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        setLoading(true);
        await AsyncStorage.getItem('@roomly_token')
        .then(async (token) => {
            if (token !== null) {
                const response = await ReservationService.getAll(token, profile.user.id);
                
                if(response && !response.message) {
                    // filter response to get only past reservations
                    const filteredPastReservations = response.filter(reservation => {
                        let today = new Date();
                        let reservationStartDate = new Date(reservation.start_at);
                        if(reservationStartDate.getTime() < today.getTime()) return reservation;
                    });
                    // filter response to get only upcoming status reservations
                    const filteredReservations = response.filter(reservation => {
                        let today = new Date();
                        let reservationEndDate = new Date(reservation.end_at);
                        if(reservationEndDate.getTime() > today.getTime()) return reservation;
                    });
                    setPastReservations(filteredPastReservations);
                    setReservations(filteredReservations);
                } else {
                    setReservations([]);
                    setPastReservations([]);
                }
            }
            setLoading(false);
        });
        ReservationService.getAll();
    }

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        fetchReservations();
        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
    }, []);

	return <>
        <Title title="Réservations"/>
        <ScrollView
            stickyHeaderIndices={[0]} 
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            className="h-full bg-white"
        >
            <View className="flex-row p-4 bg-white !m-0">
                <CustomButton className={`flex-[0.5] !mr-4 ${mode === "upcoming" ? null : '!bg-transparent'}`} color="primary" onPress={() => setMode('upcoming')}>
                    À venir
                </CustomButton>
                <CustomButton className={`flex-[0.5] ${mode === "past" ? null : '!bg-transparent'}`} color="primary" onPress={() => setMode('past')}>
                    Terminé
                </CustomButton>
            </View>
            {
                mode === "upcoming" ? (
                    <View className="p-4 flex-col">
                        {
                            isLoading ? (
                                <Text className="py-3 px-6 text-center text-textlighter font-ralewayregular">Chargement...</Text>
                            ) : reservations.length === 0 ? (
                                <Text className="py-3 px-6 text-center text-textlighter font-ralewayregular">Aucune réservation trouvée</Text>
                            ) : (
                                reservations.map((reservation, index) => {

                                    return (
                                        <ReservationCard key={index} reservation={reservation} index={index} />
                                    )
                                })
                            )
                        }
                    </View>
                ) : (
                    <View className="p-4 flex-col">
                        {
                            isLoading ? (
                                <Text className="py-3 px-6 text-center text-textlighter font-ralewayregular">Chargement...</Text>
                            ) : pastReservations.length === 0 ? (
                                <Text className="py-3 px-6 text-center text-textlighter font-ralewayregular">Aucune réservation trouvée</Text>
                            ) : (
                                pastReservations.map((reservation, index) => {

                                    return (
                                        <ReservationCard key={index} reservation={reservation} index={index} />
                                    )
                                })
                            )
                        }
                    </View>
                )
            }
        </ScrollView>
    </>;
};

export default Reservations;
