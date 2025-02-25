package admin

import (
	"bytes"
	_ "embed"
	"encoding/json"
	"html/template"
	"log"
	"net/http"
	"net/url"
	"reflect"
	"strconv"
	textTemplate "text/template"

	"github.com/evanw/esbuild/pkg/api"

	"github.com/admin-golang/admin/dataloader"
	"github.com/admin-golang/admin/icon"
	"github.com/admin-golang/admin/layout"
	"github.com/admin-golang/admin/menu"
	"github.com/admin-golang/admin/navigation"
	"github.com/admin-golang/admin/state"
)

//go:embed templates/materialUI.tsx
var materialUIJSXTemplateText string

//go:embed templates/antDesignUI.tsx
var antDesignUIJSXTemplateText string

type UITheme int8

const (
	MaterialUI UITheme = iota + 1
	AntDesignUI
	VueUI
)

type FieldType uint

const (
	InputPassword FieldType = iota
	InputText
	InputFile
	InputNumber
	InputCents
	InputMulti
	InputCheckbox
	InputSelect
	InputAutocomplete
)

type PageType uint

const (
	DashboardPage PageType = iota
	SideFormPage
	ListPage
	FormPage
	EditPage
	UploadPage
	CardListPage
	InfinityListPage
)

type Field struct {
	ID           string    `json:"id"`
	Label        string    `json:"label"`
	Type         FieldType `json:"type"`
	IsRequired   bool
	FullWidth    bool `json:"fullWidth"`
	Value        string
	IsMultiline  bool
	NumberOfRows int
	Fields       Fields
	Width        int `json:"width"`
	Disabled     bool
}

type Fields []Field

type Pager interface {
	IsDefault() bool
	ID() string
	URL() string
	Type() PageType
	Icon() icon.Icon
	ToolbarEnabled() bool
	NavTabs() navigation.NavTabs
	Navigation() *navigation.Navigation
	PageHeader() *PageHeader
}

type Page struct {
	page   page
	Header *PageHeader
}

type PageHeader struct {
	ID        string
	FieldName string
}

type PageConfig struct {
	ID             string
	Icon           icon.Icon
	IsDefault      bool
	ToolbarEnabled bool
	Type           PageType
	URL            string
	NavTabs        navigation.NavTabs
	Navigation     *navigation.Navigation
	Header         *PageHeader
}

type OnListRowClick struct {
	RedirectURL string
}

type ListRowConfig struct {
	DataRowFieldName string
	ParamKey         string
	OnClick          *OnListRowClick
}

type PaginationConfig struct {
	RowsPerPage int
}

type ListSearchConfig struct {
	InputPlaceholder string
	InputID          string
}

type ListPageConfig struct {
	PageConfig
	MainButton    *MainButton
	Title         string
	DataLoader    *dataloader.DataLoader
	Pagination    *PaginationConfig
	ListRowConfig *ListRowConfig
	SearchConfig  *ListSearchConfig
}

type EditPageConfig struct {
	PageConfig

	ParamKey   string
	DataLoader *dataloader.DataLoader
	Form       Form
}

func NewPage(p PageConfig) Pager {
	page := page{
		icon:           p.Icon,
		id:             p.ID,
		isDefault:      p.IsDefault,
		toolbarEnabled: p.ToolbarEnabled,
		ttype:          p.Type,
		url:            p.URL,
		navTabs:        p.NavTabs,
		navigation:     p.Navigation,
		header:         p.Header,
	}
	return &Page{page: page, Header: p.Header}
}

type page struct {
	icon           icon.Icon
	id             string
	isDefault      bool
	toolbarEnabled bool
	ttype          PageType
	url            string
	navTabs        navigation.NavTabs
	navigation     *navigation.Navigation
	header         *PageHeader
}

func (p *Page) Icon() icon.Icon                    { return p.page.icon }
func (p *Page) ID() string                         { return p.page.id }
func (p *Page) IsDefault() bool                    { return p.page.isDefault }
func (p *Page) ToolbarEnabled() bool               { return p.page.toolbarEnabled }
func (p *Page) Type() PageType                     { return p.page.ttype }
func (p *Page) URL() string                        { return p.page.url }
func (p *Page) NavTabs() navigation.NavTabs        { return p.page.navTabs }
func (p *Page) Navigation() *navigation.Navigation { return p.page.navigation }
func (p *Page) PageHeader() *PageHeader            { return p.page.header }

