export interface DropdownItem {
    value: number | string
    text: string
    isDisabled?: boolean
}

export interface DropdownProps {
    id?: string
    name?: string
    size?: 'l' | 'm' | 's'
    items: DropdownItem[]
    ariaLabel?: string
    placeholder?: string
}

export interface DeviceItem {
    [key: number | string]: {
        name: string
        width: number
        height: number
    }
}

export interface DevicePreviewItemProps {
    index: number
    deviceId: number | string
    characterId: number | string | null
    faceIndex: number | null
    backgroundImageIndex: number
    position?: 'left' | 'center' | 'right'
    memo?: string | null
    characterName?: string | null
    message?: string | null
}

export interface BackgroundSettingProps {
    devicePreviewItemIndex: number
}
