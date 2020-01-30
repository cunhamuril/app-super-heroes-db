import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
} from 'react-native';
import ProgressBar from "react-native-progress/Bar";

import logo from '../../../assets/logo.png'
import profile from '../../../assets/profile.jpg'

import { theme } from "../../config/app.json";

import BeforeSearch from './BeforeSearch'

const Main = ({ fontLoaded }) => {
  const [dataLoaded, setDataLoaded] = useState(true);
  const [dataError, setDataError] = useState(false);
  const [data, setData] = useState({});

  function renderSession(title, data) {
    return (
      <View style={styles.sessionContainer}>

        <Text style={{
          ...styles.txtSession,
          fontFamily: fontLoaded ? 'bangers-regular' : 'normal'
        }}>{title + " "}</Text>
        <View style={styles.hrLine} />
        <View style={{ marginTop: 4 }}>

          {data.map(item => (
            <View style={{ flexDirection: 'row', maxWidth: 250 }} key={item.name}>
              <Text style={{ color: "#FFF" }}>{item.name}: </Text>
              <Text style={{ color: theme.secondaryColor }}>{item.value}</Text>
            </View>
          ))}

        </View>

      </View>
    )
  }

  if (!dataLoaded && !dataError) return (
    <BeforeSearch logo={logo} text="Search for a super hero or villain " fontLoaded={fontLoaded} />
  )

  if (dataError) return (
    <BeforeSearch error={dataError} text={"character with given name not found"} fontLoaded={fontLoaded} />
  )

  else return (
    <ScrollView>
      <View style={styles.container}>

        <View style={styles.profileContainer}>
          <Image source={profile} style={styles.imgProfile} />
          <View style={styles.infoContainer}>
            <Text style={{
              ...styles.txtName,
              fontFamily: fontLoaded ? 'bangers-regular' : 'normal'
            }}>Joker</Text>
            <View style={styles.hrLine} />
            <Text style={{
              ...styles.txtSession,
              textAlign: 'center',
              fontFamily: fontLoaded ? 'bangers-regular' : 'normal'
            }}>Powerstats</Text>
            <SafeAreaView>
              <FlatList
                data={[
                  { id: "item1", statName: 'Intelligence', statPerc: 100 / 100 },
                  { id: "item2", statName: 'Strength', statPerc: 10 / 100 },
                  { id: "item3", statName: 'Speed', statPerc: 12 / 100 },
                  { id: "item4", statName: 'Durability', statPerc: 60 / 100 },
                  { id: "item5", statName: 'Power', statPerc: 43 / 100 },
                  { id: "item6", statName: 'Combat', statPerc: 70 / 100 },
                ]}
                renderItem={({ item }) => (
                  <View style={styles.statsContainer}>
                    <Text style={styles.txtStat}>{item.statName}</Text>
                    <ProgressBar progress={item.statPerc} width={120} height={7} color={theme.secondaryColor} />
                  </View>
                )}
                keyExtractor={item => item.id}
              />
            </SafeAreaView>
          </View>
        </View>

        {renderSession(
          "Biography",
          [
            { name: "Full name", value: "Jack Napier" },
            { name: "Alter egos", value: "No alter egos found." },
            { name: "Aliases", value: "Red Hood I, Clown Prince of Crime, Harlequin of Hate, Jack Napier, Joe Kerr, Mr. J" },
            { name: "First Appearence", value: "Batman #1 (Spring 1940)" },
            { name: "Publisher", value: "DC Comics" },
            { name: "Alignment", value: "badd" },
          ]
        )}

        {renderSession(
          "Appearance",
          [
            { name: "Gender", value: "Male" },
            { name: "Race", value: "Human" },
            { name: "Height", value: "196 cm" },
            { name: "Weight", value: "86 kg" },
            { name: "Eye color:", value: "Green" },
            { name: "Hair color:", value: "Green" },
          ]
        )}

        {renderSession(
          "Work",
          [
            { name: "Occupation", value: "Male" },
            { name: "Base", value: "Arkham Asylum, Gotham City; Ha-Hacienda" },
          ]
        )}

        {renderSession(
          "Connections",
          [
            { name: "Group Affiliation", value: "Black Glove, Injustice Gang, Injustice League, Joker League of Anarchy" },
            { name: "Base", value: "Jeannie (wife, deceased); Unborn son (deceased); Melvin Reipan (cousin, deceased)" },
          ]
        )}

      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
    borderRadius: 15,
    maxWidth: 380,
  },

  /**
   * Profile Container
   */
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'stretch',
    height: 200,
  },

  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    maxWidth: 230,
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    marginLeft: 5,
    padding: 5,
    paddingHorizontal: 13,
  },

  hrLine: {
    backgroundColor: theme.primaryLight,
    height: 1
  },

  imgProfile: {
    maxWidth: 120,
    borderRadius: 15,
    marginLeft: 15,
    resizeMode: 'center',
  },

  txtName: {
    color: theme.secondaryColor,
    fontSize: 30,
    textAlign: 'center',
  },

  txtSession: {
    color: "#FFF",
    fontSize: 18,
    marginBottom: 2,
  },

  statsContainer: {
    marginVertical: -2.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  txtStat: {
    color: "#FFF",
    marginBottom: 4,
    fontSize: 12,
  },

  /**
   * Session Container
   */
  sessionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    marginBottom: 20
  },
})

export default Main;