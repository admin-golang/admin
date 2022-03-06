package admin_test

import (
	"net/http"
	"net/http/httptest"
	"net/url"
	"testing"

	"github.com/admin-golang/admin"
	"github.com/admin-golang/admin/icon"
	"github.com/admin-golang/admin/layout"
	"github.com/admin-golang/admin/menu"
)

func TestAdmin(t *testing.T) {
	tests := []struct {
		subTestName        string
		admin              admin.Admin
		expectedStatusCode int
	}{
		{
			subTestName:        "Success",
			admin:              newTestAdmin(),
			expectedStatusCode: http.StatusOK,
		},
	}

	for _, tt := range tests {
		t.Run(tt.subTestName, func(t *testing.T) {
			w := httptest.NewRecorder()
			r := httptest.NewRequest("GET", "/", nil)

			tt.admin.ServeHTTP(w, r)

			if w.Code != tt.expectedStatusCode {
				t.Fatalf("got: %v, want: %v", w.Code, tt.expectedStatusCode)
			}
		})
	}
}

func newTestAdmin() admin.Admin {
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
					Label:       "Create",
					URL:         "/packages/create",
					Method:      http.MethodPost,
					RedirectURL: "/packages",
				},
			},
		}),
		admin.NewSideFormPage(admin.SideFormPageConfig{
			BackgroundImage: &url.URL{},
			PageConfig: admin.PageConfig{
				IsDefault: true,
				ID:        "SignIn",
				URL:       "/sign-in",
				Type:      admin.SideFormPage,
				Icon:      icon.Icon{Type: icon.Inventory},
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

	return admin.New(&admin.Config{
		Layout: layout,
		Pages:  pages,
	})
}
