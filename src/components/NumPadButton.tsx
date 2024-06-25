import React from 'react';
import type {
  ImageProps,
  ImageStyle,
  PressableProps,
  TextProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface NumpadButtonProps {
  value: string;
  onPress: (value: string, type: string) => void;
  pressableProps?: PressableProps;
  textProps?: TextProps;
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconStyle?: ImageStyle;
  disable?: boolean;
  decimalKeyHidden?: boolean;
  decimalImageSource?: ImageProps | '.' | ',';
  deleteImageSource?: ImageProps;
}
let decimalImage: ImageProps;
export const NumpadButton: React.FC<NumpadButtonProps> = ({
  value,
  onPress,
  pressableProps,
  textProps,
  style,
  textStyle,
  iconStyle,
  disable,
  decimalKeyHidden = false,
  decimalImageSource,
  deleteImageSource,
}) => {
  const isDecimalButton = value === '.' || value === ',';
  const isDeleteButton = value === '⌫';
  const deleteImage = deleteImageSource || require('./delete.png');

  if (decimalImageSource === '.') {
    decimalImage = require('./dot-icon.png');
  } else if (decimalImageSource === ',') {
    decimalImage = require('./comma-icon.png');
  } else if (decimalImageSource && typeof decimalImageSource !== 'string') {
    decimalImage = decimalImageSource;
  }

  if (isDecimalButton && decimalKeyHidden) {
    return <View style={[styles.button, style]} />;
  }

  return (
    <Pressable
      {...pressableProps}
      disabled={disable}
      style={[styles.button, style]}
      onPress={() =>
        onPress(
          value,
          isDeleteButton ? 'delete' : isDecimalButton ? 'decimal' : 'key'
        )
      }
    >
      {isDeleteButton ? (
        <Image
          source={deleteImage}
          style={StyleSheet.flatten([styles.icon, iconStyle])}
        />
      ) : isDecimalButton && decimalImage ? (
        <Image
          source={decimalImage}
          style={StyleSheet.flatten([styles.icon, iconStyle])}
        />
      ) : (
        <Text
          style={StyleSheet.flatten([styles.buttonText, textStyle])}
          {...textProps}
        >
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
