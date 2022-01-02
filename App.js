import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, ScrollView, Dimensions,} from 'react-native';


const {width: SCREEN_WIDTH} = Dimensions.get('window');

console.log(SCREEN_WIDTH)

export default function App() {

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled // 살짝 걸리는 듯한 느낌이 나면서 페이징이 됨
        contentContainer={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  city: {
    flex: 1.2,
    backgroundColor: "tomato",
    justifyContent: "center",
    alignItems: "center"
  },
  cityName: {
    fontSize: 68,
    color: "white",
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
  }
});
