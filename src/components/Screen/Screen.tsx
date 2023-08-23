/* eslint-disable complexity */
import styles, {
  isNonScrolling,
  offsets,
} from '@/components/Screen/Screen.styles';
import {theme} from '@/theme';
import PropTypes from 'prop-types';
import * as React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const isIos = Platform.OS === 'ios';

function ScreenWithoutScrolling(props) {
  const insets = useSafeAreaInsets();
  const style = props.style || {};
  const backgroundStyle = props.backgroundColor
    ? {backgroundColor: props.backgroundColor}
    : {};
  const insetStyle = {paddingTop: props.unsafe ? 0 : insets.top};

  return (
    <KeyboardAvoidingView
      style={[styles.fixedOuter, backgroundStyle]}
      behavior={isIos ? 'padding' : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}>
      <StatusBar barStyle={props.statusBar || 'dark-content'} />
      <SafeAreaView style={[styles.fixedInner, style, insetStyle]}>
        {props.children}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

function ScreenWithScrolling(props) {
  const insets = useSafeAreaInsets();
  // eslint-disable-next-line no-unused-vars
  const style = props.style || {};
  const backgroundStyle = props.backgroundColor
    ? {backgroundColor: props.backgroundColor}
    : {};
  const bounces = props.bounces || false;
  const insetStyle = {paddingTop: props.unsafe ? 0 : insets.top};

  return (
    <KeyboardAvoidingView
      style={[styles.scrollOuter, backgroundStyle]}
      behavior={isIos ? 'padding' : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}>
      <StatusBar barStyle={props.statusBar || 'light-content'} />
      <SafeAreaView style={[styles.scrollOuter, backgroundStyle, insetStyle]}>
        <ScrollView
          nestedScrollEnabled
          bounces={bounces}
          style={[styles.scrollOuter, backgroundStyle]}
          // contentContainerStyle={[styles.scrollInner, style]}
          keyboardShouldPersistTaps={
            props.keyboardShouldPersistTaps || 'handled'
          }
          refreshControl={props.refreshControl}>
          {props.children}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function Screen(props) {
  if (isNonScrolling(props.preset)) {
    return <ScreenWithoutScrolling {...props} />;
  } else {
    return <ScreenWithScrolling {...props} />;
  }
}

Screen.propTypes = {
  preset: PropTypes.any,
};

ScreenWithoutScrolling.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  keyboardOffset: PropTypes.string,
  statusBar: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  unsafe: PropTypes.bool,
};
ScreenWithoutScrolling.defaultProps = {
  unsafe: true,
  style: {},
};
ScreenWithScrolling.propTypes = {
  ...ScreenWithoutScrolling.propTypes,
  keyboardShouldPersistTaps: PropTypes.string,
  refreshControl: PropTypes.object,
};
ScreenWithScrolling.defaultProps = {
  ...ScreenWithoutScrolling.defaultProps,
};
