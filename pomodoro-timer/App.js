import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import BreakInterval from './BreakInterval';
import SessionInterval from './SessionInterval';
import Timer from './Timer';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timerMinute: 25,
      isPlay: false,
    };

    this.onIncreaseBreakLength = this.onIncreaseBreakLength.bind(this);
    this.onDecreaseBreakLength = this.onDecreaseBreakLength.bind(this);
    this.onIncreaseSessionLength = this.onIncreaseSessionLength.bind(this);
    this.onDecreaseSessionLength = this.onDecreaseSessionLength.bind(this);
    this.onToggleInterval = this.onToggleInterval.bind(this);
    this.onUpdateTimerMinute = this.onUpdateTimerMinute.bind(this);
    this.onResetTimer = this.onResetTimer.bind(this);
    this.onPlayStopTimer=this.onPlayStopTimer.bind(this);
  }

  onDecreaseBreakLength(){
    this.setState((prevState) => {
      return{
        breakLength : prevState.breakLength - 1
      }
    })
  }

  onIncreaseBreakLength(){
    this.setState((prevState) => {
      return{
        breakLength : prevState.breakLength + 1
      }
    })
  }

  onDecreaseSessionLength(){
    this.setState((prevState) => {
      return{
        sessionLength : prevState.sessionLength - 5,
        timerMinute: prevState.sessionLength - 5,
      }
    })
  }

  onIncreaseSessionLength(){
    this.setState((prevState) => {
      return{
        sessionLength : prevState.sessionLength + 5,
        timerMinute: prevState.sessionLength + 5,
      }
    })
  }

  onUpdateTimerMinute(){
    this.setState((prevState) => {
      return{
        timerMinute : prevState.timerMinute - 1,
      }
    })
  }

  onToggleInterval(isSession){
    if(isSession){
      this.setState({
        timerMinute: this.state.sessionLength,
      })
    }else{
      this.setState({
        timerMinute: this.state.breakLength,
      })
    }
  }

  onResetTimer(){
    this.setState({
      timerMinute : this.state.sessionLength
    })
  }

  onPlayStopTimer(isPlay){
    this.setState({
      isPlay: isPlay,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Pomodoro Clock </Text>
        <View style={styles.interval}>
          <BreakInterval 
            isPlay={this.state.isPlay}
            breakInterval={this.state.breakLength} 
            increaseBreak = {this.onIncreaseBreakLength}
            decreaseBreak = {this.onDecreaseBreakLength}
          />
          <SessionInterval 
            isPlay={this.state.isPlay}
            sessionInterval={this.state.sessionLength}
            increaseSession = {this.onIncreaseSessionLength}
            decreaseSession = {this.onDecreaseSessionLength}
          />
        </View>
        <Timer 
          timerMinute={this.state.timerMinute}
          breakLength={this.state.breakLength}
          updateTimerMinute={this.onUpdateTimerMinute}
          toggleInterval={this.onToggleInterval}
          resetTimer={this.onResetTimer}
          playStopTimer={this.onPlayStopTimer} 
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  interval: {
    flex: 1,
    flexDirection: 'column',
  },
});
