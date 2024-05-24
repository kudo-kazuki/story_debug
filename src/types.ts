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
