import React, { useEffect, useState } from 'react';
import { StyleSheet, View, YellowBox, ActivityIndicator } from 'react-native';
import Toast from 'react-native-simple-toast'
import * as Font from 'expo-font'

import Header from './src/components/Header'
import Main from './src/components/Main'

import api from './src/services/api'

import { theme } from './src/config/app.json'

// Ignorar tela de warning
YellowBox.ignoreWarnings([
  'VirtualizedLists'
])

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

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

  function loadData(search) {
    if (search.length === 0) {
      Toast.show("Please input a value", Toast.LONG)

      if (data.error) setData({})
    } else {
      setLoading(true)

      api.get(`/search/${search.toLowerCase()}`)
        .then(hero => {
          setData(hero.data)
          setLoading(false)
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <View style={styles.container}>
      <Header fontLoaded={fontLoaded} onSubmit={loadData} />
      <View style={styles.mainContainer}>
        {loading ? <ActivityIndicator size="large" color={theme.secondaryColor} />
          : <Main
            fontLoaded={fontLoaded}
            data={Object.keys(data).length === 0 ? null : data.error ? false : data}
          />
        }
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
  }
});
