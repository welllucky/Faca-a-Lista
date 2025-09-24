import { Icon } from "@/presentation/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const ListBox = ({ size = 24, color = "black", ...rest }: Icon) => {
  return (
    <MaterialCommunityIcons
      name="list-box"
      size={size}
      color={color}
      {...rest}
    />
  );
};
