import {
  GetCountInModuleOptions,
  GetCountInModuleParams,
  GetDeletedRecordsOptions,
  GetDeletedRecordsParams,
  GetRecordOptions,
  GetRecordsOptions,
  GetRecordsParams,
  GetTimelineOptions,
  GetTimelineParams,
  SearchRecordsOptions,
  SearchRecordsParams,
} from '../type'

const createGetOneParams = (options: GetRecordOptions) => {
  const { fields } = options
  const params = { fields: fields?.join(',') }
  return params
}

const createGetAllParams = (options: GetRecordsOptions) => {
  const { fields, ids, page, perPage, pageToken, sortOrder, sortBy } = options

  const params: GetRecordsParams = { fields: fields.join(',') }

  if (ids) params.ids = ids.join(',')
  if (page) params.page = options.page
  if (perPage && perPage <= 200) params.per_page = perPage
  else params.per_page = 200
  if (pageToken) params.page_token = pageToken
  if (sortOrder) params.sort_order = sortOrder
  if (sortBy) params.sort_by = sortBy

  return params
}

const createSearchParams = (options: SearchRecordsOptions) => {
  const { criteria, email, phone, word, fields, page, perPage } = options

  const params: SearchRecordsParams = {}

  if (criteria) params.criteria = `(${criteria.map(c => `(${c})`).join('and')})`
  if (email) params.email = email
  if (phone) params.phone = phone
  if (word) params.word = word
  if (fields) params.fields = fields.join(',')
  if (page) params.page = page
  if (perPage) params.per_page = perPage

  return params
}

const createGetDeletedParams = (options: GetDeletedRecordsOptions) => {
  const { type, page, perPage } = options

  const params: GetDeletedRecordsParams = { type: 'all' }

  if (type) params.type = type
  if (page) params.page = page
  if (perPage) params.per_page = perPage

  return params
}

const createGetCountInModuleParams = (options: GetCountInModuleOptions) => {
  const { criteria, email, phone, word } = options

  const params: GetCountInModuleParams = {}

  if (criteria) params.criteria = `(${criteria.map(c => `(${c})`).join('and')})`
  if (email) params.email = email
  if (phone) params.phone = phone
  if (word) params.word = word

  return params
}

const createGetTimelineParams = (options: GetTimelineOptions) => {
  const { perPage, pageToken } = options

  const params: GetTimelineParams = {}

  if (perPage) params.per_page = perPage
  if (pageToken) params.page_token = pageToken

  return params
}

export const paramBuilder = {
  createGetOneParams,
  createGetAllParams,
  createSearchParams,
  createGetDeletedParams,
  createGetCountInModuleParams,
  createGetTimelineParams,
}
