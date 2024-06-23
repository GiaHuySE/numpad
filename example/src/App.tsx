import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import Numpad from './components/NumpadKeyBoard';

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState('');

  const handleNumpadPress = (value: string) => {
    if (value === '⌫') {
      setInputValue(inputValue.slice(0, -1));
    } else {
      setInputValue(inputValue + value);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Numpad
        disable={false}
        onKeyPress={handleNumpadPress}
        gap={0}
        numTextProps={{ style: { color: 'blue' } }}
        decimalKeyHidden={false}
        decimalImageSource={','}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    fontSize: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    padding: 10,
    textAlign: 'center',
  },
});

export default App;
