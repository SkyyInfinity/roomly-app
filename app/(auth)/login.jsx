import { useState } from "react";
import { ScrollView, Text, View, Image } from "react-native";
import { useAuth } from "../../context/Auth";
import CustomButton from './../../components/buttons/CustomButton';
import AuthService from "../../services/Auth.service";
import StorageService from "../../services/Storage.service";
import TextInput from "../../components/inputs/TextInput";
import { Link } from "expo-router";
import Logo from '../../assets/images/logo-text-secondary.svg';
import * as Yup from 'yup';

const Login = () => {
	const { signIn } = useAuth();
    const [email, setEmail] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const [errors, setErrors] = useState(undefined);

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email('Votre adresse e-mail doit être un e-mail valide.')
            .required('Required'),
        password: Yup.string()
            .required('Votre mot de passe est requis.')
    });

    const handleLogin = () => {
        const user = LoginSchema.validate({
            email: email,
            password: password
        })
        .then((res) => {
            AuthService.login(email, password)
            .then((response) => {
                const token = response.token;
                if(token !== null) {
                    StorageService.set('@roomly_token', token);
                    signIn(response);
                }
            })
            .catch((error) => setErrors(["Une erreur est survenue, vérifier vos informations."]));
        })
        .catch((err) => {
            console.log('err', err);
            setErrors(err.errors);
        });
    }

	return <>
		<View className="flex-1">
            <View className="flex-1 flex-col py-8">
                <View className="bg-primary flex-1 justify-center items-center !m-0">
                    <Logo width={256} height={200}/>
                </View>
                <View className="flex-col gap-y-16 px-4 !m-0">
                    <View className="flex-col gap-y-2">
                        <Text className="text-4xl font-ralewayextrabold">Bon retour parmis nous !</Text>
                        <Text className="text-base font-ralewaylight text-textlighter">Connectez-vous dès maintant pour réserver vos salles ou voir vos réservations en cours.</Text>
                    </View>
                    <View className="flex-col gap-y-2 !m-0">
                        {
                            errors && errors.length > 0 && errors.map((error, index) => {
                                return <Text key={index} className="bg-red-100 text-red-500 text-base font-ralewaylight py-2 px-4 rounded-lg">{error}</Text>
                            })
                        }
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
                            className="mb-6" 
                            onChangeText={setPassword}
                            value={password}
                            placeholder="Mot de passe"
                            textContentType="password"
                            autoCompleteType="password"
                            autoCapitalize="none"
                            secureTextEntry
                            returnKeyType="send"
                            returnKeyLabel="send"
                        />
                        <CustomButton color="primary" onPress={handleLogin}>Se connecter</CustomButton>
                    </View>
                    <Text className="w-full text-center text-base font-ralewaylight text-textlighter">Pas encore de compte ? <Link href="/register" className="text-primary">Inscrivez-vous</Link></Text>
                </View>
            </View>
		</View>
    </>;
}

export default Login;