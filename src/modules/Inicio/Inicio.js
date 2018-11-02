import React,{Component} from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Alert,
  ActivityIndicator,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import {validateEmail} from '../../lib/Validations';
import {showAlert} from '../../lib/Dialog';
import LottieView from 'lottie-react-native';
import { colors } from '../../styles';

class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email:'',
        password:'',
        hidePassword:true
    };
  }
  isValidEmail(){
    if(validateEmail(this.state.email) && this.state.password !== ""){
      this.props.clickLogin(this.state.email, this.state.password); 
    }else{
      showAlert('Verifique se as credenciais foram preenchidas corretamente.');
    }    
  }
  managePasswordVisibility(){
    this.setState({ hidePassword: !this.state.hidePassword });
  }
  forgetPassword(){
    showAlert('Usuário esqueceu a senha!');
  }
  render() {
    return(
        <View style={styles.container}>
          <StatusBar style="light-content"/>
          {/* <Text style={styles.title}>Entrar</Text> */}
          <View style={styles.loginContainer}>
            <Image resizeMode="contain" style={styles.logo} source={{uri:'https://bynd.com.br/img/logo.png'}}/>
          </View>
          <LottieView
              style={styles.logoPin}
              source={require('./assets/pin.json')}
              autoPlay
              loop
            />
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Email corporativo"
              keyboardType={'email-address'}
              underlineColorAndroid="rgba(0,0,0,0)"
              value={this.state.email}
              onChangeText={email => this.setState({email})}
            />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Senha"
              secureTextEntry={this.state.hidePassword}
              underlineColorAndroid="rgba(0,0,0,0)"
              value={this.state.password}
              onChangeText={password => this.setState({password})}
            />
            <TouchableOpacity activeOpacity = { 0.8 } style = { styles.visibilityBtn } onPress = {()=>{this.managePasswordVisibility()} }>
            {
              this.state.hidePassword?<Icon name={"eye"} size={20} color={colors.whiteTransparent}/> 
              :<Icon name={"eye-off"} size={20} color={colors.darker}/>     
            }
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>{this.isValidEmail()}}>
              {this.props.loading
              ?<ActivityIndicator size="small" color="#FFFF"/>
              :<Text style={styles.buttonText}>Entrar</Text>}

            </TouchableOpacity>
            <TouchableOpacity style={styles.forgetUser} onPress={()=>{this.forgetPassword()}}>
              <Text style={styles.textUserForget}>Esqueceu a senha? </Text>
            </TouchableOpacity>

          </View>
        </View>
    );
  }
}
export default connect(
  state => ({
    loading:state.inicio.loading,

  }),
  dispatch => bindActionCreators(actions, dispatch)
)(Inicio)
