import { ApolloClient } from '@apollo/client';
import '@prisma-cms/context';
// import { NextRouter } from 'next/dist/client/router';
// import URI from 'urijs';


declare module '@prisma-cms/context' {

  export interface PrismaCmsContext {
    client: ApolloClient<object>
    lang?: string;
    user?: Record<string, any> | null | undefined
  }

}
