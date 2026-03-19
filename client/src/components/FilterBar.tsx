interface FilterBarProps {
    filter: string
    setFilter: (value: string) => void
    
    fromDate: string
    setFromDate: (value: string) => void

    toDate: string
    setToDate: (value: string) => void
}

export default function FilterBar({ filter, setFilter, fromDate, setFromDate, toDate, setToDate }: FilterBarProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4 mt-4">
            <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-500">Filter by repo</label>
                <input 
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder="Enter repository name..."
                    className="border border-gray-300 rounded-lg px-2 py-2 w-full md:w-48 text-sm"
                />
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-500">Start date</label>
                <input 
                    type="date" 
                    value={fromDate} 
                    onChange={(e) => setFromDate(e.target.value)}
                    className="border border-gray-300 rounded-lg px-2 py-2 w-full md:w-40 text-sm"
                />
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-500">End date</label>
                <input 
                    type="date" 
                    value={toDate} 
                    onChange={(e) => setToDate(e.target.value)}
                    className="border border-gray-300 rounded-lg px-2 py-2 w-full md:w-40 text-sm"
                />
            </div>
        </div>
    )
}