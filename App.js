//https://www.superheroapi.com/api.php/2917083808342613/search/hulk

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, YellowBox } from 'react-native';
import * as Font from 'expo-font'

import Header from './src/components/Header'
import Main from './src/components/Main'

import { theme } from './src/config/app.json'

// Ignorar tela de warning
YellowBox.ignoreWarnings([
  'VirtualizedLists'
])

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  /**
   * Carregar a font
   */
  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'bangers-regular': require('./assets/fonts/Bangers-Regular.ttf')
      })

      setFontLoaded(true)
    }

    loadFont()
  }, []);

  return (
    <View style={styles.container}>
      <Header fontLoaded={fontLoaded} />
      <View style={styles.mainContainer}>
        <Main fontLoaded={fontLoaded} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.primaryColor,
  },

  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  }
});
