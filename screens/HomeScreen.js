import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

 //key do TMDB
const API_KEY = 'api_key';
const BASE_URL = 'https://api.themoviedb.org/3';

    export default function HomeScreen() {
    const [filmes, setFilmes] = useState([]);
    const [busca, setBusca] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        buscarFilmesPopulares();
    }, []);

    const buscarFilmesPopulares = async () => {
        try {
        const resposta = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`);
        setFilmes(resposta.data.results);
        } catch (error) {
        console.error(error);
        }
    };

    const buscarFilmesPorTitulo = async () => {
        try {
        const resposta = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${busca}&language=pt-BR`);
        setFilmes(resposta.data.results);
        } catch (error) {
        console.error(error);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Details', { movie: item })}>
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
        <View style={styles.botoesHorizontais}>
        <TouchableOpacity style={styles.botaoProfile} onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.textoBotao}>👤 Usuário</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoFavoritos} onPress={() => navigation.navigate('Favorites')}>
            <Text style={styles.textoBotao}>❤️ Favoritos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoSettings} onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.textoBotao}>⚙️ Configurações</Text>
        </TouchableOpacity>
        </View>

        <TextInput
            style={styles.input}
            placeholder="🔍 Buscar Filme..."
            value={busca}
            onChangeText={setBusca}
            onSubmitEditing={buscarFilmesPorTitulo}
        />
        <FlatList
            data={filmes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
        />
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, paddingTop:30 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        marginBottom: 10,
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
        padding: 10,
        flex: 1,
    },
    titulo: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    nota: {
        marginTop: 8,
        fontSize: 14,
    },
    botaoFavoritos: {
    backgroundColor: '#36C6FF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    },

    textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    },

    botaoProfile: {
    width: 100,
    backgroundColor: '#36C6FF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    },
    
    botaoSettings: {
    width: 140,
    backgroundColor: '#36C6FF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    },

    botoesHorizontais: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    },

    });
