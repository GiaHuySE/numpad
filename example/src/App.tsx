import React from 'react';
import { View } from 'react-native';
import { Numpad } from './components/Numpad';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <Numpad
        onKeyPress={() => {}}
        deleteImageSource={require('./components/x.png')}
      />
    </View>
  );
};

export default App;
