import {theme} from '@/theme';
import React, {createRef, useImperativeHandle, useState} from 'react';
import {ActivityIndicator, Modal, View} from 'react-native';
import styles from './style';

export const loadingViewRef = createRef();

const LoadingView = () => {
  const [isVisible, setIsVisible] = useState(false);

  useImperativeHandle(
    loadingViewRef,
    () => ({
      show: () => setIsVisible(true),
      hide: () => setIsVisible(false),
    }),
    [],
  );
  return (
    <Modal transparent animated visible={isVisible}>
      <View style={[styles.container]}>
        <ActivityIndicator size={'large'} color={theme.colors.logoColor} />
      </View>
    </Modal>
  );
};

export default LoadingView;
