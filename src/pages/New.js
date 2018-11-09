// importando dependencia do react - components
import React, { Component } from 'react';
import api from '../services/api';
// importando dependencia do react native - View, Text
import Icon from 'react-native-vector-icons/MaterialIcons';
import { 
    View, 
    SafeAreaView, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    TextInput,
    AsyncStorage
 } from 'react-native';


export default class New extends Component {

    static navigationOptions = {
        header: null
    }

    state = {
        newTweet: '',
    };

    // função que permite retornar uma página anterior
    goBack = () => {
        this.props.navigation.pop();
    }

    // função de tweetar
    handleNewTweet = async () => {
        // variavel contem o novo tweet digitado
        const content = this.state.newTweet;
        // variavel comte o author do tweet - pêgo pelo asyncstorage => classe responsável por acesso ao storage do dispositivo
        const author = await AsyncStorage.getItem('@GoTwitter:username');

        // criando uma requisição do tipo post para api com axios
        await api.post('tweets', { content, author });

        this.goBack();
    }

    handleInputChange = async newTweet => {
        this.setState({ newTweet });
    }

    render() {
        return <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={this.goBack}>
                    <Icon name="close" size={24} color="#4BB0EE" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={this.handleNewTweet}>
                    <Text style={styles.buttonText}>Tweetar</Text>
                </TouchableOpacity>
            </View>

            <TextInput
            style={styles.input}
            multiline
            placeholder="O que está acontecendo?"
            value={this.state.newTweet}
            onChangeText={this.handleInputChange}
            placeholderTextColor="#999"
            returnKeyType="send"
            onSubmitEditing={this.handleNewTweet}></TextInput>
        </SafeAreaView>;
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF"
    },
  
    header: {
      paddingTop: 10,
      paddingHorizontal: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
  
    button: {
      height: 32,
      paddingHorizontal: 20,
      borderRadius: 16,
      backgroundColor: "#4BB0EE",
      justifyContent: "center",
      alignItems: "center"
    },
  
    buttonText: {
      color: "#FFF",
      fontSize: 16,
      fontWeight: "bold"
    },
  
    input: {
      margin: 20,
      fontSize: 16,
      color: "#333"
    }
  });
  