package dataloader

type DataLoader struct {
	URL    string
	Method string
}

type Config struct {
	URL    string
	Method string
}

func New(c Config) *DataLoader {
	return &DataLoader{
		Method: c.Method,
		URL:    c.URL,
	}
}

type Meta struct {
	TableHeaders []string `json:"table_headers,omitempty"`
}

type Response struct {
	Data interface{} `json:"data"`
	Meta Meta        `json:"meta"`
}
