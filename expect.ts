import isArray from 'lodash/isArray'
import isEqual from 'lodash/isEqual'
import chalk from 'chalk'

let totalCount = 0
let failureCount = 0

export default function expect<T>(reality: T) {
	totalCount += 1

	return {
		toEqual(expectation: T) {
			const source = JSON.stringify(expectation)

			if (isEqual(expectation, reality)) {
				console.log(`🟢 Expect ${source}`)

			} else {
				failureCount += 1

				console.error(`❌ Expect ${source}\n   but got ${colorDiffArray(expectation, reality)}`)

				if (process.env.VSCODE_INSPECTOR_OPTIONS) {
					throw new Error(`FAILED`)
				}
			}
		},

		toBe(expectation: T) {
			const source = JSON.stringify(expectation)

			if (expectation === reality) {
				console.log(`🟢 Expect ${source}`)

			} else {
				failureCount += 1

				console.error(`❌ Expect ${source}\n   but got ${colorDiffArray(expectation, reality)}`)

				if (process.env.VSCODE_INSPECTOR_OPTIONS) {
					throw new Error(`FAILED`)
				}
			}
		},

		toBeLessThan(expectation: number) {
			if (typeof reality === 'number' && !isNaN(reality)) {
				if (reality < expectation) {
					console.log(`🟢 Expect ${reality.toFixed(3)} to be less than ${expectation.toFixed(3)}`)

				} else {
					failureCount += 1

					console.error(`❌ Expect ${reality.toFixed(3)} to be less than ${expectation.toFixed(3)}`)

					if (process.env.VSCODE_INSPECTOR_OPTIONS) {
						throw new Error(`FAILED`)
					}
				}

			} else {
				failureCount += 1

				console.error(`❌ Expect ${JSON.stringify(reality)} to be a number`)
				
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
			console.log()

			if (failureCount === 0) {
				console.log(chalk.green('PASSED'))

			} else {
				process.exitCode = 1
				console.log(chalk.red(`${failureCount}/${totalCount} FAILED`))
			}
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