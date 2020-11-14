declare module 'roddeh-i18n' {
  import React from 'react'

  export default {
    create(locale: Record<string, any>): Record<string, any>;
  }
}
