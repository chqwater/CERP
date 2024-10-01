import request from '@/utils/request'

export function getFatestRoute(data: any) {
	return request({
		url: '/api/route/fastest',
		method: 'post',
		data
	})
}

export function getCostEffectiveRoute(data: any) {
	return request({
		url: '/api/route/cost-effective',
		method: 'post',
		data
	})
}

