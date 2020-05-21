import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      isSession: true,
      timerSecond: 0,
      intervalID: 0,
    };

    this.playTimer = this.playTimer.bind(this);
    this.decreaseTimer = this.decreaseTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.refreshTimer = this.refreshTimer.bind(this);
  }

  playTimer(){
    let intervalID = setInterval(this.decreaseTimer,1000);
    this.props.playStopTimer(true);
    this.setState({
      intervalID : intervalID
    })
  }

  decreaseTimer(){
    switch(this.state.timerSecond){
      case 0:
        if(this.props.timerMinute === 0){
          if(this.state.isSession){
            this.setState({
              isSession : false,
            });
            this.props.toggleInterval(this.state.isSession);
          }else{
            this.setState({
              isSession : true,
            });
            this.props.toggleInterval(this.state.isSession);
          }
        }else{
          this.props.updateTimerMinute()
          this.setState({
            timerSecond: 59,
          })
        }
        break;
      default:
        this.setState((prevState) => {
          return{
            timerSecond : prevState.timerSecond - 1,
          }
        })
        break;
    }
  }

  stopTimer(){
    clearInterval(this.state.intervalID);
    this.props.playStopTimer(false);
  }

  refreshTimer(){
    this.stopTimer();
    this.props.resetTimer();
    this.props.playStopTimer(false);
    this.setState({
      timerSecond : 0,
      isSession : true,
    })
  }

  render() {
    return (
      <View style = {styles.container}>
        <View>
          <Text style={styles.text}>{this.state.isSession === true ? 'Session' : 'Break'}</Text>
          <Text style = {styles.text}>
            {this.props.timerMinute} :{' '}
            {this.state.timerSecond === 0
              ? '00'
              : this.state.timerSecond < 10
              ? '0' + this.state.timerSecond
              : this.state.timerSecond}
          </Text>
        </View>
        <View style = {styles.buttons}>
          <TouchableOpacity
            style={styles.buttonstyle}
            onPress={this.playTimer}>
            <Text>Play</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonstyle}
            onPress={this.stopTimer}>
            <Text>Stop</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonstyle}
            onPress={this.refreshTimer}>
            <Text>Refresh</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text : {
    fontSize : 30,
    fontWeight : "bold",
    alignItems:'center'
  },

  buttonstyle: {
    backgroundColor: 'grey',
    width: 70,
    height: 40,
    alignItems: 'center',
    padding: 10,
    margin : 10,
  },

  buttons : {
    flex : 1,
    flexDirection : 'row',
  }
});
