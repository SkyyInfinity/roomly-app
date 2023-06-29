import { useState } from "react";
import { View, ScrollView, Text, Button, Pressable, Platform } from "react-native";
import Title from "../../components/layouts/Title";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from './../../providers/AuthProviders';
import TextInput from "../../components/inputs/TextInput";
import CustomButton from "../../components/buttons/CustomButton";
import * as Yup from 'yup';
import { useToast } from "react-native-toast-notifications";
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateReservation = () => {
    const { id } = useLocalSearchParams();
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [dateStart, setDateStart] = useState(new Date().toLocaleDateString());
    const [timeStart, setTimeStart] = useState(new Date().toLocaleTimeString({}, {hour: '2-digit', minute:'2-digit'}));
    const [errors, setErrors] = useState(undefined);
    const [show, setShowStart] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const { profile } = useAuth();
    const toast = useToast();

    const ReservationSchema = Yup.object().shape({
        dateStart: Yup.string().required('La date de début est requise.'),
    });

    const formatDate = (date, time) => {
        let dateArray = date.split("/");
        let timeArray = time.split(":");
        let dateFormated = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]} ${timeArray[0]}:${timeArray[1]}:00`;
        // mysql format
        let newDate = new Date(dateFormated).toISOString().slice(0, 19).replace('T', ' ');
        return newDate;
    }

    const addReservation = async () => {
        await ReservationSchema.validate({
            dateStart: formatDate(dateStart, timeStart),
        }).then((res) => {
            // api call
            // console.log(res);
        }).catch((err) => {
            setErrors(err.errors);
        });
        console.log({
            user: profile.user.id,
            room: id,
            start_at: formatDate(dateStart, timeStart),
        })
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
                setShowTime(false);
                setTimeStart(currentTime.toLocaleTimeString({}, {hour: '2-digit', minute:'2-digit'}));
            }
        } else {
            setShowTime(false);
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
                                placeholder="Date de début"
                                value={dateStart}
                                editable={false}
                                onChangeText={setDateStart}
                                onPressIn={() => setShowStart(true)}
                            />
                        </Pressable>
                    </View>
                    {
                        show && (
                            <DateTimePicker
                                mode="date"
                                display="calendar"
                                value={date}
                                onChange={onChangeStart}
                                minimumDate={new Date()}
                            />
                        )
                    }

                    <View className="!mb-4">
                        <Text className="text-xs font-ralewaybold text-textlighter uppercase mb-2">Horaire de début</Text>
                        <Pressable onPress={() => setShowTime(true)}>
                            <TextInput 
                                placeholder="Horaire de début"
                                value={timeStart}
                                editable={false}
                                onChangeText={setTimeStart}
                                onPressIn={() => setShowTime(true)}
                            />
                        </Pressable>
                    </View>
                    {
                        showTime && (
                            <DateTimePicker
                                mode="time"
                                display="clock"
                                value={time}
                                onChange={onChangeTimeStart}
                                minimumDate={new Date()}
                                is24Hour={true}
                            />
                        )
                    }
                    <CustomButton color="primary" onPress={addReservation}>Confirmer la réservation</CustomButton>
            </View>
        </ScrollView>
    </>;
};

export default CreateReservation;
