import React, { useState } from 'react';
import { ToastAndroid, View, Text, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather';
import Constants from "expo-constants";

const url = "http://192.168.0.105:8000/autenticar";
export default function SignIn() {  
    const navigation = useNavigation();
    const [codigoUsuario, setCodigoUsuario]= useState("");
    const [senha, setSenha] = useState("");
    const [hidePass, sethidePass] = useState(true);
    
  
    const onSubmitFormHandler = async (event) => {
      if (!codigoUsuario.trim() || !senha.trim()) {
        alert("Preencha os dois campos");
        return;
      }  
      try {
        const response = await axios.post(`${url}`, {
          codigoUsuario,
          senha,
        });
        if (response.status === 200) {
            if(response.data.invalido == true){
                alert("Matricula ou senha inválidos");
            }else{
                ToastAndroid.show(`Logado como ${JSON.stringify(response.data.nome)}`, ToastAndroid.LONG);
                setCodigoUsuario('');
                setSenha('');
                navigation.navigate('Home')
            }          
        } else {
          throw new Error("ERROR!");
        }
      } catch (error) {
        alert("ERROR API!");
      }
    };
  
    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Bem-Vindo(a)</Text>
            </Animatable.View>
            <Animatable.View animation="fadeInUp" delay={900} style={styles.containerForm}>
                <Text style={styles.title}>Matricula</Text>
            <Animatable.View animation="fadeInRight" delay={1500} style={styles.containerForm2}>
                <TextInput 
                    placeholder="Digite sua matricula..."
                    style={styles.input}
		            value={codigoUsuario}
                    onChangeText={text=>setCodigoUsuario(text)}
                    maxLength={6}
                    keyboardType="numeric"							
                />
                <TouchableOpacity style={styles.icon}>
                    <Icon name={'user'} color='black' size={25}/>
                </TouchableOpacity>
            </Animatable.View>
                <Text style={styles.title}>Senha</Text>
                <Animatable.View animation="fadeInLeft" delay={1500} style={styles.containerForm2}>
                <TextInput
                    secureTextEntry={hidePass}
                    placeholder="Sua senha"
                    style={styles.input}
		            value={senha}
                    keyboardType="numeric"
                    onChangeText={text=>setSenha(text)
                    }
                />

                <TouchableOpacity style={styles.icon} onPress={ () => sethidePass(!hidePass) }>
                    <Icon name={hidePass ? 'eye' : 'eye-off'} color='black' size={25}/>
                </TouchableOpacity>
                </Animatable.View>
                <TouchableOpacity style={styles.button}
                onPress={onSubmitFormHandler}>
                    <Text style={styles.buttonText}>Logar</Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#38a69d'
    },
    containerHeader:{
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%',
    },
    message:{
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff'
    },
    containerForm:{
        backgroundColor: '#fff',
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    title:{
        fontSize: 20,
        marginTop: 28
    },
    input: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
        width: '90%',
    },
    button: {
        backgroundColor: '#39a69d',
        width: '100%',
        borderRadius: 8,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
    },
    buttonText:{
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    icon:{
        width: '10%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginRight: 40
    },
    containerForm2:{
        flexDirection: 'row',
        width: '90%',
        backgroundColor: '#fff',
        width: '100%',
        


    },
})