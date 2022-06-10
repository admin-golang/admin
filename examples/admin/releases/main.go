package releases

import (
	"net/http"

	"github.com/admin-golang/admin"
	"github.com/admin-golang/admin/dataloader"
	"github.com/admin-golang/admin/icon"
	"github.com/admin-golang/admin/navigation"
)

var navigationEditRelease *navigation.Navigation = navigation.New(navigation.Config{
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

var releasesNavTabs navigation.NavTabs = navigation.NavTabs{
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

func NewListPage() admin.Pager {
	return admin.NewListPage(admin.ListPageConfig{
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
			RowsPerPage: 1,
		},
		ListRowConfig: &admin.ListRowConfig{
			DataRowFieldName: "id",
			ParamKey:         ":id",
			OnClick: &admin.OnListRowClick{
				RedirectURL: "/releases/:id",
			},
		},
	})
}

func NewEditPage() admin.Pager {
	return admin.NewEditPage(admin.EditPageConfig{
		PageConfig: admin.PageConfig{
			ID:      "EditRelease",
			URL:     "/releases/:release_id",
			Type:    admin.EditPage,
			NavTabs: releasesNavTabs,
			Header: &admin.PageHeader{
				ID:        "pageHeader",
				FieldName: "name",
			},
		},
		DataLoader: dataloader.New(dataloader.Config{
			URL: "/show-release/:release_id",
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
		Form: admin.Form{
			Navigation: navigationEditRelease,
			ID:         "ReleasesEdit",
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
				admin.Field{
					ID:         "test_select",
					Type:       admin.InputSelect,
					Label:      "Test Select",
					Value:      "Default Value",
					IsRequired: true,
					Disabled:   true,
				},
				admin.Field{
					ID:         "test_cents",
					Type:       admin.InputCents,
					Label:      "Test Cents",
					IsRequired: true,
					Value:      "",
					FullWidth:  false,
				},
				admin.Field{
					ID:         "test_number",
					Type:       admin.InputNumber,
					Label:      "Test Number",
					IsRequired: true,
					Value:      "",
					FullWidth:  false,
				},
				admin.Field{
					ID:         "test_input_multi",
					Type:       admin.InputMulti,
					Label:      "Test Input Multi",
					IsRequired: true,
					Value:      "",
					FullWidth:  false,
					Fields: admin.Fields{
						admin.Field{
							ID:        "label",
							Label:     "Label",
							FullWidth: true,
							Width:     3,
						},
						admin.Field{
							ID:        "values",
							Label:     "Values",
							FullWidth: true,
							Width:     5,
						},
					},
				},
				admin.Field{
					ID:         "test_checkbox",
					Type:       admin.InputCheckbox,
					Label:      "Test Checkbox",
					Value:      "true",
					IsRequired: true,
				},
			},
			Submit: admin.Submit{
				Label: "Edit",
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
						URL: "/releases/:release_id",
						SearchParams: &navigation.SearchParams{
							navigation.SearchParam{
								Key: ":release_id",
								Value: navigation.SearchParamValue{
									FromResponse:      true,
									ResponseFieldPath: "id",
								},
							},
						},
					},
				},
			},
		},
	})
}

func NewEditNotesPage() admin.Pager {
	return admin.NewEditPage(admin.EditPageConfig{
		PageConfig: admin.PageConfig{
			ID:      "EditReleaseNotes",
			URL:     "/releases/:release_id/notes",
			Type:    admin.EditPage,
			NavTabs: releasesNavTabs,
			Header: &admin.PageHeader{
				ID:        "pageHeader",
				FieldName: "name",
			},
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
			Navigation: navigationEditRelease,
			ID:         "ReleasesEdit",
			Fields: admin.Fields{
				admin.Field{
					ID:           "notes",
					Type:         admin.InputText,
					Label:        "Notes",
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
				SearchParams: &navigation.SearchParams{
					navigation.SearchParam{
						Key: ":release_id",
						Value: navigation.SearchParamValue{
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
					RedirectURL: &admin.RedirectURL{
						URL: "/releases",
					},
				},
			},
		},
	})
}

func NewCreatePage() admin.Pager {
	return admin.NewFormPage(admin.FormPageConfig{
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
			Navigation: navigationEditRelease,
			ID:         "ReleasesCreate",
			Title:      "New Release",
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
					RedirectURL: &admin.RedirectURL{
						URL: "/releases/:release_id",
						SearchParams: &navigation.SearchParams{
							navigation.SearchParam{
								Key: ":release_id",
								Value: navigation.SearchParamValue{
									FromResponse:      true,
									ResponseFieldPath: "id",
								},
							},
						},
					},
				},
			},
		},
	})
}

func NewImageUploadPage() admin.Pager {
	return admin.NewUploadPage(admin.UploadPageConfig{
		PageConfig: admin.PageConfig{
			ID:      "UploadImage",
			URL:     "/releases/:release_id/images/upload",
			Type:    admin.UploadPage,
			NavTabs: releasesNavTabs,
			Header: &admin.PageHeader{
				ID:        "pageHeader",
				FieldName: "name",
			},
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
			Navigation: navigationEditRelease,
			ID:         "ReleasesUploadFile",
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
					},
				},
			},
		},
	})
}

func NewEditImagesPage() admin.Pager {
	return admin.NewCardListPage(admin.CardListPageConfig{
		PageConfig: admin.PageConfig{
			ID:         "EditReleaseImages",
			URL:        "/releases/:release_id/images",
			Type:       admin.CardListPage,
			NavTabs:    releasesNavTabs,
			Navigation: navigationEditRelease,
			Header: &admin.PageHeader{
				ID:        "pageHeader",
				FieldName: "name",
			},
		},
		Form: &admin.Form{
			ID: "ImageEdit",
			Fields: admin.Fields{
				admin.Field{
					ID:         "test_checkbox",
					Type:       admin.InputCheckbox,
					Label:      "Test Checkbox",
					Value:      "true",
					IsRequired: true,
				},
			},
			Submit: admin.Submit{
				Label: "Save Changes",
				URL:   "/releases/:release_id/images/:imgId",
				SearchParams: &navigation.SearchParams{
					navigation.SearchParam{
						Key: ":release_id",
						Value: navigation.SearchParamValue{
							FromLocation:   true,
							SearchParamKey: "release_id",
						},
					},
					navigation.SearchParam{
						Key: ":imgId",
						Value: navigation.SearchParamValue{
							FromLocation:   true,
							SearchParamKey: "imgId",
						},
					},
				},
				Method: http.MethodPut,
				Header: &admin.Header{
					Key: "Authorization",
					Value: admin.HeaderValue{
						Prefix:            "Bearer ",
						AppStateFieldPath: "currentUser.token",
					},
				},
				OnSuccess: &admin.OnSubmitSuccess{
					RedirectURL: &admin.RedirectURL{
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
					},
				},
			},
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
	})
}
