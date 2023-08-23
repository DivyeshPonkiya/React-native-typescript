import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (err) {
    // Handle errors if needed
  }
};

export const getData = async (key: string): Promise<string | null> => {
  try {
    const data = await AsyncStorage.getItem(key);

    return data;
  } catch (err) {
    // Handle errors if needed
    return null;
  }
};
