import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

const SvgComponent = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6h-2z"
    />
  </Svg>
)

export { SvgComponent as IconAdd }
