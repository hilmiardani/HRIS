export interface Menu {
  label: string
  module: string
  icon: (isActive: boolean) => React.ReactNode
  url: string
}
