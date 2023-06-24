import { useRouter, useSegments } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import StorageService from "../services/Storage.service";
import AuthService from "../services/Auth.service";

const AuthContext = createContext(null);

// This hook can be used to access the user info.
export const useAuth = () => {
	return useContext(AuthContext);
};

// This hook will protect the route access based on user authentication.
export const Provider = (props) => {
    const segments = useSegments();
	const router = useRouter();
	const [user, setAuth] = useState(null);

	useEffect(() => {
		const inAuthGroup = segments[0] === "(auth)";

		if (
			// If the user is not signed in and the initial segment is not anything in the auth group.
			!user &&
			!inAuthGroup
		) {
            StorageService.get('@roomly_token')
            .then(async (token) => {
                if(token) {
                    // Check if token is valid
                    await AuthService.check(token)
                    .then(() => {
                        setAuth(token);
                    })
                    .catch(() => {
                        StorageService.remove('@roomly_token');
                        router.replace("/login");
                    });
                } else {
                    router.replace("/login");
                }
            });
		} else if (user && inAuthGroup) {
			// Redirect away from the sign-in page.
			router.replace("/");
		}
	}, [user, segments]);

	return (
		<AuthContext.Provider
			value={{
				signIn: (response) => {
                    if(response.token) {
                        setAuth(response);
                    }
                },
				signOut: () => {
                    setAuth(null)
                    StorageService.remove('@roomly_token');
                    router.replace("/login");
                },
				user,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};
