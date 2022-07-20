package signin

import (
	"net/url"

	"github.com/admin-golang/admin"
	"github.com/admin-golang/admin/icon"
)

func NewFormPage() (admin.Pager, error) {
	sideFormBackgroundImage, err := url.Parse("https://source.unsplash.com/random/?golang")
	if err != nil {
		return nil, err
	}

	return admin.NewSideFormPage(admin.SideFormPageConfig{
		BackgroundImage: sideFormBackgroundImage,
		FooterLabel:     "Copyright © Your Website 2022.",
		PageConfig: admin.PageConfig{
			Icon: icon.Icon{
				Type: icon.Lock,
			},
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
					RedirectURL: &admin.RedirectURL{
						URL: "/dashboard",
					},
				},
			},
		},
	}), nil
}
