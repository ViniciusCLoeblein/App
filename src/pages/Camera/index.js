import React, { useState, useEffect } from 'react';
import { ToastAndroid, Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function Camera() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

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
        ToastAndroid.show(`Codigo ${data} escaneado com sucesso!`, ToastAndroid.LONG);
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

  return (
    <View style={styles.container}>
        <View style={styles.barcode}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{height: 450, width: '100%'}}
        />
      {scanned && <Button title={'Clique para scanear novamente'} onPress={() => setScanned(false)} />}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#DCDCDC',
        alignItems: 'center',
        justifyContent: 'center',
    },
    barcode:{ 
        alignItems: 'center',
        justifyContent: 'center',
        height: 400,
        width: 340,
        overflow: 'hidden',
        borderRadius: 40,
    },
})