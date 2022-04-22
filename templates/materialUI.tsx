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
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TableHead,
  Breadcrumbs,
  Chip
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

const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: colors.red.A400,
    },
    background: {
      default: "#fff",
    },
  },
});

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

  let initialAppState = {};
  try {
    initialAppState = JSON.parse(rawAppState);
  } catch(err) {}

  const [ appState, setAppState ] = React.useState(initialAppState);

  const handleSetAppState = (newState) => {
    const state = {...appState, ...newState};
    setAppState(state);
    localStorage.setItem(AppStateLocalStorageKey, JSON.stringify(state));
  };

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
							<[[ $page.ID ]]Dashboard />
          	[[ end ]]
          	[[ if eq $page.Type $.ListPage ]]
              <AppContext.Consumer>
              {appState => (
							<[[ $page.ID ]]List appState={appState} />
              )}
              </AppContext.Consumer>
          	[[ end ]]
            [[ if eq $page.Type $.FormPage ]]
              <AppContext.Consumer>
              {appState => (
              <[[ $page.ID ]]Form appState={appState} />
              )}
              </AppContext.Consumer>
            [[ end ]]
          	[[ if eq $page.Type $.SideFormPage ]]
							<[[ $page.ID ]]SideForm handleSetAppState={handleSetAppState} />
          	[[ end ]]
          	[[ if eq $page.Type $.EditPage ]]
              <AppContext.Consumer>
              {appState => (
              <[[ $page.ID ]]Edit appState={appState} />
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

function Layout({ children }) {
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const location = useLocation();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <StyledAppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
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
            Dashboard
          </Typography>
          [[ if and .Layout .Layout.Menu ]]
          [[ template "MenuIcons" (WrapMenuIcons .Layout.Menu) ]]
          [[end]]
        </Toolbar>
      </StyledAppBar>
      <StyledDrawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          [[ range $page := .Pages ]]
          [[ if $page.ToolbarEnabled ]]
  					<div>
            <Link href="#[[ $page.URL ]]">
              <ListItem button selected={"[[ $page.URL ]]" === location.pathname}>
                <ListItemIcon>
                  [[ if eq $page.Icon.Type 2 ]]
  					        <DashboardIcon />
                  [[ end ]]
                  [[ if eq $page.Icon.Type 3 ]]
  					        <InventoryIcon />
                  [[ end ]]
                  [[ if eq $page.Icon.Type 4 ]]
                  <SellIcon />
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

  [[ if eq $page.Type $.FormPage ]]
    [[template "Form"(WrapPage $.Layout $page $.Pages)]]
  [[end]]

  [[ if eq $page.Type $.EditPage ]]
    [[template "Edit"(WrapPage $.Layout $page $.Pages)]]
  [[end]]
[[end]]

[[ if and .Layout .Layout.Menu ]]
[[range $item := .Layout.Menu.Items]]
function [[$item.ID]]MenuItem() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const isMenuOpen = Boolean(anchorEl);
  const menuId = 'primary-search-account-menu';

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
            <MenuItem onClick={handleMenuClose}>
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

[[end]] [[/* JSX end */]]

[[define "Dashboard"]]
[[ with .page ]]
function [[ .ID ]]Dashboard() {
[[ end ]]
  return (
    <Layout>
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
function [[ .ID ]]List({ appState }) {
  const history = useHistory();

  function createData(name: string, calories: number, fat: number) {
    return { name, calories, fat };
  }

  const [rows, setRows] = React.useState<Array>([]);
  const [rowsMeta, setRowsMeta] = React.useState<Object>({headers: []});
  const [rowsProps, setRowsProps] = React.useState<Array>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  [[ if $listPage.DataLoader ]]
  useEffect(() => {
    const abortCtrl = new AbortController();
    const fetchOptions = { method: "[[ $listPage.DataLoader.Method ]]", headers: {}, signal: abortCtrl.signal };
    [[ if $listPage.DataLoader.Header ]]
      if (appState?.[[ $listPage.DataLoader.Header.Value.AppStateFieldPath ]]) {
        const headerPrefix = "[[ $listPage.DataLoader.Header.Value.Prefix ]]";
        const headerValue = appState?.[[ $listPage.DataLoader.Header.Value.AppStateFieldPath ]];
        fetchOptions.headers["[[ $listPage.DataLoader.Header.Key ]]"] = `${headerPrefix}${headerValue}`;
      }
    [[ end ]]

    fetch("[[ $listPage.DataLoader.URL ]]", fetchOptions)
      .then(async (response) => {
        var resp: any;

        if (response.headers.get("content-type").includes("application/json")) {
          resp = await response.json();
        } else {
          resp = await response.text();
        }

        if (response.ok) {
          setRows(resp.data);
          setRowsProps(Object.keys(resp.data[0]));
          setRowsMeta(resp.meta);
        } else {
        }
      })
      .catch(err => {
        if (err.name === "AbortError") return;
        throw error;
      });

      return () => { abortCtrl.abort() };
  }, []);
  [[end]]

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
    <Layout>
      <Grid item xs={12} md={12} lg={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 640,
          }}
        >
          [[ if IsNotNil $listPage.MainButton ]]
          <Grid container spacing={0}>
          	<Grid item xs={8}>
       		 		<Typography
       		 		  variant="h6"
       		 		  id="tableTitle"
       		 		  component="div"
       		 		>
       		 		[[ $listPage.Title ]]
       		 		</Typography>
          	</Grid>
          	<Grid item xs={4}>
            	<Grid container item justifyContent="flex-end">
            		<Grid item xs={10} md={4} lg={4} justifyContent="flex-end">
            		  <Box sx={{ pr: 0, pl: 0 }}>
            		    <Button
            		      type="submit"
            		      fullWidth
            		      variant="contained"
            		      size="small"
            		      sx={{ mt: 1, mb: 4 }}
            		      href="#[[ $listPage.MainButton.URL ]]"
            		    >
            		    [[ $listPage.MainButton.Label ]]
            		    </Button>
            		  </Box>
            		</Grid>
            	</Grid>
          	</Grid>
          </Grid>
          [[ end ]]
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
                  ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : rows
                ).map((row, idx) => (
                  <TableRow sx={{ cursor: "pointer" }} hover key={idx}
                    [[ if $listPage.ListRowConfig ]]
                      onClick={() => { handleTableRowClick({ [[ $listPage.ListRowConfig.DataRowFieldName ]]: row["[[ $listPage.ListRowConfig.DataRowFieldName ]]"] }) }}
                    [[ end ]]
                  >
                    {rowsProps.map((rowProp, idj) => (
                      <TableCell key={idj} component="th" scope="row">
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
        </Paper>
      </Grid>
    </Layout>
  );
}
[[ end ]]
[[end]]

[[define "Form"]]
[[ with .page ]]
function [[ .ID ]]Form({ appState }) {
  const history = useHistory();

  [[range $field := .Form.Fields]]
  const [ [[$field.ID]], set[[$field.ID]] ] = useState("[[ $field.Value ]]");
  const handle[[$field.ID]]Change = (e) => {
    set[[$field.ID]](e.target.value);
  };
  [[end]]

  const handle[[ .Form.ID]]Submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      [[range $field := .Form.Fields]]
        "[[$field.ID]]": [[$field.ID]],
      [[end]]
    };

    const fetchOptions = {
      method: "[[ .Form.Submit.Method ]]",
      body: JSON.stringify(payload),
      headers: {}
    };

    [[ if .Form.Submit.Header ]]
      if (appState?.[[ .Form.Submit.Header.Value.AppStateFieldPath ]]) {
        const headerPrefix = "[[ .Form.Submit.Header.Value.Prefix ]]";
        const headerValue = appState?.[[ .Form.Submit.Header.Value.AppStateFieldPath ]];
        fetchOptions.headers["[[ .Form.Submit.Header.Key ]]"] = `${headerPrefix}${headerValue}`;
      }
    [[ end ]]

    fetch("[[ .Form.Submit.URL ]]", fetchOptions)
      .then(async (response) => {
        var data;

        if (response.headers.get("content-type").includes("application/json")) {
          data = await response.json();
        } else {
          data = await response.text();
        }

        if (response.ok) {
          [[ if .Form.Submit.OnSuccess ]]
          history.push("[[ .Form.Submit.OnSuccess.RedirectURL ]]");
          [[ end ]]
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
    <Layout>
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
[[ with .page ]]
[[ $editPage := WrapEditPage . ]]
function [[ .ID ]]Edit({ appState }) {
  const history = useHistory();
  const params = useParams();
  console.log("[params]: ", params);

  [[ if .DataLoader ]]
  useEffect(() => {
    const abortCtrl = new AbortController();
    const fetchOptions = { method: "[[ $editPage.DataLoader.Method ]]", headers: {}, signal: abortCtrl.signal };
    [[ if $editPage.DataLoader.Header ]]
      if (appState?.[[ $editPage.DataLoader.Header.Value.AppStateFieldPath ]]) {
        const headerPrefix = "[[ $editPage.DataLoader.Header.Value.Prefix ]]";
        const headerValue = appState?.[[ $editPage.DataLoader.Header.Value.AppStateFieldPath ]];
        fetchOptions.headers["[[ $editPage.DataLoader.Header.Key ]]"] = `${headerPrefix}${headerValue}`;
      }
    [[ end ]]

    const fetchURLParam = params["[[ $editPage.ParamKey ]]"];
    const fetchURL = `[[ $editPage.DataLoader.URL ]]/${fetchURLParam}`;

    fetch(fetchURL, fetchOptions)
      .then(async (response) => {
        var resp: any;

        if (response.headers.get("content-type").includes("application/json")) {
          resp = await response.json();
        } else {
          resp = await response.text();
        }

        if (response.ok) {
          [[ range $field := .Form.Fields ]]
            set[[$field.ID]](resp.data[ "[[$field.ID]]" ])
          [[ end ]]
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

  [[range $field := .Form.Fields]]
  const [ [[$field.ID]], set[[$field.ID]] ] = useState("[[ $field.Value ]]");
  const handle[[$field.ID]]Change = (e) => {
    set[[$field.ID]](e.target.value);
  };
  [[end]]

  const handle[[ .Form.ID]]Submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      [[range $field := .Form.Fields]]
        "[[$field.ID]]": [[$field.ID]],
      [[end]]
    };

    const fetchOptions = {
      method: "[[ .Form.Submit.Method ]]",
      body: JSON.stringify(payload),
      headers: {}
    };

    [[ if .Form.Submit.Header ]]
      if (appState?.[[ .Form.Submit.Header.Value.AppStateFieldPath ]]) {
        const headerPrefix = "[[ .Form.Submit.Header.Value.Prefix ]]";
        const headerValue = appState?.[[ .Form.Submit.Header.Value.AppStateFieldPath ]];
        fetchOptions.headers["[[ .Form.Submit.Header.Key ]]"] = `${headerPrefix}${headerValue}`;
      }
    [[ end ]]

    fetch("[[ .Form.Submit.URL ]]", fetchOptions)
      .then(async (response) => {
        var data;

        if (response.headers.get("content-type").includes("application/json")) {
          data = await response.json();
        } else {
          data = await response.text();
        }

        if (response.ok) {
          [[ if .Form.Submit.OnSuccess ]]
          history.push("[[ .Form.Submit.OnSuccess.RedirectURL ]]");
          [[ end ]]
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
    <Layout>
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
            history.push("[[ .Form.Submit.OnSuccess.RedirectURL ]]");
          [[ end ]]
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
    <[[$item.ID]]MenuItem />
  [[end]]
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
