import { View, Text } from "react-native";
import CustomButton from "../buttons/CustomButton";
import DeleteIcon from "../../assets/images/icons/delete-18-regular.svg";
import Animated, { SlideInRight } from "react-native-reanimated";
import { Alert } from "react-native";

const ReservationCard = ({reservation, index}) => {
    let start_at = new Date(reservation.start_at);

    const handleDelete = async (id) => {
        Alert.alert('Supprimer la réservation', `Voulez-vous vraiment supprimer la réservation pour "${reservation.room.name}" ?`, 
            [
                { text: 'Oui', onPress: () => deleteReservation(id), style: 'default' },
                { text: 'Annuler', style: 'cancel' }
            ], 
            { cancelable: true }
        );
    }

    const deleteReservation = async (id) => {
        console.log(`Deleting reservation ${id}`);
    }

	return (
        <Animated.View entering={SlideInRight.delay(index * 100)} className="border border-slate-200 rounded-xl overflow-hidden mb-4 relative p-4 flex flex-row items-center flex-1">
            <View className="flex-1">
                <Text className="text-sm font-ralewayregular py-1 px-3 bg-green-100 text-green-500 rounded-full w-[150px] text-center mb-2">{reservation.status ? reservation.status : 'Aucun status'}</Text>
                <Text className="text-lg mb-2 font-ralewayextrabold">{reservation.room.name ? reservation.room.name : 'Salle inconnu'}</Text>
                <Text className="text-base font-ralewaylight text-textlighter">
                    {`Le ${start_at.toLocaleDateString()} de ${start_at.toLocaleTimeString(undefined, {
                        hour: '2-digit',
                        minute: '2-digit',
                    }).replace(':', 'h')} à ${new Date(reservation.end_at).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }).replace(':', 'h')}`}
                </Text>
            </View>
            <View className="ml-4">
                <CustomButton className="w-[48px] h-[48px] flex items-center justify-center !p-0 !rounded-full" onPress={() => handleDelete(reservation.id)} isIcon color="error">
                    <DeleteIcon width={18} height={18} />  
                </CustomButton>
            </View>
        </Animated.View>
    );
};

export default ReservationCard;
