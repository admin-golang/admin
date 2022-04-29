package dashboard

import (
	"github.com/admin-golang/admin"
	"github.com/admin-golang/admin/icon"
)

func NewPage() admin.Pager {
	return admin.NewPage(admin.PageConfig{
		ID:   "Dashboard",
		URL:  "/dashboard",
		Type: admin.DashboardPage,
		Icon: icon.Icon{
			Type: icon.Dashboard,
		},
		ToolbarEnabled: true,
	})
}
