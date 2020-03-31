import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import ActionSheet, { addHasReachedTopListener, removeHasReachedTopListener } from 'react-native-actions-sheet';
import MapView, { Callout, Marker } from 'react-native-maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const { width, height } = Dimensions.get('window');
const PLACES = [
  { lat: 40.767238, lng: -73.9866 }
]

const App = () => {
  const [nestedScrollEnabled, setNestedScrollEnabled] = useState(false);

  let actionSheet;

  const _onHasReachedTop = () => {
    setNestedScrollEnabled(true);
  }

  useEffect(() => {
    addHasReachedTopListener(_onHasReachedTop)
    return () => {
      removeHasReachedTopListener(_onHasReachedTop)
    }
  }, [])

  const _onClose = () => {
    setNestedScrollEnabled(false);
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={{
          justifyContent: 'center',
          flex: 1,
          flexDirection: 'column',
        }}>

        <MapView
          style={styles.mapcontainer}
          zoomEnabled={true}
          moveOnMarkerPress={true}
          showsCompass={false}
          loadingEnabled
          pitchEnabled={false}
          toolbarEnabled={false}
          initialRegion={{
            latitude: 40.767238,
            longitude: -73.9866,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {PLACES.map((marker, index) => {
            const coords = {
              latitude: parseFloat(
                marker.lat,
              ),
              longitude: parseFloat(
                marker.lng,
              ),
            };

            return (
              <Marker
                coordinate={coords}
                key={index}
                onPress={() => {
                  actionSheet.setModalVisible();
                }}
                image={require('./assets/marker.png')}
              />
            );
          })}
        </MapView>


        <Callout
          style={styles.backHeader}
        >
          <Text style={styles.text1}>Space within 5 miles of</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row' }}>
              <MaterialCommunityIcons name="map-marker" size={18} style={{ opacity: 0.5 }} />
              <Text style={styles.text2}>buckingham palace, westminster, lon…</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <MaterialCommunityIcons name="lead-pencil" size={18} color={'#0029ff'} />
              <Text style={styles.text3}>Modify</Text>
            </View>
          </View>
        </Callout>

        <ActionSheet
          initialOffsetFromBottom={0.5}
          ref={ref => (actionSheet = ref)}
          bounceOnOpen={true}
          bounciness={8}
          gestureEnabled={true}
          onClose={_onClose}

          defaultOverlayOpacity={0.3}>
          <ScrollView
            nestedScrollEnabled={true}
            scrollEnabled={nestedScrollEnabled}
            style={{
              width: '100%',
              maxHeight: 500,
              padding: 20,
              paddingRight: 0
            }}>
            <Text style={styles.text4}>HubbleHQ</Text>
            <View style={{ flexDirection: 'row'}}>
              <Ionicons name="ios-star" size={18} color={'yellow'} />
              <Ionicons name="ios-star" size={18} color={'yellow'} />
              <Ionicons name="ios-star" size={18} color={'yellow'} />
              <Ionicons name="ios-star" size={18} color={'yellow'} />
              <Ionicons name="ios-star-half" size={18} color={'yellow'} />
              <Text style={styles.text5}>4.5</Text>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                <Text style={styles.text6}>EC1R, London</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                  <Feather name="corner-left-down" size={12} style={{ opacity: 0.5 }} />
                  <Text style={styles.text7}>GET DIRECTION</Text>
                </View>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Image source={require('./assets/demo1.png')} style={styles.img}/>
              <Image source={require('./assets/demo2.png')} style={styles.img}/>
              <Image source={require('./assets/demo2.jpg')} style={styles.img}/>
              <Image source={require('./assets/demo2.jpg')} style={styles.img}/>
            </ScrollView>
          </ScrollView>

        </ActionSheet>
      </SafeAreaView>
    </>
  );
};

export default App;


const styles = StyleSheet.create({
  mapcontainer: {
    width: width,
    height: height,
  },
  backHeader: {
    top: 0,
    shadowColor: 'rgba(71, 77, 96, 0.1)',
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 6,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 15,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: '#ffffff',
    width,
    height: 64,
    paddingHorizontal: 20,
    paddingVertical: 14
  },
  text1: {
    opacity: 0.3,
    color: '#000000',
    fontFamily: 'Rubik',
    fontSize: 12,
    fontWeight: '400',
  },
  text2: {
    color: '#000000',
    fontFamily: 'Rubik',
    fontSize: 13,
    fontWeight: '400',
  },
  text3: {
    color: '#0029ff',
    fontFamily: 'Rubik Medium',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 3
  },
  text4: {
    fontFamily: 'Rubik Medium',
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 8
  },
  text5:{
    fontSize: 14,
    marginLeft: 3
  },
  text6: {
    fontFamily: 'Rubik',
    fontSize: 12,
    opacity: 0.5,
    color: '#000000',
    fontWeight: '400',
  },
  text7: {
    fontFamily: 'Rubik',
    fontSize: 11,
    fontWeight: '400',
    marginLeft: 3,
    marginRight: 20
  },
  img: {
    width: 215,
    height: 130,
    borderRadius: 6,
    marginRight: 12,
    marginVertical: 13
  }
})