import { StyleProp, ViewStyle } from 'react-native';

export interface Props {
  cropName?: string;
  price?: any;
  style?: StyleProp<ViewStyle>;
  image?: any;
  status?: string;
  quantity?: any;
  imageUrl?: any;
  pending?:boolean;
  sellerName?:string;
  sellerImg?:any;
  fromModal?:boolean;
  deadline?:any;
  onPress?:()=> void;
  rightIcn?:any;
  onRightIcnPress?:()=> void;
  onItemPress?:()=> void;
  greenDot?:boolean;
  date?:any;
  rating?:any;
}
