import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';

function BreakInterval(props){
  function decreaseCounter(){
    if(props.breakInterval === 1){
      return;
    }
    props.decreaseBreak();
  }

  function increaseCounter(){
    if(props.breakInterval === 60){
      return;
    }
    props.increaseBreak();
  }

  return(
    <View style = {styles.container}>
      <TouchableOpacity
        style={styles.buttonstyle}
        onPress={decreaseCounter}>
        <Text>Down</Text>
      </TouchableOpacity>

      <Text style={styles.length}>{props.breakInterval}</Text>

      <TouchableOpacity
        style={styles.buttonstyle}
        onPress={increaseCounter}>
        <Text>Up</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonstyle: {
    backgroundColor: 'grey',
    width: 100,
    height: 40,
    alignItems: 'center',
    padding: 10,
    margin: 20,
  },

  container: {
    flex : 1,
    flexDirection : "row",
    alignItems: 'center',
  },

  length:{
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default BreakInterval