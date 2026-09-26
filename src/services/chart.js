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