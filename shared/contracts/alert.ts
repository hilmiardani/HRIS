export interface AlertStore {
  title: string
  type: "success" | "error" | "confirm",
  message: string
  isOpen: boolean
  onResolve?: () => void
  onReject?: () => void
}

export type AlertConfig = Omit<AlertStore, "isOpen" | "type">
