import * as React from "react"
import Svg, { Path } from "react-native-svg"
const CircleCheckIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12.333 10.461 15 16 9m5 3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </Svg>
)
export default CircleCheckIcon
