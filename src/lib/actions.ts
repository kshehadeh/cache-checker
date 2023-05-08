import chalk from 'chalk'
import moment from 'moment'
import { curly } from 'node-libcurl'
import { CurlyOptions } from 'node-libcurl/dist/curly.js'
import { getRichTextStatusCode, getRichTextCacheStatus } from './formatting.js'
import { promisify } from 'util'

const sleep = promisify(setTimeout)

export async function checkUrlCache(url: string, opts: CurlyOptions) {
  const startTime = Date.now()
  const { statusCode, headers } = await curly.get(url, opts)
  const endTime = Date.now()

  console.log(
    getRichTextStatusCode(statusCode),
    chalk.blue(moment().format('MM/DD hh:mm a')),
    chalk.bgWhite(chalk.black(`${(endTime-startTime).toString()}ms`))
  )

  console.log(
    '  >>',
    chalk.white(chalk.bold('x-vercel-cache')),
    getRichTextCacheStatus(headers[0]['x-vercel-cache'])
  )

  console.log(
    '  >>',
    chalk.white(chalk.bold('cache-control'), headers[0]['cache-control'])
  )
}

export async function checkUrlCacheInterval(
  url: string,
  opts: CurlyOptions,
  interval: number,
  maxTime?: number
) {
  console.log(chalk.yellow(`Running every ${interval} minute(s)`))

  const startTime = Date.now()
  const endTime = maxTime ? startTime + maxTime * 60 * 1000 : undefined

  const intervalTrigger = async (): Promise<void> => {
    checkUrlCache(url, opts)
    if (!endTime || endTime > Date.now() + interval) {
      await sleep(interval * 60 * 1000)
      await intervalTrigger()
    }
  }

  await intervalTrigger()
}
