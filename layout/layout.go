package layout

import "github.com/admin-golang/admin/menu"

type Config struct {
	Menu *menu.Menu
}

type Layout struct {
	Menu *menu.Menu
}

func New(config *Config) *Layout {
	return &Layout{
		Menu: config.Menu,
	}
}
