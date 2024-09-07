import { StyleProp, ViewStyle } from 'react-native';

export interface Props {
  cropName?: string;
  price?: any;
  style?: StyleProp<ViewStyle>;
  editable?:boolean;
  quantity?: any;
  imageUrl?: any;
  onPress?:()=> void;
}
