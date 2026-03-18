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
        <div className="flex items-center mb-4 mt-4">
            <label className="text-sm text-gray-500 block mb-1 px-2 w-64">Filter by Repo</label>
            <input value={filter}
            onChange={(e) => setFilter(e.target.value)
            }
            placeholder="Enter repository name..."
            className="border border-gray-300 rounded-lg px-2 py-2 w-64 text-sm"
            />

            <label className="text-sm text-gray-500 block mb-1 px-2 w-64">Filter by Start Date</label>
            <input type="date" value = {fromDate} onChange={(e) => setFromDate(e.target.value)} placeholder="Enter Start Date..."
            className="border border-gray-300 rounded-lg px-2 py-2 w-64 text-sm"/>

            <label className="text-sm text-gray-500 block mb-1 px-2 w-64">Filter by End Date</label>
            <input type="date" value = {toDate} onChange={(e) => setToDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-2 py-2 w-64 text-sm"/>
        </div>

        
    )
}