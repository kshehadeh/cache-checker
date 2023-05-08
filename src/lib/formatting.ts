import chalk from 'chalk'

export function getRichTextCacheStatus(cacheStatus: string) {
  if (cacheStatus.includes('HIT')) {
    return chalk.green(cacheStatus)
  }

  if (cacheStatus.includes('MISS')) {
    return chalk.red(cacheStatus)
  }

  if (cacheStatus.includes('STALE')) {
    return chalk.gray(cacheStatus)
  }

  return chalk.white(cacheStatus)
}

export function getRichTextStatusCode(code: number) {
  if (code >= 200 && code < 300) {
    return chalk.green(code.toString())
  }
  if (code >= 300 && code < 400) {
    return chalk.yellow(code.toString())
  }
  if (code >= 400 && code < 500) {
    return chalk.red(code.toString())
  }

  return chalk.white.bgRedBright(code.toString())
}
