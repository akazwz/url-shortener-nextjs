import { LatLngTuple } from 'leaflet'
import { MapContainer, LayersControl, TileLayer, CircleMarker } from 'react-leaflet'
import { Skeleton } from '@chakra-ui/react'

import 'leaflet/dist/leaflet.css'

const MapPlaceHolder = () => {
	return (
		<>
			<Skeleton w={'100%'} h={'45vh'} />
		</>
	)
}

export interface MapProps{
	points?: LatLngTuple[]
}

const MyMap = ({ points }: MapProps) => {
	return (
		<MapContainer
			center={[39.9, 116.3]}
			zoom={3}
			style={{ height: '45vh', width: '100%' }}
			attributionControl={false}
			placeholder={<MapPlaceHolder />}
		>
			<LayersControl position="topright">
				<LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
				</LayersControl.BaseLayer>
				<LayersControl.BaseLayer name="MapBoxDark">
					<TileLayer
						url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
						id="mapbox/dark-v10"
						accessToken="pk.eyJ1IjoiYWthend6IiwiYSI6ImNreDdvbGpodjM0NTYydXFvZ2JzMnQycDUifQ.OX_1hbGyke9K5ZZobjXRHQ"
					/>
				</LayersControl.BaseLayer>
			</LayersControl>
			{
				points?.map((point, index) => {
					return (
						<CircleMarker key={'points' + index} center={point} />
					)
				})
			}
		</MapContainer>
	)
}

export default MyMap