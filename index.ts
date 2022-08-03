import expect from './expect'
import measure from './measure'
import times from 'lodash/times'

expect(findDuplicateWords('uno dos dos tres tres tres'))
	.toEqual(['dos', 'tres'])

expect(findDuplicateWords('The death finds everyone, everyone loves yourself to death.'))
	.toEqual(['death', 'everyone'])

expect(findDuplicateWords('Did you smell it? That kind of smelly smell. The smelly smell that smells smelly.'))
	.toEqual(['smell', 'that', 'smelly'])

/**
 * You must NOT visit any websites other than
 * https://developer.mozilla.org and https://w3schools.com
 */
function findDuplicateWords(input: string): Array<string> {
	// Your implementation goes here

	return []
}

// Pass -p argument to turn on additional test cases
if (process.argv.includes('-p')) {
	// Generate test data, which the second test data is twice the size of the first one
	const data10k = times(10_000).join(' ')
	const data20k = times(20_000).join(' ')

	// Measure time spent in milliseconds for each test data
	const time10k = measure(() => { findDuplicateWords(data10k) })
	const time20k = measure(() => { findDuplicateWords(data20k) })

	// Expect the function to take 2x longer, given 2x the size of the test data
	// Hence linear time performance “O(n)”
	expect(time20k).toBeLessThan(time10k * 2)
}
