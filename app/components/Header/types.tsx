import { StyleProp, ViewStyle } from 'react-native';

export interface Props {
  onPress?:()=> void;
  leftIcn?:any;
  title?:string;
  rightIcn?:any;
  style?:StyleProp<ViewStyle>;
}
