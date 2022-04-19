package layout

import "github.com/admin-golang/admin/menu"

type Config struct {
	FooterLabel string
	Menu        *menu.Menu
	Title       string
}

type Layout struct {
	FooterLabel string
	Menu        *menu.Menu
	Title       string
}

func New(config *Config) *Layout {
	return &Layout{
		FooterLabel: config.FooterLabel,
		Menu:        config.Menu,
		Title:       config.Title,
	}
}
