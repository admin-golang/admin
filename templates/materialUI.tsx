[[define "JSX"]]

const {
  Avatar,
  colors,
  CssBaseline,
  ThemeProvider,
  Typography,
  Container,
  styled,
  createTheme,
  Box,
  SvgIcon,
  Link,
  TextField,
  Button,
  AppBar,
  AppBarProps,
  Toolbar,
  IconButton,
  Badge,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Grid,
  Snackbar,
  Alert,
  Menu,
  MenuItem,
  Tabs,
  Tab,
  TableContainer,
  TablePagination,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TableHead,
  Breadcrumbs,
  Chip,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  Select,
  OutlinedInput,
  FormControl,
  InputLabel
} = MaterialUI;

const {
  useState,
  useEffect
} = React;

const {
  HashRouter,
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
  useParams
} = ReactRouterDOM;

[[ $palettePrimaryMain := "#556cd6" ]]
[[ $paletteSecondaryMain := "#19857b" ]]
[[ if .Layout.Theme ]]
[[ $palettePrimaryMain = .Layout.Theme.Palette.Primary.Main ]]
[[ $paletteSecondaryMain = .Layout.Theme.Palette.Secondary.Main ]]
[[ end ]]

const theme = createTheme({
  palette: {
    primary: {
      main: "[[ $palettePrimaryMain ]]",
    },
    secondary: {
      main: "[[ $paletteSecondaryMain ]]",
    },
    error: {
      main: colors.red.A400,
    },
    background: {
      default: "#fff",
    },
  },
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const Input = styled('input')({
  display: 'none',
});

[[ template "types" ]]

[[ template "FileField" ]]

[[ template "MultiField" ]]

[[ template "MediaCard" WrapComponent ]]

[[ template "DefaultSelect" ]]

[[ template "useDataLoader" ]]

[[ template "useRouteWithSearchParams" ]]

[[ template "useFetch" ]]

[[ template "useRedirect" ]]

[[ template "useSnackbar" ]]

[[ template "SnackbarWrapper" ]]

[[ template "PaperHeader" ]]

function LightBulbIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
    </SvgIcon>
  );
}

function LockOutlinedIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M0 0h24v24H0z" fill="none" /><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
    </SvgIcon>
  );
}

function ChevronLeftIcon() {
  return (
    <SvgIcon>
      <path d="M0 0h24v24H0z" fill="none" /><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </SvgIcon>
  );
}

function MenuIcon() {
  return (
    <SvgIcon>
      <path d="M0 0h24v24H0z" fill="none" /><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </SvgIcon>
  );
}

function DashboardIcon() {
  return (
    <SvgIcon>
      <path d="M0 0h24v24H0z" fill="none" /><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
    </SvgIcon>
  );
}

function InventoryIcon() {
  return (
    <SvgIcon>
      <path d="M0 0h24v24H0V0z" fill="none" /><path d="M20 2H4c-1 0-2 .9-2 2v3.01c0 .72.43 1.34 1 1.69V20c0 1.1 1.1 2 2 2h14c.9 0 2-.9 2-2V8.7c.57-.35 1-.97 1-1.69V4c0-1.1-1-2-2-2zm-5 12H9v-2h6v2zm5-7H4V4l16-.02V7z" />
    </SvgIcon>
  );
}

function NotificationsIcon() {
  return (
    <SvgIcon>
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
    </SvgIcon>
  );
}

function AccountCircleIcon() {
  return (
    <SvgIcon>
      <path d="M0 0h24v24H0z" fill="none" /><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
    </SvgIcon>
  );
}

function LogoutIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M0 0h24v24H0z" fill="none" /><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
    </SvgIcon>
  );
}

function AddIcon(props) {
  return (
    <SvgIcon viewBox={"0 0 48 48"} {...props}>
      <path d="M22.5 38V25.5H10V22.5H22.5V10H25.5V22.5H38V25.5H25.5V38Z"/>
    </SvgIcon>
  );
}

function RemoveIcon(props) {
  return (
    <SvgIcon viewBox={"0 0 48 48"} {...props}>
      <path d="M10 25.5V22.5H38V25.5Z"/>
    </SvgIcon>
  );
}

function SellIcon(props) {
  if (props.outlined) {
    return (
      <SvgIcon {...props}>
        <path d="M21.41,11.41l-8.83-8.83C12.21,2.21,11.7,2,11.17,2H4C2.9,2,2,2.9,2,4v7.17c0,0.53,0.21,1.04,0.59,1.41l8.83,8.83 c0.78,0.78,2.05,0.78,2.83,0l7.17-7.17C22.2,13.46,22.2,12.2,21.41,11.41z M12.83,20L4,11.17V4h7.17L20,12.83L12.83,20z" /><circle cx="6.5" cy="6.5" r="1.5" />
      </SvgIcon>
    );
  }

  return (
    <SvgIcon {...props}>
      <path d="M21.41,11.41l-8.83-8.83C12.21,2.21,11.7,2,11.17,2H4C2.9,2,2,2.9,2,4v7.17c0,0.53,0.21,1.04,0.59,1.41l8.83,8.83 c0.78,0.78,2.05,0.78,2.83,0l7.17-7.17C22.2,13.46,22.2,12.2,21.41,11.41z M6.5,8C5.67,8,5,7.33,5,6.5S5.67,5,6.5,5S8,5.67,8,6.5 S7.33,8,6.5,8z"/>
    </SvgIcon>
  );
}

function SettingsIcon(props) {
    return (
      <SvgIcon viewBox={"0 0 48 48"} {...props}>
        <path d="M19.4 44 18.4 37.7Q17.45 37.35 16.4 36.75Q15.35 36.15 14.55 35.5L8.65 38.2L4 30L9.4 26.05Q9.3 25.6 9.275 25.025Q9.25 24.45 9.25 24Q9.25 23.55 9.275 22.975Q9.3 22.4 9.4 21.95L4 18L8.65 9.8L14.55 12.5Q15.35 11.85 16.4 11.25Q17.45 10.65 18.4 10.35L19.4 4H28.6L29.6 10.3Q30.55 10.65 31.625 11.225Q32.7 11.8 33.45 12.5L39.35 9.8L44 18L38.6 21.85Q38.7 22.35 38.725 22.925Q38.75 23.5 38.75 24Q38.75 24.5 38.725 25.05Q38.7 25.6 38.6 26.1L44 30L39.35 38.2L33.45 35.5Q32.65 36.15 31.625 36.775Q30.6 37.4 29.6 37.7L28.6 44ZM24 30.5Q26.7 30.5 28.6 28.6Q30.5 26.7 30.5 24Q30.5 21.3 28.6 19.4Q26.7 17.5 24 17.5Q21.3 17.5 19.4 19.4Q17.5 21.3 17.5 24Q17.5 26.7 19.4 28.6Q21.3 30.5 24 30.5ZM24 27.5Q22.55 27.5 21.525 26.475Q20.5 25.45 20.5 24Q20.5 22.55 21.525 21.525Q22.55 20.5 24 20.5Q25.45 20.5 26.475 21.525Q27.5 22.55 27.5 24Q27.5 25.45 26.475 26.475Q25.45 27.5 24 27.5ZM24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24ZM21.8 41H26.2L26.9 35.4Q28.55 35 30.025 34.15Q31.5 33.3 32.7 32.1L38 34.4L40 30.8L35.3 27.35Q35.5 26.5 35.625 25.675Q35.75 24.85 35.75 24Q35.75 23.15 35.65 22.325Q35.55 21.5 35.3 20.65L40 17.2L38 13.6L32.7 15.9Q31.55 14.6 30.1 13.725Q28.65 12.85 26.9 12.6L26.2 7H21.8L21.1 12.6Q19.4 12.95 17.925 13.8Q16.45 14.65 15.3 15.9L10 13.6L8 17.2L12.7 20.65Q12.5 21.5 12.375 22.325Q12.25 23.15 12.25 24Q12.25 24.85 12.375 25.675Q12.5 26.5 12.7 27.35L8 30.8L10 34.4L15.3 32.1Q16.5 33.3 17.975 34.15Q19.45 35 21.1 35.4Z"/>i
      </SvgIcon>
    );
}

