package state

type ActionType string

const (
	Redirect      ActionType = "Redirect"
	ClearAppState ActionType = "ClearAppState"
)

type Action interface {
	ActionType() ActionType
}

type ActionRedirect struct {
	RedirectURL string     `json:"redirect_url"`
	Type        ActionType `json:"type"`
}

func (a *ActionRedirect) ActionType() ActionType {
	return Redirect
}

func NewActionRedirect(redirectURL string) *ActionRedirect {
	return &ActionRedirect{
		RedirectURL: redirectURL,
		Type:        Redirect,
	}
}

type ActionClearAppState struct {
	Type ActionType `json:"type"`
}

func (a *ActionClearAppState) ActionType() ActionType {
	return ClearAppState
}

func NewActionClearAppState() *ActionClearAppState {
	return &ActionClearAppState{
		Type: ClearAppState,
	}
}

type Actions []Action
