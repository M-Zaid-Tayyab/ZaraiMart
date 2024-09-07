import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import OrderCard from '../../components/OrderCard';
import PrimaryButton from '../../components/PrimaryButton';
import images from '../../config/images';
import {useStyle} from './styles';
const ReceivedBids: React.FC = () => {
  const styles = useStyle();
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.bidContainer}>
          <OrderCard
            style={styles.modelCartStyle}
            imageUrl={{
              uri: 'data:image/jpeg;base64,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',
            }}
            cropName="Tomatoes"
            price={parseInt((Math.random() * 10000).toFixed(2))}
            quantity={Math.floor(Math.random() * 100) + 1}
            sellerName="Bidder Name"
            sellerImg={images.Home.zaid}
            fromModal
          />
          <View style={styles.lineSeperator}></View>
          <View style={styles.rowContainer}>
            <PrimaryButton
              title="Reject"
              textStyle={{color: theme.colors.primaryButton}}
              onPress={toggleModal}
              style={styles.cancelButton}
            />
            <PrimaryButton
              title="Accept"
              onPress={toggleModal}
              style={styles.submitButton}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ReceivedBids;
