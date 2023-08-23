/* eslint-disable react/no-unstable-nested-components */
import {Icons} from '@/assets';
import {NAVIGATION} from '@/constants';
import {strings} from '@/localization';
import {reset} from '@/navigation/NavigationRef';
import ItemAddListActions from '@/reducers/ItemAddListReducer';
import LoginActions from '@/reducers/LoginReducer';
import {LoginData} from '@/selectors/LoginSelector';
import {theme} from '@/theme';
import {DrawerItem} from '@react-navigation/drawer';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {Alert, Image, Pressable, SafeAreaView, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Screen} from '../Screen/Screen';
import styles from './DrawerComponent.styles';

const DrawerItems = ({element}) => {
  return (
    <Pressable
      accessibilityRole="button"
      style={styles.drawerItemsContainer}
      onPress={() => {}}>
      <View style={styles.drawerItemsStyles}>
        <View style={styles.imgBackground}>
          <Image
            accessibilityIgnoresInvertColors
            source={element.icon}
            style={styles.itemImage}
            resizeMode="center"
          />
        </View>
      </View>
    </Pressable>
  );
};

const handleDrawerItemAction = (
  navigation,
  element,
  dispatch,
  dataLoginData,
) => {
  if (element?.title === strings.Logout) {
    Alert.alert(strings.LogoutAlert, strings.AreyousureLogoutthisaccount, [
      {
        text: 'Yes',
        onPress: () => {
          dispatch(LoginActions.autoLogoutData());
          navigation.closeDrawer();
        },
      },
      {
        text: 'No',
        style: 'cancel',
        onPress: () => {
          navigation.closeDrawer();
        },
      },
    ]);
  } else if (element?.title === strings.AccountDelete) {
    Alert.alert(
      strings.AccountdeleteAlert,
      strings.Areyousurethisaccountdelete,
      [
        {
          text: 'Yes',
          onPress: () => {
            dispatch(ItemAddListActions.accountDeleteRequest(dataLoginData.id));
            navigation.closeDrawer();
          },
        },
        {
          text: 'No',
          style: 'cancel',
          onPress: () => {
            navigation.closeDrawer();
          },
        },
      ],
    );
  } else {
    navigation.navigate(element.screen);
    reset(element.screen);
    dispatch(ItemAddListActions.ListClearRequest(null));
  }
};

function UserProfileSection({GetSettings, dataLoginData}) {
  return (
    <View>
      <View style={styles.profileSectionContainer}>
        <View style={styles.userImageView}>
          <Image source={Icons.Logo} style={styles.userImage} />
        </View>
        <View style={styles.nameContainer}>
          {dataLoginData != null && (
            <>
              <Text style={styles.userNameText} numberOfLines={1}>
                {dataLoginData.name}
              </Text>
              <Text style={styles.userNameText} numberOfLines={1}>
                {dataLoginData.is_superuser === true
                  ? strings.Administrator
                  : strings.SiteUser}
              </Text>
            </>
          )}
          <Image source={Icons.HappyTextIcon} style={styles.HappyTextIcon} />
        </View>
      </View>
      <View style={styles.borderView} />
    </View>
  );
}

export function DrawerComponent(props) {
  const {navigation} = props;

  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const dataLoginData = useSelector(LoginData);

  const [drawerItems, setDrawerItems] = useState([]);

  useEffect(() => {
    const navData = navigation.getState();
    if (
      navData?.history != undefined &&
      navData?.history[navData?.history?.length - 1]
    ) {
      let lastScreenOb = navData?.history[navData?.history?.length - 1];
      if (lastScreenOb != undefined && lastScreenOb.type === 'route') {
        let ScreenObIndex = navData?.routes.findIndex(
          ({key}) => key === lastScreenOb?.key,
        );
        if (ScreenObIndex != -1) {
          let ScreenOb = navData?.routes[ScreenObIndex];
          switch (ScreenOb?.name) {
            case 'Home':
              setIndex(0);
              break;
            case 'Report':
              setIndex(1);
              break;
            case 'User':
              setIndex(2);
              break;
            case 'ExpensesTypeList':
              setIndex(3);
              break;
            case 'ExpensesList':
              setIndex(4);
              break;
            case 'SiteList':
              setIndex(5);
              break;
            case 'VenderList':
              setIndex(6);
              break;
            default:
              break;
          }
        }
      }
    }
  }, [navigation.getState()]);

  const drawerUserItems = [
    {
      title: strings.Dashboard,
      icon: Icons.dashboard,
      stack: NAVIGATION.home,
      screen: NAVIGATION.home,
    },
    {
      title: strings.Report,
      icon: Icons.report,
      stack: NAVIGATION.Report,
      screen: NAVIGATION.Report,
    },
    {
      title: strings.Expenses,
      icon: Icons.expenses,
      stack: NAVIGATION.ExpensesList,
      screen: NAVIGATION.ExpensesList,
    },
    {
      title: strings.AccountDelete,
      icon: Icons.expenses,
      stack: NAVIGATION.login,
      screen: NAVIGATION.login,
    },
    {
      title: strings.Logout,
      icon: Icons.expenses,
      stack: NAVIGATION.login,
      screen: NAVIGATION.login,
    },
  ];

  useEffect(() => {
    setDrawerItems([]);
    setDrawerItems(oldArray => [...oldArray, ...drawerUserItems]);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <UserProfileSection
        navigation={props.navigation}
        dataLoginData={dataLoginData}
      />
      <Screen
        backgroundColor={theme.colors.transparent}
        preset={'scroll'}
        statusBar={'dark-content'}>
        {drawerItems.length != 0 &&
          drawerItems.map((element, i) => {
            return (
              <View key={i}>
                <DrawerItem
                  focused={i === index}
                  style={i === index ? styles.selectItemView : styles.itemView}
                  activeBackgroundColor={theme.colors.logoColor}
                  label={({focused}) => (
                    <Text
                      ellipsizeMode={'middle'}
                      style={[
                        styles.itemText,
                        focused && styles.selectedItemText,
                      ]}
                      numberOfLines={1}>
                      {element.title}
                    </Text>
                  )}
                  icon={({focused}) => (
                    <View style={styles.drawerItemsStyles}>
                      <View
                        style={[
                          styles.imgBackground,
                          focused && styles.selectedBackground,
                        ]}>
                        <Image
                          accessibilityIgnoresInvertColors
                          source={element.icon}
                          style={[
                            styles.itemImage,
                            focused && {
                              tintColor: theme.colors.secondary,
                            },
                          ]}
                        />
                      </View>
                    </View>
                  )}
                  onPress={() => {
                    setIndex(i);
                    handleDrawerItemAction(
                      props.navigation,
                      element,
                      dispatch,
                      dataLoginData,
                    );
                  }}
                />
              </View>
            );
          })}
      </Screen>
    </SafeAreaView>
  );
}

DrawerItems.propTypes = {
  element: PropTypes.object,
  navigation: PropTypes.object,
};

UserProfileSection.propTypes = {
  fullName: PropTypes.string,
  email: PropTypes.string,
  profileImage: PropTypes.string,
  position: PropTypes.string,
};
