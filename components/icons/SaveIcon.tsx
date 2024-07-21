import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SaveIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={props.width}
    height={props.height}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path d="M22.083 24H1.917A1.92 1.92 0 0 1 0 22.083V1.917A1.92 1.92 0 0 1 1.917 0h16.914L24 5.169v16.914A1.92 1.92 0 0 1 22.083 24zM20 22h2V5.998l-3-3V9c0 1.103-.897 2-2 2H7c-1.103 0-2-.897-2-2V2H2v20h2v-7c0-1.103.897-2 2-2h12c1.103 0 2 .897 2 2v7zM6 22h12v-7.001L6 15v7zM7 2v7h10V2H7z" />
    <Path d="M15 8h-4V3h4v5z" />
  </Svg>
)
export default SaveIcon