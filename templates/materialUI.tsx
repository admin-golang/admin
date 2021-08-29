[[ define "JSX" ]]

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
} = MaterialUI;

const {
  useState
} = React;

const {
  HashRouter,
  Switch,
  Route,
  Redirect,
  useHistory
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
			<path d="M0 0h24v24H0z" fill="none"/><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
    </SvgIcon>
  );
}

function ChevronLeftIcon() {
  return (
    <SvgIcon>
			<path d="M0 0h24v24H0z" fill="none"/><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
    </SvgIcon>
  );
}

function MenuIcon() {
	return (
    <SvgIcon>
			<path d="M0 0h24v24H0z" fill="none"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
    </SvgIcon>
	);
}

function DashboardIcon() {
	return (
    <SvgIcon>
			<path d="M0 0h24v24H0z" fill="none"/><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
    </SvgIcon>
	);
}

function NotificationsIcon() {
	return (
    <SvgIcon>
			<path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
    </SvgIcon>
	);
}

function AccountCircleIcon() {
	return (
    <SvgIcon>
			<path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
    </SvgIcon>
	);
}

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
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



function App() {
  return(
      <HashRouter>
        <Switch>
        [[ range $page := .Pages ]]
          <Route path="[[$page.URL]]">
          	[[ if eq $page.Type $.DashboardPage ]]
							<[[ $page.ID ]]Dashboard />
          	[[ end ]]
          	[[ if eq $page.Type $.SideFormPage ]]
							<[[ $page.ID ]]SideForm />
          	[[ end ]]
          </Route>
          [[ if eq $page.IsDefault true ]]
            <Redirect exect from="/" to="[[ $page.URL ]]" />
          [[ end ]]
				[[ end ]]
        </Switch>
      </HashRouter>
  );
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.querySelector("#root")
);

[[ range $page := .Pages ]]
  [[ if eq $page.Type $.DashboardPage ]]
  	[[ template "Dashboard" (WrapPage $.Layout $page) ]]
  [[ end ]]

  [[ if eq $page.Type $.SideFormPage ]]
  	[[ template "SideForm" (WrapPage $.Layout $page) ]]
  [[ end ]]
[[ end ]]

[[ end ]]

[[ define "Dashboard" ]]
function [[ .page.ID ]]Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const menuId = 'primary-search-account-menu';

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
          [[ template "MenuIcons" (WrapMenuIcons .layout.Menu) ]]
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
  					<div>
  					  <ListItem button>
  					    <ListItemIcon>
  					      <DashboardIcon />
  					    </ListItemIcon>
  					    <ListItemText primary="Dashboard" />
  					  </ListItem>
  					</div>
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
          </Grid>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
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
    	  <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
    	  <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    	</Menu>
    </Box>
  );
}
[[ end ]]

[[ define "SideForm" ]]
function [[ .page.ID ]]SideForm() {
  const history = useHistory();

  [[ range $field := .page.Form.Fields ]]
	  const [ [[$field.ID]], set[[ $field.ID]] ] = useState("[[ $field.Value ]]");
	  const handle[[ $field.ID ]]Change = (e) => {
	    set[[ $field.ID]](e.target.value);
	  };
	[[ end ]]

  const handle[[ .page.Form.ID ]]Submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const payload = {
      [[ range $field := .page.Form.Fields ]]
        "[[$field.ID]]": [[$field.ID]],
      [[ end ]]
    };
  
    fetch("[[ .page.Form.Submit.URL ]]", {
      method: "[[ .page.Form.Submit.Method ]]",
      body: JSON.stringify(payload),
    })
    .then(async (response) => {
      var data;
  
      if(response.headers.get("content-type").includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }
  
      if(response.ok) {
        history.push("[[ .page.Form.Submit.RedirectURL ]]");
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
			<Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{vertical: "top", horizontal: "center"}}>
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
          backgroundImage: 'url(https://source.unsplash.com/random/?jewelry)',
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handle[[ .page.Form.ID ]]Submit} sx={{ mt: 1 }}>
            	[[ range $field := .page.Form.Fields ]]
            	  [[ if eq $field.Type 0 ]]
            	    [[ template "PasswordField" (Wrap $field.ID $field.Label $field.IsRequired $field.Value) ]]
            	  [[ end ]]
            	  [[ if eq $field.Type 1 ]]
            	    [[ template "TextField" (Wrap $field.ID $field.Label $field.IsRequired $field.Value) ]]
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
							[[ .page.Form.Submit.Label ]]
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
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
[[ end ]]

[[ define "MenuIcons" ]]
  [[ range $item := .menu.Items ]]
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
  [[ end ]]
[[ end ]]

[[ define "TextField" ]]
  <TextField
    variant="outlined"
    margin="normal"
    required={[[ .isRequired ]]}
    fullWidth
    id="[[ .label ]]"
    label="[[ .label ]]"
    name="[[ .label ]]"
    autoComplete="off"
    autoFocus={false}
    value={[[ .ID ]]}
    onChange={handle[[ .ID ]]Change}
  />
[[ end ]]

[[ define "PasswordField" ]]
  <TextField
    variant="outlined"
    margin="normal"
    required={[[ .isRequired ]]}
    fullWidth
    id="[[ .label ]]"
    label="[[ .label ]]"
    type="password"
    name="password"
    autoComplete="off"
    autoFocus={false}
    value={[[ .ID ]]}
    onChange={handle[[ .ID ]]Change}
  />
[[ end ]]
