import { Icon } from '@iconify/react'
import closeIcon from '@iconify/icons-mdi/close'

const LocationInfo = ({info, onCloseClick}) => {
    return (
        <div className="location-info">
            <Icon icon={closeIcon} className="location-info-icon" onClick={onCloseClick}/>
            <h2>Interest Location Info</h2>
            <ul>
                <li>Location: <strong>{info.location}</strong></li>
                <li>Address: <strong>{info.address}</strong></li>
                <li>Start: <strong>{info.start}</strong></li>
                <li>End: <strong>{info.end}</strong></li>
            </ul>
        </div>
    )
}

export default LocationInfo