function PeopleIcon(props) {
    return (
      <SvgIcon viewBox={"0 0 48 48"} {...props}>
        <path d="M1.9 40V35.3Q1.9 33.55 2.8 32.125Q3.7 30.7 5.3 30Q8.95 28.4 11.875 27.7Q14.8 27 17.9 27Q21 27 23.9 27.7Q26.8 28.4 30.45 30Q32.05 30.7 32.975 32.125Q33.9 33.55 33.9 35.3V40ZM31.1 26.85Q34.55 27.25 37.6 28.025Q40.65 28.8 42.55 29.8Q44.2 30.75 45.15 32.15Q46.1 33.55 46.1 35.3V40H36.9V35.3Q36.9 32.15 35.3 30.125Q33.7 28.1 31.1 26.85ZM17.9 23.95Q14.6 23.95 12.5 21.85Q10.4 19.75 10.4 16.45Q10.4 13.15 12.5 11.05Q14.6 8.95 17.9 8.95Q21.2 8.95 23.3 11.05Q25.4 13.15 25.4 16.45Q25.4 19.75 23.3 21.85Q21.2 23.95 17.9 23.95ZM35.9 16.45Q35.9 19.75 33.8 21.85Q31.7 23.95 28.4 23.95Q27.85 23.95 27.175 23.875Q26.5 23.8 25.95 23.6Q27.15 22.35 27.775 20.525Q28.4 18.7 28.4 16.45Q28.4 14.2 27.775 12.475Q27.15 10.75 25.95 9.3Q26.5 9.15 27.175 9.05Q27.85 8.95 28.4 8.95Q31.7 8.95 33.8 11.05Q35.9 13.15 35.9 16.45ZM4.9 37H30.9V35.3Q30.9 34.5 30.425 33.75Q29.95 33 29.25 32.7Q25.65 31.1 23.2 30.55Q20.75 30 17.9 30Q15.05 30 12.575 30.55Q10.1 31.1 6.5 32.7Q5.8 33 5.35 33.75Q4.9 34.5 4.9 35.3ZM17.9 20.95Q19.85 20.95 21.125 19.675Q22.4 18.4 22.4 16.45Q22.4 14.5 21.125 13.225Q19.85 11.95 17.9 11.95Q15.95 11.95 14.675 13.225Q13.4 14.5 13.4 16.45Q13.4 18.4 14.675 19.675Q15.95 20.95 17.9 20.95ZM17.9 16.45Q17.9 16.45 17.9 16.45Q17.9 16.45 17.9 16.45Q17.9 16.45 17.9 16.45Q17.9 16.45 17.9 16.45Q17.9 16.45 17.9 16.45Q17.9 16.45 17.9 16.45Q17.9 16.45 17.9 16.45Q17.9 16.45 17.9 16.45ZM17.9 30Q17.9 30 17.9 30Q17.9 30 17.9 30Q17.9 30 17.9 30Q17.9 30 17.9 30Q17.9 30 17.9 30Q17.9 30 17.9 30Q17.9 30 17.9 30Q17.9 30 17.9 30Z"/>
      </SvgIcon>
    );
}

function CloseIcon(props) {
  return (
    <SvgIcon viewBox={"0 0 48 48"} {...props}>
      <path d="M12.45 37.65 10.35 35.55 21.9 24 10.35 12.45 12.45 10.35 24 21.9 35.55 10.35 37.65 12.45 26.1 24 37.65 35.55 35.55 37.65 24 26.1Z"/>
    </SvgIcon>
  );
}

function FooterLabel(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      { props.label }
    </Typography>
  );
}

interface StyledAppBarProps extends AppBarProps {
  open?: boolean;
}

const drawerWidth: number = 240;

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<StyledAppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const StyledDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const AppContext = React.createContext({});
const AppStateLocalStorageKey = "app-state";

function App() {
  const rawAppState = localStorage.getItem(AppStateLocalStorageKey) || {};

  let initialAppState = {
    snackBar: { alertMessage: '', severity: '' },
    toolBar: { isOpen: true }
  };

  try {
    initialAppState = JSON.parse(rawAppState);
  } catch(err) {}

  const [ appState, setAppState ] = React.useState(initialAppState);

  const handleSetAppState = (newState) => {
    const state = {...appState, ...newState};
    setAppState(state);
    localStorage.setItem(AppStateLocalStorageKey, JSON.stringify(state));
  };

  const handleClearAppState = () => {
    setAppState(initialAppState);
    localStorage.removeItem(AppStateLocalStorageKey);
  }

  let defaultPageURL = "";
  [[ range $page := .Pages ]]
    [[ if $page.IsDefault ]]
      defaultPageURL = "[[ $page.URL ]]";
    [[ end ]]
  [[ end ]]

  const shouldRedirect = !Object.keys(initialAppState).length;

  return (
  <AppContext.Provider value={appState}>
    <HashRouter>
      <Switch>
        [[ range $page := .Pages ]]
          <Route exact path="[[$page.URL]]">
          { shouldRedirect ? <Redirect to={defaultPageURL} />: null }
          [[ if eq $page.Type $.DashboardPage ]]
              <AppContext.Consumer>
              {appState => (
							<[[ $page.ID ]]Dashboard appState={appState} handleClearAppState={handleClearAppState} handleSetAppState={handleSetAppState} />
              )}
              </AppContext.Consumer>
          	[[ end ]]
          	[[ if eq $page.Type $.ListPage ]]
              <AppContext.Consumer>
              {appState => (
							<[[ $page.ID ]]List appState={appState} handleClearAppState={handleClearAppState} handleSetAppState={handleSetAppState} />
              )}
              </AppContext.Consumer>
            [[ end ]]
            [[ if eq $page.Type $.CardListPage ]]
              <AppContext.Consumer>
              {appState => (
                <[[ $page.ID ]]CardList appState={appState} handleClearAppState={handleClearAppState} handleSetAppState={handleSetAppState} />
              )}
              </AppContext.Consumer>
            [[ end ]]
            [[ if eq $page.Type $.FormPage ]]
              <AppContext.Consumer>
              {appState => (
              <[[ $page.ID ]]Form appState={appState} handleClearAppState={handleClearAppState} handleSetAppState={handleSetAppState} />
              )}
              </AppContext.Consumer>
            [[ end ]]
          	[[ if eq $page.Type $.SideFormPage ]]
							<[[ $page.ID ]]SideForm handleSetAppState={handleSetAppState} />
          	[[ end ]]
          	[[ if eq $page.Type $.EditPage ]]
              <AppContext.Consumer>
              {appState => (
              <[[ $page.ID ]]Edit appState={appState} handleClearAppState={handleClearAppState} handleSetAppState={handleSetAppState} />
              )}
              </AppContext.Consumer>
          	[[ end ]]
            [[ if eq $page.Type $.UploadPage ]]
              <AppContext.Consumer>
              {appState => (
              <[[ $page.ID ]]Upload appState={appState} handleClearAppState={handleClearAppState} handleSetAppState={handleSetAppState} />
              )}
              </AppContext.Consumer>
            [[ end ]]
          </Route>
          [[ if $page.IsDefault ]]
            <Redirect exact from="/" to="[[ $page.URL ]]" />
          [[ end ]]
				[[ end ]]
        </Switch>
    </HashRouter>
    </AppContext.Provider>
  );
}

