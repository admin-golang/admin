package admin_test

import (
	"net/http"
	"net/http/httptest"
	"net/url"
	"testing"

	"github.com/admin-golang/admin"
	"github.com/admin-golang/admin/dataloader"
	"github.com/admin-golang/admin/event"
	"github.com/admin-golang/admin/icon"
	"github.com/admin-golang/admin/layout"
	"github.com/admin-golang/admin/menu"
	"github.com/admin-golang/admin/navigation"
	"github.com/admin-golang/admin/state"
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

func TestNewAdmin(t *testing.T) {
	tests := []struct {
		subTestName string
		admin       admin.Admin
	}{
		{
			subTestName: "MaterialUI",
			admin: admin.New(&admin.Config{
				Layout:  layout.New(&layout.Config{}),
				UITheme: admin.MaterialUI,
			}),
		},
		{
			subTestName: "AntDesignUI",
			admin: admin.New(&admin.Config{
				Layout:  layout.New(&layout.Config{}),
				UITheme: admin.AntDesignUI,
			}),
		},
		{
			subTestName: "defaults UI theme",
			admin: admin.New(&admin.Config{
				Layout: layout.New(&layout.Config{}),
			}),
		},
	}

	for _, tt := range tests {
		t.Run(tt.subTestName, func(t *testing.T) {
			if tt.admin == nil {
				t.Fatalf("got: %v, expected non nil", tt.admin)
			}
		})
	}
}

func TestServeHTTPJSXTemplateParse(t *testing.T) {
	tests := []struct {
		subTestName        string
		jsxTemplateText    string
		adminTemplateText  string
		admin              func(jsxTemplateText string, adminTemplateText string) admin.Admin
		expectedStatusCode int
	}{
		{
			subTestName:     "Handles JSX template text parse errors",
			jsxTemplateText: "[[.unclosed action",
			admin: func(jsxTemplateText string, adminTemplateText string) admin.Admin {
				return admin.New(&admin.Config{
					JSXTemplateText: &jsxTemplateText,
					Layout:          layout.New(&layout.Config{}),
				})
			},
			expectedStatusCode: http.StatusInternalServerError,
		},
		{
			subTestName:       "Handles Admin template text parse errors",
			adminTemplateText: "[[.unclosed action",
			admin: func(jsxTemplateText string, adminTemplateText string) admin.Admin {
				return admin.New(&admin.Config{
					AdminTemplateText: &adminTemplateText,
					Layout:            layout.New(&layout.Config{}),
				})
			},
			expectedStatusCode: http.StatusInternalServerError,
		},
	}

	for _, tt := range tests {
		t.Run(tt.subTestName, func(t *testing.T) {
			w := httptest.NewRecorder()
			r := httptest.NewRequest("GET", "/", nil)
			tt.admin(tt.jsxTemplateText, tt.adminTemplateText).ServeHTTP(w, r)

			if w.Code != tt.expectedStatusCode {
				t.Fatalf("got: %v, want: %v", w.Code, http.StatusInternalServerError)
			}
		})
	}
}

func TestServeHTTPJSXTemplateExecute(t *testing.T) {
	tests := []struct {
		subTestName        string
		jsxTemplateText    string
		adminTemplateText  string
		admin              func(jsxTemplateText string, adminTemplateText string) admin.Admin
		expectedStatusCode int
	}{
		{
			subTestName:     "Handles JSX template text execute errors",
			jsxTemplateText: `[[ template "test-not-found" ]]`,
			admin: func(jsxTemplateText string, adminTemplateText string) admin.Admin {
				return admin.New(&admin.Config{
					JSXTemplateText: &jsxTemplateText,
					Layout:          layout.New(&layout.Config{}),
				})
			},
			expectedStatusCode: http.StatusInternalServerError,
		},
		{
			subTestName:       "Handles Admin template text execute errors",
			adminTemplateText: `[[ template "test-not-found" ]]`,
			admin: func(jsxTemplateText string, adminTemplateText string) admin.Admin {
				return admin.New(&admin.Config{
					AdminTemplateText: &adminTemplateText,
					Layout:            layout.New(&layout.Config{}),
				})
			},
			expectedStatusCode: http.StatusInternalServerError,
		},
	}

	for _, tt := range tests {
		t.Run(tt.subTestName, func(t *testing.T) {
			w := httptest.NewRecorder()
			r := httptest.NewRequest("GET", "/", nil)
			tt.admin(tt.jsxTemplateText, tt.adminTemplateText).ServeHTTP(w, r)

			if w.Code != tt.expectedStatusCode {
				t.Fatalf("got: %v, want: %v", w.Code, http.StatusInternalServerError)
			}
		})
	}
}

func TestServeHTTPJSXTemplateTransform(t *testing.T) {
	jsxTemplateText := "<>invalid jsx"

	admin := admin.New(&admin.Config{
		JSXTemplateText: &jsxTemplateText,
		Layout:          layout.New(&layout.Config{}),
	})

	w := httptest.NewRecorder()
	r := httptest.NewRequest("GET", "/", nil)
	admin.ServeHTTP(w, r)

	if w.Code != http.StatusInternalServerError {
		t.Fatalf("got: %v, want: %v", w.Code, http.StatusInternalServerError)
	}
}

func TestPages(t *testing.T) {
	pageConfig := admin.PageConfig{
		Navigation: &navigation.Navigation{},
		Header:     &admin.PageHeader{ID: "test"},
	}
	tests := []struct {
		subTestName string
		pageConfig  admin.PageConfig
		pager       admin.Pager
	}{
		{
			subTestName: "Page",
			pager:       admin.NewPage(pageConfig),
		},
		{
			subTestName: "ListPage",
			pager: admin.NewListPage(admin.ListPageConfig{
				PageConfig: pageConfig,
			}),
		},
		{
			subTestName: "CardListPage",
			pager: admin.NewCardListPage(admin.CardListPageConfig{
				PageConfig: pageConfig,
			}),
		},
		{
			subTestName: "EditPage",
			pager: admin.NewEditPage(admin.EditPageConfig{
				PageConfig: pageConfig,
			}),
		},
		{
			subTestName: "UploadPage",
			pager: admin.NewUploadPage(admin.UploadPageConfig{
				PageConfig: pageConfig,
			}),
		},
		{
			subTestName: "SideFormPage",
			pager: admin.NewSideFormPage(admin.SideFormPageConfig{
				PageConfig: pageConfig,
			}),
		},
		{
			subTestName: "FormPage",
			pager: admin.NewFormPage(admin.FormPageConfig{
				PageConfig: pageConfig,
			}),
		},
	}
	for _, tt := range tests {
		t.Run(tt.subTestName, func(t *testing.T) {
			if tt.pager.Icon() != pageConfig.Icon {
				t.Fatalf("got: %v, want: %v", tt.pager.PageHeader(), pageConfig.Header)
			}
			if tt.pager.Navigation() != pageConfig.Navigation {
				t.Fatalf("got: %v, want: %v", tt.pager.Navigation(), pageConfig.Navigation)
			}
			if tt.pager.PageHeader() != pageConfig.Header {
				t.Fatalf("got: %v, want: %v", tt.pager.PageHeader(), pageConfig.Header)
			}
		})
	}
}

func newTestAdmin() admin.Admin {
	releasesNavTabs := navigation.NavTabs{
		navigation.NavTab{
			ID:    "details",
			Label: "Details",
			URL:   "/releases/:release_id",
			SearchParams: &navigation.SearchParams{
				navigation.SearchParam{
					Key: ":release_id",
					Value: navigation.SearchParamValue{
						FromLocation:   true,
						SearchParamKey: "release_id",
					},
				},
			},
		},
		navigation.NavTab{
			ID:    "notes",
			Label: "Notes",
			URL:   "/releases/:release_id/notes",
			SearchParams: &navigation.SearchParams{
				navigation.SearchParam{
					Key: ":release_id",
					Value: navigation.SearchParamValue{
						FromLocation:   true,
						SearchParamKey: "release_id",
					},
				},
			},
		},
		navigation.NavTab{
			ID:    "images",
			Label: "Images",
			URL:   "/releases/:release_id/images",
			SearchParams: &navigation.SearchParams{
				navigation.SearchParam{
					Key: ":release_id",
					Value: navigation.SearchParamValue{
						FromLocation:   true,
						SearchParamKey: "release_id",
					},
				},
			},
		},
		navigation.NavTab{
			ID:    "uploadImage",
			Label: "Upload Image",
			URL:   "/releases/:release_id/images/upload",
			SearchParams: &navigation.SearchParams{
				navigation.SearchParam{
					Key: ":release_id",
					Value: navigation.SearchParamValue{
						FromLocation:   true,
						SearchParamKey: "release_id",
					},
				},
			},
		},
	}

	navigationEditRelease := navigation.New(navigation.Config{
		Items: navigation.Items{
			navigation.Item{
				Label: "Releases",
				URL:   "/releases",
			},
		},
		Active: navigation.Item{
			Label: "Edit",
		},
	})

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
					Label:  "Create",
					URL:    "/packages/create",
					Method: http.MethodPost,
					OnSuccess: &admin.OnSubmitSuccess{
						RedirectURL: &admin.RedirectURL{
							URL: "/packages",
						},
					},
				},
			},
		}),
		admin.NewEditPage(admin.EditPageConfig{
			PageConfig: admin.PageConfig{
				ID:   "EditPackage",
				URL:  "/packages/:package_id",
				Type: admin.EditPage,
			},
			ParamKey: "package_id",
			DataLoader: dataloader.New(dataloader.Config{
				URL:    "/package",
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
							Label: "Packages",
							URL:   "/packages",
						},
					},
					Active: navigation.Item{
						Label: "Edit",
					},
				}),
				ID:    "PackagesEdit",
				Title: "Edit Package",
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
					Label:  "Edit",
					URL:    "/packages",
					Method: http.MethodPut,
					Header: &admin.Header{
						Key: "Authorization",
						Value: admin.HeaderValue{
							Prefix:            "Bearer ",
							AppStateFieldPath: "currentUser?.token",
						},
					},
					OnSuccess: &admin.OnSubmitSuccess{
						RedirectURL: &admin.RedirectURL{
							URL: "/packages",
						},
					},
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
					Label:  "Sign In",
					URL:    "/sign-in",
					Method: "POST",
					OnSuccess: &admin.OnSubmitSuccess{
						RedirectURL: &admin.RedirectURL{
							URL: "/dashboard",
						},
					},
				},
			},
		}),
		admin.NewIInfinityListPage(admin.IInfinityListPageConfig{
			BackgroundImage: &url.URL{},
			PageConfig: admin.PageConfig{
				IsDefault: true,
				ID:        "SignIn",
				URL:       "/sign-in",
				Type:      admin.InfinityListPage,
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
					Label:  "Sign In",
					URL:    "/sign-in",
					Method: "POST",
					OnSuccess: &admin.OnSubmitSuccess{
						RedirectURL: &admin.RedirectURL{
							URL: "/dashboard",
						},
					},
				},
			},
		}),
		admin.NewUploadPage(admin.UploadPageConfig{
			PageConfig: admin.PageConfig{
				ID:      "UploadImage",
				URL:     "/releases/:release_id/images/upload",
				Type:    admin.UploadPage,
				NavTabs: releasesNavTabs,
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
				ID: "ReleasesUploadFile",
				Fields: admin.Fields{
					admin.Field{
						ID:           "notesDocs",
						Type:         admin.InputFile,
						Label:        "Docs",
						IsRequired:   true,
						Value:        "",
						IsMultiline:  true,
						NumberOfRows: 4,
						FullWidth:    true,
					},
				},
				Submit: admin.Submit{
					Label: "Upload",
					URL:   "/releases/:release_id/images/upload",
					SearchParams: &navigation.SearchParams{
						navigation.SearchParam{
							Key: ":release_id",
							Value: navigation.SearchParamValue{
								FromLocation:   true,
								SearchParamKey: "release_id",
							},
						},
					},
					Method: http.MethodPost,
					Header: &admin.Header{
						Key: "Authorization",
						Value: admin.HeaderValue{
							Prefix:            "Bearer ",
							AppStateFieldPath: "currentUser?.token",
						},
					},
					OnSuccess: &admin.OnSubmitSuccess{
						RedirectURL: &admin.RedirectURL{
							URL: "/releases",
						},
					},
				},
			},
		}),
		admin.NewCardListPage(admin.CardListPageConfig{
			PageConfig: admin.PageConfig{
				ID:         "EditReleaseImages",
				URL:        "/releases/:release_id/images",
				Type:       admin.CardListPage,
				NavTabs:    releasesNavTabs,
				Navigation: navigationEditRelease,
			},
			DataLoader: dataloader.New(dataloader.Config{
				URL: "/releases/:release_id/images",
				SearchParams: &navigation.SearchParams{
					navigation.SearchParam{
						Key: ":release_id",
						Value: navigation.SearchParamValue{
							FromLocation:   true,
							SearchParamKey: "release_id",
						},
					},
				},
				Method: http.MethodGet,
				HeaderConfig: &dataloader.HeaderConfig{
					Key: "Authorization",
					ValueConfig: dataloader.HeaderValueConfig{
						Prefix:            "Bearer ",
						AppStateFieldPath: "currentUser?.token",
					},
				},
			}),
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
	})

	return admin.New(&admin.Config{
		Layout: layout,
		Pages:  pages,
	})
}
