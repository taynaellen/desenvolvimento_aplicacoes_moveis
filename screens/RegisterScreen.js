// screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';

    export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
    if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
    }

    try {
        const response = await fetch('http://192.168.3.9:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }) 
        });

        const data = await response.json();

        if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        navigation.navigate('Login');
        } else {
        alert(data.error || 'Erro no cadastro');
        }
    } catch (error) {
        alert('Erro ao conectar com o servidor');
    }
    };

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Cadastro</Text>
        <TextInput
            placeholder="Nome"
            style={styles.input}
            value={name}
            onChangeText={setName}
        />
        <TextInput
            placeholder="E-mail"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
        />
        <TextInput
            placeholder="Senha"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
        />
        <TextInput
            placeholder="Confirmar Senha"
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
        />
        <Button title="Cadastrar" onPress={handleRegister} />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Já tem uma conta? Entrar</Text>
        </TouchableOpacity>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#999',
        marginBottom: 12,
        padding: 10,
        borderRadius: 5,
    },
    link: {
        marginTop: 20,
        textAlign: 'center',
        color: 'blue',
    },
    });
