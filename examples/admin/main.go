package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"strings"

	"github.com/admin-golang/admin"
	"github.com/admin-golang/admin/dataloader"
	"github.com/admin-golang/admin/icon"
	"github.com/admin-golang/admin/layout"
	"github.com/admin-golang/admin/menu"
	"github.com/admin-golang/admin/navigation"
)

func main() {
	sideFormBackgroundImage, err := url.Parse("https://source.unsplash.com/random/?golang")
	if err != nil {
		log.Fatal(err)
	}

	pages := admin.Pages{
		admin.NewPage(admin.PageConfig{
			ID:   "Dashboard",
			URL:  "/dashboard",
			Type: admin.DashboardPage,
			Icon: icon.Icon{
				Type: icon.Dashboard,
			},
			ToolbarEnabled: true,
		}),
		admin.NewListPage(admin.ListPageConfig{
			PageConfig: admin.PageConfig{
				ID:   "Releases",
				URL:  "/releases",
				Type: admin.ListPage,
				Icon: icon.Icon{
					Type: icon.Sell,
				},
				ToolbarEnabled: true,
			},
			Title: "Releases",
			MainButton: &admin.MainButton{
				Label: "Add Release",
				URL:   "/releases/create",
			},
			DataLoader: dataloader.New(dataloader.Config{
				URL:    "/releases",
				Method: http.MethodGet,
				HeaderConfig: &dataloader.HeaderConfig{
					Key: "Authorization",
					ValueConfig: dataloader.HeaderValueConfig{
						Prefix:            "Bearer ",
						AppStateFieldPath: "currentUser?.token",
					},
				},
			}),
			Pagination: &admin.PaginationConfig{
				RowsPerPage: 10,
			},
			ListRowConfig: &admin.ListRowConfig{
				DataRowFieldName: "id",
				ParamKey:         ":id",
				OnClick: &admin.OnListRowClick{
					RedirectURL: "/releases/:id",
				},
			},
		}),
		admin.NewEditPage(admin.EditPageConfig{
			PageConfig: admin.PageConfig{
				ID:   "EditRelease",
				URL:  "/releases/:release_id",
				Type: admin.EditPage,
			},
			ParamKey: "release_id",
			DataLoader: dataloader.New(dataloader.Config{
				URL:    "/show-release",
				Method: http.MethodGet,
				HeaderConfig: &dataloader.HeaderConfig{
					Key: "Authorization",
					ValueConfig: dataloader.HeaderValueConfig{
						Prefix:            "Bearer ",
						AppStateFieldPath: "currentUser?.token",
					},
				},
			}),
			Form: admin.Form{
				Navigation: navigation.New(navigation.Config{
					Items: navigation.Items{
						navigation.Item{
							Label: "Releases",
							URL:   "/releases",
						},
					},
					Active: navigation.Item{
						Label: "Edit",
					},
				}),
				ID:    "ReleasesEdit",
				Title: "Edit Release",
				Fields: admin.Fields{
					admin.Field{
						ID:         "name",
						Type:       admin.InputText,
						Label:      "Name",
						IsRequired: true,
						Value:      "",
						FullWidth:  true,
					},
					admin.Field{
						ID:           "description",
						Type:         admin.InputText,
						Label:        "Description",
						IsRequired:   true,
						Value:        "",
						IsMultiline:  true,
						NumberOfRows: 4,
						FullWidth:    true,
					},
				},
				Submit: admin.Submit{
					Label: "Edit",
					URL:   "/releases/:release_id",
					SearchParams: &admin.SearchParams{
						admin.SearchParam{
							Key: ":release_id",
							Value: admin.SearchParamValue{
								FromLocation:   true,
								SearchParamKey: "release_id",
							},
						},
					},
					Method: http.MethodPut,
					Header: &admin.Header{
						Key: "Authorization",
						Value: admin.HeaderValue{
							Prefix:            "Bearer ",
							AppStateFieldPath: "currentUser?.token",
						},
					},
					OnSuccess: &admin.OnSubmitSuccess{
						RedirectURL: "/releases",
					},
				},
			},
		}),
		admin.NewListPage(admin.ListPageConfig{
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
		}),
		admin.NewFormPage(admin.FormPageConfig{
			PageConfig: admin.PageConfig{
				ID:   "ReleasesCreate",
				URL:  "/releases/create",
				Type: admin.FormPage,
				Icon: icon.Icon{
					Type: icon.Dashboard,
				},
				ToolbarEnabled: false,
			},
			Form: admin.Form{
				Navigation: navigation.New(navigation.Config{
					Items: navigation.Items{
						navigation.Item{
							Label: "Releases",
							URL:   "/releases",
						},
					},
					Active: navigation.Item{
						Label: "Create",
					},
				}),
				ID:    "ReleasesCreate",
				Title: "New Release",
				Fields: admin.Fields{
					admin.Field{
						ID:         "Name",
						Type:       admin.InputText,
						Label:      "Name",
						IsRequired: true,
						Value:      "",
						FullWidth:  true,
					},
					admin.Field{
						ID:           "Description",
						Type:         admin.InputText,
						Label:        "Description",
						IsRequired:   true,
						Value:        "",
						IsMultiline:  true,
						NumberOfRows: 4,
						FullWidth:    true,
					},
				},
				Submit: admin.Submit{
					Label:  "Create",
					URL:    "/releases/create",
					Method: http.MethodPost,
					Header: &admin.Header{
						Key: "Authorization",
						Value: admin.HeaderValue{
							Prefix:            "Bearer ",
							AppStateFieldPath: "currentUser?.token",
						},
					},
					OnSuccess: &admin.OnSubmitSuccess{
						RedirectURL: "/releases",
					},
				},
			},
		}),
		admin.NewFormPage(admin.FormPageConfig{
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
		}),
		admin.NewSideFormPage(admin.SideFormPageConfig{
			BackgroundImage: sideFormBackgroundImage,
			FooterLabel:     "Copyright © Your Website 2022.",
			PageConfig: admin.PageConfig{
				IsDefault: true,
				ID:        "SignIn",
				URL:       "/sign-in",
				Type:      admin.SideFormPage,
			},
			Form: admin.Form{
				ID:    "signIn",
				Title: "Sign in",
				Fields: admin.Fields{
					admin.Field{
						ID:         "email",
						Type:       admin.InputText,
						Label:      "Email",
						IsRequired: true,
						Value:      "",
						FullWidth:  true,
					},
					admin.Field{
						ID:         "password",
						Type:       admin.InputPassword,
						Label:      "Password",
						IsRequired: true,
						Value:      "",
						FullWidth:  true,
					},
				},
				Submit: admin.Submit{
					Label:  "Sign In",
					URL:    "/sign-in",
					Method: "POST",
					OnSuccess: &admin.OnSubmitSuccess{
						SetAppState:          true,
						SetAppStateFieldName: "currentUser",
						RedirectURL:          "/dashboard",
					},
				},
			},
		}),
	}

	layout := layout.New(&layout.Config{
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
							},
						},
					},
				},
			},
		},
		Title:       "Admin Title",
		FooterLabel: "Copyright © Your Website 2022.",
	})

	admin := admin.New(&admin.Config{
		DebugMode: false,
		UITheme:   admin.MaterialUI, // admin.AntDesignUI,
		Pages:     pages,
		Layout:    layout,
	})

	mux := http.NewServeMux()

	mux.Handle("/admin", admin)
	mux.Handle("/show-release/", showRelease())
	mux.HandleFunc("/sign-in", signIn)
	mux.HandleFunc("/releases", releases)
	mux.HandleFunc("/packages", packages)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("[admin-golang] running on port :%s, path: /admin", port)

	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", port), mux))
}

