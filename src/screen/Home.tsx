import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Header, AddItem} from '../components/index';
import {IItem} from '../components/AddItem';
import {ScreenProp} from '../navigation/Navigator';

export const Home = ({navigation}: ScreenProp) => {
  const [shoppingList, setShoppingList] = useState<IItem[]>([]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Shopping List" />
      <View style={styles.contentWrapper}>
        <AddItem
          setShoppingList={setShoppingList}
          shoppingList={shoppingList}
          navigation={navigation}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF',
  },
  contentWrapper: {
    padding: 20,
  },
});
