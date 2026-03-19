import { useState, useEffect } from 'react'
import type { Review, Stats } from './types'
import StatsBar from './components/StatsBar'
import FilterBar from './components/FilterBar'
import ReviewsTable from './components/ReviewsTable'
import ReviewsChart from './components/ReviewsChart'

export default function App() {

    const [reviews, setReviews] = useState<Review[]>([])
    const [stats, setStats] = useState<Stats | null>(null)
    const [filter, setFilter] = useState<string>('')
    const [fromDate, setFromDate] = useState<string>('')
    const [toDate, setToDate] = useState<string>('')

    useEffect(() => {
        //Fetch endpoints

        //Get review data and then store inside reviews
        fetch('/api/reviews').then(res => res.json()).then(data => setReviews(data))

        fetch('/api/stats').then(res => res.json()).then(data => setStats(data))
    }, [])

    const filteredReviews = reviews.filter(r => r.repo.toLowerCase().startsWith(filter.toLowerCase())).filter(r => fromDate ? new Date(r.created_at) >= new Date(fromDate) : true).filter(r => toDate ? new Date(r.created_at) <= new Date(toDate) : true)

    return (
        <div className="max-w-5xl mx-auto p-8">
            <div className="inline-flex bg-red-50 px-3 py-1 rounded-full mb-3">
                <p className='text-xs text-red-300 p-1'>Powered by Claude</p>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-5 mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-medium">GitHub AI Code Reviewer</h1>
                    <p className="text-sm text-gray-400 mt-1">Dashboard</p>
                </div>
                <div className="flex items-center gap-6">
                    <StatsBar stats={stats} />
                </div>
            </div>
            <FilterBar filter={filter} setFilter={setFilter} fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate}/>
            <div className="mb-6">
                <p className="text-sm text-gray-500 mb-3">Reviews per repository</p>
                <ReviewsChart reviews={filteredReviews} />
            </div>
            <ReviewsTable reviews={filteredReviews} stats={stats} />
        </div>
    )
}