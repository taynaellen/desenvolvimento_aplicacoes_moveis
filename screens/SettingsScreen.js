import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen({ navigation }) {
    const handleLogout = async () => {
        Alert.alert('Confirmação', 'Deseja sair da conta?', [
        {
            text: 'Cancelar',
            style: 'cancel'
        },
        {
            text: 'Sair',
            onPress: async () => {
            await AsyncStorage.clear();
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }]
            });
            }
        }
        ]);
    };

    return (
        <View style={styles.container}>
        <Text style={styles.title}>⚙️ Configurações</Text>

        <Text style={styles.label}>Versão do App:</Text>
        <Text style={styles.value}>1.0.0</Text>

        <View style={styles.button}>
            <Button title="Sair da conta" onPress={handleLogout} color="#B22222" />
        </View>

        <View style={{ marginTop: 20 }}>
            <Text>Modo escuro: (em desenvolvimento)</Text>
        </View>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    label: { fontWeight: 'bold', marginTop: 20 },
    value: { fontSize: 16 },
    button: { marginTop: 40 }
    });