type MainButton struct {
	Label string
	URL   string
}

type LListPage struct {
	page page

	MainButton    *MainButton
	Title         string
	DataLoader    *dataloader.DataLoader
	Pagination    *PaginationConfig
	ListRowConfig *ListRowConfig
	SearchConfig  *ListSearchConfig
	Header        *PageHeader
}

func (p *LListPage) Icon() icon.Icon                    { return p.page.icon }
func (p *LListPage) ID() string                         { return p.page.id }
func (p *LListPage) IsDefault() bool                    { return p.page.isDefault }
func (p *LListPage) ToolbarEnabled() bool               { return p.page.toolbarEnabled }
func (p *LListPage) Type() PageType                     { return p.page.ttype }
func (p *LListPage) URL() string                        { return p.page.url }
func (p *LListPage) NavTabs() navigation.NavTabs        { return p.page.navTabs }
func (p *LListPage) Navigation() *navigation.Navigation { return p.page.navigation }
func (p *LListPage) PageHeader() *PageHeader            { return p.page.header }

func NewListPage(p ListPageConfig) Pager {
	page := page{
		icon:           p.Icon,
		id:             p.ID,
		isDefault:      p.IsDefault,
		toolbarEnabled: p.ToolbarEnabled,
		ttype:          p.Type,
		url:            p.URL,
		navTabs:        p.NavTabs,
		header:         p.Header,
		navigation:     p.Navigation,
	}

	return &LListPage{
		page:          page,
		MainButton:    p.MainButton,
		Title:         p.Title,
		DataLoader:    p.DataLoader,
		ListRowConfig: p.ListRowConfig,
		SearchConfig:  p.SearchConfig,
		Pagination:    p.Pagination,
		Header:        p.Header,
	}
}

type CardListPageConfig struct {
	PageConfig
	ParamKey      string
	MainButton    *MainButton
	Title         string
	DataLoader    *dataloader.DataLoader
	Pagination    *PaginationConfig
	ListRowConfig *ListRowConfig
	Form          *Form
}

type CCardListPage struct {
	page page

	ParamKey      string
	MainButton    *MainButton
	Title         string
	DataLoader    *dataloader.DataLoader
	Pagination    *PaginationConfig
	ListRowConfig *ListRowConfig
	Header        *PageHeader
	Form          *Form
}

func (p *CCardListPage) Icon() icon.Icon                    { return p.page.icon }
func (p *CCardListPage) ID() string                         { return p.page.id }
func (p *CCardListPage) IsDefault() bool                    { return p.page.isDefault }
func (p *CCardListPage) ToolbarEnabled() bool               { return p.page.toolbarEnabled }
func (p *CCardListPage) Type() PageType                     { return p.page.ttype }
func (p *CCardListPage) URL() string                        { return p.page.url }
func (p *CCardListPage) NavTabs() navigation.NavTabs        { return p.page.navTabs }
func (p *CCardListPage) Navigation() *navigation.Navigation { return p.page.navigation }
func (p *CCardListPage) PageHeader() *PageHeader            { return p.page.header }

func NewCardListPage(p CardListPageConfig) Pager {
	page := page{
		icon:           p.Icon,
		id:             p.ID,
		isDefault:      p.IsDefault,
		toolbarEnabled: p.ToolbarEnabled,
		ttype:          p.Type,
		url:            p.URL,
		navTabs:        p.NavTabs,
		navigation:     p.Navigation,
		header:         p.Header,
	}

	return &CCardListPage{page: page, MainButton: p.MainButton, Title: p.Title, DataLoader: p.DataLoader, ListRowConfig: p.ListRowConfig, Pagination: p.Pagination, ParamKey: p.ParamKey, Header: p.Header, Form: p.Form}
}

type EEditPage struct {
	page page

	DataLoader *dataloader.DataLoader
	Form       Form
	Header     *PageHeader
}

func (p *EEditPage) Icon() icon.Icon                    { return p.page.icon }
func (p *EEditPage) ID() string                         { return p.page.id }
func (p *EEditPage) IsDefault() bool                    { return p.page.isDefault }
func (p *EEditPage) ToolbarEnabled() bool               { return p.page.toolbarEnabled }
func (p *EEditPage) Type() PageType                     { return p.page.ttype }
func (p *EEditPage) URL() string                        { return p.page.url }
func (p *EEditPage) NavTabs() navigation.NavTabs        { return p.page.navTabs }
func (p *EEditPage) Navigation() *navigation.Navigation { return p.page.navigation }
func (p *EEditPage) PageHeader() *PageHeader            { return p.page.header }

