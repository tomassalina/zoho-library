require('dotenv').config()
const { ZohoCRM } = require('../dist/index')

const zoho = new ZohoCRM({
  clientId: process.env.ZOHO_CLIENT_ID,
  clientSecret: process.env.ZOHO_CLIENT_SECRET,
  refreshToken: process.env.ZOHO_REFRESH_TOKEN,
})

async function getCandidates() {
  try {
    const { data } = await zoho.records.getOne({
      moduleName: 'Candidates',
      recordId: '5905444000008068003',
      fields: ['id', 'Name', 'Candidate_First_Name'],
    })

    console.log(data)
  } catch (err) {
    console.error(err)
  }
}

getCandidates()
