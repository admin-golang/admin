package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/admin-golang/admin"
	"github.com/admin-golang/admin/dataloader"
	"github.com/admin-golang/admin/examples/admin/dashboard"
	"github.com/admin-golang/admin/examples/admin/layout"
	"github.com/admin-golang/admin/examples/admin/packages"
	"github.com/admin-golang/admin/examples/admin/releases"
	"github.com/admin-golang/admin/examples/admin/signin"
)

func main() {
	signInFormPage, err := signin.NewFormPage()
	if err != nil {
		log.Fatal(err)
	}

	pages := admin.Pages{
		signInFormPage,
		dashboard.NewPage(),
		releases.NewListPage(),
		releases.NewCreatePage(),
		releases.NewEditPage(),
		releases.NewEditNotesPage(),
		releases.NewEditImagesPage(),
		releases.NewImageUploadPage(),
		packages.NewListPage(),
		packages.NewCreatePage(),
	}

	admin := admin.New(&admin.Config{
		DebugMode: false,
		UITheme:   admin.MaterialUI, // admin.AntDesignUI,
		Pages:     pages,
		Layout:    layout.NewLayout(),
	})

	mux := http.NewServeMux()

	mux.Handle("/admin", admin)
	mux.Handle("/show-release/", showRelease())
	mux.HandleFunc("/sign-in", signIn)
	mux.HandleFunc("/releases", allReleasesHandler)
	mux.HandleFunc("/releases/", releasesHandler)
	mux.HandleFunc("/packages", packagesHandler)
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		url := fmt.Sprintf("http://%s/admin", r.Host)
		http.Redirect(w, r, url, http.StatusFound)
	})

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

type Label struct {
	ID    string `json:"id"`
	Label string `json:"label"`
}

type Values struct {
	ID     string `json:"id"`
	Values string `json:"values"`
}

type Release struct {
	ID             string          `json:"id"`
	Name           string          `json:"name"`
	Description    string          `json:"description"`
	ReleaseDate    string          `json:"release_date"`
	URL            string          `json:"url"`
	TestCents      int             `json:"test_cents"`
	TestNumber     int             `json:"test_number"`
	TestInputMulti [][]interface{} `json:"test_input_multi"`
	TestCheckbox   bool            `json:"test_checkbox"`
}

type ReleaseImage struct {
	ID           string `json:"id"`
	UUID         string `json:"uuid"`
	Name         string `json:"name"`
	URL          string `json:"url"`
	TestCheckbox bool   `json:"test_checkbox"`
}

func allReleasesHandler(w http.ResponseWriter, r *http.Request) {
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

func releasesHandler(w http.ResponseWriter, r *http.Request) {
	parts := strings.Split(r.URL.String(), "/")

	if parts[len(parts)-1] == "images" {
		releaseID := parts[2]
		resp := dataloader.Response{
			Data: []ReleaseImage{
				{
					ID:           releaseID,
					UUID:         "1",
					Name:         releaseID,
					URL:          "https://source.unsplash.com/random/?golang",
					TestCheckbox: false,
				},
				{
					ID:           releaseID,
					UUID:         "2",
					Name:         releaseID,
					URL:          "https://source.unsplash.com/random/?golang",
					TestCheckbox: true,
				},
			},
			Meta: dataloader.Meta{
				MediaCardComponent: dataloader.MediaCardComponent{
					PropsMapper: dataloader.PropsMapper{
						"imgURL": "url",
						"imgALT": "name",
						"imgId":  "uuid",
					},
				},
				PageHeader: fmt.Sprintf("Go %s", releaseID),
			},
		}

		b, err := json.Marshal(resp)
		if err != nil {
			log.Printf("failed to serialize release images: %+v", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		w.Header().Add("Content-Type", "application/json")
		w.Write(b)
		return
	}

	w.WriteHeader(http.StatusNotFound)
}

func showRelease() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		releaseID := strings.Split(r.URL.String(), "/")[2]

		testInputMulti := [][]interface{}{
			[]interface{}{Label{ID: "label", Label: "label-1"}, Values{ID: "values", Values: "values-1"}},
			[]interface{}{Label{ID: "label", Label: "label-2"}, Values{ID: "values", Values: "values-2"}},
			[]interface{}{Label{ID: "label", Label: "label-3"}, Values{ID: "values", Values: "values-3"}},
		}

		resp := dataloader.Response{
			Data: Release{
				ID:             releaseID,
				Name:           fmt.Sprintf("Go %s", releaseID),
				Description:    fmt.Sprintf("Go %s description", releaseID),
				ReleaseDate:    "Tue Feb 16 18:08:40 2021 +0000",
				URL:            fmt.Sprintf("https://go.dev/doc/%s", releaseID),
				TestCents:      1012,
				TestNumber:     10,
				TestInputMulti: testInputMulti,
				TestCheckbox:   true,
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

func packagesHandler(w http.ResponseWriter, r *http.Request) {
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
