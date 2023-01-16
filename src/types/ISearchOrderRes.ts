export interface ISearchOrderRes {
  getOrder: GetOrder;
}

export interface GetOrder {
  __typename: string;
  Order: Order | null;
}

export interface Order {
  "@UserGUID": string;
  "@OrderID": string;
  "@SiteID": string;
  "@SiteCode": string;
  "@OrderNumber": string;
  "@OrderStatus": string;
  "@CustomerID": string;
  "@CreateDate": string;
  "@CreateDateDate": string;
  "@CreateUserName": string;
  "@OrderDate": string;
  "@ServiceDesc": string;
  "@AbbrService": string;
  "@Service": string;
  "@VehicleType": string;
  "@VehicleTypeID": string;
  "@Pieces": string;
  "@Weight": string;
  "@AmountQuote": string;
  "@PodName": string;
  "@PodDateTime": string;
  "@Caller": string;
  "@CallerPhone": string;
  "@AmountCharged": string;
  "@AmountReceived": string;
  "@PriorityGroup": string;
  "@AutoVerify": string;
  "@OrderMainType": string;
  "@TemplateType": string;
  "@OrderGUID": string;
  "@PackageType": string;
  "@PackageTypeID": string;
  "@CarrierTypeID": string;
  "@HolidayNameID": string;
  "@DueTimeHolidayNameID": string;
  "@LastChanged": string;
  "@Origin": string;
  "@OperationalStatus": string;
  "@DispatchDateTime": string;
  "@PickedUpDateTime": string;
  "@DeliveredDateTime": string;
  "@PodSign": string;
  "@PodSignType": string;
  "@DimWeightFactor": string;
  "@TotalMiles": string;
  "@CallerEmail": string;
  "@BillingTypeID": string;
  "@DueDateTime": string;
  "@IncludeHolidayNameID": string;
  "@AmountChargedFlag": string;
  "@CurrentTime": string;
  "@OrderFileCount": string;
  Stops: Stops;
  OrderFees: OrderFees;
  Jobs: Jobs;
  OrderFrequencies: null;
  OrderNotifies: null;
  OrderFiles: OrderFiles;
  Site: { [key: string]: string };
  Customer: Customer;
  Pieces: Pieces;
  OrderEvents: OrderEvents;
}

export interface Customer {
  "@CustomerID": string;
  "@CustomerCode": string;
  "@Name": string;
  "@Address": string;
  "@City": string;
  "@Zip": string;
  "@Country": string;
  "@Phone": string;
  "@See": string;
  "@Room": string;
  "@PName": string;
  "@PAddress": string;
  "@PCity": string;
  "@PState": string;
  "@PackageTypeID": string;
  "@PZip": string;
  "@PCountry": string;
  "@PPhone": string;
  "@PSee": string;
  "@PRoom": string;
  "@PNote": string;
  "@PAVSQuality": string;
  "@Notes": string;
  "@VehicleTypeID": string;
  "@CreatedDate": string;
  "@Percent2": string;
  "@SiteID": string;
  "@CustomerTypeID": string;
  "@OrderPriorityID": string;
  "@CustomerGroup": string;
  "@DriverNotes": string;
  "@CustomerShipToUpdate": string;
  "@SetSiteFlag": string;
  "@AVSCheck": string;
  "@CustomerStatus": string;
  "@SiteCode": string;
  "@CreditStatusID": string;
  "@OkCreditStatus": string;
  "@CreditBilling": string;
  "@ShowSaveCustomerPaymentMethod": string;
  "@CreditLimit": string;
  CustomerBillingTypes: CustomerBillingTypes;
}

export interface CustomerBillingTypes {
  "@BillingTypeID": string;
  "@ShowSaveCustomerPaymentMethod": string;
  BillingType: BillingType;
}

export interface BillingType {
  "@BillingTypeID": string;
  "@CreditCardDescription": string;
  "@PaymentTypeID": string;
  "@PaymentTypeDescription": string;
  "@PaymentTenderTypeCode": string;
  "@WebUserID": string;
}

export interface Jobs {
  Job: Job;
}