func NewEditPage(p EditPageConfig) Pager {
	page := page{
		icon:           p.Icon,
		id:             p.ID,
		ttype:          p.Type,
		url:            p.URL,
		navTabs:        p.NavTabs,
		header:         p.Header,
		navigation:     p.Navigation,
		toolbarEnabled: p.ToolbarEnabled,
	}

	return &EEditPage{page: page, Form: p.Form, DataLoader: p.DataLoader, Header: p.Header}
}

type UUploadPage struct {
	page page

	ParamKey   string
	DataLoader *dataloader.DataLoader
	Form       Form
	Header     *PageHeader
}

func (p *UUploadPage) Icon() icon.Icon                    { return p.page.icon }
func (p *UUploadPage) ID() string                         { return p.page.id }
func (p *UUploadPage) IsDefault() bool                    { return p.page.isDefault }
func (p *UUploadPage) ToolbarEnabled() bool               { return p.page.toolbarEnabled }
func (p *UUploadPage) Type() PageType                     { return p.page.ttype }
func (p *UUploadPage) URL() string                        { return p.page.url }
func (p *UUploadPage) NavTabs() navigation.NavTabs        { return p.page.navTabs }
func (p *UUploadPage) Navigation() *navigation.Navigation { return p.page.navigation }
func (p *UUploadPage) PageHeader() *PageHeader            { return p.page.header }

type UploadPageConfig struct {
	PageConfig

	ParamKey   string
	DataLoader *dataloader.DataLoader
	Form       Form
}

func NewUploadPage(p UploadPageConfig) Pager {
	page := page{
		icon:           p.Icon,
		id:             p.ID,
		ttype:          p.Type,
		url:            p.URL,
		navTabs:        p.NavTabs,
		header:         p.Header,
		navigation:     p.Navigation,
		toolbarEnabled: p.ToolbarEnabled,
	}

	return &UUploadPage{page: page, Form: p.Form, DataLoader: p.DataLoader, ParamKey: p.ParamKey, Header: p.Header}
}

type SSideFormPage struct {
	page page

	Form            Form
	BackgroundImage *url.URL
	FooterLabel     string
}

func (p *SSideFormPage) Icon() icon.Icon                    { return p.page.icon }
func (p *SSideFormPage) ID() string                         { return p.page.id }
func (p *SSideFormPage) IsDefault() bool                    { return p.page.isDefault }
func (p *SSideFormPage) ToolbarEnabled() bool               { return p.page.toolbarEnabled }
func (p *SSideFormPage) Type() PageType                     { return p.page.ttype }
func (p *SSideFormPage) URL() string                        { return p.page.url }
func (p *SSideFormPage) NavTabs() navigation.NavTabs        { return p.page.navTabs }
func (p *SSideFormPage) Navigation() *navigation.Navigation { return p.page.navigation }
func (p *SSideFormPage) PageHeader() *PageHeader            { return p.page.header }

type SideFormPageConfig struct {
	PageConfig

	Form            Form
	BackgroundImage *url.URL
	FooterLabel     string
}

func NewSideFormPage(p SideFormPageConfig) Pager {
	page := page{
		icon:           p.Icon,
		id:             p.ID,
		isDefault:      p.IsDefault,
		toolbarEnabled: p.ToolbarEnabled,
		ttype:          p.Type,
		url:            p.URL,
		navTabs:        p.NavTabs,
		header:         p.Header,
		navigation:     p.Navigation,
	}

	return &SSideFormPage{
		page:            page,
		Form:            p.Form,
		BackgroundImage: p.BackgroundImage,
		FooterLabel:     p.FooterLabel,
	}
}

type IInfinityListPage struct {
	page page

	Form        Form
	FooterLabel string
}

