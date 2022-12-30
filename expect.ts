import isArray from 'lodash/isArray'
import isEqual from 'lodash/isEqual'
import chalk from 'chalk'

let totalCount = 0
let failureCount = 0

let outputBuffer = ''
function log(line: string = '') {
	if (process.env.VSCODE_INSPECTOR_OPTIONS) {
		console.log(line)
	} else {
		outputBuffer += line + '\n'
	}
}

export default function expect<T>(reality: T) {
	totalCount += 1

	return {
		toEqual(expectation: T) {
			const source = JSON.stringify(expectation)

			if (isEqual(expectation, reality)) {
				log(`🟢 Passed ${source}`)

			} else {
				failureCount += 1

				log(`❌ Expect ${source}\n   but got ${colorDiffArray(expectation, reality)}`)

				if (process.env.VSCODE_INSPECTOR_OPTIONS) {
					throw new Error(`FAILED`)
				}
			}
		},

		toBeLessThan(expectation: number) {
			if (typeof reality === 'number' && !isNaN(reality)) {
				if (reality < expectation) {
					log(`🟢 Passed ${reality.toFixed(1)} to be less than ${expectation.toFixed(1)}`)

				} else {
					failureCount += 1

					log(`❌ Expect ${reality.toFixed(1)} to be less than ${expectation.toFixed(1)}`)

					if (process.env.VSCODE_INSPECTOR_OPTIONS) {
						throw new Error(`FAILED`)
					}
				}

			} else {
				failureCount += 1

				log(`❌ Expect ${JSON.stringify(reality)} to be a number`)

				if (process.env.VSCODE_INSPECTOR_OPTIONS) {
					throw new Error(`FAILED`)
				}
			}
		}
	}
}

if (!process.env.VSCODE_INSPECTOR_OPTIONS) {
	process.on('exit', () => {
		if (totalCount > 0) {
			log()

			if (failureCount === 0) {
				log(chalk.green('PASSED'))

			} else {
				process.exitCode = 1
				log(chalk.red(`${failureCount}/${totalCount} FAILED`))
			}

			console.log()
			console.log(outputBuffer.trim())
		}
	})
}

function colorDiffArray(source: any, target: any): string {
	if (isArray(source) && isArray(target)) {
		let cursor = 0
		return '[' + target.map((item, rank) => {
			if (cursor < source.length && isEqual(item, source[cursor])) {
				cursor += 1
				return JSON.stringify(item)
			}

			if (isEqual(item, source[rank])) {
				cursor = rank + 1
				return JSON.stringify(item)
			}

			return chalk.bgRed(JSON.stringify(item))
		}).join(',') + ']'
	}

	return JSON.stringify(target)
}