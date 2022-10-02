import React, { useState, useEffect } from 'react';
import { ToastAndroid, View, Text, StyleSheet, TextInput, TouchableOpacity, Button, Image, Dimensions  } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation,  NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import { BarCodeScanner } from 'expo-barcode-scanner';


function HomeScreen() {
	return (
		<View style={styles.container}>
			<Text>Home!</Text>
		</View>
	);
}

function ListScreen() {
	return (
		<View style={styles.container}>
			<Text>Categories!</Text>
		</View>
	);
}

function PostScreen() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    if (Platform.OS === 'android'){
        ToastAndroid.show(`${data} escaneado com sucesso!`, ToastAndroid.LONG);
    }else{
        alert(`Codigo ${data} escaneado com sucesso!`);
    } 
  };

  if (hasPermission === null) {
    return <Text>Solicitando permissão da câmera</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso a camera</Text>;
  }
  const styles = StyleSheet.create({
    barcode:{
        flex: 1,
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: 'flex-end',
    },

})

	return (
        <View style={styles.barcode}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : 
                handleBarCodeScanned}
                style={{ width: height - 188, height: height, 
                alignSelf: "center" }}
            />
    {scanned && <Button  title={'scanear novamente'} onPress={() => setScanned(false)}color="#38a69d" />}
        </View>
    );
}


function NotificationsScreen() {
	return (
		<View style={styles.container}>
			<Text>Notifications!</Text>
		</View>
	);
}

function SettingsScreen() {
	return (
		<View style={styles.container}>
			<Text>Settings!</Text>
		</View>
	);
}

const Tab = createBottomTabNavigator();

export default function Home() {
    const navigation = useNavigation();
    return (
        <NavigationContainer independent={true}>
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    switch (route.name) {
                        case 'Home':
                            iconName = 'home';
                            break;
                        case 'Categories':
                            iconName = 'list';
                            break;
                        case 'Scanner':
                            iconName = 'plus-circle';
                            break;
                        case 'Notifications':
                            iconName = 'bell';
                            break;
                        case 'Settings':
                            iconName = 'settings';
                            break;
                        default:
                            iconName = 'circle';
                            break;
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: '#38a69d',
                inactiveTintColor: '#777',
                showLabel: false,
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Categories" component={ListScreen} />
            <Tab.Screen name="Scanner" component={PostScreen} options={{ headerShown: false }}/>
            
            <Tab.Screen name="Notifications" component={NotificationsScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    </NavigationContainer>
);
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
},
iconTabRound: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: 'whitesmoke',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
}
});