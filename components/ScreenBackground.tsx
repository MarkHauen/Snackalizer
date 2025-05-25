import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

type ScreenBackgroundProps = {
  children: React.ReactNode;
};

export default function ScreenBackground({ children }: ScreenBackgroundProps) {
  return (
    <ImageBackground
      source={require('../assets/background.png')} 
      style={styles.background}
        resizeMode="cover"
      imageStyle={styles.image}
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    //backgroundColor: '#18181b', // fallback bg-zinc-900
  },
  image: {
    opacity: 0.99, // Lower for subtlety; raise if you want it more visible
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});