function Layout({ children, appState, handleClearAppState, handleSetAppState }) {
  const [isToolbarOpen, setIsToolbarOpen] = React.useState(appState?.toolBar?.isOpen);

  const toggleToolbarOpen = () => {
    setIsToolbarOpen(!isToolbarOpen);
    handleSetAppState({ toolBar: { isOpen: !isToolbarOpen }});
  };

  const location = useLocation();

  const isSelected = (pageURL, currentURL): boolean => {
    if(!pageURL || !currentURL) return false;

    const pageURLParts = pageURL.split("/");
    const currentURLParts = currentURL.split("/");

    if(pageURLParts.length < 2 || currentURLParts.length < 2) {
      return false;
    }

    return pageURLParts[1] === currentURLParts[1];
  };

  const handleSnackbarClose = () => {
    handleSetAppState({ snackBar: { alertMessage: '', severity: '' } });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {appState?.snackBar?.alertMessage && <SnackbarWrapper
        isSnackbarOpen={appState?.snackBar?.alertMessage !== ""}
        handleSnackbarClose={handleSnackbarClose}
        vertical={"top"}
        horizontal={"center"}
        severity={appState?.snackBar?.severity}
        message={appState?.snackBar?.alertMessage}
        autoHideDuration={null}
      />}
      <StyledAppBar position="absolute" open={isToolbarOpen}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleToolbarOpen}
            sx={{
              marginRight: '36px',
              ...(isToolbarOpen && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            [[ .Layout.Title ]]
          </Typography>
          [[ if and .Layout .Layout.Menu ]]
          [[ template "MenuIcons" (WrapMenuIcons .Layout.Menu) ]]
          [[end]]
        </Toolbar>
      </StyledAppBar>
      <StyledDrawer variant="permanent" open={isToolbarOpen}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleToolbarOpen}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          [[ range $page := .Pages ]]
          [[ if $page.ToolbarEnabled ]]
  					<div>
            <Link href="#[[ $page.URL ]]" sx={{ textDecoration: "none" }}>
              <ListItem button
                selected={isSelected("[[ $page.URL ]]", location.pathname)}>
                <ListItemIcon>
                  [[ if eq $page.Icon.Type $.DashboardIcon ]]
                  <DashboardIcon />
                  [[ end ]]
                  [[ if eq $page.Icon.Type $.InventoryIcon ]]
                  <InventoryIcon />
                  [[ end ]]
                  [[ if eq $page.Icon.Type $.SellIcon ]]
                  <SellIcon />
                  [[ end ]]
                  [[ if eq $page.Icon.Type $.SettingsIcon ]]
                  <SettingsIcon />
                  [[ end ]]
                  [[ if eq $page.Icon.Type $.PeopleIcon ]]
                  <PeopleIcon />
                  [[ end ]]
  					    </ListItemIcon>
                <ListItemText primary="[[ $page.ID ]]" />
              </ListItem>
            </Link>
          </div>
            [[ end ]]
          [[ end ]]
					</List>
        <Divider />
      </StyledDrawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {children}
          </Grid>
          <FooterLabel sx={{ pt: 4 }} label={"[[ .Layout.FooterLabel ]]"} />
        </Container>
      </Box>
    </Box>
  );
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.querySelector("#root")
);

[[range $page := .Pages]]
  [[ if eq $page.Type $.DashboardPage ]]
    [[template "Dashboard"(WrapPage $.Layout $page $.Pages)]]
  [[end]]

  [[ if eq $page.Type $.SideFormPage ]]
    [[template "SideForm"(WrapPage $.Layout $page $.Pages)]]
  [[end]]

  [[ if eq $page.Type $.ListPage ]]
    [[template "List"(WrapPage $.Layout $page $.Pages)]]
  [[end]]

  [[ if eq $page.Type $.CardListPage ]]
    [[template "CardList"(WrapPage $.Layout $page $.Pages)]]
  [[end]]

  [[ if eq $page.Type $.FormPage ]]
    [[template "Form"(WrapPage $.Layout $page $.Pages)]]
  [[end]]

  [[ if eq $page.Type $.EditPage ]]
    [[template "Edit"(WrapPage $.Layout $page $.Pages)]]
  [[end]]

  [[ if eq $page.Type $.UploadPage ]]
    [[template "Upload"(WrapPage $.Layout $page $.Pages)]]
  [[end]]
[[end]]

[[ if and .Layout .Layout.Menu ]]
[[range $item := .Layout.Menu.Items]]
function [[$item.ID]]MenuItem({ handleClearAppState }) {
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const isMenuOpen = Boolean(anchorEl);
  const menuId = 'primary-search-account-menu';

  const handleMenuItemClick = (actions) => {
    for(let action of actions) {
      if(action.type === "[[ $.ClearAppStateAction ]]") {
        handleClearAppState();
      }
      if(action.type === "[[ $.RedirectAction ]]") {
        history.push(action.redirect_url);
      }
    }
  };

  return (
    <>
      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
      [[ if IsNotNil $item.Badge ]]
        <Badge badgeContent={[[$item.Badge.Content]]} color="secondary">
      [[ end ]]

      [[ if eq $item.Icon.Type 0 ]]
        <NotificationsIcon />
      [[ end ]]

      [[ if eq $item.Icon.Type 1 ]]
        <AccountCircleIcon />
      [[ end ]]

      [[ if IsNotNil $item.Badge ]]
        </Badge>
      [[ end ]]

      </IconButton>

      [[ if IsNotNil $item.Popover ]]
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          id={menuId}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          [[ range $popoverItem := $item.Popover.Items ]]
            <MenuItem
              [[ if $popoverItem.OnClick ]]
              [[ $actions := Marshal $popoverItem.OnClick.Actions ]]
              onClick={() => { handleMenuItemClick([[ $actions ]]) }}
              [[ end ]]
            >
              [[ if IsNotNil $popoverItem.Icon ]]
                <ListItemIcon>

                [[ if (eq $popoverItem.Icon.Type 0) ]]
                  <AccountCircleIcon />
                [[ end ]]

                [[ if (eq $popoverItem.Icon.Type 1) ]]
                  <LogoutIcon />
                [[ end ]]
              [[ end ]]

              [[ if IsNotNil $popoverItem.Icon ]]
                </ListItemIcon>
              [[ end ]]

              [[ $popoverItem.Label ]]
            </MenuItem>
          [[ end ]]
        </Menu>
      [[ end ]]
    </>
  );
}
[[end]]
[[end]]

interface LinkTabProps {
  label?: string;
  href?: string;
}

function LinkTab(props: LinkTabProps) {
  const history = useHistory();
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        history.push(props.href);
      }}
      {...props}
    />
  );
}

[[ range $page := .Pages ]]
function [[ $page.ID]]NavTabs(props) {
  [[ if eq (len $page.NavTabs) 0 ]]
  return null;
  [[ else ]]
  const params = useParams();

  [[ range $navTab := $page.NavTabs ]]
  const [[ $page.ID]][[ $navTab.ID]]redirectURL = (href: string): string => {
    let redirectURL = href;
    [[ if $navTab.SearchParams ]]
      [[ range $searchParam := $navTab.SearchParams ]]
        [[ if $searchParam.Value.FromLocation ]]
        const param = params["[[ $searchParam.Value.SearchParamKey ]]"];
        redirectURL = href.replace("[[ $searchParam.Key ]]", param);
        return redirectURL;
        [[ end ]]
      [[ end ]]
    [[ else ]]
      return redirectURL;
    [[ end ]]
  };
  [[ end ]]

  let navTabURLsIdx = {};
  [[ range $idx, $navTab := $page.NavTabs ]]
    let [[ $navTab.ID ]]navTabURL = "[[ $navTab.URL ]]";
    [[ if $navTab.SearchParams ]]
      [[ range $searchParam := $navTab.SearchParams ]]
        [[ if $searchParam.Value.FromLocation ]]
        const [[ $navTab.ID ]]navTabURLParam = params["[[ $searchParam.Value.SearchParamKey ]]"];
        [[ $navTab.ID ]]navTabURL = [[ $navTab.ID ]]navTabURL.replace("[[ $searchParam.Key ]]", [[ $navTab.ID ]]navTabURLParam);
        [[ end ]]
      [[ end ]]
    [[ end ]]
    navTabURLsIdx[ [[ $navTab.ID ]]navTabURL ] = [[ $idx ]];
  [[ end ]]

  const location = useLocation();
  const currentTab = navTabURLsIdx[location.pathname];

  return (
    <Box {...props}>
      <Tabs value={currentTab} aria-label="scrollable nav tabs" variant="scrollable" scrollButons="auto">
        [[ range $navTab := $page.NavTabs ]]
        <LinkTab label="[[ $navTab.Label ]]" href={[[ $page.ID]][[ $navTab.ID]]redirectURL("[[ $navTab.URL ]]")} />
        [[ end ]]
     </Tabs>
    </Box>
  );
  [[ end ]]
}
[[ end ]]

function CheckboxField2({ checked, label, isRequired, handleChange }) {
  const checkbox = (
    <Checkbox
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );

  return (
    <FormGroup>
      <FormControlLabel
        control={checkbox}
        label={label}
        required={isRequired}
      >
      </FormControlLabel>
    </FormGroup>
  );
}

[[end]] [[/* JSX end */]]

[[define "Dashboard"]]
[[ with .page ]]
function [[ .ID ]]Dashboard({ appState, handleClearAppState, handleSetAppState }) {
[[ end ]]
  return (
    <Layout appState={appState} handleClearAppState={handleClearAppState} handleSetAppState={handleSetAppState}>
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        </Paper>
      </Grid>
    </Layout>
  );
}
[[end]]



