// importando dependencia do react - components
import React, { Component } from 'react';
// importando dependencia do react native - View, Text
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    KeyboardAvoidingView,
    StyleSheet,
    AsyncStorage
} from 'react-native';
// dependencia - possibilita zerar telas anteriores depois de redirecionar
import { StackActions, NavigationActions } from 'react-navigation';
// dependencia de icones em vetores
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Login extends Component {

    static navigationOptions = {
        header: null
    }

    state = {
        username: '',
    };

    async componentDidMount() {
        const username = await AsyncStorage.getItem('@GoTwitter:username');

        if (username) {
            this.navigateToTimeLine();
        }
    }

    handleLogin = async () => {
        const { username } = this.state;

        // se for vazio, pára
        if (!username.length) return;

        // variavel do localstorage, no caso sqlite do dispositivo
        // seta o valor de username de forma assincrona
        await AsyncStorage.setItem('@GoTwitter:username', username);

        // funcação de redirecionamento - mas deixa 
        // possibilidade de retornar a tela anterior
        //  - foi criado outro metodo abaixo para resetar essas telas anteriores
        /* this.props.navigation.navigate('Timeline'); */
        // chamanda da função de navegação criada abaixo
        this.navigateToTimeLine();
    }

    navigateToTimeLine = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Timeline' })
            ]
        });
        
        this.props.navigation.dispatch(resetAction);
    };

    // recebe o texto como parametro
    handleInputChange = username => {
        this.setState({ username });
    };

    render() {
        return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.content}>
                <View>
                    {/* icone do twetter */}
                    <Icon name="twitter" size={64} color="#4BB0EE" />
                </View>
                {/* input de login */}
                <TextInput
                    style={styles.input}
                    placeholder="Nome de usuário"
                    value={this.state.username}
                    onChangeText={this.handleInputChange}
                    returnKeyType="send"
                    onSubmitEditing={this.handleLogin}
                />

                {/* botao de entrar */}
                <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF"
    },
  
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 30
    },
  
    input: {
      borderWidth: 1,
      borderColor: "#DDD",
      borderRadius: 5,
      height: 44,
      paddingHorizontal: 15,
      alignSelf: "stretch",
      marginTop: 30
    },
  
    button: {
      height: 44,
      alignSelf: "stretch",
      marginTop: 10,
      backgroundColor: "#4BB0EE",
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center"
    },
  
    buttonText: {
      color: "#FFF",
      fontSize: 16,
      fontWeight: "bold"
    }
  });  