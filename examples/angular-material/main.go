package main

import (
	"log"
	"net/http"
	"net/url"

	"github.com/admin-golang/admin"
	"github.com/admin-golang/admin/icon"
	"github.com/admin-golang/admin/layout"
)

func NewSubscribeFormPage() (admin.Pager, error) {
	sideFormBackgroundImage, err := url.Parse("https://source.unsplash.com/random/?golang")
	if err != nil {
		return nil, err
	}

	return admin.NewSideFormPage(admin.SideFormPageConfig{
		BackgroundImage: sideFormBackgroundImage,
		PageConfig: admin.PageConfig{
			Icon: icon.Icon{
				Type: icon.Email,
			},
			IsDefault: true,
			ID:        "Subscribe",
			URL:       "/subscribe",
			Type:      admin.SideFormPage,
		},
		Form: admin.Form{
			ID: "subscribe",
			Fields: admin.Fields{
				admin.Field{
					ID:         "email",
					Type:       admin.InputText,
					Label:      "Email",
					IsRequired: true,
					Value:      "",
					FullWidth:  true,
				},
			},
			Submit: admin.Submit{
				Label:  "Subscribe",
				URL:    "/subscribe",
				Method: "POST",
			},
		},
	}), nil
}

func main() {
	subscribeFormPage, err := NewSubscribeFormPage()
	if err != nil {
		log.Fatal(err)
	}

	pages := admin.Pages{
		subscribeFormPage,
	}

	admin := admin.New(&admin.Config{
		DebugMode: false,
		UITheme:   admin.AngularMaterialUI,
		Pages:     pages,
		Layout:    layout.New(&layout.Config{}),
	})

	mux := http.NewServeMux()

	mux.Handle("/admin", admin)

	log.Println("[admin-golang] running on port :8080 path: /admin")
	log.Fatal(http.ListenAndServe(":8080", mux))
}
