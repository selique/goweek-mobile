// importando dependencia do react - components
import React, { Component } from 'react';
import api from '../services/api';
// importando dependencia do react native - View, Text
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Tweet from '../components/Tweet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import socket from 'socket.io-client';

export default class Timeline extends Component {

    static navigationOptions = ({ navigation }) => ( {
        titile: 'Início',
        headerRight: (
            <TouchableOpacity onPress={ ()=> navigation.navigate('New') }>
                <Icon 
                    style={{ marginRight: 20 }}
                    name="add-circle-outline"
                    size={24}
                    color="#4BB0EE"
                />
            </TouchableOpacity>
        ),
    });

    // array para guardar os tweets retornado do webservice
    state = {
        tweets: []
    }

    // função async que chama ao montar tela
    async componentDidMount() {
        this.subscribeToEvents();

        // variavel = tweets
        const response = await api.get('tweets');

        // setando os tweets de respostas no array tweet
        this.setState({ tweets: response.data });
    }

    // funcao para encapsular realtime - carrega em tempo real os tweets e likes
    subscribeToEvents = () => {
        // socket com caminho da API REST
        const io = socket('http://10.0.3.2:3000');

        // evento de recarregar em realtime os tweets
        io.on('tweet', data => {
            // seta o novo tweet no indice 0 do vetor de tweets 
            // depois pega todos os tweets que já tinham e adiciona 
            // na frente
            this.setState({ tweets: [data, ...this.state.tweets] })
        })

        // evento de recarregar em realtime os likes
        io.on('like', data => {
            // obtem o vetor de likes pelo map e verifica se é o mesmo 
            // que já está em data, caso nao seja atualiza
            this.setState({ tweets: this.state.tweets.map(tweet =>
                tweet._id === data._id ? data : tweet 
            ) })
        })
    }

    render() {
        return <View style={styles.container}>
                <FlatList
                    data={this.state.tweets}
                    keyExtractor={ tweet => tweet._id}
                    renderItem={({ item }) => <Tweet tweet={item} /> }
                />
            </View>;
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF"
    }
  });
  