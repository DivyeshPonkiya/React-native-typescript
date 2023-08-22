import React, {useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Header, Item} from '../components/index';
import {IItem} from '../components/AddItem';
import {ScreenProp} from '../navigation/Navigator';

export const List = ({route}: ScreenProp) => {
  console.log(route, 'navigation, route');

  const [shoppingList, setShoppingList] = useState<IItem[]>([]);
  const handleItemRemove = (itemToRemove: string) => {
    const filteredList = shoppingList.filter(
      item => item.item !== itemToRemove,
    );
    setShoppingList(filteredList);
  };
  var total = 0;
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Shopping List" />
      <View style={styles.contentWrapper}>
        <FlatList
          data={shoppingList}
          bounces={true}
          // style={{maxHeight: 350}}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `${item.item}-${index}`}
          renderItem={({item}) => {
            let baseTotal = parseInt(item?.quantity) * parseInt(item?.price);
            total = total + baseTotal;
            return (
              <Item
                item={item.item}
                quantity={item.quantity}
                price={item.price}
                total={baseTotal.toFixed(2)}
                onRemove={() => handleItemRemove(item.item)}
              />
            );
          }}
        />
      </View>
      <View>
        <Text>{total.toFixed(2)}</Text>
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
