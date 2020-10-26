// dts-gen was used to boilerplate basic types

export default mktoast;

export namespace Mktoast{
  interface ShortOptions {
    container?: HTMLElement;
    duration?: number;
    position?: string;
    title?: string;
  }
  type MessageWrapperEl = HTMLElement;

  interface Options extends ShortOptions {
    message: string;
    type?: string;
  }

  type echoMethod = (
    message: string,
    title?: string,
    options?: Mktoast.ShortOptions
  ) => Mktoast.MessageWrapperEl;

}

/** Compact text notification floating over the application */
export declare const mktoast: {
  danger:  Mktoast.echoMethod;
  echo:    Mktoast.echoMethod;
  error:   Mktoast.echoMethod;
  info:    Mktoast.echoMethod;
  success: Mktoast.echoMethod;
  warning: Mktoast.echoMethod;

  defaults: Mktoast.Options;
  closeMessage(el: Mktoast.MessageWrapperEl): void;
  print(options: Mktoast.Options): Mktoast.MessageWrapperEl;
};
