declare module 'swagger-jsdoc' {
  import { OAS3Definition, OAS3Options } from 'swagger-jsdoc';

  export interface Options {
    definition: OAS3Definition;
    apis: string[];
  }

  export default function swaggerJSDoc(options: Options): any;
}
