import React, { Component } from 'react';
import { YellowBox, KeyboardAvoidingView, Platform } from 'react-native';
import { Router } from './src/router';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount',
  'Warning: componentWillReceiveProps',
  'Calling bridge.imageLoader is deprecated',
  'Warning: AsyncStorage has been extracted',
]);

export default class App extends Component {
  render() {
    return (
      <KeyboardAvoidingView
        {...Platform.OS === 'ios' && { behavior: 'padding' }}
        style={{ flex: 1 }}>
        <Router />
      </KeyboardAvoidingView>
    );
  }
}
