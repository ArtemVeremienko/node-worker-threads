import { dirname, join } from 'node:path'
import { EventEmitter } from 'node:events'
import { fileURLToPath } from 'node:url'
import workerpool from 'workerpool'

const __dirname = dirname(fileURLToPath(import.meta.url))
const workerFile = join(__dirname, 'subsetSumWorker.js')
const pool = workerpool.pool(workerFile)

export class SubsetSum extends EventEmitter {
  #sum = 0
  #set = []

  constructor(sum, set) {
    super()
    this.#sum = sum
    this.#set = set
  }

  async start() {
    await pool.exec('subsetSum', [this.#sum, this.#set], {
      on: (payload) => this.emit(payload.event, payload.data),
    })
  }
}
