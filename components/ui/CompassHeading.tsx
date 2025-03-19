import Svg, { ClipPath, Defs, G, Image, Path, Rect, SvgProps } from "react-native-svg";

export default function CompassHeading(props: SvgProps) {
  return (
    <Svg viewBox="0 0 364 364" fill="none" {...props}>
      <G clipPath="url(#clip0_0_4)">
        <Path
          d="M182.495 0.505025C182.222 0.231658 181.778 0.231658 181.505 0.505025L177.05 4.9598C176.777 5.23317 176.777 5.67638 177.05 5.94975C177.324 6.22311 177.767 6.22311 178.04 5.94975L182 1.98995L185.96 5.94975C186.233 6.22311 186.676 6.22311 186.95 5.94975C187.223 5.67638 187.223 5.23316 186.95 4.9598L182.495 0.505025ZM181.3 1L181.3 369L182.7 369L182.7 1L181.3 1Z"
          fill="#D72229"
        />
        <Path d="M366 182L-2.00001 182" stroke="#D72229" strokeWidth="1.4" />
        <Rect
          x="95.5"
          y="94.5"
          width="175"
          height="175"
          rx="3.5"
          stroke="#D72229"
        />
        <Image
          x="152"
          y="152"
          width="60"
          height="60"
          href={require("@/assets/images/compass-logo.png")}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_0_4">
          <Rect width="364" height="364" rx="182" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
