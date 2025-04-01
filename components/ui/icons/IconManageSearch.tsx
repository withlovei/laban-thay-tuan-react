import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    width={20}
    height={13}
    fill="none"
    {...props}
  >
    <Path
      fill="#FEC41F"
      d="M0 13v-2h10v2H0Zm0-5V6h5v2H0Zm0-5V1h5v2H0Zm18.6 10-3.85-3.85a4.46 4.46 0 0 1-1.313.637A5.005 5.005 0 0 1 12 10c-1.383 0-2.563-.488-3.537-1.463C7.488 7.563 7 6.383 7 5s.487-2.563 1.463-3.538C9.438.488 10.617 0 12 0s2.563.487 3.537 1.462C16.512 2.438 17 3.617 17 5c0 .483-.07.963-.212 1.438a4.462 4.462 0 0 1-.638 1.312L20 11.6 18.6 13ZM12 8c.833 0 1.542-.292 2.125-.875A2.893 2.893 0 0 0 15 5c0-.833-.292-1.542-.875-2.125A2.893 2.893 0 0 0 12 2c-.833 0-1.542.292-2.125.875A2.893 2.893 0 0 0 9 5c0 .833.292 1.542.875 2.125A2.893 2.893 0 0 0 12 8Z"
    />
  </Svg>
)
export { SvgComponent as IconManageSearch }
