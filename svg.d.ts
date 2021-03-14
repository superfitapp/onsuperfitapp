// svg.d.ts
// https://github.com/gregberge/svgr/issues/435
declare module "*.svg" {
  export type SVGComponent = React.StatelessComponent<
    React.SVGAttributes<SVGElement>
  >;

  export const ReactComponent: React.StatelessComponent<
    React.SVGAttributes<SVGElement>
  >;

  const url: string;
  export default url;
}
