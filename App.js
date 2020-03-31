import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
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
import EvilIcons from 'react-native-vector-icons/EvilIcons';

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
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', elevation: 3 }}>
            <View style={{ flexDirection: 'row' }}>
              <MaterialCommunityIcons name="map-marker" size={18} style={{ opacity: 0.5, marginLeft: -5 }} />
              <Text style={styles.text2}>buckingham palace, westminster, lon…</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
              height: 400,
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

            <Text style={styles.text8}>Space Available</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8}}>
                <Text style={styles.text2}>7 Desks available</Text>
                <Text style={styles.text9}>£350 / person</Text>
            </View>

            <Text style={styles.text8}>Amenities</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 13}}>
              <EvilIcons name="check" size={18} />
              <Text style={[styles.text2, { marginLeft: 3}]}>Free Wifi</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 13}}>
              <EvilIcons name="check" size={18} />
              <Text style={[styles.text2, { marginLeft: 20}]}>Coffee & Tea Machines</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 13}}>
              <EvilIcons name="check" size={18} />
              <Text style={[styles.text2, { marginLeft: 3}]}>Meeting Rooms</Text>
            </View>

            <View style={{ height: 60}}/>

          </ScrollView>

          <View style={styles.bottom}>
            <View style={styles.chatBtn}>
              <Image source={require('./assets/chat.png')} style={{ width:15, height: 13}}/>
              <Text style={styles.text10}>Chat</Text>
            </View>

            <View style={styles.bookBtn}>
              <Text style={styles.text11}>Book Now</Text>
            </View>
            
          </View>

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
    paddingVertical: 14,
    borderRadius: 20,
    elevation: 3,
    overflow: 'hidden',
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
    fontFamily: 'Rubik-Medium',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 3
  },
  text4: {
    fontFamily: 'Rubik-Medium',
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
  },
  text8: {
    color: '#000000',
    fontFamily: 'Rubik-Medium',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 14
  },
  text9: {
    fontFamily: 'Rubik-Medium',
    fontSize: 13,
    fontWeight: '500',
    marginRight: 20
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: 'rgba(71, 77, 96, 0.1)',
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 6,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: -4, height: 4 },
    shadowRadius: 15,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    height: 60,
    width,
    elevation: 5
  },
  text10: {
    fontFamily: 'Rubik',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
    marginLeft: 5
  },
  chatBtn: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    borderRadius: 6,
    borderColor: '#000000',
    borderStyle: 'solid',
    borderWidth: 2,
    backgroundColor: '#ffffff',
    width: 109,
    height: 40,
  },
  bookBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: '#0029ff',
    flex: 1,
    marginLeft: 8,
    marginRight: 20,
    height: 40,
  },
  text11: {
    color: '#ffffff',
    fontFamily: 'Rubik Medium',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 16,
  }
})