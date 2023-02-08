import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `AWSDateTime` scalar type provided by AWS AppSync, represents a valid ***extended*** [ISO 8601 DateTime](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations) string. In other words, this scalar type accepts datetime strings of the form `YYYY-MM-DDThh:mm:ss.SSSZ`.  The scalar can also accept "negative years" of the form `-YYYY` which correspond to years before `0000`. For example, "**-2017-01-01T00:00Z**" and "**-9999-01-01T00:00Z**" are both valid datetime strings.  The field after the two digit seconds field is a nanoseconds field. It can accept between 1 and 9 digits. So, for example, "**1970-01-01T12:00:00.2Z**", "**1970-01-01T12:00:00.277Z**" and "**1970-01-01T12:00:00.123456789Z**" are all valid datetime strings.  The seconds and nanoseconds fields are optional (the seconds field must be specified if the nanoseconds field is to be used).  The [time zone offset](https://en.wikipedia.org/wiki/ISO_8601#Time_zone_designators) is compulsory for this scalar. The time zone offset must either be `Z` (representing the UTC time zone) or be in the format `±hh:mm:ss`. The seconds field in the timezone offset will be considered valid even though it is not part of the ISO 8601 standard. */
  AWSDateTime: any;
  /** The `AWSJSON` scalar type provided by AWS AppSync, represents a JSON string that complies with [RFC 8259](https://tools.ietf.org/html/rfc8259).  Maps like "**{\\"upvotes\\": 10}**", lists like "**[1,2,3]**", and scalar values like "**\\"AWSJSON example string\\"**", "**1**", and "**true**" are accepted as valid JSON and will automatically be parsed and loaded in the resolver mapping templates as Maps, Lists, or Scalar values rather than as the literal input strings.  Invalid JSON strings like "**{a: 1}**", "**{'a': 1}**" and "**Unquoted string**" will throw GraphQL validation errors. */
  AWSJSON: any;
  JSON: any;
};

export type DeleteUserPrefInput = {
  name: Scalars['String'];
};

export type DispatchGroup = {
  __typename?: 'DispatchGroup';
  TYPE?: Maybe<Scalars['String']>;
  autoCloseManifest?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  dispatchGroup?: Maybe<Scalars['String']>;
  dispatchGroupId?: Maybe<Scalars['Int']>;
  dispatchType?: Maybe<Scalars['String']>;
  pk: Scalars['String'];
  siteId?: Maybe<Scalars['Int']>;
  sk: Scalars['String'];
};

