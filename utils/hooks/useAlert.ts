const useAlert = (num: number, alertFunc: () => void) => {
  setTimeout(alertFunc, num);
};

export default useAlert;
