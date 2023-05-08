import chalk from 'chalk'
import { Command } from 'commander'
import { checkUrlCache, checkUrlCacheInterval } from './lib/actions.js'

const program = new Command()

program
  .version('1.0.0')
  .description('Provides into caching behavior for a given endpoint')
  .argument('<target_url>')
  .option(
    '-i, --interval <interval>',
    'Time, in minutes, between cache validation for the given URL (use maxTime to have it stop after a period of time)'
  )
  .option(
    '-m, --maxTime <maxTime>',
    'Time, in minutes, after which we should stop checking the cache (only used when interval is set)'
  )
  .option(
    '-c, --cookie <cookie...>',
    'Specify one or more cookies using this format "cookiename=cookievalue"'
  )
  .parse(process.argv)

const args = program.args
const opts = program.opts()

const cookie = opts.cookie ? opts.cookie.join('; ') : undefined

const curlOptions = {}
if (cookie) {
  curlOptions.cookie = cookie
}

console.log(chalk.red(`${chalk.bold('Target url')}: ${args[0]}`))

if (opts.interval) {
  checkUrlCacheInterval(args[0], curlOptions, opts.interval, opts.maxTime)
} else {
  checkUrlCache(args[0], curlOptions)
}
