import { Pool } from "pg";
import * as dotenv from 'dotenv'

let pool: Pool

const getPool = () => {
    if (!pool) {
        pool = new Pool({ connectionString: process.env.DATABASE_URL })
    }
    return pool
}

export const intialiseDatabase = async () => { 
    await getPool().query(
        `CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        repo VARCHAR(100),
        pr_number INTEGER,
        pr_title VARCHAR(100),
        diff TEXT,
        review TEXT,
        created_at TIMESTAMP
        )`
    )
}

export const saveReview = async (repo: string, pr_number: number, pr_title: string, diff: string, review: string) => {
    await getPool().query(
        `INSERT INTO reviews (repo, pr_number, pr_title, diff, review, created_at) VALUES ($1, $2, $3, $4, $5, NOW())`,
        [repo, pr_number, pr_title, diff, review]
    )
}