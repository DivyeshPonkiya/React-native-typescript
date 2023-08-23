import R from 'ramda';
import {StyleSheet} from 'react-native';
import {toast, ToastPosition} from '@backpackapp-io/react-native-toast';

export function isNull(data: string) {
  if (R.isNil(data) || R.isEmpty(data)) {
    return true;
  } else {
    false;
  }
}

export function showToast(message: string, {}) {
  toast(message, {
    duration: 3000,
    position: ToastPosition.BOTTOM,
  });
}

export function rsComa(data: string) {
  var rs = data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // var rs = data.toLocaleString('en-IN');
  return rs;
}

export function CFL(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function LTU(string: string) {
  return string.toUpperCase();
}

export function makeStyleSheetFromTheme(colors: string) {
  return StyleSheet.create(colors);
}
