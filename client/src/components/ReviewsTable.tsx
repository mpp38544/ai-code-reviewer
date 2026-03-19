import { useState } from 'react'
import type { Review } from '../types'
import type { Stats } from '../types'
import ReactMarkdown from 'react-markdown'
import { useEffect } from 'react'

interface ReviewTableProps {
    reviews: Review[]
    stats: Stats | null
}

export default function ReviewTable( {reviews, stats} : ReviewTableProps) {
    const [expandedID, setExpandedID] = useState<number | null>(null)
    const [copied, setCopied] = useState<number | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 10

    const totalPages = Math.ceil(reviews.length / pageSize)
    reviews.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    
    const toggleRow = (id: number) => {
        setExpandedID(expandedID === id ? null : id)
    }
    
    const handleCopy = (id: number, text: string) => {
        navigator.clipboard.writeText(text)
        setCopied(id)
        setTimeout(() => setCopied(null), 2000)
    }
    
    useEffect(() => {
        setCurrentPage(1)
    }), [reviews]

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[600px]">
                <thead>
                    <tr className="bg-gray-200 border-b border-gray-200 text-left text-sm text-gray-500">
                        <th className="px-2 p-1 font-medium ">Repository</th>
                        <th className="px-2 p-1 font-medium">PR Number</th>
                        <th className="px-2 p-1 font-medium">Title</th>
                        <th className="px-2 p-1 font-medium">Status</th>
                        <th className="px-2 p-1 font-medium">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        stats === null ?
                            <tr><td colSpan={5} className="text-center">Loading...</td></tr>
                        :
                        (stats !== null && stats?.totalReviews === 0) ?
                            <tr><td colSpan={5} className="text-center">No Reviews yet - open a PR to get started.</td></tr>
                        
                        : reviews.length === 0 ?
                            <tr><td colSpan={5} className="text-s text-center text-gray-500">No Repositories found.</td></tr>

                        : reviews.map((review) => {
                            const isClean = review.review.includes('No significant issues found')
                            return (
                                <>
                                <tr onClick={() => toggleRow(review.id)} className="border-b  border-gray-100 hover:bg-gray-200 cursor-pointer text-base">
                                    <td className="px-2 py-1 pr-3">{review.repo}</td>
                                    <td className="px-2 py-1 pr-3">{review.pr_number}</td>
                                    <td className="px-2 py-1 pr-3">{review.pr_title}</td>
                                    <td>{ isClean ? 
                                            <span className='bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full'>No Issues</span>
                                            :
                                            <span className='bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full'>Issues</span>
                                        }</td>
                                    <td className="px-2 py-1 pr-3">{new Date(review.created_at).toLocaleDateString('en-AU', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    })}</td>
                                </tr>
                                {
                                    expandedID === review.id && (
                                        <tr>
                                            <td className="py-2 px-4 text-sm text-gray-600 bg-gray-50 whitespace-pre-wrap" colSpan={5}>
                                                <div className="prose prose-sm max-w-none prose-p:my-0 prose-headings:my-0 prose-ul:my-1 prose-li:my-0">
                                                    <button className="text-blue-500" onClick={ 
                                                        (e) => { e.stopPropagation()
                                                        handleCopy(review.id, review.review)}}>
                                                            {copied === review.id ? 'Copied' : 'Copy Review'}
                                                        </button>
                                                    <ReactMarkdown>{review.review}</ReactMarkdown>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                                </>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className="flex items-center justify-between mt-4">
                <button 
                    onClick={() => setCurrentPage(p => p - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-40"
                >
                    Previous
                </button>
                <span className="text-sm text-gray-500">
                    Page {currentPage} of {totalPages}
                </span>
                <button 
                    onClick={() => setCurrentPage(p => p + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-40"
                >
                    Next
                </button>
            </div>
        </div>
    )
}

