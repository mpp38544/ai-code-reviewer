export interface Review {
    id: number
    repo: string
    pr_number: number
    pr_title: string
    diff: string
    review: string
    created_at: string
}

export interface Stats {
    totalReviews: number
    uniqueRepos: number
    uniquePRs: number
}