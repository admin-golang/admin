package layout

import (
	"github.com/admin-golang/admin/event"
	"github.com/admin-golang/admin/icon"
	"github.com/admin-golang/admin/layout"
	"github.com/admin-golang/admin/menu"
	"github.com/admin-golang/admin/state"
)

func NewLayout() *layout.Layout {
	return layout.New(&layout.Config{
		Menu: &menu.Menu{
			Items: menu.Items{
				menu.Item{
					ID: "Notifications",
					Badge: &menu.Badge{
						Content: 1,
					},
					Icon: icon.Icon{
						Type: icon.Notifications,
					},
				},
				menu.Item{
					ID: "Account",
					Icon: icon.Icon{
						Type: icon.AccountCircle,
					},
					Popover: &menu.Popover{
						Items: menu.PopoverItems{
							menu.PopoverItem{
								Label: "My Account",
								Icon: &icon.PopoverIcon{
									Type: icon.Avatar,
								},
							},
							menu.PopoverItem{
								Label: "Logout",
								Icon: &icon.PopoverIcon{
									Type: icon.Logout,
								},
								OnClick: &event.OnClick{
									Actions: state.Actions{
										state.NewActionRedirect("/sign-in"),
										state.NewActionClearAppState(),
									},
								},
							},
						},
					},
				},
			},
		},
		Title:       "Admin Title",
		FooterLabel: "Copyright © Your Website 2022.",
		Theme: &layout.Theme{
			Palette: layout.Palette{
				Primary: layout.PaletteColor{
					Main: "#00acc1",
				},
				Secondary: layout.PaletteColor{
					Main: "#b2ebf2",
				},
			},
		},
	})
}
