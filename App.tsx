import React from 'react';
//import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';

/* import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen'; */

//import HomeScreen from './screens/HomeScreen';
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
