import { createServer } from 'node:http'
import { SubsetSum } from './subsetSumPool.js'

const server = createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`)

  if (url.pathname !== '/subsetSum') {
    res.writeHead(200)
    return res.end('I am still here!\n')
  }

  const sum = 0
  const data = JSON.parse(url.searchParams.get('data'))

  res.writeHead(200)

  const subsetSum = new SubsetSum(sum, data)

  subsetSum.on('match', (match) => {
    res.write(`Match: ${JSON.stringify(match)}\n`)
  })
  subsetSum.on('end', () => res.end())
  subsetSum.on('debug', (message) => console.log(message))
  subsetSum.start()?.catch((err) => console.error(err))
})

server.listen(8080, '127.0.0.1', () =>
  console.log(
    `Server ready on port 8080
    ${JSON.stringify(server.address(), null, 2)}
    `
  )
)
