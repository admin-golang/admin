package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/admin-golang/admin"
	"github.com/admin-golang/admin/icon"
	"github.com/admin-golang/admin/layout"
	"github.com/admin-golang/admin/menu"
)

func main() {
	pages := admin.Pages{
		admin.NewPage(admin.PageParams{
			ID:   "Dashboard",
			URL:  "/dashboard",
			Type: admin.DashboardPage,
			Icon: icon.Icon{
				Type: icon.Dashboard,
			},
			ToolbarEnabled: true,
		}),
		admin.NewListPage(admin.ListPageParams{
			PageParams: admin.PageParams{
				ID:   "Products",
				URL:  "/products",
				Type: admin.ListPage,
				Icon: icon.Icon{
					Type: icon.Inventory,
				},
				ToolbarEnabled: true,
			},
			MainButton: &admin.MainButton{
				Label: "Add Product",
			},
		}),
		admin.NewPage(admin.PageParams{
			IsDefault: true,
			ID:        "SignIn",
			URL:       "/sign-in",
			Type:      admin.SideFormPage,
			Form: admin.Form{
				ID: "signIn",
				Fields: admin.Fields{
					admin.Field{
						ID:         "email",
						Type:       admin.InputText,
						Label:      "Email",
						IsRequired: true,
						Value:      "",
					},
					admin.Field{
						ID:         "password",
						Type:       admin.InputPassword,
						Label:      "Password",
						IsRequired: true,
						Value:      "",
					},
				},
				Submit: admin.Submit{
					Label:       "Sign In",
					URL:         "/sign-in",
					Method:      "POST",
					RedirectURL: "/dashboard",
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
	})

	admin := admin.New(&admin.Config{
		DebugMode: false,
		UITheme:   admin.MaterialUI, // admin.AntDesignUI,
		Pages:     pages,
		Layout:    layout,
	})

	mux := http.NewServeMux()

	mux.Handle("/admin", admin)
	mux.HandleFunc("/sign-in", signIn)

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

	log.Printf("form: %+v", form)

	if form.Password == "testerror" {
		http.Error(w, http.StatusText(http.StatusUnauthorized), http.StatusUnauthorized)
		return
	}

	resp := map[string]string{
		"data": "ok",
	}

	b, err := json.Marshal(resp)
	if err != nil {
		log.Printf("failed to marshal json: %v", err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	w.Write(b)
}
