import { useState } from 'react'
import GoogleMapReact  from 'google-map-react'
import LocationMarker from './LocationMarker'
import LocationInfo from './LocationInfo'

const Map = ({eventData, panTo}) => {

    const [locationInfo, setLocationInfo] = useState(null)
    const [close, setClose] = useState(false)
    
    const markers = eventData.map((ev, index) => {
        return <LocationMarker key={index} 
                lat={ev.geometry.coordinates[1]} 
                lng={ev.geometry.coordinates[0]}
                onClick={()=> {
                    setLocationInfo({
                        location: ev.properties.Event,
                        address: ev.properties.Location,
                        start: ev.properties.Start,
                        end: ev.properties.End
                    })
                    setClose(!close)
                }}
                color={panTo === undefined ?'red': '#fa6b37'}
                />
    })

    const onCloseClick = () => {
        setClose(!close)
    }

    return (
        <div className="map">
            {panTo.length !== undefined?
                <GoogleMapReact
                bootstrapURLKeys={{key:'AIzaSyCBc6pukKhVCqFvdzsU8Mbm6P0mSOTQnjE'}}
                center={center}
                zoom={6}>        
                {markers}
                </GoogleMapReact>
                         
                : <GoogleMapReact
                    bootstrapURLKeys={{key:'AIzaSyCBc6pukKhVCqFvdzsU8Mbm6P0mSOTQnjE'}}
                    center={{lat: panTo.geometry.coordinates[1], lng: panTo.geometry.coordinates[0]}}
                    zoom={12}> 
                    {<LocationMarker 
                    lat={panTo.geometry.coordinates[1]}
                    lng={panTo.geometry.coordinates[0]}
                    onClick={()=>{
                        setLocationInfo({
                            location: panTo.properties.Event,
                            address: panTo.properties.Location,
                            start: panTo.properties.Start,
                            end: panTo.properties.End
                        })
                        setClose(!close)
                    }}
                    color={'red'}/>}
                </GoogleMapReact>
            }
            {locationInfo && close ? <LocationInfo info={locationInfo} onCloseClick={onCloseClick}/> : null}
        </div>
    )
}

const center = {
    lat: -41.276825,
    lng: 174.777969,
  }

export default Map
