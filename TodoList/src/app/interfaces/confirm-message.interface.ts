

export interface ConfirmMessage {
  
  message: string[];
  accept: Function;
  okText?: string;
  cancelText?: string;

  checkBox?: {
    text: string,
    fn: Function,
  }
}