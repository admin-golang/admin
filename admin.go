package admin

import (
	"bytes"
	_ "embed"
	"html/template"
	"log"
	"net/http"
	textTemplate "text/template"

	"github.com/evanw/esbuild/pkg/api"
)

//go:embed templates/materialUI.tsx
var materialUIJSXTemplateText string

//go:embed templates/antDesignUI.tsx
var antDesignUIJSXTemplateText string

type UITheme int8

const (
	MaterialUI UITheme = iota
	AntDesignUI
)

type FieldType uint

const (
	InputPassword FieldType = iota
	InputText
)

type PageType uint

const (
	DashboardPage PageType = iota
	SideFormPage
)

type Field struct {
	ID         string
	Label      string
	Type       FieldType
	IsRequired bool
	Value      string
}

type Fields []Field

type Pager interface {
	Fields() Fields
}

type Page struct {
	ID   string
	URL  string
	Type PageType
	Form Form
}

type Pages []Page

type Submit struct {
	Label       string
	URL         string
	Method      string
	RedirectURL string
}

type Form struct {
	ID     string
	Fields Fields
	Submit Submit
}

type Config struct {
	DebugMode bool
	UITheme   UITheme
	Pages     Pages
}

type (
	Admin interface {
		ServeHTTP(w http.ResponseWriter, r *http.Request)
	}

	admin struct {
		debugMode bool
		pages     Pages
		uiTheme   UITheme
	}
)

func newTemplate(name string) *textTemplate.Template {
	return textTemplate.New(name).Delims("[[", "]]")
}

func (ad *admin) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	materialUIJSXTemplateTextFn := func() string {
		return materialUIJSXTemplateText
	}

	materialUIThemeLinkCSSFn := func() template.HTML {
		return template.HTML(`
  <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
  <link rel="stylesheet" href="//fonts.googleapis.com/icon?family=Material+Icons" />
    `)
	}

	materialUIThemeScriptJSFn := func() template.HTML {
		if ad.debugMode {
			return template.HTML(`
    <script src="//cdn.jsdelivr.net/npm/@material-ui/core@5.0.0-beta.2/umd/material-ui.development.js"></script>
      `)
		}

		return template.HTML(`
  <script src="//cdn.jsdelivr.net/npm/@material-ui/core@5.0.0-beta.2/umd/material-ui.production.min.js"></script>
    `)
	}

	antDesignUIJSXTemplateTextFn := func() string {
		return antDesignUIJSXTemplateText
	}

	antDesignUIThemeLinkCSSFn := func() template.HTML {
		return template.HTML(`
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/antd@4.12.3/dist/antd.min.css">
    `)
	}

	antDesignUIThemeScriptJSFn := func() template.HTML {
		return template.HTML(`
  <script src="//cdn.jsdelivr.net/npm/antd@4.12.3/dist/antd.min.js"></script>
    `)
	}

	var jsxTemplateText string
	var themeLinkCSS template.HTML
	var themeScriptJS template.HTML

	switch ad.uiTheme {
	case MaterialUI:
		jsxTemplateText = materialUIJSXTemplateTextFn()
		themeLinkCSS = materialUIThemeLinkCSSFn()
		themeScriptJS = materialUIThemeScriptJSFn()
	case AntDesignUI:
		jsxTemplateText = antDesignUIJSXTemplateTextFn()
		themeLinkCSS = antDesignUIThemeLinkCSSFn()
		themeScriptJS = antDesignUIThemeScriptJSFn()
	default:
		jsxTemplateText = materialUIJSXTemplateTextFn()
		themeLinkCSS = materialUIThemeLinkCSSFn()
		themeScriptJS = materialUIThemeScriptJSFn()
	}

	wrap := func(ID string, label string, isRequired bool, value string) map[string]interface{} {
		return map[string]interface{}{
			"ID":         ID,
			"label":      label,
			"isRequired": isRequired,
			"value":      value,
		}
	}

	wrapPage := func(page Page) map[string]interface{} {
		return map[string]interface{}{
			"page": page,
		}
	}

	jsxTemplate, err := newTemplate("JSX").Funcs(textTemplate.FuncMap{
		"Wrap":     wrap,
		"WrapPage": wrapPage,
	}).Parse(jsxTemplateText)
	if err != nil {
		log.Printf("failed to parse TSX template: %v", err)

		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var jsxWriter bytes.Buffer

	jsxData := struct {
		Pages         Pages
		DashboardPage PageType
		SideFormPage  PageType
	}{
		Pages:         ad.pages,
		DashboardPage: DashboardPage,
		SideFormPage:  SideFormPage,
	}

	if err := jsxTemplate.Execute(&jsxWriter, jsxData); err != nil {
		log.Printf("failed to render Go template to TSX template: %v", err)

		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	indexJSMinified := api.Transform(jsxWriter.String(), api.TransformOptions{
		Loader:            api.LoaderTSX,
		MinifyWhitespace:  !ad.debugMode,
		MinifyIdentifiers: !ad.debugMode,
		MinifySyntax:      !ad.debugMode,
	})

	if len(indexJSMinified.Errors) > 0 {
		log.Printf("failed to transform and minify TSX template, errors: %+v", indexJSMinified.Errors)

		http.Error(w, "failed to render", http.StatusInternalServerError)
		return
	}

	indexData := struct {
		Debug         bool
		ThemeJS       template.JS
		ThemeLinkCSS  template.HTML
		ThemeScriptJS template.HTML
		Title         string
		Pages         Pages
	}{
		Debug:         ad.debugMode,
		ThemeJS:       template.JS(indexJSMinified.Code),
		ThemeLinkCSS:  themeLinkCSS,
		ThemeScriptJS: themeScriptJS,
		Title:         "admin",
		Pages:         ad.pages,
	}

	adminTemplate, err := newTemplate("Admin").Parse(adminTemplateText)
	if err != nil {
		log.Printf("failed to parse TSX template: %v", err)

		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if err := adminTemplate.Execute(w, indexData); err != nil {
		log.Printf("failed to render Go template to http.ResponseWriter: %v", err)

		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func New(config *Config) Admin {
	return &admin{debugMode: config.DebugMode, pages: config.Pages, uiTheme: config.UITheme}
}

const adminTemplateText string = `
[[ define "Admin" ]]

<!DOCTYPE html>
<html>
<head>
  <meta charset=utf-8/>
  <meta name="viewport" content="user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui">
  <title>[[ .Title ]]</title>
  [[ .ThemeLinkCSS ]]
</head>
<body>
  <div id="root"></div>

  [[ if .Debug ]]
    <script src="//cdn.jsdelivr.net/npm/react@17.0.1/umd/react.development.js"></script>
    <script src="//cdn.jsdelivr.net/npm/react-dom@17.0.1/umd/react-dom.development.js"></script>
    <script src="//cdn.jsdelivr.net/npm/react-router-dom@5.2.0/umd/react-router-dom.js"></script>
  [[ else ]]
    <script src="//cdn.jsdelivr.net/npm/react@17.0.1/umd/react.production.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/react-dom@17.0.1/umd/react-dom.production.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/react-router-dom@5.2.0/umd/react-router-dom.min.js"></script>
  [[ end ]]

  [[ .ThemeScriptJS ]]

<script type="text/javascript">[[ .ThemeJS ]]</script>
</body>

[[ end ]]
`