[[define "List"]]
[[ with .page ]]
[[ $listPage := WrapListPage . ]]
function [[ .ID ]]List({ appState, handleClearAppState, handleSetAppState }) {
  let defaultPaginationPerPage = 10;
  let defaultPaginationCurrentPage = 0;
  let defaultPaginationRowsPerPage = [5, 10, 25];
  let defaultRowsMeta = {
    headers: [],
    pagination: {
      totalCount: 0,
      perPage: defaultPaginationPerPage,
      currentPage: defaultPaginationCurrentPage,
      rowsPerPage: defaultPaginationRowsPerPage
    },
  };
  [[ if $listPage.Pagination ]]
    defaultPaginationPerPage = [[ $listPage.Pagination.RowsPerPage ]];
  [[ end ]]

  const history = useHistory();
  const location = useLocation();
  const [rows, setRows] = React.useState<Array>([]);
  const [rowsMeta, setRowsMeta] = React.useState<Object>(defaultRowsMeta);
  const [rowsProps, setRowsProps] = React.useState<Array>([]);
  const [dataLoaderResponse, setDataLoaderResponse] = React.useState({});
  const [initialLoad, setInitialLoad] = React.useState(false);
  const [getRoute] = useRouteWithSearchParams();
  const _setRowsMeta = (newRowsMeta = {}) => {
    setRowsMeta({
      ...rowsMeta,
      ...newRowsMeta,
      ...( newRowsMeta?.headers?.length ? { headers: [ ...newRowsMeta?.headers ]}: { headers: [ ...rowsMeta.headers ] }),
      pagination: {...rowsMeta.pagination, ...newRowsMeta?.pagination},
    });
  };

  [[ if $listPage.DataLoader ]]
    [[ $dataLoader := Marshal $listPage.DataLoader ]]
    const dataLoader = [[ $dataLoader ]];
    const [ doLoad ] = useDataLoader(appState, dataLoader, handleSetAppState);

    useEffect(() => {
      const url = getRoute({
        url: dataLoader?.url, searchParams: dataLoader?.searchParams
      });
      doLoad({ url }).then(r => {
        setInitialLoad(true);
        setDataLoaderResponse(r);
      });
    }, []);

    useEffect(() => {
      if(dataLoaderResponse?.data) {
        setRows(dataLoaderResponse.data);
        setRowsProps(Object.keys(dataLoaderResponse.data[0]));
      }
      if(dataLoaderResponse?.meta) {
        _setRowsMeta(dataLoaderResponse?.meta);
      }
    }, [ dataLoaderResponse ]);

    useEffect(() => {
      if(!initialLoad && rowsMeta?.pagination?.currentPage === defaultPaginationCurrentPage) {
        return;
      }

      const limit = rowsMeta?.pagination?.perPage;
      const page = rowsMeta?.pagination?.currentPage;
      const params = new URLSearchParams({ limit, page });
      history.push({ pathname: location.pathname, search: '?' + params.toString() });

      const url = getRoute({
        url: dataLoader?.url, searchParams: dataLoader?.searchParams
      });

      doLoad({ url }).then(r => setDataLoaderResponse(r));

    }, [ rowsMeta?.pagination?.currentPage ]);
  [[end]]

  const page = rowsMeta?.pagination?.currentPage;
  const rowsPerPage = rowsMeta?.pagination?.perPage;
  const totalCount = rowsMeta?.pagination?.totalCount;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - totalCount) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    currentPage: number,
  ) => {
    _setRowsMeta({ pagination: { currentPage: currentPage }});
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const perPage = parseInt(event.target.value, 10);
    _setRowsMeta({ pagination: { perPage }});
  };

  [[ if $listPage.ListRowConfig ]]
  const handleTableRowClick = ({ [[ $listPage.ListRowConfig.DataRowFieldName ]] }) => {
    const redirectURL = "[[ $listPage.ListRowConfig.OnClick.RedirectURL ]]";
    const paramKey = "[[ $listPage.ListRowConfig.ParamKey ]]";
    const redirectTo = redirectURL.replace(paramKey, [[ $listPage.ListRowConfig.DataRowFieldName ]]);
    history.push(redirectTo);
  };
  [[ end ]]

  return (
    <Layout appState={appState} handleClearAppState={handleClearAppState} handleSetAppState={handleSetAppState}>
      <Grid item xs={12} md={12} lg={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 640,
          }}
        >
          <Grid container spacing={0} sx={{ mt: 1, mb: 4 }}>
          	<Grid item xs={8}>
       		 		<Typography
       		 		  variant="h6"
       		 		  id="tableTitle"
       		 		  component="div"
       		 		>
       		 		[[ $listPage.Title ]]
       		 		</Typography>
          	</Grid>
            [[ if IsNotNil $listPage.MainButton ]]
          	<Grid item xs={4}>
            	<Grid container item justifyContent="flex-end">
            		<Grid item xs={10} md={4} lg={4} justifyContent="flex-end">
            		  <Box sx={{ pr: 0, pl: 0 }}>
            		    <Button
            		      type="submit"
            		      fullWidth
            		      variant="contained"
            		      size="small"
            		      href="#[[ $listPage.MainButton.URL ]]"
            		    >
            		    [[ $listPage.MainButton.Label ]]
            		    </Button>
            		  </Box>
            		</Grid>
            	</Grid>
          	</Grid>
            [[ end ]]
          </Grid>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  {rowsMeta.headers.map((header, idx) => (
                    <TableCell key={idx} align="left">{header}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? rows
                  : []
                ).map((row, idx) => (
                  <TableRow sx={{ cursor: "pointer" }} hover key={idx}
                    [[ if $listPage.ListRowConfig ]]
                      onClick={() => { handleTableRowClick({ [[ $listPage.ListRowConfig.DataRowFieldName ]]: row["[[ $listPage.ListRowConfig.DataRowFieldName ]]"] }) }}
                    [[ end ]]
                  >
                    {rowsProps.map((rowProp, idj) => (
                      rowsMeta.components?.[rowProp] && <TableCell key={idj} component="th" scope="row">
                        {rowsMeta.components?.[rowProp] === 'text' ? row[rowProp] : null}
                        {
                          rowsMeta.components?.[rowProp] === 'tag'
                          ? ( Array.isArray(row[rowProp])
                            ? row[rowProp].map((p, idx) => <Chip key={idx} label={p} sx={{mr: 1}} />)
                            : <Chip label={row[rowProp]} />
                            )
                          : null
                        }
                        {rowsMeta.components?.[rowProp] === 'link' ? <Link href={row[rowProp]} target="_blank">{row[rowProp]}</Link> : null}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
          [[ if $listPage.Pagination ]]
          <TablePagination
            sx={{mt: 2}}
            component="div"
            rowsPerPageOptions={rowsMeta?.pagination?.rowsPerPage}
            count={rowsMeta?.pagination?.totalCount}
            rowsPerPage={rowsMeta?.pagination?.perPage}
            page={rowsMeta?.pagination?.currentPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          [[ end ]]
        </Paper>
      </Grid>
    </Layout>
  );
}
[[ end ]]
[[end]]

[[define "CardList"]]
[[ with .page ]]
[[ $listPage := WrapCardListPage . ]]
function [[ .ID ]]CardList({ appState, handleClearAppState, handleSetAppState }) {
  const history = useHistory();
  const [ data, setData ] = useState([]);
  const [ meta, setMeta ] = useState({});
  const [ response, setResponse ] = useState({});
  const [ getRoute ] = useRouteWithSearchParams();

  [[ if $listPage.Header ]]
    const [ [[ $listPage.Header.ID ]], set[[ $listPage.Header.ID ]] ] = useState();
  [[ end ]]

  [[ if $listPage.DataLoader ]]
    [[ $dataLoader := Marshal $listPage.DataLoader ]]
    const dataLoader = [[ $dataLoader ]];
    const [ doLoad ] = useDataLoader(appState, dataLoader, handleSetAppState);
    useEffect(() => {
      const url = getRoute({
        url: dataLoader?.url, searchParams: dataLoader?.searchParams
      });
      doLoad({ url }).then(r => {
        setResponse(r);
      });
    }, []);
    useEffect(() => {
      if(response?.data) {
        [[ if $listPage.Header ]]
          set[[ $listPage.Header.ID ]](response.data["[[ $listPage.Header.FieldName ]]"]);
        [[ end ]]
        setData(response.data);
      }

      if(response?.meta) {
        setMeta(response.meta);
        [[ if $listPage.Header ]]
          if(response.meta?.pageHeader) {
            set[[ $listPage.Header.ID ]](response.meta?.pageHeader);
          }
        [[ end ]]
      }
    }, [ response ]);
  [[end]]

  return (
    <Layout appState={appState} handleClearAppState={handleClearAppState} handleSetAppState={handleSetAppState}>
      <Grid container>
        <Grid item xs={12} sm={12} sx={{ mt: 2, ml: 3 }}>
          <Breadcrumbs aria-label="breadcrumb">
            [[ if .Navigation ]]
            [[ range $i, $nav := .Navigation.Items ]]
            <Link
              underline="hover"
              color="inherit"
              href="#[[ $nav.URL ]]"
            >
              [[ $nav.Label ]]
            </Link>
            [[ end ]]
            <Typography color="text.primary">[[ .Navigation.Active.Label ]]</Typography>
            [[ end ]]
          </Breadcrumbs>
          [[ if $listPage.Header ]]
          <PaperHeader
            sx={{ mt: 2, mb: -1, pl: 4, py: 1.4 }}
            header={[[ $listPage.Header.ID ]]}
          />
          [[ end ]]
        </Grid>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Paper
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            height: (!data.length || data.length < 6) ? 640 : "100%"
          }}
        >
          <[[ .ID ]]NavTabs
            sx={{width: "100%", pb: 1, mt: -2}}
          />
            <Grid container spacing={2} sx={{ mt: 3 }}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', gap: 4 }}>
                  {data.map((d, idx) => (
                    <MediaCard
                      key={idx}
                      appState={appState}
                      handleSetAppState={handleSetAppState}
                      sx={{ minWidth: 240, mb: 2, cursor: 'pointer' }}
                      imgId={d[meta.mediaCardComponent.propsMapper.imgId]}
                      imgURL={d[meta.mediaCardComponent.propsMapper.imgURL]}
                      imgALT={d[meta.mediaCardComponent.propsMapper.imgALT]}
                      form={[[ Marshal .Form ]]}
                      formInitialValues={d}
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
        </Paper>
      </Grid>
    </Layout>
  );
}
[[ end ]]
[[end]]

[[define "Form"]]
[[ with .page ]]
function [[ .ID ]]Form({ appState, handleClearAppState, handleSetAppState }) {
  const history = useHistory();

  [[range $field := .Form.Fields]]
  const [ [[$field.ID]], set[[$field.ID]] ] = useState("[[ $field.Value ]]");
  const handle[[$field.ID]]Change = (e) => {
    [[ if eq $field.Type 3 ]]
    set[[$field.ID]](Number(e.target.value));
    [[ else ]]
    set[[$field.ID]](e.target.value);
    [[ end ]]
  };
  [[end]]

  const form = [[ Marshal .Form ]];
  const [ getRoute ] = useRouteWithSearchParams();
  const url = getRoute({
    url: form?.submit?.url, searchParams: form?.submit?.searchParams
  });
  const [ doFetch ] = useFetch({ appState, header: form?.submit?.header, handleSetAppState });
  const [ doRedirect ] = useRedirect();

  const handle[[ .Form.ID]]Submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      [[range $field := .Form.Fields]]
        "[[$field.ID]]": [[$field.ID]],
      [[end]]
    };

    const body = JSON.stringify(payload);

    doFetch[form?.submit?.method]({ url, body }).then(({ data }) => {
      const url = getRoute({
        url: form?.submit?.onSuccess?.redirectUrl?.url,
        searchParams: form?.submit?.onSuccess?.redirectUrl?.searchParams,
        response: data
      });
      doRedirect({ url });
    });
  };

  return (
    <Layout appState={appState} handleClearAppState={handleClearAppState} handleSetAppState={handleSetAppState}>
      <Grid container>
        <Grid item xs={12} sm={12} sx={{ mt: 2, ml: 3 }}>
          <Breadcrumbs aria-label="breadcrumb">
            [[ if .Form.Navigation ]]
            [[ range $i, $nav := .Form.Navigation.Items ]]
            <Link
              underline="hover"
              color="inherit"
              href="#[[ $nav.URL ]]"
            >
              [[ $nav.Label ]]
            </Link>
            [[ end ]]
            <Typography color="text.primary">[[ .Form.Navigation.Active.Label ]]</Typography>
            [[ end ]]
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Paper
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            height: 640,
          }}
        >
          <Typography component="h1" variant="h5">
            [[ .Form.Title ]]
          </Typography>
          <Divider />
          <Box component="form" onSubmit={handle[[ .Form.ID]]Submit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              [[ range $field := .Form.Fields ]]
            	  [[ if eq $field.Type 0 ]]
                  <Grid item xs={12}>
                    <Grid item xs={12} md={6}>
                    [[ template "PasswordField" (Wrap $field.ID $field.Label $field.IsRequired $field.Value $field.FullWidth $field.IsMultiline $field.NumberOfRows) ]]
                    </Grid>
                  </Grid>
            	  [[ end ]]
            	  [[ if eq $field.Type 1 ]]
                  <Grid item xs={12}>
                    <Grid item xs={12} md={6}>
                    [[ template "TextField" (Wrap $field.ID $field.Label $field.IsRequired $field.Value $field.FullWidth $field.IsMultiline $field.NumberOfRows) ]]
                    </Grid>
                  </Grid>
            	  [[ end ]]
                [[ if eq $field.Type 3 ]]
                  <Grid item xs={12}>
                    <Grid item xs={12} md={6}>
                    [[ template "NumberField" (Wrap $field.ID $field.Label $field.IsRequired $field.Value $field.FullWidth $field.IsMultiline $field.NumberOfRows) ]]
                    </Grid>
                  </Grid>
                [[ end ]]
            	[[ end ]]
            {/*<FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />*/}
            </Grid>
          <Button
            type="submit"
            fullWidth={false}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            [[ .Form.Submit.Label ]]
            </Button>
          <Grid container>
            <Grid item xs>
              {/*<Link href="#" variant="body2">
                  Forgot password?
                </Link>*/}
            </Grid>
            <Grid item>
              {/*<Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>*/}
            </Grid>
          </Grid>
        </Box>
        </Paper>
        </Grid>
    </Layout>
  );
}
[[ end ]]
[[end]]

[[define "Edit"]]
[[ $inputCentsType := .inputTypes.inputCents ]]
[[ $inputMultiType := .inputTypes.inputMulti ]]
[[ $inputCheckboxType := .inputTypes.inputCheckbox ]]
[[ $inputSelectType := .inputTypes.inputSelect ]]
[[ with .page ]]
[[ $editPage := WrapEditPage . ]]
function [[ .ID ]]Edit({ appState, handleClearAppState, handleSetAppState }) {
  const history = useHistory();
  const params = useParams();
  const [getRoute] = useRouteWithSearchParams();
  const [response, setResponse] = React.useState({});

  [[ if $editPage.Header ]]
    const [ [[ $editPage.Header.ID ]], set[[ $editPage.Header.ID ]] ] = useState();
  [[ end ]]

  [[ if .DataLoader ]]
    [[ $dataLoader := Marshal $editPage.DataLoader ]]
    const dataLoader = [[ $dataLoader ]];
    const [ doLoad ] = useDataLoader(appState, dataLoader, handleSetAppState);
    useEffect(() => {
      const url = getRoute({
        url: dataLoader?.url, searchParams: dataLoader?.searchParams
      });
      doLoad({ url }).then(r => {
        setResponse(r);
      });
    }, []);
    useEffect(() => {
      if(response?.data) {
        [[ if $editPage.Header ]]
          set[[ $editPage.Header.ID ]](response.data["[[ $editPage.Header.FieldName ]]"]);
        [[ end ]]
        [[ range $field := .Form.Fields ]]
          [[ if eq $field.Type $inputCentsType ]]
            set[[$field.ID]](response.data[ "[[$field.ID]]" ] / 100);
          [[ else ]]
            set[[$field.ID]](response.data[ "[[$field.ID]]" ]);
          [[ end ]]
        [[ end ]]
      }
    }, [ response ]);
  [[end]]

  [[range $field := .Form.Fields]]

  [[ if eq $field.Type $inputCheckboxType ]]
  const [ [[$field.ID]], set[[$field.ID]] ] = useState("[[ $field.Value ]]" === "true");
  [[ else ]]
  const [ [[$field.ID]], set[[$field.ID]] ] = useState("[[ $field.Value ]]");
  [[ end ]]

  const handle[[$field.ID]]Change = (e) => {
    [[ if eq $field.Type 3 ]]
      set[[$field.ID]](Number(e.target.value));
    [[ else if eq $field.Type $inputCentsType ]]
      set[[$field.ID]](Number(e.target.value));
    [[ else if eq $field.Type $inputMultiType ]]
      set[[$field.ID]](e);
    [[ else if eq $field.Type $inputCheckboxType ]]
      set[[$field.ID]](e.target.checked);
    [[ else ]]
      set[[$field.ID]](e.target.value);
    [[ end ]]
  };
  [[end]]

  const form = [[ Marshal .Form ]];
  const url = getRoute({
    url: form?.submit?.url, searchParams: form?.submit?.searchParams
  });

  const [ doFetch ] = useFetch({ appState, header: form?.submit?.header, handleSetAppState });
  const [ doRedirect ] = useRedirect();

  const handle[[ .Form.ID]]Submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      [[range $field := .Form.Fields]]
        "[[$field.ID]]": [[$field.ID]],
      [[end]]
    };

    [[range $field := .Form.Fields]]
      [[ if eq $field.Type $inputCentsType ]]
        const parts[[$field.ID]] = (payload["[[$field.ID]]"]+ "").split(".");
        if(parts[[$field.ID]].length > 1 && parts[[$field.ID]][1].length > 2) {
          handleSetAppState({ snackBar: { alertMessage: `[[$field.Label]] contains invalid cents value: ${payload["[[$field.ID]]"]}`, severity: 'error' } });
          return;
        } else {
          payload["[[$field.ID]]"] = Math.round(payload["[[$field.ID]]"] * 100);
        }
      [[ end ]]
    [[end]]

    const body = JSON.stringify(payload);

    doFetch[form?.submit?.method]({ url, body }).then(({ data }) => {
      const url = getRoute({
        url: form?.submit?.onSuccess?.redirectUrl?.url,
        searchParams: form?.submit?.onSuccess?.redirectUrl?.searchParams,
        response: data
      });
      doRedirect({ url });
    });
  };

  return (
    <Layout appState={appState} handleClearAppState={handleClearAppState} handleSetAppState={handleSetAppState}>
      <Grid container>
        <Grid item xs={12} sm={12} sx={{ mt: 2, ml: 3 }}>
          <Breadcrumbs aria-label="breadcrumb">
            [[ if .Form.Navigation ]]
            [[ range $i, $nav := .Form.Navigation.Items ]]
            <Link
              underline="hover"
              color="inherit"
              href="#[[ $nav.URL ]]"
            >
              [[ $nav.Label ]]
            </Link>
            [[ end ]]
            <Typography color="text.primary">[[ .Form.Navigation.Active.Label ]]</Typography>
            [[ end ]]
          </Breadcrumbs>
          [[ if $editPage.Header ]]
          <PaperHeader
            sx={{ mt: 2, mb: -1, pl: 4, py: 1.4 }}
            header={[[ $editPage.Header.ID ]]}
          />
          [[ end ]]
        </Grid>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Paper
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          [[ if ne .Form.Title "" ]]
          <Box sx={{ pb: 2}}>
            <Typography component="h1" variant="h5">
              [[ .Form.Title ]]
            </Typography>
            <Divider />
          </Box>
          [[ end ]]
          <[[ .ID ]]NavTabs
            sx={{width: "100%", pb: 1, mt: [[ if eq .Form.Title "" ]] -2 [[else]] 0 [[ end ]]}}
          />
          <Box component="form" onSubmit={handle[[ .Form.ID]]Submit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              [[ range $field := .Form.Fields ]]
            	  [[ if eq $field.Type 0 ]]
                  <Grid item xs={12}>
                    <Grid item xs={12} md={6}>
                    [[ template "PasswordField" (Wrap $field.ID $field.Label $field.IsRequired $field.Value $field.FullWidth $field.IsMultiline $field.NumberOfRows) ]]
                    </Grid>
                  </Grid>
            	  [[ end ]]
            	  [[ if eq $field.Type 1 ]]
                  <Grid item xs={12}>
                    <Grid item xs={12} md={6}>
                    [[ template "TextField" (Wrap $field.ID $field.Label $field.IsRequired $field.Value $field.FullWidth $field.IsMultiline $field.NumberOfRows) ]]
                    </Grid>
                  </Grid>
            	  [[ end ]]
                [[ if eq $field.Type 3 ]]
                  <Grid item xs={12}>
                    <Grid item xs={12} md={6}>
                    [[ template "NumberField" (Wrap $field.ID $field.Label $field.IsRequired $field.Value $field.FullWidth $field.IsMultiline $field.NumberOfRows) ]]
                    </Grid>
                  </Grid>
                [[ end ]]
                [[ if eq $field.Type $inputCentsType ]]
                  <Grid item xs={12}>
                    <Grid item xs={12} md={6}>
                    [[ template "NumberField" (Wrap $field.ID $field.Label $field.IsRequired $field.Value $field.FullWidth $field.IsMultiline $field.NumberOfRows) ]]
                    </Grid>
                  </Grid>
                [[ end ]]
                [[ if eq $field.Type $inputMultiType ]]
                  <Grid item xs={12}>
                    <Grid item xs={12} md={12}>
                      <MultiField
                        initialValue={[[ $field.ID ]]}
                        meta={[[ Marshal $field.Fields ]]}
                        handleChange={handle[[$field.ID]]Change}
                      />
                    </Grid>
                  </Grid>
                [[ end ]]
                [[ if eq $field.Type $inputCheckboxType ]]
                  <Grid item xs={12}>
                    <Grid item xs={12} md={12}>
                      [[ template "CheckboxField" (Wrap $field.ID $field.Label $field.IsRequired $field.Value $field.FullWidth $field.IsMultiline $field.NumberOfRows) ]]
                    </Grid>
                  </Grid>
                [[ end ]]
                [[ if eq $field.Type $inputSelectType ]]
                  <Grid item xs={12}>
                    <Grid item xs={12} md={6}>
                      <DefaultSelect
                        label={"[[ $field.Label ]]"}
                        disabled={[[ $field.Disabled ]]}
                        defaultValue={"[[ $field.Value ]]"}
                        values={["[[ $field.Value ]]"]}
                      />
                    </Grid>
                  </Grid>
                [[ end ]]
            	[[ end ]]
            </Grid>
          <Button
            type="submit"
            fullWidth={false}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            [[ .Form.Submit.Label ]]
            </Button>
        </Box>
        </Paper>
        </Grid>
    </Layout>
  );
}
[[ end ]]
[[end]]

[[define "Upload"]]
[[ with .page ]]
[[ $uploadPage := WrapUploadPage . ]]
function [[ .ID ]]Upload({ appState, handleClearAppState, handleSetAppState }) {
  const history = useHistory();
  const params = useParams();

  const [ dataLoaderResult, setDataLoaderResult ] = useState();

  [[ if $uploadPage.Header ]]
    const [ [[ $uploadPage.Header.ID ]], set[[ $uploadPage.Header.ID ]] ] = useState();
  [[ end ]]

  [[ if .DataLoader ]]
  useEffect(() => {
    const abortCtrl = new AbortController();
    const fetchOptions = { method: "[[ $uploadPage.DataLoader.Method ]]", headers: {}, signal: abortCtrl.signal };
    [[ if $uploadPage.DataLoader.Header ]]
      if (appState?.[[ $uploadPage.DataLoader.Header.Value.AppStateFieldPath ]]) {
        const headerPrefix = "[[ $uploadPage.DataLoader.Header.Value.Prefix ]]";
        const headerValue = appState?.[[ $uploadPage.DataLoader.Header.Value.AppStateFieldPath ]];
        fetchOptions.headers["[[ $uploadPage.DataLoader.Header.Key ]]"] = `${headerPrefix}${headerValue}`;
      }
    [[ end ]]

    const fetchURLParam = params["[[ $uploadPage.ParamKey ]]"];
    const fetchURL = `[[ $uploadPage.DataLoader.URL ]]/${fetchURLParam}`;

    fetch(fetchURL, fetchOptions)
      .then(async (response) => {
        var resp: any;

        if (response.headers.get("content-type").includes("application/json")) {
          resp = await response.json();
        } else {
          resp = await response.text();
        }

        if (response.ok) {
          [[ if $uploadPage.Header ]]
            set[[ $uploadPage.Header.ID ]](resp.data["[[ $uploadPage.Header.FieldName ]]"]);
          [[ end ]]
          setDataLoaderResult(resp.data);
        } else {
        }
      })
      .catch(err => {
        if (err.name === "AbortError") return;
        throw err;
      });

      return () => { abortCtrl.abort() };
  }, []);
  [[end]]


  const [ formData, setFormData ] = useState(new FormData());

  let onSuccessRedirectURL = null;
  [[ if .Form.Submit.OnSuccess ]]
  [[ $redirectURL := Marshal .Form.Submit.OnSuccess.RedirectURL ]]
  const [ getRoute ] = useRouteWithSearchParams();
  const redirectURLWithSearchParams = getRoute([[ $redirectURL ]]);
  onSuccessRedirectURL = redirectURLWithSearchParams;
  [[ end ]]

  const handle[[ .Form.ID]]Submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fetchOptions = {
      method: "[[ .Form.Submit.Method ]]",
      body: formData,
      headers: {}
    };

    [[ if .Form.Submit.Header ]]
      if (appState?.[[ .Form.Submit.Header.Value.AppStateFieldPath ]]) {
        const headerPrefix = "[[ .Form.Submit.Header.Value.Prefix ]]";
        const headerValue = appState?.[[ .Form.Submit.Header.Value.AppStateFieldPath ]];
        fetchOptions.headers["[[ .Form.Submit.Header.Key ]]"] = `${headerPrefix}${headerValue}`;
      }
    [[ end ]]

    let fetchURL = "[[ .Form.Submit.URL ]]";
    [[ if .Form.Submit.SearchParams ]]
      [[ range $searchParam := .Form.Submit.SearchParams ]]
        [[ if $searchParam.Value.FromLocation ]]
          const param[[ $searchParam.Value.SearchParamKey ]]Value = params["[[ $searchParam.Value.SearchParamKey ]]"];
          fetchURL = fetchURL.replace("[[ $searchParam.Key ]]", param[[ $searchParam.Value.SearchParamKey ]]Value);
        [[ end ]]
      [[ end ]]
    [[ end ]]

    fetch(fetchURL, fetchOptions)
      .then(async (response) => {
        var data;

        if (response.headers.get("content-type").includes("application/json")) {
          data = await response.json();
        } else {
          data = await response.text();
        }

        if (response.ok) {
          onSuccessRedirectURL && history.push(onSuccessRedirectURL);
        } else {
          handleSetAppState({ snackBar: { alertMessage: data, severity: 'error' } });
        }

        return data;
      });
  };

  const handleSetFile = (file) => {
    formData.append('file', file);
  };

  return (
    <Layout appState={appState} handleClearAppState={handleClearAppState} handleSetAppState={handleSetAppState}>
      <Grid container>
        <Grid item xs={12} sm={12} sx={{ mt: 2, ml: 3 }}>
          <Breadcrumbs aria-label="breadcrumb">
            [[ if .Form.Navigation ]]
            [[ range $i, $nav := .Form.Navigation.Items ]]
            <Link
              underline="hover"
              color="inherit"
              href="#[[ $nav.URL ]]"
            >
              [[ $nav.Label ]]
            </Link>
            [[ end ]]
            <Typography color="text.primary">[[ .Form.Navigation.Active.Label ]]</Typography>
            [[ end ]]
          </Breadcrumbs>
          [[ if $uploadPage.Header ]]
          <PaperHeader
            sx={{ mt: 2, mb: -1, pl: 4, py: 1.4 }}
            header={[[ $uploadPage.Header.ID ]]}
          />
          [[ end ]]
        </Grid>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Paper
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            height: 640,
          }}
        >
          [[ if ne .Form.Title "" ]]
          <Box sx={{ pb: 2}}>
            <Typography component="h1" variant="h5">
              [[ .Form.Title ]]
            </Typography>
            <Divider />
          </Box>
          [[ end ]]
          <[[ .ID ]]NavTabs
            sx={{width: "100%", pb: 1, mt: [[ if eq .Form.Title "" ]] -2 [[else]] 0 [[ end ]]}}
          />
          <Box component="form" onSubmit={handle[[ .Form.ID]]Submit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              [[ range $field := .Form.Fields ]]
                [[ if eq $field.Type 2 ]]
                  <Grid item xs={4}>
                    <Grid item xs={4} md={4}>
                    <FileField id={"[[ $field.ID ]]"} handleSetFile={handleSetFile} />
                    </Grid>
                  </Grid>
                [[ end ]]
              [[ end ]]
            </Grid>
          <Button
            type="submit"
            fullWidth={false}
            variant="contained"
            sx={{ mt: 8, mb: 2 }}
          >
            [[ .Form.Submit.Label ]]
            </Button>
        </Box>
        </Paper>
        </Grid>
    </Layout>
  );
}
[[ end ]]
[[end]]

[[define "SideForm"]]
[[ with .page ]]
function [[ .ID ]]SideForm({ handleSetAppState }) {
  const history = useHistory();

  [[range $field := .Form.Fields]]
  const [ [[$field.ID]], set[[$field.ID]] ] = useState("[[ $field.Value ]]");
  const handle[[$field.ID]]Change = (e) => {
    set[[$field.ID]](e.target.value);
  };
  [[end]]

  let onSuccessRedirectURL = null;
  [[ if .Form.Submit.OnSuccess ]]
  [[ $redirectURL := Marshal .Form.Submit.OnSuccess.RedirectURL ]]
  const [ getRoute ] = useRouteWithSearchParams();
  onSuccessRedirectURL = getRoute([[ $redirectURL ]]);
  [[ end ]]

  const handle[[ .Form.ID]]Submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      [[range $field := .Form.Fields]]
        "[[$field.ID]]": [[$field.ID]],
      [[end]]
    };

    fetch("[[ .Form.Submit.URL ]]", {
      method: "[[ .Form.Submit.Method ]]",
      body: JSON.stringify(payload),
    })
      .then(async (response) => {
        var data;

        if (response.headers.get("content-type").includes("application/json")) {
          data = await response.json();
        } else {
          data = await response.text();
        }

        if (response.ok) {
          [[ if .Form.Submit.OnSuccess ]]
            [[ if .Form.Submit.OnSuccess.SetAppState ]]
              handleSetAppState({ [[ .Form.Submit.OnSuccess.SetAppStateFieldName ]]: data });
            [[ end ]]
          [[ end ]]
          onSuccessRedirectURL && history.push(onSuccessRedirectURL);
        } else {
          setAlertMessage(data);
          setIsSnackbarOpen(true);
        }

        return data;
      });
  };

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleSnackbarClose} severity="error">
          {alertMessage}
        </Alert>
      </Snackbar>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url([[ .BackgroundImage.String ]])',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[50]
              : theme.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            [[ .Form.Title ]]
          </Typography>
          <Box component="form" onSubmit={handle[[ .Form.ID]]Submit} sx={{ mt: 1 }}>
              [[ range $field := .Form.Fields ]]
            	  [[ if eq $field.Type 0 ]]
                    [[ template "PasswordField" (Wrap $field.ID $field.Label $field.IsRequired $field.Value $field.FullWidth $field.IsMultiline $field.NumberOfRows) ]]
            	  [[ end ]]
            	  [[ if eq $field.Type 1 ]]
                    [[ template "TextField" (Wrap $field.ID $field.Label $field.IsRequired $field.Value $field.FullWidth $field.IsMultiline $field.NumberOfRows) ]]
            	  [[ end ]]
            	[[ end ]]
            {/*<FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />*/}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            [[ .Form.Submit.Label ]]
            </Button>
          <Grid container>
            <Grid item xs>
              {/*<Link href="#" variant="body2">
                  Forgot password?
                </Link>*/}
            </Grid>
            <Grid item>
              {/*<Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>*/}
            </Grid>
          </Grid>
          <FooterLabel sx={{ mt: 5 }} label={"[[ .FooterLabel ]]"} />
        </Box>
        </Box>
    </Grid>
    </Grid >
  );
}
[[ end ]]
[[end]]

