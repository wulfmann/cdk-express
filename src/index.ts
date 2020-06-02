import { App, AppProps } from './app';

export default (id: string, props?: AppProps) => (new App(id, props));
