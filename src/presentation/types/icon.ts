export interface Icon {
    size?: number;
    color?: string;
    focused?: boolean;
    onPress?: () => void;
    onLongPress?: () => void;
    testID?: string;
    onPressIn?: () => void;
    onPressOut?: () => void;
    
}