[[define "MenuIcons"]]
  [[range $item := .menu.Items]]
    <[[$item.ID]]MenuItem handleClearAppState={handleClearAppState} />
  [[end]]
[[end]]

[[define "PasswordField"]]
<TextField
  variant = "outlined"
  margin = "normal"
  required = { [[ .isRequired]]}
  fullWidth
  id = "[[ .label ]]"
  label = "[[ .label ]]"
  type = "password"
  name = "password"
  autoComplete = "off"
  autoFocus = { false}
  value = { [[ .ID]]}
  onChange = { handle[[ .ID]]Change }
/>
[[end]]

[[define "TextField"]]
<TextField
  variant = "outlined"
  margin = "normal"
  required = { [[ .isRequired ]]}
  fullWidth = { [[ .fullWidth ]] }
  id = "[[ .label ]]"
  label = "[[ .label ]]"
  multiline = { [[ .isMultiline ]] }
  rows = { [[ .numberOfRows ]] }
  name = "[[ .label ]]"
  autoComplete = "off"
  autoFocus = { false}
  value = { [[ .ID]]}
  onChange = { handle[[ .ID]]Change }
/>
[[end]]

[[define "NumberField"]]
<TextField
  variant = "outlined"
  margin = "normal"
  required = { [[ .isRequired ]] }
  fullWidth = { [[ .fullWidth ]] }
  id = "[[ .label ]]"
  label = "[[ .label ]]"
  type = "number"
  name = "[[ .ID ]]"
  autoComplete = "off"
  autoFocus = { false }
  value = { [[ .ID]] }
  onChange = { handle[[ .ID]]Change }
