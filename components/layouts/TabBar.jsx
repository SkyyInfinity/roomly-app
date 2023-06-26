import React from "react";
import { ScrollView, View, Text } from "react-native";
import { Link, usePathname } from "expo-router";
import ExplorerIconRegular from '../../assets/images/icons/explorer-24-regular.svg';
import FavoritesIconRegular from '../../assets/images/icons/favorites-24-regular.svg';
import BookIconRegular from '../../assets/images/icons/book-24-regular.svg';
import SettingsIconRegular from '../../assets/images/icons/settings-24-regular.svg';
import ExplorerIconFilled from '../../assets/images/icons/explorer-24-filled.svg';
import FavoritesIconFilled from '../../assets/images/icons/favorites-24-filled.svg';
import BookIconFilled from '../../assets/images/icons/book-24-filled.svg';
import SettingsIconFilled from '../../assets/images/icons/settings-24-filled.svg';
import CustomButton from "../buttons/CustomButton";

const TabBar = () => {
    const pathname = usePathname();
    
    const classes = {
        button: "flex-1 items-center justify-center items-center p-6 bg-quaternary rounded-xl",
        icon: "!mt-4"
    }

    const menu = [
        {
            name: 'Explorer',
            icon: <ExplorerIconRegular width={24} height={24} />,
            iconActive: <ExplorerIconFilled width={24} height={24} />,
            path: '/',
            lastItem: false
        },
        {
            name: 'Favoris',
            icon: <FavoritesIconRegular width={24} height={24} />,
            iconActive: <FavoritesIconFilled width={24} height={24} />,
            path: '/favorites',
            lastItem: false
        },
        {
            name: 'Réservations',
            icon: <BookIconRegular width={24} height={24} />,
            iconActive: <BookIconFilled width={24} height={24} />,
            path: '/reservations',
            lastItem: false
        },
        {
            name: 'Paramètres',
            icon: <SettingsIconRegular width={24} height={24} />,
            iconActive: <SettingsIconFilled width={24} height={24} />,
            path: '/settings',
            lastItem: true
        }
    ];

	return (
        <View className="h-[120px]">
            <View className="flex-1 flex-row justify-between bg-white py-6 px-4 border-t border-slate-200">
                {
                    menu.map((item, index) => (
                        <View key={index}>
                            <CustomButton
                                isIcon={pathname === item.path ? false : true}
                                className={`flex-row items-center ${classes.button} ${item.lastItem === true ? '' : ''} ${pathname === item.path ? '!bg-primary' : '!bg-transparent'}`}
                                to={item.path}
                            >
                                {
                                    pathname === item.path ? <>
                                        {item.iconActive}
                                        <View className="flex flex-1 flex-row gap-x-2 items-center">
                                            <Text style={{lineHeight: 24}} className="font-ralewaymedium">{item.name}</Text>
                                        </View>
                                    </> : item.icon 
                                }
                                {/* {
                                    pathname === item.path ? (
                                        <Text style={{lineHeight: 24}} className="font-ralewaymedium">{item.name}</Text>
                                    ) : null
                                } */}
                            </CustomButton>
                        </View>
                    ))
                }
            </View>
        </View>
    );
};

export default TabBar;
