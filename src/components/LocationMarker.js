import { Icon } from "@iconify/react"
import locationIcon from '@iconify/icons-mdi/warning'

const LocationMarker = ({lat, lng, onClick, color}) => {
    return (
        <div className="location-marker" onClick={onClick}>
            <Icon icon={locationIcon}  className="location-icon" style={{color: color}}/>
        </div>
    )
}

export default LocationMarker
