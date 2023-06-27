import { useState } from "react";
import { Text, View } from "react-native";
import TextInput from "../../components/inputs/TextInput";
import CustomButton from "../../components/buttons/CustomButton";
import { Link } from "expo-router";
import Logo from '../../assets/images/logo-text-secondary.svg';
import * as Yup from 'yup';
import AuthService from "../../services/Auth.service";
import { useRouter } from "expo-router";
import { useAuth } from "../../providers/AuthProviders";
import { useToast } from "react-native-toast-notifications";

const Register = () => {
    const router = useRouter();
    const [lastName, setLastName] = useState(undefined);
    const [firstName, setFirstName] = useState(undefined);
    const [email, setEmail] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const [passwordConfirm, setPasswordConfirm] = useState(undefined);
    const [errors, setErrors] = useState(undefined);
    const { setAuthPending } = useAuth();
    const toast = useToast();

    function showToast(message) {
        toast.show(message, {
            type: 'success',
        });
    }

    const RegisterSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('Votre prénom est requis'),
        lastName: Yup.string()
            .required('Votre nom est requis'),
        email: Yup.string()
            .email('Votre adresse e-mail doit être un e-mail valide.')
            .required('Votre adresse e-mail est requise.'),
        password: Yup.string()
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Votre mot de passe doit contenir des majuscules, des minuscules, des chiffres et des caractères spéciaux.')   
            .min(8, 'Votre mot de passe doit contenir au moins 8 caractères.')
            .required('Votre mot de passe est requis.')
    });

    const handleRegister = async () => {
        setErrors(undefined);
        setAuthPending(true);
        await RegisterSchema.validate({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        })
        .then(async (res) => {
            if(password === passwordConfirm) {
                await AuthService.register(firstName, lastName, email, password)
                .then((response) => {
                    if(response.message) {
                        showToast('Votre compte a bien été créé.');
                        router.push('/login');
                    }
                })
                .catch((error) => {
                    if(error.data) {
                        setErrors(['Ce compte existe déjà.']);
                    }
                });
            } else {
                setErrors(['Les mots de passe ne correspondent pas.']);
            }
        })
        .catch((err) => {
            setErrors(err.errors);
        });
        setAuthPending(false);
    }

	return <>
		<View className="flex-1">
            <View className="flex-1 pb-8">
                <View className="bg-primary pt-8 flex-1 justify-center items-center !m-0">
                    <Logo width={256}/>
                </View>
                <View className="flex-col gap-y-16 px-4 !m-0">
                    <View className="flex-col gap-y-2">
                        <Text className="text-4xl font-ralewayextrabold">Bienvenue sur Roomly !</Text>
                        <Text className="text-base font-ralewaylight text-textlighter">Inscrivez-vous dès maintant pour commencer à réserver votre première salle.</Text>
                    </View>
                    <View className="flex-col gap-y-2 !m-0">
                        {
                            errors && errors.length > 0 && errors.map((error, index) => {
                                return <Text key={index} className="bg-red-100 text-red-500 text-base font-ralewaylight py-2 px-4 rounded-lg">{error}</Text>
                            })
                        }
                        <View className="flex-row gap-2">
                            <TextInput
                                className="w-1/2 flex-auto"
                                onChangeText={setLastName}
                                value={lastName}
                                placeholder="Nom"
                                textContentType="familyName"
                                returnKeyType="next"
                                returnKeyLabel="next"
                            />
                            <TextInput
                                className="w-1/2 flex-auto"
                                onChangeText={setFirstName}
                                value={firstName}
                                placeholder="Prénom"
                                textContentType="nickname"
                                returnKeyType="next"
                                returnKeyLabel="next"
                            />
                        </View>
                        <TextInput
                            onChangeText={setEmail}
                            value={email}
                            placeholder="Adresse e-mail"
                            textContentType="emailAddress"
                            keyboardType="email-address"
                            returnKeyType="next"
                            returnKeyLabel="next"
                        />
                        <TextInput
                            onChangeText={setPassword}
                            value={password}
                            placeholder="Mot de passe"
                            textContentType="password"
                            autoCompleteType="password"
                            autoCapitalize="none"
                            secureTextEntry
                            returnKeyType="next"
                            returnKeyLabel="next"
                        />
                        <TextInput
                            className="mb-6"
                            onChangeText={setPasswordConfirm}
                            value={passwordConfirm}
                            placeholder="Confirmation du mot de passe"
                            textContentType="password"
                            autoCapitalize="none"
                            secureTextEntry
                            returnKeyType="send"
                            returnKeyLabel="send"
                        />
                        <CustomButton color="primary" onPress={handleRegister}>S'inscrire</CustomButton>
                    </View>
                    <Text className="w-full text-center text-base font-ralewaylight text-textlighter">Déjà inscrit ? <Link href="/login" className="text-primary">Connectez-vous</Link></Text>
                </View>
            </View>
		</View>
    </>;
}

export default Register;