/>
[[end]]

[[define "CheckboxField"]]
<FormGroup>
  <FormControlLabel
    control={<Checkbox checked={[[ .ID ]]} value={[[ .ID ]]} onChange={ handle[[ .ID ]]Change } inputProps={{ 'aria-label': 'controlled' }} />}
    label="[[ .label ]]"
    required={[[ .isRequired ]]}
  >
  </FormControlLabel>
</FormGroup>
[[end]]

[[define "DefaultSelect"]]
function DefaultSelect({ id, label, disabled, defaultValue, values = [] }) {
  const [val, setVal] = React.useState(defaultValue);

  const handleChange = (e) => {
    setVal(e.target.value);
  };

  return (
    <Box sx={{ width: 230, mt: 1 }}>
      <FormControl fullWidth={true} disabled={disabled}>
        <InputLabel id={id}>{label}</InputLabel>
        <Select
          labelId={id}
          id={id}
          value={val}
          label={label}
          onChange={handleChange}
          autoWidth
        >
          {values.map(v => ( <MenuItem key={v} value={v}>{v}</MenuItem> ))}
        </Select>
      </FormControl>
    </Box>
  );
}
[[end]]

[[define "FileField"]]
function FileField({ id, handleSetFile }) {
  const [ imgSrc, setImgSrc ] = useState();

  const handleInputChange = (e) => {
    const objectURL = window.URL.createObjectURL(e.target.files[0]);
    setImgSrc(objectURL);
    handleSetFile(e.target.files[0]);
  };

  return (
    <label htmlFor="contained-button-file">
      <Box>
        <img id={id} alt="" width="200" height="200" src={imgSrc}/>
      </Box>
      <Input accept="image/*" id="contained-button-file" multiple type="file"
       onChange={handleInputChange} />
      <Button variant="contained" component="span">
        Select File
      </Button>
    </label>
  );
}
[[end]]

