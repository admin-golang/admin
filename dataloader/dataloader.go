package dataloader

import "github.com/admin-golang/admin/navigation"

type DataLoader struct {
	URL          string                   `json:"url"`
	SearchParams *navigation.SearchParams `json:"searchParams"`
	Method       string                   `json:"method"`
	Header       *Header                  `json:"header"`
}

type Header struct {
	Key   string      `json:"key"`
	Value HeaderValue `json:"value"`
}

type HeaderValue struct {
	Prefix            string `json:"prefix"`
	AppStateFieldPath string `json:"appStateFieldPath"`
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
	SearchParams *navigation.SearchParams
}

func New(c Config) *DataLoader {
	dl := &DataLoader{
		Method:       c.Method,
		URL:          c.URL,
		SearchParams: c.SearchParams,
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

type PropsMapper map[string]string

type MediaCardComponent struct {
	PropsMapper PropsMapper `json:"propsMapper"`
}

type Meta struct {
	Headers            []string           `json:"headers,omitempty"`
	Components         map[string]string  `json:"components,omitempty"`
	MediaCardComponent MediaCardComponent `json:"mediaCardComponent"`
	PageHeader         string             `json:"pageHeader",omitempty`
}

type Response struct {
	Data interface{} `json:"data"`
	Meta Meta        `json:"meta"`
}
