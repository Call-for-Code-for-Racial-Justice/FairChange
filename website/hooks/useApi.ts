import React, { useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import get from 'lodash/get';

type useApiProps = {
	headers?: { [key: string]: string | number | boolean | object },
	baseUri?: string
};
export const useApi = ({ headers = {}, baseUri = "" }: useApiProps = {}): {
	getData: Function,
	postData: Function,
	isLoading: boolean,
	error: { [key: string]: string | number | boolean | object } | null
} =>
{
	const [isLoading, setIsLoading] = useState(false);

	const [error, setError] = useState(null);

	type invokeProps = {
		apiOptions: AxiosRequestConfig,
		api: string
	};
	const invoke = async ({ apiOptions, api }: invokeProps) =>
	{
		setIsLoading(true);
		try
		{
			const req = {
				...apiOptions,
				url: `${baseUri}${api}`,
				headers: {
					...headers,
					...apiOptions.headers
				}
			};

			const result = await axios(req);
			setIsLoading(false);
			return get(result, "data");
		}
		catch (err)
		{
			setIsLoading(false);
			setError(get(err, "response.data.message", get(err, "response.statusText", err.toString())));

			return { result: null };
		}
	};

	type getDataProps = {
		url: string,
		params?: AxiosRequestConfig["params"]
	}
	const getData = async ({ url, params }: getDataProps) =>
	{
		const apiOptions = {
			method: "GET" as AxiosRequestConfig["method"],
			params
		};

		return invoke({
			apiOptions,
			api: url
		});
	};

	type postDataProps = {
		url: string,
		data?: AxiosRequestConfig["data"]
	}
	const postData = async ({ url, data }: postDataProps) =>
	{
		const apiOptions = {
			method: "POST" as AxiosRequestConfig["method"],
			data
		};

		return invoke({
			apiOptions,
			api: url
		});
	};

	return { getData, postData, isLoading, error };
};