func (p *IInfinityListPage) Icon() icon.Icon                    { return p.page.icon }
func (p *IInfinityListPage) ID() string                         { return p.page.id }
func (p *IInfinityListPage) IsDefault() bool                    { return p.page.isDefault }
func (p *IInfinityListPage) ToolbarEnabled() bool               { return p.page.toolbarEnabled }
func (p *IInfinityListPage) Type() PageType                     { return p.page.ttype }
func (p *IInfinityListPage) URL() string                        { return p.page.url }
func (p *IInfinityListPage) NavTabs() navigation.NavTabs        { return p.page.navTabs }
func (p *IInfinityListPage) Navigation() *navigation.Navigation { return p.page.navigation }
func (p *IInfinityListPage) PageHeader() *PageHeader            { return p.page.header }

type IInfinityListPageConfig struct {
	PageConfig

	Form        Form
	FooterLabel string
}

func NewIInfinityListPage(p IInfinityListPageConfig) Pager {
	page := page{
		icon:           p.Icon,
		id:             p.ID,
		isDefault:      p.IsDefault,
		toolbarEnabled: p.ToolbarEnabled,
		ttype:          p.Type,
		url:            p.URL,
		navTabs:        p.NavTabs,
		header:         p.Header,
		navigation:     p.Navigation,
	}

	return &IInfinityListPage{
		page: page,
		Form: p.Form,
	}
}

type FFormPage struct {
	page page

	Form Form
}

func (p *FFormPage) Icon() icon.Icon                    { return p.page.icon }
func (p *FFormPage) ID() string                         { return p.page.id }
func (p *FFormPage) IsDefault() bool                    { return p.page.isDefault }
func (p *FFormPage) ToolbarEnabled() bool               { return p.page.toolbarEnabled }
func (p *FFormPage) Type() PageType                     { return p.page.ttype }
func (p *FFormPage) URL() string                        { return p.page.url }
func (p *FFormPage) NavTabs() navigation.NavTabs        { return p.page.navTabs }
func (p *FFormPage) Navigation() *navigation.Navigation { return p.page.navigation }
func (p *FFormPage) PageHeader() *PageHeader            { return p.page.header }

type FormPageConfig struct {
	PageConfig

	Form Form
}

func NewFormPage(p FormPageConfig) Pager {
	page := page{
		icon:           p.Icon,
		id:             p.ID,
		isDefault:      p.IsDefault,
		toolbarEnabled: p.ToolbarEnabled,
		ttype:          p.Type,
		url:            p.URL,
		navTabs:        p.NavTabs,
		header:         p.Header,
		navigation:     p.Navigation,
	}

	return &FFormPage{page: page, Form: p.Form}
}

type Pages []Pager

type Submit struct {
	Label        string                   `json:"label"`
	URL          string                   `json:"url"`
	SearchParams *navigation.SearchParams `json:"searchParams"`
	Method       string                   `json:"method"`
	Header       *Header                  `json:"header"`
	OnSuccess    *OnSubmitSuccess         `json:"onSuccess"`
}

type Header struct {
	Key   string      `json:"key"`
	Value HeaderValue `json:"value"`
}

type HeaderValue struct {
	Prefix            string `json:"prefix"`
	AppStateFieldPath string `json:"appStateFieldPath"`
}

type RedirectURL struct {
	URL          string                   `json:"url"`
	SearchParams *navigation.SearchParams `json:"searchParams"`
}

type OnSubmitSuccess struct {
	SetAppState          bool
	SetAppStateFieldName string
	RedirectURL          *RedirectURL `json:"redirectUrl"`
}

type Form struct {
	Navigation *navigation.Navigation
	Fields     Fields `json:"fields"`
	ID         string `json:"id"`
	Submit     Submit `json:"submit"`
	Title      string
}

type Config struct {
	DebugMode         bool
	Layout            *layout.Layout
	UITheme           UITheme
	Pages             Pages
	JSXTemplateText   *string
	AdminTemplateText *string
}

type (
	Admin interface {
		ServeHTTP(w http.ResponseWriter, r *http.Request)
	}

	admin struct {
		debugMode         bool
		layout            *layout.Layout
		pages             Pages
		uiTheme           UITheme
		jsxTemplateText   string
		adminTemplateText string
	}
)

func newTemplate(name string) *textTemplate.Template {
	return textTemplate.New(name).Delims("[[", "]]")
}

