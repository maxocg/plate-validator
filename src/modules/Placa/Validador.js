import React, { Component } from 'react';

import {
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    ActivityIndicator,
    Keyboard,
    KeyboardAvoidingView
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import styles from './styles';
import { colors } from '../../styles';
import {validatePlate} from '../../lib/Validations';
import {showAlert} from '../../lib/Dialog';

class Validador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plate:'',
            showModal:false,
        };
      }
  clearInput(){
      this.setState({plate:''});
  }    
  checkPlate(){
      if(this.state.plate !== ""){
        if(validatePlate(this.state.plate.replace('-',''))){
            this.props.clickValidar(this.props.credentials.username,this.props.credentials.password,this.state.plate)
            this.setState({plate:''});
        }else{
          showAlert('Placa inválida');  
        }
      }else{
        showAlert('Necessário informar uma placa');
      }
  }
  
  render() {
    return (
        <View style={styles.container}>
          <StatusBar style="light-content"/>
          <Text style={styles.text}>
            Insira uma placa para validar
          </Text>
          <View style={styles.form}>
            <TextInputMask
                refInput={(ref) => this.myDateText = ref}
                autoFocus={false}
                placeholder={'AAA-0000'}
                value={this.state.plate}
                type={'custom'}
                onChangeText={plate => this.setState({plate:plate.toUpperCase()})}
                options={{mask: 'AAA-9999'}}
                style={styles.input}
		        />
            <TouchableOpacity activeOpacity = { 0.8 } style = { styles.visibilityBtn } onPress = {()=>{this.clearInput()} }>
              <Icon name={"close"} size={15} color={colors.darkTransparent}/>     
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>{this.checkPlate()}}>
              {this.props.loading
              ?<ActivityIndicator size="small" color="#FFFF"/>
              :<Text style={styles.buttonText}>Validar</Text>}
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}
export default connect(
  state => ({
      loading:state.placa.loading,
      credentials:state.inicio.credentials
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(Validador);
