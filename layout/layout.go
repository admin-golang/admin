package layout

import "github.com/admin-golang/admin/menu"

type Config struct {
	FooterLabel string
	Menu        *menu.Menu
	Title       string
	Theme       *Theme
}

type PaletteColor struct {
	Main string
}

type Palette struct {
	Primary   PaletteColor
	Secondary PaletteColor
}

type Theme struct {
	Palette Palette
}

type Layout struct {
	FooterLabel string
	Menu        *menu.Menu
	Title       string
	Theme       *Theme
}

func New(config *Config) *Layout {
	return &Layout{
		FooterLabel: config.FooterLabel,
		Menu:        config.Menu,
		Title:       config.Title,
		Theme:       config.Theme,
	}
}
