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
