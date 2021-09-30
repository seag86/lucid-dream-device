import { NativeModules } from "react-native";

const { Torch } = NativeModules;

export default {
  setTorch: Torch.setTorch
};
