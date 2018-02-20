// @flow

import { StyleSheet, Text, View } from 'react-native';
import theme from 'mobileapp/src/theme';

export default StyleSheet.create({
  welcome: {
    ...theme.fonts.header,
    textAlign: 'center',
    margin: theme.grid.x1,
  },
  contentContainer: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  }
});
