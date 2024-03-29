package navigation

type Item struct {
	Label string
	URL   string
}

type Items []Item

type Navigation struct {
	Items  Items
	Active Item
}

type Config struct {
	Items  Items
	Active Item
}

func New(c Config) *Navigation {
	return &Navigation{
		Items:  c.Items,
		Active: c.Active,
	}
}

type NavTab struct {
	ID           string
	Label        string
	URL          string
	SearchParams *SearchParams
}

type NavTabs []NavTab

type SearchParamValue struct {
	FromLocation      bool   `json:"fromLocation"`
	FromResponse      bool   `json:"fromResponse"`
	FromQueryParams   bool   `json:"fromQueryParams"`
	SearchParamKey    string `json:"searchParamKey"`
	ResponseFieldPath string `json:"responseFieldPath"`
}

type SearchParam struct {
	Key   string           `json:"key"`
	Value SearchParamValue `json:"value"`
}

type SearchParams []SearchParam