export interface Job {
  "@JobID": string;
  "@Sequence": string;
  "@JobNumber": string;
  "@JobStatus": string;
  "@SiteID": string;
  "@Service": string;
  "@VehicleTypeID": string;
  "@ManifestDriverID": string;
  "@GPSLatitude": string;
  "@GPSLongitude": string;
  "@GPSLastUpdate": string;
  "@SplitPercentage": string;
  "@JobDate": string;
  "@Pieces": string;
  "@Weight": string;
  "@DispatchGroupID": string;
  "@DeliverySequence": string;
  "@JobModeID": string;
  Drivers: Drivers;
  JobStops: JobStops;
}

export interface Drivers {
  Driver: Driver[];
}

export interface Driver {
  "@Sequence": string;
  "@DriverID"?: string;
  "@DriverCode"?: string;
  "@Name"?: string;
  "@Phone"?: string;
  "@DriverAlias"?: string;
  "@DriverPay": string;
  "@DriverBaseAmount": string;
  "@DriverCommissionPercent"?: string;
  "@DriverBaseAmountOverride": string;
  "@JobDriverID"?: string;
  JobDriverFees?: JobDriverFees;
}

export interface JobDriverFees {
  JobDriverFee: { [key: string]: string };
}

export interface JobStops {
  JobStop: JobStop[];
}

export interface JobStop {
  "@PodRequired": string;
  "@JobStopID": string;
  "@Sequence": string;
  "@JobStopStatus": string;
  "@StopType": string;
  "@ScheduledDateTime": string;
  "@ArriveDateTime": string;
  "@DepartDateTime": string;
  "@Pieces": string;
  "@Weight": string;
  "@PodName": string;
  "@PodSign": string;
  "@PodSignType": string;
  "@PodDateTime": string;
  "@ProjectedStopDateTime": string;
  "@ArriveDateTimeSource": string;
  "@DepartDateTimeSource": string;
  "@ManifestDriverID": string;
  "@ZLatitude": string;
  "@ZLongitude": string;
  "@StopID": string;
  "@DispatchZone": string;
  "@Name": string;
  "@Address": string;
  "@City": string;
  "@State": string;
  "@Zip": string;
  "@Country": string;
  "@Phone": string;
  "@See": string;
  "@Room": string;
  "@Note": string;
  "@Latitude": string;
  "@Longitude": string;
  "@LocationTypeID": string;
  "@AVSQuality": string;
  JobStopPieces: JobStopPieces;
  "@CStopMiles"?: string;
  "@CustomerShipToCode"?: string;
}

export interface JobStopPieces {
  JobStopPiece: { [key: string]: string };
}

export interface OrderEvents {
  OrderEvent: { [key: string]: string }[];
}

export interface OrderFees {
  OrderFee: { [key: string]: string }[];
}

export interface OrderFiles {
  OrderFile: { [key: string]: string }[];
}

export interface Pieces {
  Piece: Piece;
}

export interface Piece {
  "@PieceID": string;
  "@Sequence": string;
  "@PieceStatus": string;
  "@Reference": string;
  "@Pieces": string;
  "@PackageTypeID": string;
  "@PieceTypeID": string;
  "@PieceFormatID": string;
}

export interface Stops {
  Stop: Stop[];
}

export interface Stop {
  "@OrderStopID": string;
  "@Sequence": string;
  "@StopType": string;
  "@ScheduledDateTime": string;
  "@Pieces": string;
  "@Weight": string;
  "@TimeOfServiceCode": string;
  "@DispatchGroupID": string;
  "@StopMiles"?: string;
  "@ZLatitude": string;
  "@ZLongitude": string;
  "@StopID": string;
  "@DispatchZone": string;
  "@Name": string;
  "@Address": string;
  "@City": string;
  "@State": string;
  "@Zip": string;
  "@Country": string;
  "@Phone": string;
  "@See": string;
  "@Room": string;
  "@Note": string;
  "@Latitude": string;
  "@Longitude": string;
  "@LocationTypeID": string;
  "@AVSQuality": string;
  "@ScheduledDateTimeTZ": string;
  OrderStopPieces: OrderStopPieces;
  "@CustomerShipToCode"?: string;
}

export interface OrderStopPieces {
  OrderStopPiece: OrderStopPiece;
}

export interface OrderStopPiece {
  "@OrderStopPieceID": string;
  "@PieceID": string;
  "@PieceAction": string;
  "@Sequence": string;
}
