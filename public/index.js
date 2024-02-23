require('dotenv').config()
const { ZohoCRM } = require('../dist/index')

const zoho = new ZohoCRM({
  clientId: process.env.ZOHO_CLIENT_ID,
  clientSecret: process.env.ZOHO_CLIENT_SECRET,
  refreshToken: process.env.ZOHO_REFRESH_TOKEN,
})

async function getOneCandidate() {
  const candidate = await zoho.records.getOne({
    moduleName: 'Candidates',
    recordId: '5905444000008108001',
    fields: ['id', 'Candidate_First_Name', 'Name'],
  })

  console.log('GET ONE CANDIDATE:', candidate.data)
  console.log('------------------------------')
}

async function getCandidates() {
  const candidates = await zoho.records.getAll({
    moduleName: 'Candidates',
    ids: ['5905444000008108001', '5905444000008068003', '5905444000008048021'],
    fields: ['id', 'Candidate_First_Name', 'Name'],
  })

  console.log('GET 3 CANDIDATES BY ID:', candidates.data)
  console.log('------------------------------')
}

async function searchCandidates() {
  try {
    const candidate = await zoho.records.search({
      moduleName: 'Candidates',
      email: 'pedrob@resorsi.com',
      fields: ['id', 'Candidate_First_Name', 'Name', 'Email'],
      // phone: '+541159826671',
      // criteria: [
      //   'Interview_Date:less_than:2024-02-20',
      //   'Personal_Interview_Status:not_equal:Passed',
      //   'Personal_Interview_Status:not_equal:Fail',
      // ],
    })

    console.log('GET CANDIDATE BY EMAIL:', candidate.data)
    console.log('------------------------------')
  } catch (err) {
    console.error(err)
  }
}

async function test() {
  await getOneCandidate()
  await getCandidates()
  await searchCandidates()
}

test()
