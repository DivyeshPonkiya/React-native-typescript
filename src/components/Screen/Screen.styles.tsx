import {theme, typography} from '@/theme';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fixedOuter: {
    backgroundColor: theme.colors.white,
    flex: 1,
    height: '100%',
  },
  fixedInner: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    height: '100%',
    width: '100%',
  },
  scrollOuter: {
    backgroundColor: theme.colors.white,
    flex: 1,
    height: '100%',
  },
  scrollInner: {justifyContent: 'flex-start', alignItems: 'stretch'},
});

export default styles;

/**
 * All screen keyboard offsets.
 */
export const offsets = {
  none: 0,
};

/**
 * Is this preset a non-scrolling one?
 *
 * @param preset The preset to check
 */
export function isNonScrolling(preset: string) {
  // any of these things will make you scroll
  return !preset || preset === 'fixed';
}
