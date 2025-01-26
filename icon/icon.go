package icon

type IconType int

const (
	Empty         IconType = -1
	Notifications IconType = iota
	AccountCircle
	Dashboard
	Inventory
	Sell
	Settings
	People
	Lock
	Email
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
