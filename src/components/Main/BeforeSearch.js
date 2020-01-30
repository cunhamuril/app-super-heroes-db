import React from 'react';
import { Image, Text, StyleSheet, View } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";

import { theme } from '../../config/app.json'

const BeforeSearch = ({ logo, text, error, fontLoaded }) => {
  return (
    <View style={styles.container}>
      {error ?
        <MaterialIcons name="error" size={140} color={theme.primaryLight} />
        :
        <Image style={styles.logo} source={logo} />
      }
      <Text
        style={{
          ...styles.text,
          fontFamily: fontLoaded ? 'bangers-regular' : 'normal'
        }}
      >
        {text}
      </Text>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: -100
  },

  logo: {
    maxHeight: 250,
    resizeMode: "contain",
  },

  text: {
    marginTop: 25,
    color: theme.primaryLight,
    fontSize: 40,
    marginHorizontal: 30,
    textAlign: 'center',
  }
})

export default BeforeSearch;