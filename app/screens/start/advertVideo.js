import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');
const videoAspectRatio = 16 / 9; // Aspect ratio for the video (16:9 in this example)
const videoHeight = screenWidth / videoAspectRatio; 

const AdvertVideo = () => {
  const videoRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    // Play video when the component comes into focus
    const focusUnsubscribe = navigation.addListener('focus', () => {
      videoRef.current.playAsync();
    });

    // Pause video when the component loses focus
    const blurUnsubscribe = navigation.addListener('blur', () => {
      videoRef.current.pauseAsync();
    });

    return () => {
      focusUnsubscribe();
      blurUnsubscribe();
    };
  }, [navigation]);

  // Function to handle video playback status and navigate when finished
  const handlePlaybackStatusUpdate = (status) => {
    if (status.didJustFinish) {
      // Navigate to the landing page when the video finishes
      navigation.navigate('Landing');
    }
  };

  const handleSkip = () => {
    // Navigate to the landing page on skip button click
    navigation.navigate('Landing');
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={require('../../../assets/XKROW_ADS.mp4')}
        style={{ width: screenWidth, height: videoHeight }} 
        resizeMode="contain" // Maintain the aspect ratio without stretching the video
        shouldPlay={false} // Starts paused, we play it in useEffect
        isLooping={false}
        useNativeControls={false}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate} // Monitor playback status
      />
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  skipButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 5,
  },
  skipText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AdvertVideo;
