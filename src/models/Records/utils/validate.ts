import {
  GetRecordOptions,
  GetRecordsOptions,
  SearchRecordsOptions,
} from '../type'

const getOneMethod = (options: GetRecordOptions) => {
  const { moduleName, recordId, fields } = options

  if (!moduleName) throw new Error('"moduleName" is required.')
  if (!recordId) throw new Error('"recordId" is required.')
  if (fields && fields.length > 50)
    throw new Error('Cannot request more than 50 "fields".')
}

const getAllMethod = (options: GetRecordsOptions) => {
  const { moduleName, fields, ids } = options

  if (!moduleName) throw new Error('"moduleName" is required.')
  if (!Array.isArray(fields) || fields.length === 0)
    throw new Error('The "fields" parameter must be a non-empty array.')
  if (fields.length > 50)
    throw new Error('Cannot request more than 50 "fields".')
  if (ids && !Array.isArray(ids))
    throw new Error('"ids" parameter must be an array.')
}

const seachMethod = (options: SearchRecordsOptions) => {
  const { moduleName, criteria, fields } = options

  if (!moduleName) throw new Error('"moduleName" is required.')
  if (criteria && !Array.isArray(criteria))
    throw new Error('"criteria" parameter must be an array')
  if (fields && !Array.isArray(fields))
    throw new Error('"fields" parameter must be an array')
}

export const validate = {
  getOneMethod,
  getAllMethod,
  seachMethod,
}
