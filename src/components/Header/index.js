import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";

import { theme } from "../../config/app.json";

const Header = ({ fontLoaded, onSubmit }) => {
  const [search, setSearch] = useState("");

  function handleSubmit() {
    onSubmit(search)
    setSearch("")
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          ...styles.title,
          fontFamily: fontLoaded ? 'bangers-regular' : 'normal'
        }}
      >
        Super heroes Database {" "/* gambiarra -> por causa da fonte, a última letra fica cortada */}
      </Text>
      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#999"
          autoCorrect={false}
          onChangeText={text => setSearch(text)}
          value={search}
          onSubmitEditing={handleSubmit}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSubmit}
        >
          <MaterialIcons name="search" size={20} color={theme.primaryColor} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    height: 130,
    backgroundColor: "#424DB4",
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 30,
    color: theme.secondaryColor,
  },

  searchForm: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 30,
  },

  searchInput: {
    flex: 1,
    color: "#333",
    borderRadius: 25,
    paddingHorizontal: 20,
    height: 40,
    backgroundColor: "#FFF",
    elevation: 2,
  },

  searchButton: {
    width: 40,
    height: 40,
    backgroundColor: theme.secondaryColor,
    borderRadius: 25,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Header;
