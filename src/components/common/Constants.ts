class Constants {
  public static JOB_LIMIT: number = 500;
  public static MANIFEST_LIMIT: number = 200;
  public static DISPATCH_GROUP_LIMIT: number = 100;
  //User Preferences
  public static MANIFEST_PANEL_SIZE =
    "dispatch.ui.assignment.manifestPanelSize";
  public static MANIFEST_VIEW_TYPE = "dispatch.ui.assignment.manifestViewType";
  public static JOBS_COLUMN_CONFIGURATION =
    "dispatch.ui.jobs.columnConfiguration";
  public static DATE_FORMAT_DISPLAY_DATE_PICKER = "MM/dd/yyyy";
  public static LOCAL_STORAGE_KEYS = {
    user: "user",
    UserGUID: "UserGUID",
  };
  public static DATE_DISPLAY_FORMAT = "MMMM DD, YYYY \n hh:mm A";
  public static ROUTES = {
    home: "/",
    tracking: "/tracking",
    whoami: "/whoami",
    login: "/login",
    placeOrder: "/place-order",
    quoteOrder: "/place-order/quote",
    report: "/report",
  };

  public static DEFAULT_ROUTE = this.ROUTES.tracking;
}

const bps = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  mac: 1440,
  "2xl": 1536,
};

const breakpointToggleSidebar = bps.sm;

const COLORS = {
  DarkestGreyA47: "#102A47",
  Green567: "#25A567",
  MediumGrey: "#8DA4BE",
  "048": "#394048",
  HoverColor9FF: "#40a9ff",
  ErrorColor124: "#de0124",
  OuterStrokeErrorColor: "rgba(222, 1, 36, 0.16)",
  BorderColor4DF: "#CFD4DF",
  PlaceholderColor4BEMediumGrey: "#8da4be",
  FocusBoxShadowNormalColor: "rgba(36, 110, 237, 0.16)",
  FocusBoxShadowErrorColor: "rgba(222, 1, 36, 0.16)",
  FocusBorderColor: "#246eed",
};

export { Constants, bps, breakpointToggleSidebar, COLORS };
