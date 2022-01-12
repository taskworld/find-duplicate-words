import { performance } from 'perf_hooks'

export default function measure(predicate: () => void): number {
	const t1 = performance.now()

	predicate()

	const t2 = performance.now()
	return t2 - t1
}