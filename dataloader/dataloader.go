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
	Headers    []string          `json:"headers,omitempty"`
	Components map[string]string `json:"components"`
}

type Response struct {
	Data interface{} `json:"data"`
	Meta Meta        `json:"meta"`
}
