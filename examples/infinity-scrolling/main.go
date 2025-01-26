package main

import (
	"log"
	"net/http"

	"github.com/admin-golang/admin"
	"github.com/admin-golang/admin/icon"
	"github.com/admin-golang/admin/layout"
)

func NewInfinityListPage() (admin.Pager, error) {
	return admin.NewIInfinityListPage(admin.IInfinityListPageConfig{
		PageConfig: admin.PageConfig{
			Icon: icon.Icon{
				Type: icon.Email,
			},
			IsDefault: true,
			ID:        "Home",
			URL:       "/",
			Type:      admin.InfinityListPage,
		},
		Form: admin.Form{
			ID: "Text",
			Fields: admin.Fields{
				admin.Field{
					ID:         "Text",
					Type:       admin.InputText,
					Label:      "Text ...",
					IsRequired: true,
					Value:      "",
					FullWidth:  true,
				},
			},
		},
	}), nil
}

func main() {
	infinityListPage, err := NewInfinityListPage()
	if err != nil {
		log.Fatal(err)
	}

	pages := admin.Pages{
		infinityListPage,
	}

	admin := admin.New(&admin.Config{
		DebugMode: false,
		UITheme:   admin.MaterialUI,
		Pages:     pages,
		Layout:    layout.New(&layout.Config{}),
	})

	mux := http.NewServeMux()

	mux.Handle("/", admin)

	log.Println("[admin-golang] running on port :8080 path: /admin")
	log.Fatal(http.ListenAndServe(":8080", mux))
}