export type DispatchGroupConnection = {
  __typename?: 'DispatchGroupConnection';
  items?: Maybe<Array<Maybe<DispatchGroup>>>;
  nextToken?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

export type DispatchUpdate = {
  __typename?: 'DispatchUpdate';
  data?: Maybe<Scalars['AWSJSON']>;
  tenantId?: Maybe<Scalars['String']>;
};

export type Driver = {
  __typename?: 'Driver';
  TYPE?: Maybe<Scalars['String']>;
  autoAccept?: Maybe<Scalars['Boolean']>;
  autoSend?: Maybe<Scalars['Boolean']>;
  dispatchGroupId?: Maybe<Scalars['String']>;
  driverAlias?: Maybe<Scalars['String']>;
  driverCode?: Maybe<Scalars['String']>;
  driverId?: Maybe<Scalars['Int']>;
  driverStatus?: Maybe<Scalars['String']>;
  endZip?: Maybe<Scalars['String']>;
  endZone?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  pk: Scalars['String'];
  siteId?: Maybe<Scalars['Int']>;
  sk: Scalars['String'];
  startZip?: Maybe<Scalars['String']>;
  startZone?: Maybe<Scalars['String']>;
  vehicleTypeId?: Maybe<Scalars['Int']>;
};

export type DriverConnection = {
  __typename?: 'DriverConnection';
  items?: Maybe<Array<Maybe<Driver>>>;
  nextToken?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

export type GetJsonOrderResponse = {
  __typename?: 'GetJsonOrderResponse';
  Order?: Maybe<Scalars['JSON']>;
};
export type SpecificSearchOrderRes = {
  __typename?: 'SpecificSearchOrderRes';
  Orders?: Maybe<Scalars['JSON']>;
};

export type GetOrderInput = {
  OrderNumber: Scalars['String'];
};

export type GetOrderInputSearch = {
  Keyword: Scalars['String']
  FromDate: Maybe<Scalars['String']>
  ToDate: Maybe<Scalars['String']>
  SpecificSearch: Maybe<Scalars['String']>
  Page: number
  PageSize: number
  ShowCompleted: boolean
}

export type GetOrderResponse = {
  __typename?: 'GetOrderResponse';
  Order: Scalars['String'];
};

export type GetQuoteOrderResponse = {
  __typename?: 'GetQuoteOrderResponse';
  mQuoteOrderResponse?: Maybe<Scalars['JSON']>;
};

export type Job = {
  __typename?: 'Job';
  auth?: Maybe<Scalars['String']>;
  caller?: Maybe<Scalars['String']>;
  callerPhone?: Maybe<Scalars['String']>;
  codAmount?: Maybe<Scalars['Float']>;
  codStatus?: Maybe<Scalars['String']>;
  customerAlias?: Maybe<Scalars['String']>;
  customerId?: Maybe<Scalars['Int']>;
  customerNotes?: Maybe<Scalars['String']>;
  dispatchGroupId?: Maybe<Scalars['Int']>;
  driverCode?: Maybe<Scalars['String']>;
  iconPath?: Maybe<Scalars['String']>;
  jobId: Scalars['Int'];
  jobNumber?: Maybe<Scalars['String']>;
  jobStatus?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  orderAlias?: Maybe<Scalars['String']>;
  orderDescription?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['Int']>;
  orderNotes?: Maybe<Scalars['String']>;
  origin?: Maybe<Scalars['String']>;
  packageTypeId?: Maybe<Scalars['Int']>;
  pieces?: Maybe<Scalars['Float']>;
  pk: Scalars['String'];
  priorityGroup?: Maybe<Scalars['String']>;
  qualityFlag?: Maybe<Scalars['Boolean']>;
  routeNumber?: Maybe<Scalars['String']>;
  service?: Maybe<Scalars['String']>;
  siteId?: Maybe<Scalars['Int']>;
  sk: Scalars['String'];
  stops?: Maybe<Array<Maybe<JobStop>>>;
  totalMiles?: Maybe<Scalars['Float']>;
  vehicleTypeDescription?: Maybe<Scalars['String']>;
  vehicleTypeId?: Maybe<Scalars['Int']>;
  webUserId?: Maybe<Scalars['Int']>;
  weight?: Maybe<Scalars['Float']>;
};

export type JobAssignmentUpdate = {
  __typename?: 'JobAssignmentUpdate';
  driverCode?: Maybe<Scalars['String']>;
  jobIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  submissionResult?: Maybe<Scalars['String']>;
  tenantId?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
};

export type JobConnection = {
  __typename?: 'JobConnection';
  items?: Maybe<Array<Maybe<Job>>>;
  nextToken?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

export type JobStop = {
  __typename?: 'JobStop';
  TYPE?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  avsQuality?: Maybe<Scalars['Int']>;
  city?: Maybe<Scalars['String']>;
  customerName?: Maybe<Scalars['String']>;
  dispatchGroupId?: Maybe<Scalars['Int']>;
  dispatchZone?: Maybe<Scalars['String']>;
  dst?: Maybe<Scalars['Boolean']>;
  earlyDateTime?: Maybe<Scalars['String']>;
  jobId: Scalars['Int'];
  jobNumber?: Maybe<Scalars['String']>;
  jobStopId: Scalars['Int'];
  jobStopStatus?: Maybe<Scalars['String']>;
  lateDateTime?: Maybe<Scalars['String']>;
  manifestDriverId?: Maybe<Scalars['Int']>;
  manifestSequence?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  orderId?: Maybe<Scalars['Int']>;
  orderService?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  pk: Scalars['String'];
  room?: Maybe<Scalars['String']>;
  scheduledDateTime?: Maybe<Scalars['String']>;
  see?: Maybe<Scalars['String']>;
  sequence: Scalars['Int'];
  sk: Scalars['String'];
  state?: Maybe<Scalars['String']>;
  stopType?: Maybe<Scalars['String']>;
  timeZone?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
};

export type JobStopConnection = {
  __typename?: 'JobStopConnection';
  items?: Maybe<Array<Maybe<JobStop>>>;
  nextToken?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

export type LoginInput = {
  loginmode: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
  website: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  UserGUID?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type Manifest = {
  __typename?: 'Manifest';
  TYPE?: Maybe<Scalars['String']>;
  actionStatus?: Maybe<Scalars['Int']>;
  alertDateTime?: Maybe<Scalars['String']>;
  autoCloseManifest?: Maybe<Scalars['Int']>;
  dispatchGroupId?: Maybe<Scalars['Int']>;
  driverAlias?: Maybe<Scalars['String']>;
  driverCode?: Maybe<Scalars['String']>;
  driverGroupDispatchColor?: Maybe<Scalars['String']>;
  driverId?: Maybe<Scalars['Int']>;
  driverName?: Maybe<Scalars['String']>;
  driverPhone?: Maybe<Scalars['String']>;
  endStopDateTime?: Maybe<Scalars['String']>;
  endZip?: Maybe<Scalars['String']>;
  endZone?: Maybe<Scalars['String']>;
  gpsLastUpdate?: Maybe<Scalars['String']>;
  gpsLatitude?: Maybe<Scalars['String']>;
  gpsLongitude?: Maybe<Scalars['String']>;
  lastJobAssignedDateTime?: Maybe<Scalars['String']>;
  lastStopDateTime?: Maybe<Scalars['String']>;
  lastZip?: Maybe<Scalars['String']>;
  lastZone?: Maybe<Scalars['String']>;
  manifestDate?: Maybe<Scalars['String']>;
  manifestDriverId: Scalars['Int'];
  manifestStatus?: Maybe<Scalars['String']>;
  pk: Scalars['String'];
  siteId?: Maybe<Scalars['Int']>;
  sk: Scalars['String'];
  startZip?: Maybe<Scalars['String']>;
  stopAddress?: Maybe<Scalars['String']>;
  stopCount: Scalars['Int'];
  stops: Array<JobStop>;
  vehicleIconPath?: Maybe<Scalars['String']>;
  vehicleTypeDescription?: Maybe<Scalars['String']>;
  vehicleTypeId?: Maybe<Scalars['Int']>;
};

export type ManifestConnection = {
  __typename?: 'ManifestConnection';
  incompleteManifests?: Maybe<Array<Scalars['Int']>>;
  items: Array<Manifest>;
  nextToken?: Maybe<Scalars['Int']>;
  total: Scalars['Int'];
};

export type ModelBooleanFilterInput = {
  eq?: InputMaybe<Scalars['Boolean']>;
  ne?: InputMaybe<Scalars['Boolean']>;
};

export type ModelDispatchGroupFilterInput = {
  and?: InputMaybe<Array<InputMaybe<ModelDispatchGroupFilterInput>>>;
  autoCloseManifest?: InputMaybe<ModelIntFilterInput>;
  description?: InputMaybe<ModelStringFilterInput>;
  dispatchGroup?: InputMaybe<ModelStringFilterInput>;
  dispatchGroupId?: InputMaybe<ModelIntFilterInput>;
  dispatchType?: InputMaybe<ModelStringFilterInput>;
  not?: InputMaybe<Array<InputMaybe<ModelDispatchGroupFilterInput>>>;
  or?: InputMaybe<Array<InputMaybe<ModelDispatchGroupFilterInput>>>;
  siteId?: InputMaybe<ModelIntFilterInput>;
};

export type ModelDriverFilterInput = {
  and?: InputMaybe<Array<InputMaybe<ModelDriverFilterInput>>>;
  autoAccept?: InputMaybe<ModelBooleanFilterInput>;
  autoSend?: InputMaybe<ModelBooleanFilterInput>;
  driverAlias?: InputMaybe<ModelStringFilterInput>;
  driverCode?: InputMaybe<ModelStringFilterInput>;
  driverId?: InputMaybe<ModelIntFilterInput>;
  driverStatus?: InputMaybe<ModelStringFilterInput>;
  name?: InputMaybe<ModelStringFilterInput>;
  not?: InputMaybe<Array<InputMaybe<ModelDriverFilterInput>>>;
  or?: InputMaybe<Array<InputMaybe<ModelDriverFilterInput>>>;
  siteId?: InputMaybe<ModelIntFilterInput>;
  startZip?: InputMaybe<ModelStringFilterInput>;
  startZone?: InputMaybe<ModelStringFilterInput>;
  vehicleTypeId?: InputMaybe<ModelIntFilterInput>;
};

export type ModelFloatFilterInput = {
  eq?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  ne?: InputMaybe<Scalars['Float']>;
  range?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
};

export type ModelIdFilterInput = {
  eq?: InputMaybe<Scalars['ID']>;
  exists?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['ID']>;
  gte?: InputMaybe<Scalars['ID']>;
  lt?: InputMaybe<Scalars['ID']>;
  lte?: InputMaybe<Scalars['ID']>;
  match?: InputMaybe<Scalars['ID']>;
  matchPhrase?: InputMaybe<Scalars['ID']>;
  matchPhrasePrefix?: InputMaybe<Scalars['ID']>;
  multiMatch?: InputMaybe<Scalars['ID']>;
  ne?: InputMaybe<Scalars['ID']>;
  range?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  regexp?: InputMaybe<Scalars['ID']>;
  wildcard?: InputMaybe<Scalars['ID']>;
};

export type ModelIntFilterInput = {
  eq?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  ne?: InputMaybe<Scalars['Int']>;
  range?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export type ModelJobFilterInput = {
  and?: InputMaybe<Array<InputMaybe<ModelJobFilterInput>>>;
  auth?: InputMaybe<ModelStringFilterInput>;
  caller?: InputMaybe<ModelStringFilterInput>;
  callerPhone?: InputMaybe<ModelStringFilterInput>;
  codAmount?: InputMaybe<ModelFloatFilterInput>;
  codStatus?: InputMaybe<ModelStringFilterInput>;
  customerAlias?: InputMaybe<ModelStringFilterInput>;
  customerId?: InputMaybe<ModelIntFilterInput>;
  customerNotes?: InputMaybe<ModelStringFilterInput>;
  dispatchGroupId?: InputMaybe<ModelIntFilterInput>;
  driverCode?: InputMaybe<ModelStringFilterInput>;
  iconPath?: InputMaybe<ModelStringFilterInput>;
  jobId?: InputMaybe<ModelIntFilterInput>;
  jobNumber?: InputMaybe<ModelStringFilterInput>;
  jobStatus?: InputMaybe<ModelStringFilterInput>;
  name?: InputMaybe<ModelStringFilterInput>;
  not?: InputMaybe<Array<InputMaybe<ModelJobFilterInput>>>;
  or?: InputMaybe<Array<InputMaybe<ModelJobFilterInput>>>;
  orderAlias?: InputMaybe<ModelStringFilterInput>;
  orderDescription?: InputMaybe<ModelStringFilterInput>;
  orderId?: InputMaybe<ModelIntFilterInput>;
  orderNotes?: InputMaybe<ModelStringFilterInput>;
  origin?: InputMaybe<ModelStringFilterInput>;
  packageTypeId?: InputMaybe<ModelIntFilterInput>;
  pieces?: InputMaybe<ModelFloatFilterInput>;
  priorityGroup?: InputMaybe<ModelStringFilterInput>;
  qualityFlag?: InputMaybe<ModelBooleanFilterInput>;
  routeNumber?: InputMaybe<ModelStringFilterInput>;
  service?: InputMaybe<ModelStringFilterInput>;
  siteId?: InputMaybe<ModelIntFilterInput>;
  totalMiles?: InputMaybe<ModelFloatFilterInput>;
  vehicleTypeDescription?: InputMaybe<ModelStringFilterInput>;
  vehicleTypeId?: InputMaybe<ModelIntFilterInput>;
  webUserId?: InputMaybe<ModelIntFilterInput>;
  weight?: InputMaybe<ModelFloatFilterInput>;
};

export type ModelJobStopFilterInput = {
  address?: InputMaybe<ModelStringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ModelJobStopFilterInput>>>;
  avsQuality?: InputMaybe<ModelIntFilterInput>;
  city?: InputMaybe<ModelStringFilterInput>;
  dispatchGroupId?: InputMaybe<ModelIntFilterInput>;
  dispatchZone?: InputMaybe<ModelStringFilterInput>;
  dst?: InputMaybe<ModelBooleanFilterInput>;
  earlyDateTime?: InputMaybe<ModelStringFilterInput>;
  jobId?: InputMaybe<ModelIntFilterInput>;
  jobStatus?: InputMaybe<ModelStringFilterInput>;
  jobStopId?: InputMaybe<ModelIntFilterInput>;
  jobStopStatus?: InputMaybe<ModelStringFilterInput>;
  lateDateTime?: InputMaybe<ModelStringFilterInput>;
  manifestDriverId?: InputMaybe<ModelIntFilterInput>;
  name?: InputMaybe<ModelStringFilterInput>;
  not?: InputMaybe<Array<InputMaybe<ModelJobStopFilterInput>>>;
  note?: InputMaybe<ModelStringFilterInput>;
  offset?: InputMaybe<ModelIntFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ModelJobStopFilterInput>>>;
  phone?: InputMaybe<ModelStringFilterInput>;
  room?: InputMaybe<ModelStringFilterInput>;
  scheduledDateTime?: InputMaybe<ModelStringFilterInput>;
  see?: InputMaybe<ModelStringFilterInput>;
  sequence?: InputMaybe<ModelIntFilterInput>;
  state?: InputMaybe<ModelStringFilterInput>;
  timeZone?: InputMaybe<ModelStringFilterInput>;
  zip?: InputMaybe<ModelStringFilterInput>;
};

export type ModelManifestDriverFilterInput = {
  actionStatus?: InputMaybe<ModelIntFilterInput>;
  alertDateTime?: InputMaybe<ModelStringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ModelManifestDriverFilterInput>>>;
  autoCloseManifest?: InputMaybe<ModelIntFilterInput>;
  dispatchGroupId?: InputMaybe<ModelIntFilterInput>;
  driverAlias?: InputMaybe<ModelStringFilterInput>;
  driverCode?: InputMaybe<ModelStringFilterInput>;
  driverGroupDispatchColor?: InputMaybe<ModelStringFilterInput>;
  driverId?: InputMaybe<ModelIntFilterInput>;
  driverName?: InputMaybe<ModelStringFilterInput>;
  driverPhone?: InputMaybe<ModelStringFilterInput>;
  endStopDateTime?: InputMaybe<ModelStringFilterInput>;
  endZip?: InputMaybe<ModelStringFilterInput>;
  endZone?: InputMaybe<ModelStringFilterInput>;
  gpsLastUpdate?: InputMaybe<ModelStringFilterInput>;
  gpsLatitude?: InputMaybe<ModelStringFilterInput>;
  gpsLongitude?: InputMaybe<ModelStringFilterInput>;
  lastJobAssignedDateTime?: InputMaybe<ModelStringFilterInput>;
  lastStopDateTime?: InputMaybe<ModelStringFilterInput>;
  lastZip?: InputMaybe<ModelStringFilterInput>;
  lastZone?: InputMaybe<ModelStringFilterInput>;
  manifestDate?: InputMaybe<ModelStringFilterInput>;
  manifestDriverId?: InputMaybe<ModelIntFilterInput>;
  manifestStatus?: InputMaybe<ModelStringFilterInput>;
  not?: InputMaybe<Array<InputMaybe<ModelManifestDriverFilterInput>>>;
  or?: InputMaybe<Array<InputMaybe<ModelManifestDriverFilterInput>>>;
  siteId?: InputMaybe<ModelIntFilterInput>;
  startZip?: InputMaybe<ModelStringFilterInput>;
  stopAddress?: InputMaybe<ModelStringFilterInput>;
  vehicleIconPath?: InputMaybe<ModelStringFilterInput>;
  vehicleTypeDescription?: InputMaybe<ModelStringFilterInput>;
  vehicleTypeId?: InputMaybe<ModelIntFilterInput>;
};

export type ModelOrderPriorityFilterInput = {
  and?: InputMaybe<Array<InputMaybe<ModelOrderPriorityFilterInput>>>;
  description?: InputMaybe<ModelStringFilterInput>;
  dispatchJobColor?: InputMaybe<ModelIntFilterInput>;
  not?: InputMaybe<Array<InputMaybe<ModelOrderPriorityFilterInput>>>;
  or?: InputMaybe<Array<InputMaybe<ModelOrderPriorityFilterInput>>>;
  orderPriorityId?: InputMaybe<ModelIntFilterInput>;
  siteId?: InputMaybe<ModelStringFilterInput>;
};

export type ModelStringFilterInput = {
  eq?: InputMaybe<Scalars['String']>;
  exists?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  match?: InputMaybe<Scalars['String']>;
  matchPhrase?: InputMaybe<Scalars['String']>;
  matchPhrasePrefix?: InputMaybe<Scalars['String']>;
  multiMatch?: InputMaybe<Scalars['String']>;
  ne?: InputMaybe<Scalars['String']>;
  range?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  regexp?: InputMaybe<Scalars['String']>;
  wildcard?: InputMaybe<Scalars['String']>;
};

export type ModelVehicleTypeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<ModelVehicleTypeFilterInput>>>;
  costPerMile?: InputMaybe<ModelFloatFilterInput>;
  description?: InputMaybe<ModelStringFilterInput>;
  dispatchJobColor?: InputMaybe<ModelIntFilterInput>;
  dwellTime?: InputMaybe<ModelIntFilterInput>;
  iconPath?: InputMaybe<ModelStringFilterInput>;
  laborCostPerHo?: InputMaybe<ModelFloatFilterInput>;
  maxCube?: InputMaybe<ModelIntFilterInput>;
  maxPieces?: InputMaybe<ModelIntFilterInput>;
  maxWeight?: InputMaybe<ModelIntFilterInput>;
  message?: InputMaybe<ModelStringFilterInput>;
  not?: InputMaybe<Array<InputMaybe<ModelVehicleTypeFilterInput>>>;
  or?: InputMaybe<Array<InputMaybe<ModelVehicleTypeFilterInput>>>;
  rank?: InputMaybe<ModelIntFilterInput>;
  showOnWeb?: InputMaybe<ModelIntFilterInput>;
  sortSequence?: InputMaybe<ModelStringFilterInput>;
  vehicleTypeId?: InputMaybe<ModelIntFilterInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  GetJsonOrder?: Maybe<GetJsonOrderResponse>;
  GetQuoteOrder?: Maybe<GetQuoteOrderResponse>;
  assignDriverToJobs?: Maybe<Scalars['String']>;
  closeManifest?: Maybe<Scalars['String']>;
  createManifest?: Maybe<Scalars['String']>;
  deleteUserPref?: Maybe<UserPref>;
  login?: Maybe<LoginResponse>;
  publishEventDispatchUpdate?: Maybe<DispatchUpdate>;
  publishEventJobAssignmentUpdate?: Maybe<JobAssignmentUpdate>;
  saveOrders?: Maybe<SaveOrderResponse>;
  setUserPref?: Maybe<UserPref>;
  unassignJobStops?: Maybe<Scalars['String']>;
};


export type MutationGetJsonOrderArgs = {
  input: GetOrderInput;
};


export type MutationGetQuoteOrderArgs = {
  input: QuoteOrderInput;
};


export type MutationAssignDriverToJobsArgs = {
  driverCode: Scalars['String'];
  jobIds: Array<InputMaybe<Scalars['String']>>;
};


export type MutationCloseManifestArgs = {
  manifestDriverId: Scalars['Int'];
};


export type MutationCreateManifestArgs = {
  autoAccept?: InputMaybe<Scalars['Boolean']>;
  autoSend?: InputMaybe<Scalars['Boolean']>;
  dispatchGroupId?: InputMaybe<Scalars['Int']>;
  driverId: Scalars['Int'];
  endZip?: InputMaybe<Scalars['String']>;
  endZone?: InputMaybe<Scalars['String']>;
  manifestDate?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  startZip?: InputMaybe<Scalars['String']>;
  startZone?: InputMaybe<Scalars['String']>;
  vehicleTypeId?: InputMaybe<Scalars['Int']>;
};


export type MutationDeleteUserPrefArgs = {
  input: DeleteUserPrefInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationPublishEventDispatchUpdateArgs = {
  data?: InputMaybe<Scalars['AWSJSON']>;
  tenantId?: InputMaybe<Scalars['String']>;
};


export type MutationPublishEventJobAssignmentUpdateArgs = {
  driverCode?: InputMaybe<Scalars['String']>;
  jobIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  submissionResult?: InputMaybe<Scalars['String']>;
  tenantId?: InputMaybe<Scalars['String']>;
  userName?: InputMaybe<Scalars['String']>;
};


export type MutationSaveOrdersArgs = {
  input: QuoteOrderInput;
};


export type MutationSetUserPrefArgs = {
  input: SetUserPrefInput;
};


export type MutationUnassignJobStopsArgs = {
  jobStopIds: Array<InputMaybe<Scalars['String']>>;
};

export type OrderPriority = {
  __typename?: 'OrderPriority';
  TYPE?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  dispatchJobColor?: Maybe<Scalars['Int']>;
  orderPriorityId: Scalars['Int'];
  pk: Scalars['String'];
  siteId?: Maybe<Scalars['String']>;
  sk: Scalars['String'];
};

export type OrderPriorityConnection = {
  __typename?: 'OrderPriorityConnection';
  items?: Maybe<Array<Maybe<OrderPriority>>>;
  nextToken?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  getDispatchGroup?: Maybe<DispatchGroup>;
  getDriver?: Maybe<Driver>;
  getJob?: Maybe<Job>;
  getJobStop?: Maybe<JobStop>;
  getOrder?: Maybe<GetOrderResponse>;
  getOrderPriority?: Maybe<OrderPriority>;
  getUserPref?: Maybe<UserPref>;
  getVehicleType?: Maybe<VehicleType>;
  searchDispatchGroups?: Maybe<DispatchGroupConnection>;
  searchDrivers?: Maybe<DriverConnection>;
  searchJobStops?: Maybe<JobStopConnection>;
  searchJobs?: Maybe<JobConnection>;
  searchManifests: ManifestConnection;
  searchOrderPriorities?: Maybe<OrderPriorityConnection>;
  searchUserPrefs?: Maybe<UserPrefConnection>;
  searchVehicleTypes?: Maybe<VehicleTypeConnection>;
};


export type QueryGetDispatchGroupArgs = {
  id: Scalars['String'];
};


export type QueryGetDriverArgs = {
  id: Scalars['String'];
};


export type QueryGetJobArgs = {
  id: Scalars['String'];
};


export type QueryGetJobStopArgs = {
  id: Scalars['String'];
};


export type QueryGetOrderArgs = {
  input: GetOrderInput;
};


export type QueryGetOrderPriorityArgs = {
  id: Scalars['String'];
};


export type QueryGetUserPrefArgs = {
  name: Scalars['String'];
};


export type QueryGetVehicleTypeArgs = {
  id: Scalars['String'];
};


export type QuerySearchDispatchGroupsArgs = {
  filter?: InputMaybe<ModelDispatchGroupFilterInput>;
  limit?: InputMaybe<Scalars['Int']>;
  nextToken?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<SearchableDispatchGroupSortInput>>>;
};


export type QuerySearchDriversArgs = {
  filter?: InputMaybe<ModelDriverFilterInput>;
  limit?: InputMaybe<Scalars['Int']>;
  nextToken?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<SearchableDriverSortInput>>>;
};


export type QuerySearchJobStopsArgs = {
  filter?: InputMaybe<ModelJobStopFilterInput>;
  limit?: InputMaybe<Scalars['Int']>;
  nextToken?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<SearchableJobStopSortInput>>>;
};


export type QuerySearchJobsArgs = {
  filter?: InputMaybe<ModelJobFilterInput>;
  limit?: InputMaybe<Scalars['Int']>;
  nextToken?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<SearchableJobSortInput>>>;
};


export type QuerySearchManifestsArgs = {
  filter?: InputMaybe<ModelManifestDriverFilterInput>;
  jobStopFilter?: InputMaybe<ModelJobStopFilterInput>;
  jobStopLimit?: InputMaybe<Scalars['Int']>;
  manifestLimit?: InputMaybe<Scalars['Int']>;
  nextToken?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<SearchableManifestDriverSortInput>>>;
};


export type QuerySearchOrderPrioritiesArgs = {
  filter?: InputMaybe<ModelOrderPriorityFilterInput>;
  limit?: InputMaybe<Scalars['Int']>;
  nextToken?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<SearchableOrderPrioritySortInput>>>;
};


export type QuerySearchVehicleTypesArgs = {
  filter?: InputMaybe<ModelVehicleTypeFilterInput>;
  limit?: InputMaybe<Scalars['Int']>;
  nextToken?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<SearchableVehicleTypeSortInput>>>;
};

export type QuoteOrderInput = {
  Order: Scalars['JSON'];
};

export type SaveOrderResponse = {
  __typename?: 'SaveOrderResponse';
  Status?: Maybe<Scalars['JSON']>;
};

export type SearchableDispatchGroupSortInput = {
  direction?: InputMaybe<SearchableSortDirection>;
  field?: InputMaybe<SearchableDispatchGroupSortableFields>;
};

export enum SearchableDispatchGroupSortableFields {
  AutoCloseManifest = 'autoCloseManifest',
  Description = 'description',
  DispatchGroup = 'dispatchGroup',
  DispatchGroupId = 'dispatchGroupId',
  DispatchType = 'dispatchType',
  SiteId = 'siteId'
}

export type SearchableDriverSortInput = {
  direction?: InputMaybe<SearchableSortDirection>;
  field?: InputMaybe<SearchableDriverSortableFields>;
};

export enum SearchableDriverSortableFields {
  AutoAccept = 'autoAccept',
  AutoSend = 'autoSend',
  DriverAlias = 'driverAlias',
  DriverCode = 'driverCode',
  DriverId = 'driverId',
  DriverStatus = 'driverStatus',
  Name = 'name',
  SiteId = 'siteId',
  StartZip = 'startZip',
  StartZone = 'startZone',
  VehicleTypeId = 'vehicleTypeId'
}

export type SearchableJobSortInput = {
  direction?: InputMaybe<SearchableSortDirection>;
  field?: InputMaybe<SearchableJobSortableFields>;
};

export enum SearchableJobSortableFields {
  Auth = 'auth',
  Caller = 'caller',
  CallerPhone = 'callerPhone',
  CodAmount = 'codAmount',
  CodStatus = 'codStatus',
  CustomerAlias = 'customerAlias',
  CustomerId = 'customerId',
  CustomerNotes = 'customerNotes',
  DispatchGroupId = 'dispatchGroupId',
  DriverCode = 'driverCode',
  IconPath = 'iconPath',
  JobId = 'jobId',
  JobNumber = 'jobNumber',
  JobStatus = 'jobStatus',
  Name = 'name',
  OrderAlias = 'orderAlias',
  OrderDescription = 'orderDescription',
  OrderId = 'orderId',
  OrderNotes = 'orderNotes',
  Origin = 'origin',
  PackageTypeId = 'packageTypeId',
  Pieces = 'pieces',
  PriorityGroup = 'priorityGroup',
  QualityFlag = 'qualityFlag',
  RouteNumber = 'routeNumber',
  Service = 'service',
  SiteId = 'siteId',
  TotalMiles = 'totalMiles',
  VehicleTypeDescription = 'vehicleTypeDescription',
  VehicleTypeId = 'vehicleTypeId',
  WebUserId = 'webUserId',
  Weight = 'weight'
}

export type SearchableJobStopSortInput = {
  direction?: InputMaybe<SearchableSortDirection>;
  field?: InputMaybe<SearchableJobStopSortableFields>;
};

export enum SearchableJobStopSortableFields {
  Address = 'address',
  AvsQuality = 'avsQuality',
  City = 'city',
  DispatchGroupId = 'dispatchGroupId',
  DispatchZone = 'dispatchZone',
  EarlyDateTime = 'earlyDateTime',
  JobId = 'jobId',
  JobStatus = 'jobStatus',
  JobStopId = 'jobStopId',
  JobStopStatus = 'jobStopStatus',
  LateDateTime = 'lateDateTime',
  ManifestDriverId = 'manifestDriverId',
  ManifestSequence = 'manifestSequence',
  Name = 'name',
  Note = 'note',
  Offset = 'offset',
  Phone = 'phone',
  Room = 'room',
  ScheduledDateTime = 'scheduledDateTime',
  See = 'see',
  Sequence = 'sequence',
  State = 'state',
  TimeZone = 'timeZone',
  Zip = 'zip'
}

export type SearchableManifestDriverSortInput = {
  direction?: InputMaybe<SearchableSortDirection>;
  field?: InputMaybe<SearchableManifestDriverSortableFields>;
};

export enum SearchableManifestDriverSortableFields {
  ActionStatus = 'actionStatus',
  AlertDateTime = 'alertDateTime',
  AutoCloseManifest = 'autoCloseManifest',
  DispatchGroupId = 'dispatchGroupId',
  DriverAlias = 'driverAlias',
  DriverCode = 'driverCode',
  DriverGroupDispatchColor = 'driverGroupDispatchColor',
  DriverId = 'driverId',
  DriverName = 'driverName',
  DriverPhone = 'driverPhone',
  EndStopDateTime = 'endStopDateTime',
  EndZip = 'endZip',
  EndZone = 'endZone',
  GpsLastUpdate = 'gpsLastUpdate',
  GpsLatitude = 'gpsLatitude',
  GpsLongitude = 'gpsLongitude',
  LastJobAssignedDateTime = 'lastJobAssignedDateTime',
  LastStopDateTime = 'lastStopDateTime',
  LastZip = 'lastZip',
  LastZone = 'lastZone',
  ManifestDate = 'manifestDate',
  ManifestDriverId = 'manifestDriverId',
  ManifestStatus = 'manifestStatus',
  SiteId = 'siteId',
  StartZip = 'startZip',
  StopAddress = 'stopAddress',
  VehicleIconPath = 'vehicleIconPath',
  VehicleTypeDescription = 'vehicleTypeDescription',
  VehicleTypeId = 'vehicleTypeId'
}

export type SearchableOrderPrioritySortInput = {
  direction?: InputMaybe<SearchableSortDirection>;
  field?: InputMaybe<SearchableOrderPrioritySortableFields>;
};

export enum SearchableOrderPrioritySortableFields {
  Description = 'description',
  DispatchJobColor = 'dispatchJobColor',
  OrderPriorityId = 'orderPriorityId',
  SiteId = 'siteId'
}

export enum SearchableSortDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type SearchableVehicleTypeSortInput = {
  direction?: InputMaybe<SearchableSortDirection>;
  field?: InputMaybe<SearchableVehicleTypeSortableFields>;
};

export enum SearchableVehicleTypeSortableFields {
  CostPerMile = 'costPerMile',
  Description = 'description',
  DispatchJobColor = 'dispatchJobColor',
  DwellTime = 'dwellTime',
  IconPath = 'iconPath',
  LaborCostPerHo = 'laborCostPerHo',
  MaxCube = 'maxCube',
  MaxPieces = 'maxPieces',
  MaxWeight = 'maxWeight',
  Message = 'message',
  Rank = 'rank',
  ShowOnWeb = 'showOnWeb',
  SortSequence = 'sortSequence',
  VehicleTypeId = 'vehicleTypeId'
}

export type SetUserPrefInput = {
  name: Scalars['String'];
  value?: InputMaybe<Scalars['AWSJSON']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  onDispatchUpdate?: Maybe<DispatchUpdate>;
  onJobAssignmentUpdate?: Maybe<JobAssignmentUpdate>;
};

export type UserPref = {
  __typename?: 'UserPref';
  name: Scalars['String'];
  updatedAt: Scalars['AWSDateTime'];
  value?: Maybe<Scalars['AWSJSON']>;
};

export type UserPrefConnection = {
  __typename?: 'UserPrefConnection';
  items: Array<Maybe<UserPref>>;
};

export type VehicleType = {
  __typename?: 'VehicleType';
  TYPE?: Maybe<Scalars['String']>;
  costPerMile?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  dispatchJobColor?: Maybe<Scalars['Int']>;
  dwellTime?: Maybe<Scalars['Int']>;
  iconPath?: Maybe<Scalars['String']>;
  laborCostPerHo?: Maybe<Scalars['Float']>;
  maxCube?: Maybe<Scalars['Int']>;
  maxPieces?: Maybe<Scalars['Int']>;
  maxWeight?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
  pk: Scalars['String'];
  rank?: Maybe<Scalars['Int']>;
  showOnWeb?: Maybe<Scalars['Int']>;
  sk: Scalars['String'];
  sortSequence?: Maybe<Scalars['String']>;
  vehicleTypeId: Scalars['Int'];
};

export type VehicleTypeConnection = {
  __typename?: 'VehicleTypeConnection';
  items?: Maybe<Array<Maybe<VehicleType>>>;
  nextToken?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'LoginResponse', status?: string | null, UserGUID?: string | null } | null };

export type GetQuoteOrderMutationVariables = Exact<{
  input: QuoteOrderInput;
}>;


export type GetQuoteOrderMutation = { __typename?: 'Mutation', GetQuoteOrder?: { __typename?: 'GetQuoteOrderResponse', mQuoteOrderResponse?: any | null } | null };

export type SaveOrdersMutationVariables = Exact<{
  input: QuoteOrderInput;
}>;


export type SaveOrdersMutation = { __typename?: 'Mutation', saveOrders?: { __typename?: 'SaveOrderResponse', Status?: any | null } | null };

export type GetOrderQueryVariables = Exact<{
  input: GetOrderInput;
}>;
export type GetOrdersQueryVariablesSearch = Exact<{
  input: GetOrderInputSearch;
}>


export type GetOrderQuery = { __typename?: 'Query', getOrder?: { __typename?: 'GetOrderResponse', Order: string } | null }

export type GetOrderQuerySearch = { __typename?: 'Query', getOrderSearch?: { __typename?: 'SpecificSearchOrderRes', Orders: string } | null };
;

export type GetJsonOrderMutationVariables = Exact<{
  input: GetOrderInput;
}>;


export type GetJsonOrderMutation = { __typename?: 'Mutation', GetJsonOrder?: { __typename?: 'GetJsonOrderResponse', Order?: any | null } | null };


export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) @rest(type: "LoginResponse", path: "/Login", method: "POST") {
    status
    UserGUID
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const GetQuoteOrderDocument = gql`
    mutation GetQuoteOrder($input: QuoteOrderInput!) {
  GetQuoteOrder(input: $input) @rest(path: "/QuoteOrder", method: "POST") {
    mQuoteOrderResponse
  }
}
    `;
export type GetQuoteOrderMutationFn = Apollo.MutationFunction<GetQuoteOrderMutation, GetQuoteOrderMutationVariables>;

/**
 * __useGetQuoteOrderMutation__
 *
 * To run a mutation, you first call `useGetQuoteOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetQuoteOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getQuoteOrderMutation, { data, loading, error }] = useGetQuoteOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetQuoteOrderMutation(baseOptions?: Apollo.MutationHookOptions<GetQuoteOrderMutation, GetQuoteOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetQuoteOrderMutation, GetQuoteOrderMutationVariables>(GetQuoteOrderDocument, options);
      }
export type GetQuoteOrderMutationHookResult = ReturnType<typeof useGetQuoteOrderMutation>;
export type GetQuoteOrderMutationResult = Apollo.MutationResult<GetQuoteOrderMutation>;
export type GetQuoteOrderMutationOptions = Apollo.BaseMutationOptions<GetQuoteOrderMutation, GetQuoteOrderMutationVariables>;
export const SaveOrdersDocument = gql`
    mutation saveOrders($input: QuoteOrderInput!) {
  saveOrders(input: $input) @rest(path: "/SaveOrder", method: "POST") {
    Status
  }
}
    `;
export type SaveOrdersMutationFn = Apollo.MutationFunction<SaveOrdersMutation, SaveOrdersMutationVariables>;

/**
 * __useSaveOrdersMutation__
 *
 * To run a mutation, you first call `useSaveOrdersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveOrdersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveOrdersMutation, { data, loading, error }] = useSaveOrdersMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveOrdersMutation(baseOptions?: Apollo.MutationHookOptions<SaveOrdersMutation, SaveOrdersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveOrdersMutation, SaveOrdersMutationVariables>(SaveOrdersDocument, options);
      }
export type SaveOrdersMutationHookResult = ReturnType<typeof useSaveOrdersMutation>;
export type SaveOrdersMutationResult = Apollo.MutationResult<SaveOrdersMutation>;
export type SaveOrdersMutationOptions = Apollo.BaseMutationOptions<SaveOrdersMutation, SaveOrdersMutationVariables>;
export const GetOrderDocument = gql`
    query GetOrder($input: GetOrderInput!) {
  getOrder(input: $input) @rest(type: "GetOrderResponse", path: "/GetJsonOrder", method: "POST") {
    Order
  }
}
    `;

/**
 * __useGetOrderQuery__
 *
 * To run a query within a React component, call `useGetOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetOrderQuery(baseOptions: Apollo.QueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, options);
      }
export function useGetOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, options);
        }
export type GetOrderQueryHookResult = ReturnType<typeof useGetOrderQuery>;
export type GetOrderLazyQueryHookResult = ReturnType<typeof useGetOrderLazyQuery>;
export type GetOrderQueryResult = Apollo.QueryResult<GetOrderQuery, GetOrderQueryVariables>;
export const GetJsonOrderDocument = gql`
    mutation GetJsonOrder($input: GetOrderInput!) {
  GetJsonOrder(input: $input) @rest(path: "/GetJsonOrder", method: "POST") {
    Order
  }
}
    `;
export type GetJsonOrderMutationFn = Apollo.MutationFunction<GetJsonOrderMutation, GetJsonOrderMutationVariables>;

/**
 * __useGetJsonOrderMutation__
 *
 * To run a mutation, you first call `useGetJsonOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetJsonOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getJsonOrderMutation, { data, loading, error }] = useGetJsonOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetJsonOrderMutation(baseOptions?: Apollo.MutationHookOptions<GetJsonOrderMutation, GetJsonOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetJsonOrderMutation, GetJsonOrderMutationVariables>(GetJsonOrderDocument, options);
      }
export type GetJsonOrderMutationHookResult = ReturnType<typeof useGetJsonOrderMutation>;
export type GetJsonOrderMutationResult = Apollo.MutationResult<GetJsonOrderMutation>;
export type GetJsonOrderMutationOptions = Apollo.BaseMutationOptions<GetJsonOrderMutation, GetJsonOrderMutationVariables>;
export const GetOrderSearchDocument = gql`
  query GetOrderSearch($input: GetOrderInputSearch!) {
    getOrderSearch(input: $input) @rest(type: "SpecificSearchOrderRes", path: "/SpecificSearchOrder", method: "POST") {
      Orders
  }
 }
    `;

    /**
 * __useSpecificSearchOrder__
 *
 * To run a query within a React component, call `useSpecificSearchOrder` and pass it any options that fit your needs.
 * When your component renders, `useSpecificSearchOrder` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 *
 */
export function useGetOrderSpecific(baseOptions: Apollo.QueryHookOptions<GetOrderQuerySearch, GetOrdersQueryVariablesSearch>) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useQuery<GetOrderQuerySearch, GetOrdersQueryVariablesSearch>(GetOrderSearchDocument, options);
}
export type GetOrderSpecificHookResul = ReturnType<typeof useGetOrderSpecific>;
export type GetOrderSpecificResul = Apollo.QueryResult<GetOrderQuerySearch, GetOrdersQueryVariablesSearch>;