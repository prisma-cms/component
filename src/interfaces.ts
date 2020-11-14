// export type PrismaCmsComponentPropsDataObject = Record<string, any>

// export interface PrismaCmsComponentPropsData {
//   object?: PrismaCmsComponentPropsDataObject | null
//   // data?: {
//   //   object?: PrismaCmsComponentPropsDataObject
//   // }
// }

// type Locales = Record<string, any>;

export interface PrismaCmsComponentError extends Error {
  _id?: string

  open?: boolean
}

interface Locales extends Record<string, any> {}

export interface PrismaCmsComponentProps {
  // @deprecated
  // data?: PrismaCmsComponentPropsData | null | undefined

  object?: Record<string, any> | null | undefined

  filters?: Record<string, any> | undefined

  locales?: Locales

  errorDelay?: number
}

export interface PrismaCmsComponentState {
  locales: Locales

  filters: Record<string, any> | undefined

  errors: PrismaCmsComponentError[]

  notifications: PrismaCmsComponentError[]

  error: PrismaCmsComponentError | null

  loading: boolean

  _dirty?: Record<string, any> | null | undefined
}
