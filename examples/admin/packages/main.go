package packages

import (
	"net/http"

	"github.com/admin-golang/admin"
	"github.com/admin-golang/admin/dataloader"
	"github.com/admin-golang/admin/icon"
)

func NewListPage() admin.Pager {
	return admin.NewListPage(admin.ListPageConfig{
		PageConfig: admin.PageConfig{
			ID:   "Packages",
			URL:  "/packages",
			Type: admin.ListPage,
			Icon: icon.Icon{
				Type: icon.Inventory,
			},
			ToolbarEnabled: true,
		},
		MainButton: &admin.MainButton{
			Label: "Add Package",
			URL:   "/packages/create",
		},
		DataLoader: dataloader.New(dataloader.Config{
			URL:    "/packages",
			Method: http.MethodGet,
		}),
	})
}

func NewCreatePage() admin.Pager {
	return admin.NewFormPage(admin.FormPageConfig{
		PageConfig: admin.PageConfig{
			ID:   "PackagesCreate",
			URL:  "/packages/create",
			Type: admin.FormPage,
			Icon: icon.Icon{
				Type: icon.Dashboard,
			},
			ToolbarEnabled: false,
		},
		Form: admin.Form{
			ID:    "PackagesCreate",
			Title: "New Package",
			Fields: admin.Fields{
				admin.Field{
					ID:         "Name",
					Type:       admin.InputText,
					Label:      "Name",
					IsRequired: true,
					Value:      "",
				},
			},
			Submit: admin.Submit{
				Label:  "Create",
				URL:    "/packages/create",
				Method: http.MethodPost,
				OnSuccess: &admin.OnSubmitSuccess{
					RedirectURL: "/packages",
				},
			},
		},
	})
}
