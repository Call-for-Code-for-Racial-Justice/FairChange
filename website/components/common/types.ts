
export type IncidentResponse = {
    id: string,
    key: string,
    value: {
        rev: string
    },
    doc : {
        timestamp?: string,
        incidentCategory?: string,
        incidentId?: string,
        description?: string,
        location?: string,
        lat: number,
        lon: number,
        country?: string,
        state?: string,
        city?: string,
        topic?: string,
        incidentVideos?: any
    }
}
