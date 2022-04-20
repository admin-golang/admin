package dataloader

type DataLoader struct {
	URL    string
	Method string
	Header *Header
}

type Header struct {
	Key   string
	Value HeaderValue
}

type HeaderValue struct {
	Prefix            string
	AppStateFieldPath string
}

type HeaderValueConfig struct {
	Prefix            string
	AppStateFieldPath string
}

type HeaderConfig struct {
	Key         string
	ValueConfig HeaderValueConfig
}

type Config struct {
	URL          string
	Method       string
	HeaderConfig *HeaderConfig
}

func New(c Config) *DataLoader {
	dl := &DataLoader{
		Method: c.Method,
		URL:    c.URL,
	}

	if c.HeaderConfig != nil {
		dl.Header = &Header{
			Key: c.HeaderConfig.Key,
			Value: HeaderValue{
				Prefix:            c.HeaderConfig.ValueConfig.Prefix,
				AppStateFieldPath: c.HeaderConfig.ValueConfig.AppStateFieldPath,
			},
		}
	}

	return dl
}

type Meta struct {
	Headers    []string          `json:"headers,omitempty"`
	Components map[string]string `json:"components"`
}

type Response struct {
	Data interface{} `json:"data"`
	Meta Meta        `json:"meta"`
}
