import {
  Box,
  chakra,
  Text,
  useRadio,
  UseRadioProps,
  useColorModeValue as mode,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import * as React from "react";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";

const RadioBox = chakra("div", {
  baseStyle: {
    borderWidth: "3px",
    px: "6",
    pt: "12",
    pb: "8",
    borderRadius: "md",
    cursor: "pointer",
    transition: "all 0.2s",
    _focus: { shadow: "outline" },
  },
});

const CheckboxIcon = (props: { checked: boolean }) => (
  <Box
    fontSize="4xl"
    color={props.checked ? "blue.600" : mode("gray.300", "whiteAlpha.400")}
  >
    {props.checked ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}
  </Box>
);

interface ButtonRadioProps extends UseRadioProps {
  icon: React.ReactElement;
  label: string;
  description: string;
}

export const ButtonRadio = (props: ButtonRadioProps) => {
  const { label, icon, description } = props;
  const { getCheckboxProps, getInputProps, getLabelProps, state } = useRadio(
    props
  );

  const checkedStyles = {
    bg: mode("blue.50", "rgb(0 31 71)"),
    borderColor: "blue.600",
  };

  return (
    <label style={{ width: "100%" }} {...getLabelProps()}>
      <input {...getInputProps()} />
      <RadioBox
        {...getCheckboxProps()}
        _checked={checkedStyles}
        height="full"
        maxWidth={{ base: "full", md: "md" }}
        py={{ base: "6", md: "8" }}
      >
        <Flex
          flexDirection="column"
          align="stretch"
          height="full"
          alignItems="center"
          textAlign="center"
        >
          <Box
            aria-hidden
            fontSize="4xl"
            mb="3"
            color={state.isChecked ? "blue.600" : undefined}
          >
            {icon}
          </Box>

          <Text fontWeight="extrabold" fontSize="xl">
            {label}
          </Text>

          <Text fontSize="sm">{description}</Text>
          <Spacer minHeight="15px"></Spacer>
          <CheckboxIcon checked={state.isChecked} />
        </Flex>
      </RadioBox>
    </label>
  );
};
