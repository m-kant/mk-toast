export as namespace Mktoast;

export type MsgType = 'default' | 'info' | 'danger' | 'success' | 'warning';

/** options for "shugar" methods */
export interface ShortOptions {
  container: HTMLElement;
  duration: number;
  /** left|center|right top|bottom */
  position: string;
  title: string;
}
type MessageWrapperEl = HTMLElement;

/** Normalized complete options for print method */
export interface Options extends ShortOptions {
  message: string;
  type: MsgType;
}

/** Normalized options extended with additional calculated parameters */
export interface XOptions extends Options{
  xPosition: 'left' | 'center' | 'right';
  yPosition: 'top' | 'bottom';
  boardEl: Element;
}

/** "shugar" methods type */
export type EchoMethod =
  ((message: string, title?: string, options?: Partial<ShortOptions>) => MessageWrapperEl) |
  ((message: string, options?: Partial<ShortOptions>) => MessageWrapperEl);
