import type { Stats } from '../types'

interface StatsBarProps {
    stats: Stats | null
}

export default function StatsBar({ stats }: StatsBarProps) {
    if (!stats) {
        return <p>Loading ...</p>
    }

    return (
            <div className="flex flex-wrap gap-3">
                <div className="bg-gray-100 rounded-lg w-28 md:w-36 h-20 text-center py-3">
                <p className="text-xs text-gray-500">Total reviews</p>
                <p className="text-2xl font-medium mt-1 text-red-300">{stats.totalReviews}</p>
            </div>
            <div className="bg-gray-100 rounded-lg w-36 h-20 text-center py-3">
                <p className="text-xs text-gray-500">Unique repos</p>
                <p className="text-2xl font-medium mt-1 text-red-300">{stats.uniqueRepos}</p>
            </div>
            <div className="bg-gray-100 rounded-lg w-36 h-20 text-center py-3">
                <p className="text-xs text-gray-500">Unique PRs</p>
                <p className="text-2xl font-medium mt-1 text-red-300">{stats.uniquePRs}</p>
            </div>
        </div>
    )
}