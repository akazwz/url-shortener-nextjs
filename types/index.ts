export interface Profiles{
	id: string
	updated_at?: string
	username: string
	avatar_url?: string
	website?: string
}

export interface Links{
	/*id: string
	created_at: string
	updated_at: string*/
	url: string
	short_id: string
	ip?: string
	uid?: string
}

export interface Visits{
	/*id: string
	created_at: string*/
	ip?: string
	link_id: string
	city?: string
	country?: string
	region?: string
	latitude?: string
	longitude?: string
	is_bot?: boolean
	ua?: string
	browser_name?: string
	browser_version?: string
	device_model?: string
	device_type?: string
	device_vendor?: string
	engine_name?: string
	engine_version?: string
	os_name?: string
	os_version?: string
	cpu_architecture?: string
	short_id: string
}