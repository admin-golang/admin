# admin [![Tests](https://github.com/admin-golang/admin/actions/workflows/tests.yml/badge.svg)](https://github.com/admin-golang/admin/actions/workflows/tests.yml) [![codecov](https://codecov.io/gh/admin-golang/admin/branch/main/graph/badge.svg?token=VUGFGVC37X)](https://codecov.io/gh/admin-golang/admin)

admin is a lightweight Go library to generate form/admin like UIs leveraging [Material-UI](https://github.com/mui/material-ui).

Quick Start
---

```
go get github.com/admin-golang/admin
```

```go
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
		UITheme:   admin.MaterialUI,
		Pages:     pages,
		Layout:    layout.New(&layout.Config{}),
	})

	mux := http.NewServeMux()

	mux.Handle("/admin", admin)

	log.Println("[admin-golang] running on port :8080 path: /admin")
	log.Fatal(http.ListenAndServe(":8080", mux))
}
```

<img width="721" alt="subscribe example" src="https://user-images.githubusercontent.com/1000404/179914238-81de7b65-8adb-46df-8b1c-fe0dbe35f96c.png">


For more complex examples, refer to the `examples` directory.
