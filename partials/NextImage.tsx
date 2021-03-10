import { chakra } from "@chakra-ui/react";
import image from "next/image";

export default chakra(image, {
  baseStyle: { maxH: 120, maxW: 120 },
  shouldForwardProp: (prop) =>
    ["width", "height", "src", "alt", "layout", "minHeight", "maxHeight"].includes(prop),
});
