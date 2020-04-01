import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import ActionSheet, { addHasReachedTopListener, removeHasReachedTopListener } from 'react-native-actions-sheet';
import MapView, { Callout, Marker } from 'react-native-maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { CText } from '../components/text';
import { width, height, PLACES } from '../common/static';
import { images } from '../common/images';

const SearchResultDetailScreen = () => {
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
      <SafeAreaView style={styles.container}>
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
                image={images.marker}
              />
            );
          })}
        </MapView>

        <Callout style={styles.backHeader}>
          <CText title={'Space within 5 miles of'} opacity={0.3} />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', elevation: 3 }}>
            <View style={{ flexDirection: 'row' }}>
              <MaterialCommunityIcons name="map-marker" size={18} style={{ opacity: 0.5, marginLeft: -5 }} />
              <CText title={'buckingham palace, westminster, lon…'} fontSize={13} />
            </View>
            
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons name="lead-pencil" size={18} color={'#0029ff'} />
              <CText title={'Modify'} fontFamily={'Rubik-Medium'} color={'#0029ff'} marginLeft={3} fontWeight={'500'} />
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

            <CText title={'HubbleHQ'} fontFamily={'Rubik-Medium'} fontSize={20} marginBottom={8} fontWeight={'500'} />

            <View style={{ flexDirection: 'row' }}>
              <Ionicons name="ios-star" size={18} color={'yellow'} />
              <Ionicons name="ios-star" size={18} color={'yellow'} />
              <Ionicons name="ios-star" size={18} color={'yellow'} />
              <Ionicons name="ios-star" size={18} color={'yellow'} />
              <Ionicons name="ios-star-half" size={18} color={'yellow'} />
              <CText title={'4.5'} fontSize={14} marginLeft={3} />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
              <CText title={'EC1R, London'} opacity={0.5} />

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Feather name="corner-left-down" size={12} style={{ opacity: 0.5 }} />
                <CText title={'GET DIRECTION'} fontSize={11} marginLeft={3} marginRight={20} />
              </View>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Image source={images.demo1} style={styles.img} />
              <Image source={images.demo2} style={styles.img} />
              <Image source={images.demo3} style={styles.img} />
              <Image source={images.demo4} style={styles.img} />
            </ScrollView>

            <CText title={'Space Available'} fontSize={16} fontFamily={'Rubik-Medium'} marginTop={14} fontWeight={'500'} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
              <CText title={'7 Desks available'} fontSize={13} />
              <CText title={'£350 / person'} fontSize={13} fontFamily={'Rubik-Medium'} fontWeight={'500'} marginRight={20} />
            </View>

            <CText title={'Amenities'} fontSize={16} fontFamily={'Rubik-Medium'} marginTop={14} fontWeight={'500'} />

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 13 }}>
              <EvilIcons name="check" size={18} />
              <CText title={'Free Wifi'} fontSize={13} marginLeft={3} />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 13 }}>
              <EvilIcons name="check" size={18} />
              <CText title={'Coffee & Tea Machines'} fontSize={13} marginLeft={20} />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 13 }}>
              <EvilIcons name="check" size={18} />
              <CText title={'Meeting Rooms'} fontSize={13} marginLeft={3} />
            </View>

            <View style={{ height: 60 }} />

          </ScrollView>

          <View style={styles.bottom}>
            <View style={styles.chatBtn}>
              <Image source={images.chat} style={{ width: 15, height: 13 }} />
              <CText title={'Chat'} fontSize={14} marginLeft={5} lineHeight={16} />
            </View>

            <View style={styles.bookBtn}>
              <CText title={'Book Now'} fontSize={14} fontFamily={'Rubik-Medium'} lineHeight={16} fontWeight={'500'} color={'#fff'} />
            </View>

          </View>

        </ActionSheet>
      </SafeAreaView>
    </>
  );
};

export default SearchResultDetailScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
  },
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
  img: {
    width: 215,
    height: 130,
    borderRadius: 6,
    marginRight: 12,
    marginVertical: 13
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
})