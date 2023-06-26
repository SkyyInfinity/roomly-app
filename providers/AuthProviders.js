import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import AuthService from "../services/Auth.service";
import { useRouter, useSegments, usePathname } from "expo-router";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const segments = useSegments();
    const pathname = usePathname();
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profile, setProfile] = useState({});
    const [AuthPending, setAuthPending] = useState(false);

    const checkAuth = async () => {
        setAuthPending(true);
        const token = await AsyncStorage.getItem('@roomly_token');
        
        if(token !== null) {
            try {
                const decoded = jwt_decode(token, { header: true });
                let diff = decoded.exp - Date.now() / 1000;
                let isExpired = diff < 0 ? true : false;
                
                if(!isExpired) {
                    const res = await AuthService.check(token);

                    if(res) {
                        setProfile({
                            token: token,
                            user: res
                        });
                        setIsLoggedIn(true);
                    } else {
                        setProfile({});
                        setIsLoggedIn(false);
                        router.replace('/login');
                    }
                    setAuthPending(false);
                    return;
                } else {
                    await AsyncStorage.removeItem('@roomly_token');
                    setProfile({});
                    setIsLoggedIn(false);
                    setAuthPending(false);
                    router.replace('/login');
                    return;
                }
            } catch(error) {
                await AsyncStorage.removeItem('@roomly_token');
                setProfile({});
                setIsLoggedIn(false);
                setAuthPending(false);
                router.replace('/login');
                return;
            }
        } else {
            setProfile({});
            setIsLoggedIn(false);
            setAuthPending(false);
            router.replace('/login');
        }
    }

    useEffect(() => {
        // AsyncStorage.setItem('@roomly_token', 'fffffff');
        const inAuthGroup = segments[0] === "(auth)";
        
        if(!inAuthGroup && !isLoggedIn) {
            router.replace('/login');
        } else if(!inAuthGroup && isLoggedIn) {
            checkAuth();
        } else if(inAuthGroup && isLoggedIn) {
            router.replace('/');
        } else if(inAuthGroup && !isLoggedIn) {
            checkAuth();
        } else {
            setProfile({});
            setIsLoggedIn(false);
            setAuthPending(false);
            router.replace('/login');
        }
    }, [isLoggedIn, segments]);

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            profile,
            setProfile,
            AuthPending,
            setAuthPending 
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;