import React, { Component } from 'react';

import {
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Alert
} from 'react-native';
import LottieView from 'lottie-react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import styles from './styles';

class ValidadorResult extends Component {
  constructor(props) {
      super(props);
      this.state = {
          plate:'',
          showModal:false,
      };
  }
  reportUser(){
    const {username, password } = this.props.credentials;
    this.props.clickReport(username, password, this.props.plate.plate);
    Alert.alert(
      'Atenção!',
      'Um email foi enviado \n'
      +'para o setor responsável',
      [
          {text: 'Validar outro', onPress: () => {this.props.clickValidarOutro()}},
      ],
      { cancelable: false }
    );
  }
  returnButton(text,action){
    return(
      <TouchableOpacity style={styles.button} onPress={action}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
  }
  returnButtonInvalid(){
    this.returnButton('Reportar usuário',()=>{this.reportUser()});
    this.returnButton('Validar Outro',()=>{this.props.clickValidarOutro()})
  }
  returnImgValid(){
    if(this.props.plate.valid){
      return(
        <LottieView
          style={styles.validadorResult}
          source={require('./assets/check.json')}
          autoPlay
          loop
        />
      );
    }else{
      return(
        <LottieView
          style={styles.validadorResult}
          source={require('./assets/error.json')}
          autoPlay
          loop
        />  
      );
    }
  }
  render() {
    return (
        <View style={styles.container}>
          <StatusBar style="light-content"/>
          {this.returnImgValid()}
          <Text style={{fontSize:20,textAlign:'center',fontWeight:'bold'}}>
              {this.props.plate.text} {"\n"}{"\n"}
              <Text style={{fontSize:14, fontWeight:'normal'}}>Carona:{this.props.plate.rideSchedule}</Text>{"\n"}
              <Text style={{fontSize:14,fontWeight:'normal'}}>Bolsão:{this.props.plate.parkingLot}</Text>{"\n"}
            </Text>
          <View style={[styles.form,{paddingBottom:100}]}>
            
           {this.props.plate.isValid?this.returnButton('Validar Outro',()=>{this.props.clickValidarOutro()})
            :
            <View>
              {this.returnButton('Reportar usuário',()=>{this.reportUser()})}
              {this.returnButton('Validar Outro',()=>{this.props.clickValidarOutro()})}
            </View> 
            
           } 
            
          </View>
        </View>
    );
  }
}
export default connect(
  state => ({
   plate:state.placa.plate,
   credentials:state.inicio.credentials
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(ValidadorResult);