func (ad *admin) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	isNotNil := func(val interface{}) bool {
		return !reflect.ValueOf(val).IsNil()
	}

	wrap := func(ID string, label string, isRequired bool, value string, fullWidth bool, isMultiline bool, numberOfRows int) map[string]interface{} {
		return map[string]interface{}{
			"ID":           ID,
			"label":        label,
			"isRequired":   isRequired,
			"value":        value,
			"fullWidth":    fullWidth,
			"isMultiline":  isMultiline,
			"numberOfRows": numberOfRows,
		}
	}

	wrapPage := func(layout *layout.Layout, page Pager, pages Pages) map[string]interface{} {
		return map[string]interface{}{
			"layout": layout,
			"page":   page,
			"pages":  pages,
			"inputTypes": map[string]interface{}{
				"inputCents":        InputCents,
				"inputMulti":        InputMulti,
				"inputCheckbox":     InputCheckbox,
				"inputSelect":       InputSelect,
				"inputText":         InputText,
				"inputAutocomplete": InputAutocomplete,
			},
		}
	}

	wrapComponent := func() map[string]interface{} {
		return map[string]interface{}{
			"inputTypes": map[string]interface{}{
				"inputCents":    InputCents,
				"inputMulti":    InputMulti,
				"inputCheckbox": InputCheckbox,
			},
		}
	}

	wrapMenuIcons := func(menu *menu.Menu) map[string]interface{} {
		return map[string]interface{}{
			"menu": menu,
		}
	}

	wrapListPage := func(page Pager) *LListPage {
		return page.(*LListPage)
	}

	wrapCardListPage := func(page Pager) *CCardListPage {
		return page.(*CCardListPage)
	}

	wrapEditPage := func(page Pager) *EEditPage {
		return page.(*EEditPage)
	}

	wrapUploadPage := func(page Pager) *UUploadPage {
		return page.(*UUploadPage)
	}

	marshal := func(v interface{}) template.JS {
		d, _ := json.Marshal(v)
		return template.JS(d)
	}

	toString := func(value interface{}) string {
		switch v := value.(type) {
		case string:
			return v
		case uint:
			return strconv.Itoa(int(v))
		default:
			return ""
		}
	}

	jsxTemplate, err := newTemplate("JSX").Funcs(textTemplate.FuncMap{
		"IsNotNil":         isNotNil,
		"Wrap":             wrap,
		"WrapPage":         wrapPage,
		"WrapMenuIcons":    wrapMenuIcons,
		"WrapListPage":     wrapListPage,
		"WrapCardListPage": wrapCardListPage,
		"WrapEditPage":     wrapEditPage,
		"WrapUploadPage":   wrapUploadPage,
		"WrapComponent":    wrapComponent,
		"Marshal":          marshal,
		"ToString":         toString,
	}).Parse(ad.jsxTemplateText)
	if err != nil {
		log.Printf("failed to parse TSX template: %v", err)

		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var jsxWriter bytes.Buffer

	jsxData := struct {
		Layout              *layout.Layout
		Pages               Pages
		DashboardPage       PageType
		SideFormPage        PageType
		ListPage            PageType
		CardListPage        PageType
		FormPage            PageType
		EditPage            PageType
		UploadPage          PageType
		InfinityListPage    PageType
		RedirectAction      state.ActionType
		ClearAppStateAction state.ActionType
		AccountCircleIcon   icon.IconType
		NotificationsIcon   icon.IconType
		PeopleIcon          icon.IconType
		SettingsIcon        icon.IconType
		SellIcon            icon.IconType
		InventoryIcon       icon.IconType
		DashboardIcon       icon.IconType
		LockIcon            icon.IconType
		EmailIcon           icon.IconType
	}{
		Layout:              ad.layout,
		Pages:               ad.pages,
		DashboardPage:       DashboardPage,
		SideFormPage:        SideFormPage,
		ListPage:            ListPage,
		CardListPage:        CardListPage,
		FormPage:            FormPage,
		EditPage:            EditPage,
		UploadPage:          UploadPage,
		InfinityListPage:    InfinityListPage,
		RedirectAction:      state.Redirect,
		ClearAppStateAction: state.ClearAppState,
		AccountCircleIcon:   icon.AccountCircle,
		NotificationsIcon:   icon.Notifications,
		PeopleIcon:          icon.People,
		SettingsIcon:        icon.Settings,
		SellIcon:            icon.Sell,
		InventoryIcon:       icon.Inventory,
		DashboardIcon:       icon.Dashboard,
		LockIcon:            icon.Lock,
		EmailIcon:           icon.Email,
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
		log.Printf("failed to transform and minify TSX template, errors: %+v: %+v", indexJSMinified.Errors, indexJSMinified.Errors[0].Location)

		http.Error(w, "failed to render", http.StatusInternalServerError)
		return
	}

	indexData := struct {
		Debug       bool
		ThemeJS     template.JS
		Title       string
		Pages       Pages
		UITheme     UITheme
		MaterialUI  UITheme
		AntDesignUI UITheme
		VueUI       UITheme
	}{
		Debug:       ad.debugMode,
		ThemeJS:     template.JS(indexJSMinified.Code),
		Title:       ad.layout.Title,
		Pages:       ad.pages,
		UITheme:     ad.uiTheme,
		MaterialUI:  MaterialUI,
		AntDesignUI: AntDesignUI,
		VueUI:       VueUI,
	}

	adminTemplate, err := newTemplate("Admin").Parse(ad.adminTemplateText)
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
	jsxTemplateText := config.JSXTemplateText

	if config.JSXTemplateText == nil {
		switch config.UITheme {
		case MaterialUI:
			jsxTemplateText = &materialUIJSXTemplateText
		case AntDesignUI:
			jsxTemplateText = &antDesignUIJSXTemplateText
		default:
			jsxTemplateText = &materialUIJSXTemplateText
		}
	}

	adminTemplateText := config.AdminTemplateText
	if config.AdminTemplateText == nil {
		tmpl := defaultAdminTemplateText
		adminTemplateText = &tmpl
	}

	return &admin{
		debugMode:         config.DebugMode,
		layout:            config.Layout,
		pages:             config.Pages,
		uiTheme:           config.UITheme,
		jsxTemplateText:   *jsxTemplateText,
		adminTemplateText: *adminTemplateText,
	}
}

