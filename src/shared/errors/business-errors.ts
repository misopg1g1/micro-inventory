export function BusinessLogicException(this: any, message: string, type: number) {
    message = message;
    type = type;
  }
  
export enum BusinessError {
    NOT_FOUND,
    PRECONDITION_FAILED,
    BAD_REQUEST,
  }