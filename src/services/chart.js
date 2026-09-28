import { EndpointApi } from "./api";

export const Chart = async (period, token) => {
    try {
        const response = await EndpointApi.get(
            "/analytics/income-expenses",
            {
                params: {
                    period,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        throw error;
    }
};


export const ChartPie = async (period, token) => {
    try {
        const response = await EndpointApi.get(
            "/analytics/categories-expenses",
            {
                params: {
                    period,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        throw error;
    }
};