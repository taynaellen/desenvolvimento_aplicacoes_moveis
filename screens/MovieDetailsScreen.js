import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Button } from 'react-native';


const MovieDetailsScreen = ({ route }) => {
    const { movie } = route.params;

    const salvarNosFavoritos = async () => {
    try {
        const favoritosAtuais = await AsyncStorage.getItem('@favoritos');
        let novosFavoritos = [];

        if (favoritosAtuais !== null) {
        novosFavoritos = JSON.parse(favoritosAtuais);
        }

        const jaExiste = novosFavoritos.some(f => f.id === movie.id);
        if (jaExiste) {
        Alert.alert('Aviso', 'Este filme já está nos seus favoritos.');
        return;
        }

        novosFavoritos.push(movie);
        await AsyncStorage.setItem('@favoritos', JSON.stringify(novosFavoritos));
        Alert.alert('Sucesso', 'Filme adicionado aos favoritos!');
    } catch (error) {
        console.error('Erro ao salvar nos favoritos:', error);
        Alert.alert('Erro', 'Não foi possível salvar nos favoritos.');
    }
    };

    

    return (
        <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={styles.image} />
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.info}>Nota: {movie.vote_average} ⭐</Text>
        <Text style={styles.info}>Lançamento: {movie.release_date}</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
        <Button title="Adicionar aos Favoritos" onPress={salvarNosFavoritos} color={'#36C6FF'} />

        </ScrollView>
    );
    };

    

    export default MovieDetailsScreen;

    const styles = StyleSheet.create({
    container: {
        padding: 35,
        paddingBottom: 100,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 500,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
    },
    info: {
        fontSize: 16,
        marginTop: 10,
    },
    overview: {
        fontSize: 16,
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'justify',
    },
    });