const defaultAdminTemplateText string = `
[[- define "Admin" -]]

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui" />
  <title>[[ .Title ]]</title>
  [[- if and (eq .UITheme .AntDesignUI) .Debug ]]
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/antd@4.12.3/dist/antd.css">
  [[- end -]]

  [[- if and (eq .UITheme .AntDesignUI) (not .Debug) ]]
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/antd@4.12.3/dist/antd.min.css">
  [[- end -]]

  [[- if and (eq .UITheme .MaterialUI) ]]
  <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
  <link rel="stylesheet" href="//fonts.googleapis.com/icon?family=Material+Icons" />
  [[- end ]]
</head>
<body>
  <div id="root"></div>
  [[ if .Debug -]]
  <script src="//cdn.jsdelivr.net/npm/react@17.0.1/umd/react.development.js"></script>
  <script src="//cdn.jsdelivr.net/npm/react-dom@17.0.1/umd/react-dom.development.js"></script>
  <script src="//cdn.jsdelivr.net/npm/react-router-dom@5.2.0/umd/react-router-dom.js"></script>
  [[- else -]]
  <script src="//cdn.jsdelivr.net/npm/react@17.0.1/umd/react.production.min.js"></script>
  <script src="//cdn.jsdelivr.net/npm/react-dom@17.0.1/umd/react-dom.production.min.js"></script>
  <script src="//cdn.jsdelivr.net/npm/react-router-dom@5.2.0/umd/react-router-dom.min.js"></script>
  [[- end -]]

  [[- if and (eq .UITheme .AntDesignUI) .Debug ]]
  <script src="//cdn.jsdelivr.net/npm/antd@4.12.3/dist/antd.js"></script>
  [[- end -]]

  [[- if and (eq .UITheme .AntDesignUI) (not .Debug) ]]
  <script src="//cdn.jsdelivr.net/npm/antd@4.12.3/dist/antd.min.js"></script>
  [[- end -]]

  [[- if and (eq .UITheme .MaterialUI) .Debug ]]
  <script src="//cdn.jsdelivr.net/npm/@material-ui/core@5.0.0-beta.2/umd/material-ui.development.js"></script>
  [[- end -]]

  [[- if and (eq .UITheme .MaterialUI) (not .Debug) ]]
  <script src="//cdn.jsdelivr.net/npm/@material-ui/core@5.0.0-beta.2/umd/material-ui.production.min.js"></script>
  [[- end ]]

  <script type="text/javascript">[[ .ThemeJS ]]</script>
</body>

[[- end -]]
`
