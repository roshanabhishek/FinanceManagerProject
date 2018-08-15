

import React, {Component} from 'react';
import {Button,TextInput,StyleSheet, Text, View,Alert} from 'react-native';
import SignUp from './signup';
import Main from './main';
import { createStackNavigator } from 'react-navigation';
import {auth} from '../Firebase/config';



class Login extends React.Component {

	
   constructor(props) {
    super(props);
    this.state = {
    EmailId: '',
    password:'',
    errorMessage:null};
   
  }  

  handleLogin = () => {
     const { EmailId, password } = this.state
      auth
      .signInWithEmailAndPassword(EmailId, password)
      .then(() => this.props.navigation.navigate('MainScreen'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {
    return (
      <View style={styles.container}>
                <Text 
                    style={{fontSize: 27}}>
                    Finance Manager
                </Text>
                {this.state.errorMessage &&
          		<Text style={{ color: 'red' }}>
            	{this.state.errorMessage}
          		</Text>}
                <TextInput style={styles.textInput}
                  onChangeText={(EmailId) => this.setState({EmailId})}
                  placeholder = 'Email Id'
                  returnKeyType = {"next"}
                  onSubmitEditing={() => { this.password.focus(); }}
                  />
                <TextInput style={styles.textInput}
                  onChangeText={(password) => this.setState({password})}
                  placeholder = 'Password'
                  secureTextEntry={true}
                  ref={(input) => { this.password = input; }}
                   />
                <View style={{margin:7}} />
                <Button 
                        onPress={()=>{this.handleLogin()}}
                        title="Login"
                    />
                <View style={{margin:7}} />    
                <Text 
                    style={{fontSize: 20,justifyContent:'center'}}
                    onPress={()=>{this.props.navigation.navigate('SignUpScreen')}}>
                    Dont have an Account? SignUp!
                </Text>          
      </View>
    );
  }
}

export default createStackNavigator({
  LoginScreen: {
    screen: Login,
    navigationOptions:{
    header: null,
	}
  },
  SignUpScreen:{
  	screen: SignUp,
  	navigationOptions:{
    headerLeft: null,
    header: null,
	}
  },
  MainScreen:{
  	screen: Main,
  	navigationOptions:{
  	header: null,
    headerLeft: null,
	}
  },

});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding:50,
  },
  textInput:{
  	borderColor:'black',
    backgroundColor:'#D3D3D3',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4,
    margin:10,
  },
 
});
