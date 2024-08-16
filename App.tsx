import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';


import MainScreen from './screens/MainScreen';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.appContainer}>
      <MainScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});

export default App;
