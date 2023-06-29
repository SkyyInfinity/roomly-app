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
    const [dateStart, setDateStart] = useState(new Date().toLocaleDateString());
    const [dateEnd, setDateEnd] = useState(new Date().toLocaleDateString());
    const [errors, setErrors] = useState(undefined);
    const [show, setShowStart] = useState(false);
    const { profile } = useAuth();
    const toast = useToast();

    const ReservationSchema = Yup.object().shape({
        dateStart: Yup.date().required('La date de début est requise.'),
        dateEnd: Yup.date().required('La date de fin est requise.')
    });

    const formatDate = (date) => {
        const realDate = new Date(date);
        return realDate.getTime();
    }

    const addReservation = async () => {
        await ReservationSchema.validate({
            dateStart: formatDate(dateStart),
            dateEnd: formatDate(dateEnd)
        }).then((res) => {
            // api call
            console.log(res);
        }).catch((err) => {
            setErrors(err.errors);
        });
        console.log("addReservation");
        console.log({
            userId: profile.user.id,
            userId: id,
            dateStart: formatDate(dateStart),
            dateEnd: formatDate(dateEnd)
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

	return <>
        <Title back title={`Réserver ${id}`}/>
        <ScrollView className="h-full bg-white">
            <View className="p-4 flex-col">
                <Text className="">Créer une réservation</Text>
            </View>
            <View className="p-4 flex-col gap-y-2 !m-0">
                {
                    errors && errors.length > 0 && errors.map((error, index) => {
                        return <Text key={index} className="bg-red-100 text-red-500 text-base font-ralewaylight py-2 px-4 rounded-lg">{error}</Text>
                    })
                }
                    <Pressable onPress={() => setShowStart(true)}>
                        <TextInput 
                            placeholder="Date de début"
                            value={dateStart}
                            editable={false}
                            onChangeText={setDateStart}
                            onPressIn={() => setShowStart(true)}
                        />
                    </Pressable>
                    {
                        show && (
                            <DateTimePicker
                                mode="date"
                                display="spinner"
                                value={date}
                                onChange={onChangeStart}
                                minimumDate={new Date()}
                            />
                        )
                    }
                    <CustomButton color="primary" onPress={addReservation}>Confirmer la réservation</CustomButton>
            </View>
        </ScrollView>
    </>;
};

export default CreateReservation;
