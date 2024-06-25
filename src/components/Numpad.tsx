import React from 'react';
import {
  StyleSheet,
  View,
  type ImageProps,
  type PressableProps,
  type TextProps,
  type ViewProps,
} from 'react-native';
import { NumpadButton } from './NumPadButton';

interface NumpadProps extends ViewProps {
  onKeyPress: (event: { value: string; type: string }) => void;
  gap?: number;
  numProps?: PressableProps;
  numTextProps?: TextProps;
  decimalImageSource?: ImageProps | '.' | ',';
  deleteImageSource?: ImageProps;
  disable?: boolean;
  decimalKeyHidden?: boolean;
}

export const Numpad: React.FC<NumpadProps> = ({
  onKeyPress,
  gap,
  numProps,
  numTextProps,
  decimalImageSource,
  deleteImageSource,
  disable,
  decimalKeyHidden,
  ...viewProps
}) => {
  const numpadValues = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', '⌫'],
  ];

  return (
    <View style={[styles.container, { paddingBottom: gap }]} {...viewProps}>
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
              onPress={(value, type) => onKeyPress({ value, type })}
              pressableProps={numProps}
              textProps={numTextProps}
              decimalImageSource={item === '.' ? decimalImageSource : undefined}
              deleteImageSource={item === '⌫' ? deleteImageSource : undefined}
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