type signInForm struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func signIn(w http.ResponseWriter, r *http.Request) {
	log.Printf("[signIn]: %s %s", r.Method, r.URL.String())

	rb, err := io.ReadAll(r.Body)
	if err != nil {
		log.Printf("failed to read request body: %v", err)
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		return
	}
	form := &signInForm{}

	if err := json.Unmarshal(rb, form); err != nil {
		log.Printf("failed to unmarshal request body: %v", err)
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		return
	}

	if form.Password == "testerror" {
		http.Error(w, http.StatusText(http.StatusUnauthorized), http.StatusUnauthorized)
		return
	}

	resp := map[string]string{
		"uuid":  "user_uuid",
		"token": "user_token",
	}

	b, err := json.Marshal(resp)
	if err != nil {
		log.Printf("failed to marshal json: %v", err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(b)
}

type Release struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	ReleaseDate string `json:"release_date"`
	URL         string `json:"url"`
}

func releases(w http.ResponseWriter, r *http.Request) {
	resp := dataloader.Response{
		Data: []Release{
			{
				ID:          "go1.16",
				Name:        "Go 1.16",
				Description: "Go 1.16 description",
				ReleaseDate: "Tue Feb 16 18:08:40 2021 +0000",
				URL:         "https://go.dev/doc/go1.16",
			},
			{
				ID:          "go1.15",
				Name:        "Go 1.15",
				Description: "Go 1.15 description",
				ReleaseDate: "Tue Aug 11 19:01:57 2020 +0000",
				URL:         "https://go.dev/doc/go1.15",
			},
		},
		Meta: dataloader.Meta{
			Headers: []string{"ID", "Name", "Description", "Release Date", "URL"},
			Components: map[string]string{
				"id":           "text",
				"name":         "text",
				"description":  "text",
				"release_date": "text",
				"url":          "link",
			},
		},
	}

	b, err := json.Marshal(resp)
	if err != nil {
		log.Printf("failed to serialize releases: %+v", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	w.Write(b)
}

func showRelease() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		releaseID := strings.Split(r.URL.String(), "/")[2]

		resp := dataloader.Response{
			Data: Release{
				ID:          releaseID,
				Name:        fmt.Sprintf("Go %s", releaseID),
				Description: fmt.Sprintf("Go %s description", releaseID),
				ReleaseDate: "Tue Feb 16 18:08:40 2021 +0000",
				URL:         fmt.Sprintf("https://go.dev/doc/%s", releaseID),
			},
		}

		b, err := json.Marshal(resp)
		if err != nil {
			log.Printf("failed to serialize release: %+v", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		w.Header().Add("Content-Type", "application/json")
		w.Write(b)
	})
}

type Package struct {
	ModulePath string   `json:"module_path"`
	Tags       []string `json:"tags"`
	URL        string   `json:"url"`
}

func packages(w http.ResponseWriter, r *http.Request) {
	resp := dataloader.Response{
		Data: []Package{
			{
				ModulePath: "github.com/google/uuid",
				Tags:       []string{"uuid", "Universally Unique IDentifier"},
				URL:        "https://github.com/google/uuid",
			},
			{
				ModulePath: "golang.org/x/tools/...@latest",
				Tags:       []string{"tools", "godoc", "vet", "goimports"},
				URL:        "https://github.com/golang/tools",
			},
		},
		Meta: dataloader.Meta{
			Headers: []string{"Module Path", "Tags", "URL"},
			Components: map[string]string{
				"module_path": "text",
				"tags":        "tag",
				"url":         "link",
			},
		},
	}

	b, err := json.Marshal(resp)
	if err != nil {
		log.Printf("failed to serialize packages: %+v", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	w.Write(b)

}
