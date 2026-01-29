export function useToast() {
  return {
    success: (message: string, description?: string) => {
      return console.log(message, description);
    },
    error: (message: string, description?: string) => {
      return console.error(message, description);
    },
    info: (message: string, description?: string) => {
      return console.log(message, description);
    },
    warning: (message: string, description?: string) => {
      return console.warn(message, description);
    },
  };
}
