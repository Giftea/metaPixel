import { Icon, createIcon, IconProps, OmitCommonProps } from '@chakra-ui/react'
import { SVGProps } from 'react'

const UploadIcon = (
  props: JSX.IntrinsicAttributes &
    OmitCommonProps<SVGProps<SVGSVGElement>, keyof IconProps> &
    IconProps & { as?: 'svg' | undefined }
) => (
  <Icon viewBox="0 0 200 200" {...props}>
    {/* <path
      fill="currentColor"
      d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
    /> */}
    {
      <svg
        width="1000"
        height="1074"
        viewBox="0 0 1000 1074"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="1000" height="1074" rx="8" fill="white" />
      </svg>
    }
  </Icon>
)
export default UploadIcon
