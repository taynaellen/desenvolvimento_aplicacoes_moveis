import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native';


export default function PerfilScreen({ navigation }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [qtdFavoritos, setQtdFavoritos] = useState(0);

    useEffect(() => {
        const carregarDados = async () => {
        const nomeSalvo = await AsyncStorage.getItem('user_nome');
        const emailSalvo = await AsyncStorage.getItem('user_email');
        const favoritosSalvos = await AsyncStorage.getItem('favoritos');
        const favoritos = favoritosSalvos ? JSON.parse(favoritosSalvos) : [];

        setNome(nomeSalvo || 'Nome não encontrado');
        setEmail(emailSalvo || 'Email não encontrado');
        setQtdFavoritos(favoritos.length);
        };

        carregarDados();
    }, []);

    return (
        <View style={styles.container}>
        <Text style={styles.titulo}>👤 Perfil do Usuário</Text>

        {/* <Text style={styles.label}>Nome:</Text>
        <Text style={styles.valor}>{nome}</Text> */}

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.valor}>{email}</Text>

        <Text style={styles.label}>Filmes Favoritos:</Text>
        <Text style={styles.valor}>{qtdFavoritos}</Text>

        <View style={{ marginTop: 30 }}>
        <Button
            title="Ir para Configurações"
            onPress={() => navigation.navigate('Settings')}
            color={'#36C6FF'}
        />
        </View>

        </View>

        
    );
    }

    const styles = StyleSheet.create({
    container: { padding: 20, flex: 1 },
    titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    label: { fontWeight: 'bold', marginTop: 10 },
    valor: { fontSize: 16 }
    });
