import expect from './expect'

type TreeNode = { value: number, childNodes: Array<TreeNode> }

const rootNode: TreeNode = {
	value: 100,
	childNodes: [
		{
			value: 4,
			childNodes: [
				{
					value: 1,
					childNodes: []
				},
				{
					value: 9,
					childNodes: []
				},
			]
		},
		{
			value: 3,
			childNodes: [
				{
					value: 2,
					childNodes: [
						{
							value: 3,
							childNodes: [
								{
									value: 5,
									childNodes: []
								}
							]
						},
					]
				},
				{
					value: 3,
					childNodes: []
				},
			]
		}
	]
}

//         100
//        /   \
//       4     3
//      / \   / \
//     1   9 2   3
//           |
//           3 <-- Find this node!
//           |
//           5
const matchingNode = rootNode.childNodes[1].childNodes[0].childNodes[0]
expect(findDeepestNode(rootNode, matchingNode.value)).toBe(matchingNode)

function findDeepestNode(inputNode: TreeNode, value: number): TreeNode | null {
	// Your implementation goes here
	return null
}
