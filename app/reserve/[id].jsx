import { useState } from "react";
import { View, ScrollView, Text, Button, Pressable, Platform } from "react-native";
import Title from "../../components/layouts/Title";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAuth } from './../../providers/AuthProviders';
import TextInput from "../../components/inputs/TextInput";
import CustomButton from "../../components/buttons/CustomButton";
import * as Yup from 'yup';
import { useToast } from "react-native-toast-notifications";
import DateTimePicker from '@react-native-community/datetimepicker';
import ReservationService from "../../services/Reservation.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreateReservation = () => {
    const { id } = useLocalSearchParams();
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [dateStart, setDateStart] = useState(new Date().toLocaleDateString());
    const [timeStart, setTimeStart] = useState(new Date().toLocaleTimeString({}, {hour: '2-digit', minute:'2-digit'}));
    const [timeEnd, setTimeEnd] = useState(new Date().toLocaleTimeString({}, {hour: '2-digit', minute:'2-digit'}));
    const [errors, setErrors] = useState(undefined);
    const [show, setShowStart] = useState(false);
    const [showTimeStart, setShowTimeStart] = useState(false);
    const [showTimeEnd, setShowTimeEnd] = useState(false);
    const { profile } = useAuth();
    const toast = useToast();
    const router = useRouter();
    const positiveButton = {label: 'OK', textColor: '#333333'};
    const negativeButton = {label: 'Annuler', textColor: '#333333'};

    const ReservationSchema = Yup.object().shape({
        dateStart: Yup.string().required('L\'heure de début est requise.'),
        dateEnd: Yup.string().required('L\'heure de fin est requise.')
    });

    const formatDate = (date, time) => {
        let dateArray = date.split("/");
        let timeArray = time.split(":");
        let dateFormatted = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}T${timeArray[0]}:${timeArray[1]}:00`;
        let options = { timeZone: 'Europe/Paris' };
        let newDate = new Date(dateFormatted).toLocaleString('fr-FR', options).replace(',', '').replaceAll('/', '-');
        return newDate;
    }

    function showToast(message) {
        toast.show(message, {
            type: 'success'
        });
    }

    const addReservation = async () => {
        await ReservationSchema.validate({
            dateStart: formatDate(dateStart, timeStart),
            dateEnd: formatDate(dateStart, timeEnd)
        }).then(async (res) => {
            AsyncStorage.getItem('@roomly_token')
            .then(async (token) => {
                // api call
                const response = await ReservationService.add(token, profile.user.id, id, formatDate(dateStart, timeStart), formatDate(dateStart, timeEnd));
                if(response) {
                    showToast(response.message);
                    router.push('/reservations');
                }
            });
        });
        setErrors(undefined);
    }

    const onChangeStart = ({type}, selectedDate) => {
        if(type === "set") {
            const currentDate = selectedDate;
            setDate(currentDate);
            if(Platform.OS === 'android') {
                setShowStart(false);
                setDateStart(currentDate.toLocaleDateString());
            }
        } else {
            setShowStart(false);
        }
    };

    const onChangeTimeStart = ({type}, selectedTime) => {
        if(type === "set") {
            const currentTime = selectedTime;
            setTime(currentTime);
            if(Platform.OS === 'android') {
                setShowTimeStart(false);
                setTimeStart(currentTime.toLocaleTimeString({}, {hour: '2-digit', minute:'2-digit'}));
            }
        } else {
            setShowTimeStart(false);
        }
    };

    const onChangeTimeEnd = ({type}, selectedTime) => {
        if(type === "set") {
            const currentTime = selectedTime;
            setTime(currentTime);
            if(Platform.OS === 'android') {
                setShowTimeEnd(false);
                setTimeEnd(currentTime.toLocaleTimeString({}, {hour: '2-digit', minute:'2-digit'}));
            }
        } else {
            setShowTimeEnd(false);
        }
    };

	return <>
        <Title back title={`Réserver maintenant`}/>
        <ScrollView className="h-full bg-white">
            <View className="p-4 flex-col gap-y-2 !m-0">
                {
                    errors && errors.length > 0 && errors.map((error, index) => {
                        return <Text key={index} className="bg-red-100 text-red-500 text-base font-ralewaylight py-2 px-4 rounded-lg">{error}</Text>
                    })
                }
                    <View className="!mb-2">
                        <Text className="text-xs font-ralewaybold text-textlighter uppercase mb-2">Date de la réservation</Text>
                        <Pressable onPress={() => setShowStart(true)}>
                            <TextInput 
                                placeholder="Date de la réservation"
                                value={dateStart}
                                editable={false}
                                onChangeText={setDateStart}
                                onPressIn={() => setShowStart(true)}
                            />
                        </Pressable>
                        <Text className="text-sm font-ralewayregular text-textlighter mt-2">Le choix d'une date inférieure est impossible.</Text>
                    </View>
                    {
                        show && (
                            <DateTimePicker
                                mode="date"
                                display="calendar"
                                value={date}
                                onChange={onChangeStart}
                                minimumDate={new Date()}
                                positiveButton={positiveButton}
                                negativeButton={negativeButton}
                            />
                        )
                    }

                    <View className="!mb-4">
                        <Text className="text-xs font-ralewaybold text-textlighter uppercase mb-2">Horaire de début</Text>
                        <Pressable onPress={() => setShowTimeStart(true)}>
                            <TextInput 
                                placeholder="Horaire de début"
                                value={timeStart}
                                editable={false}
                                onChangeText={setTimeStart}
                                onPressIn={() => setShowTimeStart(true)}
                            />
                        </Pressable>
                        <Text className="text-sm font-ralewayregular text-textlighter mt-2">Les créneaux horaires disponibles sont toutes les 30 minutes.</Text>
                    </View>
                    {
                        showTimeStart && (
                            <DateTimePicker
                                mode="time"
                                display="clock"
                                value={time}
                                onChange={onChangeTimeStart}
                                minimumDate={new Date()}
                                is24Hour={true}
                                minuteInterval={30}
                                positiveButton={positiveButton}
                                negativeButton={negativeButton}
                            />
                        )
                    }

                    <View className="!mb-4">
                        <Text className="text-xs font-ralewaybold text-textlighter uppercase mb-2">Horaire de fin</Text>
                        <Pressable onPress={() => setShowTimeEnd(true)}>
                            <TextInput 
                                placeholder="Horaire de fin"
                                value={timeEnd}
                                editable={false}
                                onChangeText={setTimeEnd}
                                onPressIn={() => setShowTimeEnd(true)}
                            />
                        </Pressable>
                        <Text className="text-sm font-ralewayregular text-textlighter mt-2">Les créneaux horaires disponibles sont toutes les 30 minutes.</Text>
                    </View>
                    {
                        showTimeEnd && (
                            <DateTimePicker
                                mode="time"
                                display="clock"
                                value={time}
                                onChange={onChangeTimeEnd}
                                minimumDate={new Date()}
                                is24Hour={true}
                                minuteInterval={30}
                                positiveButton={positiveButton}
                                negativeButton={negativeButton}
                            />
                        )
                    }
                    <CustomButton color="primary" onPress={addReservation}>Confirmer la réservation</CustomButton>
            </View>
        </ScrollView>
    </>;
};

export default CreateReservation;
