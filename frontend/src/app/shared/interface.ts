export interface Team {
    team: {
        name: string
    },
    score?: string
}

export interface Inning {
    home: {
        runs?: string
    }
    away: {
        runs?: string
    }
}