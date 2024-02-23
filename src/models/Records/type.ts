// GET RECORD
export interface GetRecordOptions {
  moduleName: string
  recordId: string
  fields?: string[]
}

// GET RECORDS
export interface GetRecordsOptions {
  moduleName: string
  fields: string[]
  ids?: string[]
  page?: number
  perPage?: number
  pageToken?: string
  sortOrder?: 'asc' | 'desc'
  sortBy?: 'id' | 'Created_Time' | 'Updated_Time'
}
export interface GetRecordsParams {
  fields: string
  ids?: string
  page?: number
  per_page?: number
  page_token?: string
  sort_order?: 'asc' | 'desc'
  sort_by?: 'id' | 'Created_Time' | 'Updated_Time'
}

// SEARCH RECORDS
export interface SearchRecordsOptions {
  moduleName: string
  criteria?: string[]
  email?: string
  phone?: string
  word?: string
  fields?: string[]
  page?: number
  perPage?: number
}
export interface SearchRecordsParams {
  criteria?: string
  email?: string
  phone?: string
  word?: string
  fields?: string
  page?: number
  per_page?: number
}
