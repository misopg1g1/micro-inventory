export function BusinessLogicException(messageIn: string, typeIn: number) {
    const message = messageIn;
    const type = typeIn;
  }
  
export enum BusinessError {
    NOT_FOUND,
    PRECONDITION_FAILED,
    BAD_REQUEST,
  }