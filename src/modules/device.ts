import * as Device from 'expo-device'

export let deviceType: string, isDesktop: boolean

const initialize = async () => {
  const device = await Device.getDeviceTypeAsync()
  deviceType = Device.DeviceType[device]
  isDesktop = deviceType === 'DESKTOP'
}

export default initialize
