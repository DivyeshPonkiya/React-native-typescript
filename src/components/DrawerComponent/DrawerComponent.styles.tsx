import {height, hs, ms, theme, typography, vs, width} from '@/theme';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
    borderTopRightRadius: ms(10),
    borderBottomRightRadius: ms(10),
  },
  profileSectionContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    marginHorizontal: hs(10),
    paddingBottom: vs(20),
    paddingTop: (height * 7) / 100,
  },
  userImageView: {
    height: ms(60),
    width: ms(60),
    borderRadius: ms(12),
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImage: {
    height: ms(35),
    width: ms(35),
    resizeMode: 'contain',
  },
  userNameText: {
    ...typography._12PoppinsSemiBold,
    color: theme.colors.logoColor,
    marginBottom: vs(5),
  },
  HappyTextIcon: {
    height: vs(15),
    width: hs(85),
    resizeMode: 'contain',
  },
  borderView: {
    backgroundColor: theme.colors.logoColor,
    paddingVertical: vs(3),
    borderRadius: ms(6),
    marginBottom: vs(10),
  },
  nameContainer: {
    marginLeft: ms(12),
    justifyContent: 'center',
  },
  drawerItemsContainer: {
    paddingVertical: vs(10),
    width: '100%',
    justifyContent: 'center',
  },
  drawerItemsStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: hs(5),
  },
  itemImage: {
    height: ms(20),
    width: ms(20),
    resizeMode: 'contain',
    tintColor: theme.colors.white,
  },
  itemText: {
    ...typography._12PoppinsSemiBold,
    color: theme.colors.white,
    marginLeft: -15,
  },
  selectedItemText: {
    color: theme.colors.secondary,
  },
  imgBackground: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemView: {
    marginVertical: 0,
    padding: 2,
    width: (width * 60) / 100,
  },
  selectItemView: {
    marginVertical: 0,
    padding: 2,
    width: (width * 60) / 100,
    borderRadius: ms(12),
  },
});

export default styles;
