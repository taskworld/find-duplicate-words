import expect from './expect'

expect(findDuplicateWords('one two two three three three'))
	.toEqual(['two', 'three'])

expect(findDuplicateWords(`The death finds everyone,
    everyone loves yourself to death.`))
	.toEqual(['death', 'everyone'])

/**
 * You must NOT visit any websites other than
 * https://developer.mozilla.org and https://w3schools.com
 * 
 * Extra points if your function has...
 * - No mutations
 * - Linear time performance “O(n)”
 */
function findDuplicateWords(input: string): Array<string> {
	// Your implementation goes here
	return []
}
