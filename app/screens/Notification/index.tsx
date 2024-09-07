import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import NotificationCard from '../../components/NotificationCard';
import PrimaryButton from '../../components/PrimaryButton';
import images from '../../config/images';
import { useStyle } from './styles';
const Notification: React.FC = () => {
  const styles = useStyle();
  const theme = useTheme();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <NotificationCard
          leftIcon={images.Notification.update}
          title="30% Special Discount!"
          description="Special promotion only valid today"
        />
      </View>
    </SafeAreaView>
  );
};

export default Notification;