[[ define "MultiField" ]]
function MultiField({ initialValue, meta, handleChange }) {
  if(!initialValue) return null;
  const [ lines, setLines ] = useState([...initialValue]);
  const handleAddClick = () => {
    const newLine = [];
    meta.map((fieldMeta) => {
      const field = {};
      field["id"] = fieldMeta.id;
      field[fieldMeta.id] = "";
      newLine.push(field);
    });
    setLines([...lines, newLine]);
  };
  const handleRemoveClick = (line, idx) => {
    const newLines = [...lines];
    newLines.splice(idx, 1);
    setLines(newLines);
    handleChange([...newLines]);
  };
  const handleLineChange = (e, field, fieldMeta) => {
    field[fieldMeta.id] = e.target.value;
    handleChange([...lines]);
  };
  const fieldID = (fieldMeta, i, j) => {
    return `${fieldMeta.id}-${i}-${j}`;
  };
  const multiFieldLine = (line, idx) => {
    return (
      <Grid item container xs spacing={2} sx={{pt: 3}} key={idx}>
        {meta.map((fieldMeta, j) => {
          const fields = line.filter((field) => field.id === fieldMeta.id);
          if(!fields.length) return;
          const field = fields[0];
          return (
            <Grid item xs={fieldMeta.width} key={fieldID(fieldMeta, idx, j)}>
              <TextField fullWidth={fieldMeta.fullWidth} label={fieldMeta.label} value={field[fieldMeta.id]} onChange={(e) => handleLineChange(e, field, fieldMeta)} />
            </Grid>
          );
        })}
        <Grid item xs={2}>
          <Button
            size="small"
            variant="outlined"
            sx={{mt: 1, height: 25, width: 30, minWidth: "auto"}}
            onClick={() => (handleRemoveClick(line, idx)) }
          >
            <RemoveIcon fontSize="small" />
          </Button>
        </Grid>
      </Grid>
    );
  };
  const fullWidth = meta.reduce((prev, current) => (prev + current.width), 0);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
      {lines && lines.map((line, idx) => (multiFieldLine(line, idx)))}
      </Grid>
      <Grid item xs={fullWidth}>
        <Button
          size="small"
          variant="outlined"
          sx={{mt: 1, height: 25, width: "98%", minWidth: "auto", borderStyle: "dashed" }}
          onClick={handleAddClick}>
          <AddIcon fontSize="small" /> Add
        </Button>
      </Grid>
    </Grid>
  );
}
[[ end ]]

