import { StyleProp, ViewStyle } from 'react-native';

export interface Props {
  onChangeText: (text: string) => void;
  error?: (error: boolean) => void;
  placeholder?: string;
  type?: 'password' | 'email' | 'text';
  icon?: boolean;
  renderIcon?: () => void;
  showError?: boolean;
  multiline?: boolean;
  numberOfCharacter: number;
  keyboardType?: 'dialpad' | 'normal';
  width?: number;
  inputStyle?: any;
  value: string;
  onLayout?: (e: any) => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  allowClear?: boolean;
  rightButton?: () => void;
  rightIcon?:any;
  onBlur?: () => void;
}
