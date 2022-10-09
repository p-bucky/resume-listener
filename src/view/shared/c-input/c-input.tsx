import {colors} from '@assets/theme/color';
import React, {FC} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

interface CInputProps {
  placeholder?: string;
}

export const CInput: FC<CInputProps> = ({placeholder = ''}) => {
  return (
    <View>
      <TextInput style={styles.input} placeholder={placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 5,
    fontSize: 17,
  },
});
