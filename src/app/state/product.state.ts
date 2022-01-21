export enum DataStateEnum{
  LOADING,
  LOADED,
  ERROR
}

export interface AppData<T>{
  dataState?:DataStateEnum,
  data?:T,
  errorMessage?:string
}
