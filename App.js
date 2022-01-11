import {StatusBar} from 'expo-status-bar';
import {StyleSheet, ActivityIndicator, Text, View, ScrollView, Dimensions, Image} from 'react-native';
import {useEffect, useState} from "react";
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';


const {width: SCREEN_WIDTH} = Dimensions.get('window');
const API_KEY = "dd4f3e227774a294cbdd1e924a02bc04";

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const getWeather = async () => {
    const {granted} = await Location.requestForegroundPermissionsAsync()
    if (!granted) {
      setOk(false);
    }
    const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync();
    const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps: false})
    setCity(location[0].region)
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&lang=kr&units=metric`)
    const json = await response.json();
    setDays(json.daily)
    console.log(json.daily[0])
  }
  useEffect(() => {
    getWeather()
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled // 살짝 걸리는 듯한 느낌이 나면서 페이징이 됨
        contentContainer={styles.weather}>
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator size="large" color="#fff"/>
          </View>
        ) : (
          days.map((day, index) =>
            <View key={index} style={styles.day}>
              <Feather name="cloud" size={24} color="black" />
              <Text style={styles.temp}>{parseFloat(day.temp.day).toFixed(1)}</Text>
              <Text style={styles.desc}>{day.weather[0].main}</Text>
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
            </View>
          )
        )
        }
      </ScrollView>
    </View>tomato
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  city: {
    flex: 1.2,
    backgroundColor: "",
    justifyContent: "center",
    alignItems: "center"
  },
  cityName: {
    fontSize: 68,
    color: "black",
    fontWeight: "500"
  },
  weather: {
    flex: 3,
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontSize: 178,
  },
  desc: {
    marginTop: -30,
    fontSize: 60,
  },
  tinyText: {
    fontSize: 20,
  },
  icon : {
    width : 10,
    height : 10,
  }
});