[[ define "MediaCard" ]]
[[ $inputCheckboxType := .inputTypes.inputCheckbox ]]
function MediaCard({ appState, handleSetAppState, content, form, formInitialValues, imgId, imgURL, imgALT, ...props }) {
  const theme = useTheme();
  const history = useHistory();
  const location = useLocation();

  const cardActionAreaStyles = {
    '&:hover': {
      border: `2.5px solid ${theme.palette.primary.main}`
    },
    border: '2.5px solid transparent'
  };

  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const handleModalOpen = () => {
    if(imgId) {
      const params = new URLSearchParams({ imgId });
      history.push({ pathname: location.pathname, search: '?' + params.toString() });
    }
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    history.push({ pathname: location.pathname });
    setIsModalOpen(false);
  };

  const handleChanges = {};
  const fieldStates = {};

  form?.fields?.map((field) => {
    fieldStates[field.id] = useState(formInitialValues[field.id]);

    handleChanges[field.id] = (e) => {
      if(field.type === [[ $inputCheckboxType ]]) {
        fieldStates[field.id][1](e.target.checked);
      } else {
        fieldStates[field.id][1](e.target.value);
      }
    };
  });

  const [ getRoute ] = useRouteWithSearchParams();
  const url = getRoute({
    url: form?.submit?.url, searchParams: form?.submit?.searchParams
  });

  const [ doFetch ] = useFetch({ appState, header: form?.submit?.header, handleSetAppState });
  const [ doRedirect ] = useRedirect();
  const redirectUrl = getRoute({ ...form?.submit?.onSuccess?.redirectUrl });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {};

    form?.fields?.map((field) => {
      payload[field.id] = fieldStates[field.id][0];
    });

    const body = JSON.stringify(payload);

    doFetch[form?.submit?.method]({ url, body }).then((data) => {
      handleModalClose();
      const url = getRoute({
        url: form?.submit?.onSuccess?.redirectUrl?.url,
        searchParams: form?.submit?.onSuccess?.redirectUrl?.searchParams,
        response: data
      });
      doRedirect({ url });
    });
  };

  return (
    <Card {...props}>
      <CardActionArea sx={cardActionAreaStyles} onClick={handleModalOpen}>
        { content && <CardContent>{ content }</CardContent> }
        <CardMedia
          component="img"
          height="140"
          image={imgURL}
          alt={imgALT}
        />
      </CardActionArea>
      <BootstrapDialog open={isModalOpen} onClose={handleModalClose} aria-labelledby="customized-dialog-title">
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleModalClose}>
          {imgALT}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <form onSubmit={handleSubmit} >
            <>
              {form?.fields?.map?.((field, idx) => {
                return (
                  <CheckboxField2 key={idx} checked={fieldStates[field.id][0]} handleChange={handleChanges[field.id]} {...field} />
                );
              })}
            </>
            <CardMedia
              sx={{ mt: 2 }}
              component="img"
              height="440"
              image={imgURL}
              alt={imgALT}
            />
            {form?.submit && <DialogActions sx={{ mt: 2 }}>
              <>
                <Button type="submit" autoFocus variant="contained">
                {form.submit.label}
              </Button>
              </>
            </DialogActions>}
          </form>
        </DialogContent>
      </BootstrapDialog>
    </Card>
  );
}
[[ end ]]

[[ define "useDataLoader" ]]
function useDataLoader(appState, dataLoader, handleSetAppState) {
  const [ doFetch ] = useFetch({ appState, header: dataLoader.header, handleSetAppState });
  const doLoad = async ({ url }) => {
    return doFetch[dataLoader.method]({ url, body: null });
  };

  return [ doLoad ];
}
[[ end ]]

[[ define "useRouteWithSearchParams" ]]
function useRouteWithSearchParams() {
  const params = useParams();
  const history = useHistory();

  const getRoute = ({ url, searchParams = {}, response = {} }): string => {
    const urlSearchParams = new URLSearchParams(history.location.search);
    const queryParams = Object.fromEntries(urlSearchParams.entries());
    let route = url;

    if(!searchParams) {
      return route;
    }

    const routeQueryParams = new URLSearchParams();

    searchParams.map((searchParam) => {
      if(searchParam.value.fromLocation) {
        let param = params[searchParam.value.searchParamKey];
        if(!param) {
          param = queryParams[searchParam.value.searchParamKey];
        }
        route = route.replace(searchParam.key, param);
      }
      if(searchParam.value.fromQueryParams) {
        const param = queryParams[searchParam.value.searchParamKey];
        if(param) {
          routeQueryParams.append(searchParam.value.searchParamKey, param);
        }
      }
      if(searchParam.value.fromResponse) {
        const param = response[searchParam.value.responseFieldPath];
        route = route.replace(searchParam.key, param);
      }
    });

    if(routeQueryParams.toString() !== "") {
      route += '?' + routeQueryParams.toString();
    }

    return route;
  };

  return [ getRoute ];
}
[[ end ]]

[[ define "useFetch" ]]
function useFetch({ appState, header, handleSetAppState}) {
  const [ setSnackbarMessage ] = useSnackbar(handleSetAppState);

  const fetchOptions = {method: "GET", headers: {}};

  if(header) {
    const parts = header.value.appStateFieldPath.split('.');
    const headerValue = parts.reduce((prev, current) => { return prev && prev[current]; }, appState);
    if(headerValue) {
      const headerPrefix = header.value.prefix;
      fetchOptions.headers[header.key] = `${headerPrefix}${headerValue}`;
    }
  }

  const doFetch = async (url, method, body) => {
    return fetch(url, { ...fetchOptions, method, body })
      .then(async (response) => {
        let data;

        if(response.headers.get("content-type").includes("application/json")) {
          data = await response.json();
        } else {
          data = await response.text();
        }

        if(response.ok) {
          setSnackbarMessage(data?.meta?.message, 'success');
        } else {
          setSnackbarMessage(data?.meta?.message, 'error');
        }

        return data;
      });
  };

  return [{
    GET: ({ url, body }) => doFetch(url, "GET", body),
    PUT: ({ url, body }) => doFetch(url, "PUT", body),
    POST: ({ url, body }) => doFetch(url, "POST", body)
  }]
}
[[ end ]]

[[ define "useRedirect" ]]
function useRedirect() {
  const history = useHistory();
  const location = useLocation();

  const doRedirect = ({ url }) => {
    url && url !== location.pathname && history.push(url);
  };

  return [
    doRedirect,
  ];
}
[[ end ]]

[[ define "useSnackbar" ]]
function useSnackbar(handleSetAppState) {
  const setSnackbarMessage = (msg: string, severity: string) => {
    if(msg && msg !== "") {
      handleSetAppState({ snackBar: { alertMessage: msg, severity } });
    }
  };

  return [
    setSnackbarMessage,
  ];
}
[[ end ]]

[[ define "types" ]]
interface SearchParamValue {
  fromLocation: boolean;
  searchParamKey: string;
}

interface SearchParams {
  key: string;
  value: SearchParamValue;
}

interface RedirectURL {
  url: string;
  searchParams: SearchParam[];
}
[[ end ]]

[[ define "SnackbarWrapper" ]]
function SnackbarWrapper({ isSnackbarOpen, handleSnackbarClose, vertical, horizontal, severity, message, autoHideDuration }) {
  return (
    <Snackbar
      open={isSnackbarOpen}
      autoHideDuration={6000}
      onClose={handleSnackbarClose}
      anchorOrigin={{ vertical, horizontal }}
      autoHideDuration={autoHideDuration}>
        <Alert onClose={handleSnackbarClose} severity={severity}>
          {message}
        </Alert>
    </Snackbar>
  );
}
[[ end ]]

[[ define "PaperHeader" ]]
function PaperHeader({ header, ...props}) {
  return (
    <Paper {...props}>
      <Box>
        <Typography variant="subtitle1">
          {header}
        </Typography>
      </Box>
    </Paper>
  );
}
[[ end ]]
