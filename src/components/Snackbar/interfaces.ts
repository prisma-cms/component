export interface SnackbarProps {
  message: string | undefined

  opened: boolean

  error: Error | undefined

  close?: (error: Error) => void
}
