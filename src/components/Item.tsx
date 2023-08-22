import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import {IItem} from './AddItem';

export const Item: React.FC<IItem> = ({
  item,
  quantity,
  price,
  total,
  onRemove,
}) => {
  return (
    <TouchableOpacity onPress={onRemove} style={styles.mainBox}>
      <View style={styles.item}>
        <Text style={styles.itemName}>{item}</Text>
        <View style={styles.qtyPriceView}>
          <Text style={styles.quantity}>
            {'Qty: '}
            {quantity}
          </Text>
          <Text style={styles.quantity}>{'*'}</Text>
          <Text style={styles.quantity}>
            {'Price: '}
            {price}
          </Text>
        </View>
      </View>
      <Text style={styles.total}>
        {'Total: '}
        {total}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  mainBox: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  qtyPriceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontWeight: '500',
  },
  quantity: {
    padding: 6,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    marginLeft: 10,
  },
  total: {
    padding: 6,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    alignSelf: 'flex-end',
    marginTop: 10,
  },
});
