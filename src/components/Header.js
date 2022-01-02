import { Icon } from "@iconify/react"
import locationIcon from '@iconify/icons-mdi/warning'

export const Header = () => {
    return (
        <header className="header">
            <h1><Icon icon={locationIcon}/> Covid 19 Interest Location</h1>
        </header>
    )
}
