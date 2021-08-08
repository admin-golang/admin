package main

import (
	"encoding/json"
	"io"
	"log"
	"net/http"

	"github.com/admin-golang/admin"
)

func main() {
	pages := admin.Pages{
		admin.Page{
			ID:   "Dashboard",
			URL:  "/dashboard",
			Type: admin.DashboardPage,
		},
		admin.Page{
			ID:   "SignIn",
			URL:  "/sign-in",
			Type: admin.SideFormPage,
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
		},
	}

	admin := admin.New(&admin.Config{
		DebugMode: false,
		UITheme:   admin.MaterialUI, // admin.AntDesignUI,
		Pages:     pages,
	})

	http.Handle("/admin", admin)
	http.HandleFunc("/sign-in", signIn)

	log.Println("[admin-golang] running on port :8080, path: /admin")
	http.ListenAndServe(":8080", nil)
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
