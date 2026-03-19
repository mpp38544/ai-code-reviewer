import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
 } from "recharts";
 import type { Review } from "../types";

interface ReviewsChartProps {
    reviews: Review[]
}


export default function ReviewsChart( { reviews } : ReviewsChartProps)  {
    const chartData = reviews.reduce((acc, review) => {
    const existing = acc.find(item => item.repo === review.repo)
    if (existing) {
        existing.count += 1
    } else {
        acc.push({ repo: review.repo, count: 1 })
    }
    return acc
}, [] as { repo: string, count: number }[])

    return (
        <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <XAxis dataKey="repo" />
                <YAxis allowDecimals={false} />
                <Tooltip cursor={{ fill: '#f3f4f6' }} />
                <Bar barSize={48} dataKey="count" fill="#a78bfa" />
            </BarChart>
        </ResponsiveContainer>
    )

}

