import React from 'react';
import type {
  ImageProps,
  ImageStyle,
  PressableProps,
  TextProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { Image, Pressable, StyleSheet, Text } from 'react-native';

interface NumpadButtonProps {
  value: string;
  onPress: (value: string) => void;
  pressableProps?: PressableProps;
  textProps?: TextProps;
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconStyle?: ImageStyle;
  disable?: boolean;
  decimalKeyHidden?: boolean;
  decimalImageSource?: ImageProps | '.' | ',';
}

const NumpadButton: React.FC<NumpadButtonProps> = ({
  value,
  onPress,
  pressableProps,
  textProps,
  style,
  textStyle,
  iconStyle,
  disable,
  decimalKeyHidden = true,
  decimalImageSource,
}) => {
  const isDecimalButton = value === '.' || value === ',';
  const isDeleteButton = value === '⌫';
  const deleteImage = require('../../assets/delete.png');

  let decimalImage;
  if (decimalImageSource === '.') {
    decimalImage = require('../../assets/dot-icon.png');
  } else if (decimalImageSource === ',') {
    decimalImage = require('../../assets/comma-icon.png');
  } else if (decimalImageSource && typeof decimalImageSource !== 'string') {
    decimalImage = decimalImageSource;
  }
  return (
    <Pressable
      {...pressableProps}
      disabled={disable}
      style={[styles.button, style]}
      onPress={() => onPress(value)}
    >
      {isDeleteButton ? (
        <Image source={deleteImage} style={[styles.icon, iconStyle]} />
      ) : isDecimalButton && decimalKeyHidden ? (
        <Image source={decimalImage} style={[styles.icon, iconStyle]} />
      ) : (
        <Text style={[styles.buttonText, textStyle]} {...textProps}>
          {value}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonText: {
    fontSize: 24,
    color: '#333',
  },
  icon: {
    width: 16,
    height: 16,
  },
});

export default NumpadButton;
