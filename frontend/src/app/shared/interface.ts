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

export interface Play {
    result: {
        description?: string
    }
    about: {
        halfInning: string,
        inning: number,
        startTime: string,
        endTime: string
    }
}