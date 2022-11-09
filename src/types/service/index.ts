interface resModal {
  code: number
  msg: string
  data: any
  [propname: string]: any
}

export interface requestModel {
  <T>(data?: T): Promise<resModal>
}
