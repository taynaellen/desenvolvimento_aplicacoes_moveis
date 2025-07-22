import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://192.168.3.9:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password: senha })
            });

            const data = await response.json();

            if (response.ok) {
            await AsyncStorage.setItem('user_email', email);

            Alert.alert('Login realizado com sucesso!');
            navigation.replace('Home');
            } else {
            Alert.alert('Erro', data.error || 'Credenciais inválidas');
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível conectar ao servidor');
        }
        };


    return (
        <View style={styles.container}>
        <Text style={styles.title}>Entrar</Text>

        <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
        />

        <TextInput
            style={styles.input}
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
        />

        <Button title="Entrar" onPress={handleLogin} color={'#36C6FF'}/>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Criar conta</Text>
        </TouchableOpacity>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: { padding: 20, flex: 1, justifyContent: 'center' },
    title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
    input: {
        borderWidth: 1, borderColor: '#ccc',
        padding: 10, borderRadius: 5, marginBottom: 10
    },
    link: { marginTop: 15, textAlign: 'center', color: 'blue' }
    });
