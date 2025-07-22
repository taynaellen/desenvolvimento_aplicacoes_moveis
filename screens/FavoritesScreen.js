import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesScreen = ({ navigation }) => {
    const [favoritos, setFavoritos] = useState([]);

    useEffect(() => {
        const carregarFavoritos = async () => {
        const json = await AsyncStorage.getItem('@favoritos');
        const lista = json ? JSON.parse(json) : [];
        setFavoritos(lista);
        };

        const unsubscribe = navigation.addListener('focus', carregarFavoritos);
        return unsubscribe;
    }, [navigation]);

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Detalhes', { filme: item })}>
        <View style={styles.card}>
            <Image
            source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
            style={styles.imagem}
            />
            <View style={styles.info}>
            <Text style={styles.titulo}>{item.title}</Text>
            <Text style={styles.nota}>Nota: {item.vote_average}</Text>
            </View>
        </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
        <Text style={styles.tituloPagina}>❤️ Meus Favoritos</Text>
        <FlatList
            data={favoritos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
        />
        </View>
    );
    };

    export default FavoritesScreen;

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    tituloPagina: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    card: {
        flexDirection: 'row',
        marginBottom: 12,
        backgroundColor: '#eee',
        borderRadius: 8,
        overflow: 'hidden',
    },
    imagem: {
        width: 100,
        height: 150,
    },
    info: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    nota: {
        fontSize: 16,
        marginTop: 5,
    },
    });
