package icon

type IconType uint

const (
	Notifications IconType = iota
	AccountCircle
	Dashboard
	Inventory
	Sell
	Settings
	People
)

type Icon struct {
	Type IconType
}

type PopoverIconType uint

const (
	Avatar PopoverIconType = iota
	Logout
)

type PopoverIcon struct {
	Type PopoverIconType
}
