import { spawn } from 'child_process'

export const addRule = async ({
    type,
    port,
    proto,
    ipFrom = 'any',
    ipTo = 'any',
}: {
    type: string
    port?: string
    proto?: string
    ipFrom?: string
    ipTo?: string
}) => {
    const ufwArgs = [type, 'from', ipFrom, 'to', ipTo]
    if (port) {
        ufwArgs.push('port', port)
    }
    if (proto) {
        ufwArgs.push('proto', proto)
    }

    const output = await runCommand('ufw', ufwArgs)
    let result

    if (output === 'Rule added') {
        result = { success: true }
    } else if (output === 'Skipping adding existing rule') {
        result = {
            success: true,
            skipped: true,
        }
    } else {
        throw new Error(output)
    }

    return result
}

const runCommand = async (command: string, args: string[], timeout = 3000): Promise<string> => {
    const runner = spawn(command, args, { timeout: timeout + 100, killSignal: 'SIGINT' })

    // timeout
    let hasTimedout = false
    const timer = setTimeout(() => {
        hasTimedout = true
        runner.kill()
    }, timeout)

    // save stdout and stderr
    const outChunks: Array<Buffer> = []
    const errChunks: Array<Buffer> = []

    runner.stdout.on('data', (chunk) => outChunks.push(chunk))
    runner.stderr.on('data', (chunk) => errChunks.push(chunk))

    return new Promise<string>((resolve, reject) => {
        let runnerError: Error
        runner.once('error', (err) => {
            runnerError = err
        })

        runner.once('close', (code) => {
            clearTimeout(timer)
            const stdOut = Buffer.concat(outChunks).toString('utf-8').trim() || ''

            if (code !== 0) {
                return reject(
                    (hasTimedout ? 'Command timeout!\n' : '') +
                        (runnerError ? runnerError.message + '\n' : '') +
                        (stdOut ? stdOut + '\n' : '') +
                        Buffer.concat(errChunks).toString('utf-8')
                )
            }

            resolve(stdOut)
        })
    }).finally(() => {
        runner.stdout.removeAllListeners('data')
        runner.stderr.removeAllListeners('data')
    })
}
