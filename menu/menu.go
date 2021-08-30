package menu

import "github.com/admin-golang/admin/icon"

type Badge struct {
	Content int
}

type Item struct {
	ID      string
	Badge   *Badge
	Icon    icon.Icon
	Popover *Popover
}

type Items []Item

type Config struct {
	Items Items
}

type Menu struct {
	Items Items
}

func New() *Menu {
	return &Menu{}
}

type PopoverItem struct {
	Label string
	Icon  *icon.PopoverIcon
}

type PopoverItems []PopoverItem

type Popover struct {
	Items PopoverItems
}
