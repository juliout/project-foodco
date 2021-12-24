import axios from "axios";

export const foodCoApi = axios.create({
    baseURL: 'http://gdp-prd-clube.s3.amazonaws.com/api/repository/partners'
})
