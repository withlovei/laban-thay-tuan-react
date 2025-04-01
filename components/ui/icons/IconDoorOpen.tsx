import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      fill="#FEC41F"
      d="M8 10c.283 0 .52-.096.713-.287A.968.968 0 0 0 9 9a.968.968 0 0 0-.287-.713A.968.968 0 0 0 8 8a.968.968 0 0 0-.713.287A.968.968 0 0 0 7 9c0 .283.096.52.287.713.192.191.43.287.713.287Zm-4 8v-2l6-1V3.875c0-.25-.075-.475-.225-.675a.848.848 0 0 0-.575-.35L4 2V0l5.5.9a2.988 2.988 0 0 1 1.8 1.025c.467.55.7 1.192.7 1.925v12.8L4 18Zm-4 0v-2h2V2c0-.567.196-1.042.587-1.425A1.947 1.947 0 0 1 4 0h10c.567 0 1.042.192 1.425.575C15.808.958 16 1.433 16 2v14h2v2H0Zm4-2h10V2H4v14Z"
    />
  </Svg>
)
export { SvgComponent as IconDoorOpen }
