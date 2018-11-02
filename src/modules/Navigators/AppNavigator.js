import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator, DrawerNavigator, TabNavigator, NavigationActions } from 'react-navigation';
import {
  View,
  BackHandler,
} from 'react-native' ;
import {Inicio} from '../Inicio';
import {Validador, ValidadorResult} from '../Placa';
import {colors} from '../../styles';

//parte não logada
export const AppNavigator = StackNavigator({
  Inicio: {
    screen: Inicio,
    navigationOptions:{
      header: null
    }
  },
  Validador: {
    screen: Validador,
    navigationOptions: {
      title: "Validar Placa"
    }
  },
  ValidadorResult: {
    screen: ValidadorResult,
    navigationOptions: {
      title: "Validar Placa"
    }
  }

},{
  navigationOptions: {
    headerTintColor: colors.white,
    headerTitleStyle: {
      /*  */
    },
    headerStyle: {
      backgroundColor: colors.primary 
    },
  },
  headerMode: 'screen'
})

class AppWithNavigationState extends Component{
  state = {
   
  };
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired
    
  };
  constructor(props){
    super(props)
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', () => {
      return false;
    });
  }

  render(){
    const { dispatch, nav  } = this.props;
    console.log(this.props)
    return (
      <View style={{flex:1}}>
          <AppNavigator  navigation={addNavigationHelpers({ dispatch, state: nav})}/>
        </View>
      );  
  }
};


export default connect(
  state => ({
    nav: state.nav
  }),
  dispatch => ({
    dispatch: dispatch
  })
)(AppWithNavigationState)