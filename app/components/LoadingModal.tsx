import React from 'react';
import {
  ActivityIndicator,
  Modal,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

const LoadingModal = (props) => {
  return (
    <Modal transparent={true} visible={props?.visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          <ActivityIndicator
            size={Platform.OS === 'ios' ? 'large' : 40}
            color={'black'}
          />
          <Text style={styles.okButtonText}>
            {props?.message ? props?.message : 'Please wait ...'}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: '5%',
    width: '40%',
    alignItems: 'center',
  },

  okButton: {
    backgroundColor: '#E8E8E8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  okButtonText: {
    color: 'black',
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'Lato-Bold',
    marginTop: 10,
  },
});

export default LoadingModal;
