import React, {createRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

export interface IItem {
  item: string;
  quantity: string;
  price: string;
  total: string;
  onRemove: () => void;
}
interface Props {
  setShoppingList: React.Dispatch<React.SetStateAction<IItem[]>>;
  shoppingList: IItem[];
  navigation: object;
}

type InputRef = {
  item: React.RefObject<TextInput>;
  qty: React.RefObject<TextInput>;
  price: React.RefObject<TextInput>;
};

export const AddItem: React.FC<Props> = ({
  shoppingList,
  setShoppingList,
  navigation,
}) => {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const inputRef: InputRef = {
    item: createRef<TextInput>(),
    qty: createRef<TextInput>(),
    price: createRef<TextInput>(),
  };

  const addItem = () => {
    if (!item) {
      Alert.alert('No Item!', 'You need to enter an item');
    } else {
      setShoppingList([
        ...shoppingList,
        {
          item,
          quantity: quantity || '1',
          price: price || '1',
          total: '',
          onRemove: () => {},
        },
      ]);
      setItem('');
      setQuantity('');
      setPrice('');
      navigation.navigate('List', {shoppingList: shoppingList});
    }
  };
  return (
    <View>
      <Text style={styles.heading}>Add Shopping Item</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Enter item"
          value={item}
          onChangeText={text => setItem(text)}
          ref={inputRef.item}
          onSubmitEditing={() => {
            inputRef.qty.current?.focus();
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter quantity"
          keyboardType="numeric"
          value={quantity}
          onChangeText={q => {
            setQuantity(q);
          }}
          ref={inputRef.qty}
          onSubmitEditing={() => {
            inputRef.price.current?.focus();
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter price"
          keyboardType="numeric"
          value={price}
          onChangeText={q => {
            setPrice(q);
          }}
          ref={inputRef.price}
          onSubmitEditing={() => {}}
        />
        <TouchableOpacity
          style={styles.addItemButton}
          onPress={() => {
            addItem();
          }}>
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: '700',
  },
  form: {
    marginTop: 30,
  },
  input: {
    padding: 15,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  addItemButton: {
    backgroundColor: '#eb8634',
    paddingVertical: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {color: '#fff', fontWeight: '500'},
});
