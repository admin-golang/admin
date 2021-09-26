package admin_test

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/admin-golang/admin"
	"github.com/admin-golang/admin/icon"
	"github.com/admin-golang/admin/layout"
)

func TestAdmin(t *testing.T) {
	tests := []struct {
		subTestName        string
		admin              admin.Admin
		expectedStatusCode int
	}{
		{
			subTestName: "Success",
			admin: admin.New(&admin.Config{
				Layout: layout.New(&layout.Config{}),
				Pages: admin.Pages{
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
				},
			}),
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
