export as namespace Mktoast;

/** options for "shugar" methods */
export interface ShortOptions {
  container: HTMLElement;
  duration: number;
  position: string;
  title: string;
}
type MessageWrapperEl = HTMLElement;

/** Normalized complete options for print method */
export interface Options extends ShortOptions {
  message: string;
  type: string;
}

/** Normalized options extended with additional calculated parameters */
export interface XOptions extends Options{
  xPosition: 'left' | 'center' | 'right';
  yPosition: 'top' | 'bottom';
  boardEl: Element;
}

/** "shugar" methods type */
export type echoMethod = (
  message: string,
  title?: string,
  options?: Partial<ShortOptions>
) => MessageWrapperEl;
