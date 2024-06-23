import React from 'react';
import {
  StyleSheet,
  View,
  type ImageProps,
  type PressableProps,
  type TextProps,
} from 'react-native';
import NumpadButton from './NumPadButton';

interface NumpadProps {
  onKeyPress: (value: string) => void;
  gap?: number;
  numProps?: PressableProps;
  numTextProps?: TextProps;
  decimalImageSource?: ImageProps | '.' | ',';
  disable?: boolean;
  decimalKeyHidden?: boolean;
}

const Numpad: React.FC<NumpadProps> = ({
  onKeyPress,
  gap = 10,
  numProps,
  numTextProps,
  decimalImageSource,
  disable,
  decimalKeyHidden,
}) => {
  const numpadValues = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', '⌫'],
  ];

  return (
    <View style={[styles.container, { paddingBottom: gap }]}>
      {numpadValues.map((row, rowIndex) => (
        <View
          key={rowIndex}
          style={[
            styles.row,
            { marginBottom: rowIndex !== numpadValues.length - 1 ? gap : 0 },
          ]}
        >
          {row.map((item) => (
            <NumpadButton
              disable={disable}
              key={item}
              value={item}
              onPress={onKeyPress}
              pressableProps={numProps}
              textProps={numTextProps}
              decimalImageSource={item === '.' ? decimalImageSource : undefined}
              decimalKeyHidden={decimalKeyHidden}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Numpad;
