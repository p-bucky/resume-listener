import React from 'react';
import {SafeAreaView} from 'react-native';
import {Home} from '@screens/home';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <SafeAreaView>
      <GestureHandlerRootView>
        <Home />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default App;
