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

import { theme } from "../../config/app.json";

import BeforeSearch from './BeforeSearch'

const Main = ({ fontLoaded, data }) => {
  const [dataError, setDataError] = useState(false);

  useEffect(() => {
    function setError() {
      setDataError(data === false ? true : false)
    }

    setError()
  }, [data]);

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

  if (!data && !dataError) return (
    <BeforeSearch logo={logo} text="Search for a super hero or villain " fontLoaded={fontLoaded} />
  )

  if (dataError) return (
    <BeforeSearch error={dataError} text={"character with given name not found"} fontLoaded={fontLoaded} />
  )

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {!dataError && data.results.map(char => (
        <View style={styles.container} key={char.id}>

          <View style={styles.profileContainer}>
            <Image
              source={{ uri: char.image.url }}
              style={styles.imgProfile}
            />
            <View style={styles.infoContainer}>
              <Text style={{
                ...styles.txtName,
                fontFamily: fontLoaded ? 'bangers-regular' : 'normal'
              }}>{char.name}</Text>
              <View style={styles.hrLine} />
              <Text style={{
                ...styles.txtSession,
                textAlign: 'center',
                fontFamily: fontLoaded ? 'bangers-regular' : 'normal'
              }}>Powerstats</Text>
              <SafeAreaView>
                <FlatList
                  data={[
                    { id: "item1", statName: 'Intelligence', statPerc: char.powerstats.intelligence / 100 },
                    { id: "item2", statName: 'Strength', statPerc: char.powerstats.strength / 100 },
                    { id: "item3", statName: 'Speed', statPerc: char.powerstats.speed / 100 },
                    { id: "item4", statName: 'Durability', statPerc: char.powerstats.durability / 100 },
                    { id: "item5", statName: 'Power', statPerc: char.powerstats.power / 100 },
                    { id: "item6", statName: 'Combat', statPerc: char.powerstats.combat / 100 },
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
              { name: "Full name", value: char.biography["full-name"] },
              { name: "Alter egos", value: char.biography["alter-egos"] },
              { name: "Aliases", value: char.biography.aliases.join(', ') },
              { name: "Place of birth", value: char.biography["place-of-birth"] },
              { name: "First Appearence", value: char.biography["first-appearance"] },
              { name: "Publisher", value: char.biography.publisher },
              { name: "Alignment", value: char.biography.alignment },
            ]
          )}

          {renderSession(
            "Appearance",
            [
              { name: "Gender", value: char.appearance.gender },
              { name: "Race", value: char.appearance.race },
              { name: "Height", value: char.appearance.height[1] },
              { name: "Weight", value: char.appearance.weight[1] },
              { name: "Eye color:", value: char.appearance["eye-color"] },
              { name: "Hair color:", value: char.appearance["hair-color"] },
            ]
          )}

          {renderSession(
            "Work",
            [
              { name: "Occupation", value: char.work.occupation },
              { name: "Base", value: char.work.base },
            ]
          )}

          {renderSession(
            "Connections",
            [
              { name: "Group Affiliation", value: char.connections["group-affiliation"] },
              { name: "Relatives", value: char.connections.relatives },
            ]
          )}

        </View>
      ))}
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
    minWidth: 380
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
    width: 120,
    height: 400,
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