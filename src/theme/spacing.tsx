import {Dimensions, ScaledSize} from 'react-native';

const {width, height}: ScaledSize = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth: number = 375;
const guidelineBaseHeight: number = 812;

const scale = (size: number): number => (width / guidelineBaseWidth) * size;
const hs = (size: number): number => (width / guidelineBaseWidth) * size;
const vs = (size: number): number => (height / guidelineBaseHeight) * size;
const ms = (size: number, factor = 0.5): number =>
  size + (scale(size) - size) * factor;

interface Spacing {
  defaultPadding: number;
}

const spacing: Spacing = {
  defaultPadding: ms(20),
};

export {hs, vs, ms, width, height, spacing};
