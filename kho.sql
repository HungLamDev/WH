USE [ShoeMaterial]
GO
/****** Object:  Table [dbo].[Data_Account_Confirm]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Data_Account_Confirm](
	[Data_Account_Confirm_Serial] [varchar](15) NOT NULL,
	[Date_Confirm] [datetime] NOT NULL,
	[Material_No] [varchar](50) NOT NULL,
	[Qty] [decimal](15, 7) NOT NULL,
	[Confirm_Status] [varchar](50) NULL,
	[Remark] [nvarchar](500) NULL,
	[Sign_Image] [varchar](15) NULL,
	[Modify_Date] [datetime] NULL,
	[User_Serial_Key] [varchar](10) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Data_Account_Confirm_Serial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Data_Confirm_Material_Month]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Data_Confirm_Material_Month](
	[KCYear] [varchar](10) NOT NULL,
	[KCMonth] [varchar](10) NOT NULL,
	[Rack] [varchar](12) NOT NULL,
	[Material_No] [varchar](50) NOT NULL,
	[WH] [varchar](10) NULL,
	[Qty] [decimal](25, 7) NULL,
	[Date_Confirm] [datetime] NOT NULL,
	[Confirm_Status] [varchar](50) NULL,
	[IsClock] [varchar](1) NULL,
	[Remark] [nvarchar](500) NULL,
	[Modify_Date] [datetime] NULL,
	[User_Serial_Key] [varchar](10) NOT NULL,
 CONSTRAINT [PK_Data_Confirm_Material_Month] PRIMARY KEY CLUSTERED 
(
	[KCYear] ASC,
	[KCMonth] ASC,
	[Rack] ASC,
	[Material_No] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Data_Confirm_QC_ERP]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Data_Confirm_QC_ERP](
	[Confirm_QC_ERP_Serial] [varchar](15) NOT NULL,
	[Date_Confirm] [datetime] NOT NULL,
	[Area_WH] [nvarchar](20) NULL,
	[Order_No] [varchar](50) NOT NULL,
	[Material_No] [varchar](50) NOT NULL,
	[Print_Date] [datetime] NOT NULL,
	[Material_Name] [nvarchar](500) NULL,
	[Arrival_QTY] [decimal](25, 7) NOT NULL,
	[Qty_Total] [decimal](25, 7) NOT NULL,
	[Confirm_Status] [varchar](50) NULL,
	[Confirm_Content] [nvarchar](500) NULL,
	[Delivery_Date] [datetime] NULL,
	[RY_Content] [nvarchar](4000) NULL,
	[Lean] [nvarchar](500) NULL,
	[Action_Taken] [nvarchar](max) NULL,
	[Final_Decision] [nvarchar](100) NULL,
	[CBQC] [varchar](10) NOT NULL,
	[CBWH] [varchar](10) NOT NULL,
	[Priority_Vote] [varchar](1) NOT NULL,
	[Priority_No] [nvarchar](50) NULL,
	[Path_Image] [nvarchar](500) NULL,
	[Modify_Date] [datetime] NOT NULL,
	[User_Serial_Key] [varchar](10) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Confirm_QC_ERP_Serial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Data_Create_Merge_BOM]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Data_Create_Merge_BOM](
	[TestNo] [varchar](15) NOT NULL,
	[YPZLBH] [varchar](15) NULL,
	[Po_No] [varchar](20) NULL,
	[Article] [varchar](15) NULL,
	[KFJD] [varchar](15) NULL,
	[JiJie] [varchar](15) NULL,
	[YPDH] [varchar](15) NULL,
	[User_ID] [varchar](15) NULL,
	[Modify_Date] [datetime] NULL,
 CONSTRAINT [PK_Data_Create_Merge_BOM] PRIMARY KEY CLUSTERED 
(
	[TestNo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Data_Group]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Data_Group](
	[Group_Serial_Key] [varchar](10) NOT NULL,
	[Group_ID] [varchar](10) NOT NULL,
	[Group_Name] [nvarchar](100) NOT NULL,
	[Start_Date] [datetime] NOT NULL,
	[NoUse_Date] [datetime] NOT NULL,
	[Modify_Date] [datetime] NOT NULL,
	[User_Serial_Key] [varchar](10) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Data_Group_Priority]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Data_Group_Priority](
	[Group_Serial_Key] [varchar](10) NOT NULL,
	[Program_Serial_Key] [varchar](10) NOT NULL,
	[Start_Date] [datetime] NOT NULL,
	[NoUse_Date] [datetime] NOT NULL,
	[Modify_Date] [datetime] NOT NULL,
	[User_Serial_Key] [varchar](10) NOT NULL,
 CONSTRAINT [PK_Data_Priority] PRIMARY KEY CLUSTERED 
(
	[Group_Serial_Key] ASC,
	[Program_Serial_Key] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Data_List_Input_In_ERP]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Data_List_Input_In_ERP](
	[Input_In_ERP_Serial] [varchar](15) NOT NULL,
	[RKNO_Stock_In_No] [varchar](20) NULL,
	[F_Factory] [varchar](10) NULL,
	[WH] [varchar](10) NULL,
	[Supplier_No] [nvarchar](50) NULL,
	[Print_Date] [datetime] NULL,
	[Order_No] [varchar](50) NOT NULL,
	[DOCNO] [nvarchar](50) NULL,
	[Type_Order] [nvarchar](10) NULL,
	[User_Confirm] [nvarchar](10) NULL,
	[Date_Confirm] [datetime] NULL,
	[CFMID] [varchar](10) NULL,
	[YN] [varchar](10) NULL,
	[HGLB] [varchar](10) NULL,
	[Material_No] [varchar](50) NOT NULL,
	[QC] [varchar](5) NULL,
	[RKSB] [varchar](10) NULL,
	[Qty] [decimal](25, 7) NOT NULL,
	[RKQty] [decimal](25, 7) NULL,
	[Pa_QTY] [decimal](25, 7) NULL,
	[Qty_Total] [decimal](25, 7) NULL,
	[CostID] [varchar](10) NULL,
	[Label_Status] [varchar](20) NULL,
	[Confirm_Status] [varchar](50) NULL,
	[IsClock] [varchar](1) NULL,
	[Remark] [nvarchar](500) NULL,
	[Modify_Date] [datetime] NULL,
	[User_Serial_Key] [varchar](10) NULL,
	[ExpirationDate] [datetime] NULL,
	[RY] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[Input_In_ERP_Serial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Data_Material_Delivery]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Data_Material_Delivery](
	[Data_Material_Delivery_Serial] [varchar](15) NOT NULL,
	[Num_No] [varchar](50) NOT NULL,
	[Material_No] [varchar](50) NOT NULL,
	[Material_Name] [nvarchar](500) NULL,
	[Color] [nvarchar](200) NULL,
	[Qty] [decimal](20, 7) NULL,
	[RY] [varchar](25) NULL,
	[Location] [nvarchar](100) NULL,
	[Remark] [nvarchar](500) NULL,
	[Date_Start] [datetime] NULL,
	[Date_End] [datetime] NULL,
	[RY_Status] [varchar](10) NULL,
	[Modify_Date] [datetime] NULL,
	[User_Serial_Key] [varchar](10) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Data_Material_Delivery_Serial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Data_Material_Label]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Data_Material_Label](
	[Material_Label_Serial] [varchar](15) NOT NULL,
	[Supplier] [varchar](100) NULL,
	[Material_Name] [nvarchar](500) NULL,
	[Color] [varchar](50) NULL,
	[Size] [varchar](50) NULL,
	[QTY] [decimal](20, 7) NULL,
	[Total_QTY] [decimal](15, 7) NOT NULL,
	[Print_QTY] [varchar](50) NULL,
	[Print_Times] [int] NOT NULL,
	[Label_Status] [varchar](10) NOT NULL,
	[Order_No] [varchar](50) NULL,
	[Roll] [varchar](15) NULL,
	[Production] [varchar](500) NULL,
	[Supplier_No] [varchar](50) NULL,
	[Material_No] [varchar](50) NULL,
	[Work_Order] [varchar](200) NULL,
	[Material_Type] [varchar](4) NULL,
	[BarCode] [varchar](100) NULL,
	[Modify_Date] [datetime] NOT NULL,
	[Print_Date] [datetime] NULL,
	[User_Serial_Key] [varchar](10) NOT NULL,
	[Arrival_QTY] [decimal](20, 7) NULL,
	[Type_Order] [nvarchar](10) NULL,
PRIMARY KEY CLUSTERED 
(
	[Material_Label_Serial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Data_Material_Storage]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Data_Material_Storage](
	[Material_Storage_Serial] [varchar](15) NOT NULL,
	[Material_No] [varchar](50) NULL,
	[Material_Name] [nvarchar](500) NULL,
	[Unit_Storage] [varchar](10) NULL,
	[Date_Storage] [datetime] NOT NULL,
	[Number_In] [varchar](50) NULL,
	[Number_Out] [varchar](50) NULL,
	[Remark] [varchar](max) NULL,
	[Qty_In] [decimal](15, 7) NULL,
	[Qty_Out] [decimal](15, 7) NULL,
	[Qty_Remaining] [decimal](15, 7) NULL,
	[Confirm] [varchar](15) NULL,
	[Modify_Date] [datetime] NULL,
	[User_Serial_Key] [varchar](10) NULL,
PRIMARY KEY CLUSTERED 
(
	[Material_Storage_Serial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Data_Program]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Data_Program](
	[Program_Serial_Key] [varchar](10) NOT NULL,
	[Program_ID] [varchar](10) NOT NULL,
	[Program_Name] [nvarchar](100) NOT NULL,
	[Start_Date] [datetime] NOT NULL,
	[NoUse_Date] [datetime] NOT NULL,
	[Modify_Date] [datetime] NOT NULL,
	[User_Serial_Key] [varchar](10) NOT NULL,
 CONSTRAINT [PK_Data_Program] PRIMARY KEY CLUSTERED 
(
	[Program_Serial_Key] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Data_Register_In_ERP]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Data_Register_In_ERP](
	[Register_In_ERP_Serial] [varchar](15) NOT NULL,
	[WH] [varchar](10) NULL,
	[Date_Confirm] [datetime] NOT NULL,
	[Order_No] [varchar](50) NULL,
	[Material_No] [varchar](50) NOT NULL,
	[Qty] [decimal](25, 7) NOT NULL,
	[Arrival_QTY] [decimal](25, 7) NOT NULL,
	[Qty_Total] [decimal](25, 7) NOT NULL,
	[Stock_In_No] [varchar](20) NULL,
	[Lable_Status] [varchar](20) NULL,
	[Confirm_Status] [varchar](50) NULL,
	[IsClock] [varchar](1) NULL,
	[Remark] [nvarchar](500) NULL,
	[Modify_Date] [datetime] NULL,
	[User_Serial_Key] [varchar](10) NOT NULL,
	[RKQty] [decimal](25, 7) NULL,
	[GC] [varchar](1) NULL,
PRIMARY KEY CLUSTERED 
(
	[Register_In_ERP_Serial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Data_Stock_In_Out]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Data_Stock_In_Out](
	[Stock_In_Out_Serial] [varchar](15) NOT NULL,
	[Material_Label_Serial] [varchar](15) NOT NULL,
	[Barcode] [varchar](100) NOT NULL,
	[Stock_In_Out_Status] [varchar](10) NOT NULL,
	[Stock_In_No] [varchar](20) NULL,
	[Stock_Out_No] [varchar](20) NULL,
	[QTY] [decimal](20, 4) NULL,
	[Print_Qty] [varchar](50) NULL,
	[Storage_Serial] [varchar](10) NULL,
	[Modify_Date] [datetime] NOT NULL,
	[User_Serial_Key] [varchar](10) NOT NULL,
 CONSTRAINT [PK_Data_Stock_In_Out] PRIMARY KEY CLUSTERED 
(
	[Stock_In_Out_Serial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Data_Storage]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Data_Storage](
	[Storage_Serial] [varchar](10) NOT NULL,
	[Rack] [varchar](12) NOT NULL,
	[Max_Qty] [decimal](8, 2) NOT NULL,
	[Min_Qty] [decimal](8, 2) NOT NULL,
	[StartDate] [datetime] NOT NULL,
	[EndDate] [datetime] NOT NULL,
	[ModifyDate] [datetime] NULL,
	[Material_Type] [varchar](10) NULL,
	[Position] [varchar](10) NULL,
 CONSTRAINT [PK_Data_Storage] PRIMARY KEY CLUSTERED 
(
	[Storage_Serial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Data_User]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Data_User](
	[User_Serial_Key] [varchar](10) NOT NULL,
	[User_ID] [varchar](10) NOT NULL,
	[User_Password] [varchar](50) NOT NULL,
	[User_Name] [nvarchar](100) NOT NULL,
	[Group_Serial_Key] [varchar](10) NOT NULL,
	[Start_Date] [datetime] NOT NULL,
	[Leave_Date] [datetime] NOT NULL,
	[Login_Date] [datetime] NOT NULL,
	[UUser_Serial_Key] [varchar](10) NOT NULL,
	[TLLanguage] [varchar](2) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Data_User_FOC]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Data_User_FOC](
	[User_Serial_Key] [varchar](10) NOT NULL,
	[User_ID] [varchar](10) NOT NULL,
	[User_Name] [nvarchar](100) NOT NULL,
	[Group_Serial_Key] [varchar](10) NULL,
	[Type_Material] [nvarchar](20) NULL,
	[Remark] [nvarchar](100) NULL,
	[Modified_Date] [datetime] NULL,
	[UUser_Serial_Key] [varchar](10) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[User_Serial_Key] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[File_Background]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[File_Background](
	[Serial] [varchar](10) NOT NULL,
	[FileName] [varchar](max) NOT NULL,
	[File_Priority] [int] NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[File_Download]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[File_Download](
	[FileName] [varchar](255) NOT NULL,
	[FileStream] [varbinary](max) NOT NULL,
	[User_Serial_Key] [varchar](10) NOT NULL,
	[UpdateTime] [varchar](20) NOT NULL,
	[UpdateStartDate] [varchar](20) NOT NULL,
	[UpdateDutyDate] [varchar](20) NOT NULL,
	[ExcuteFile] [varchar](1) NOT NULL,
	[Enforce] [varchar](1) NOT NULL,
	[FileVersion] [varchar](20) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[File_Download_App]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[File_Download_App](
	[FileName] [varchar](255) NOT NULL,
	[FileStream] [varbinary](max) NOT NULL,
	[User_Serial_Key] [varchar](10) NOT NULL,
	[UpdateTime] [varchar](20) NOT NULL,
	[UpdateStartDate] [varchar](20) NOT NULL,
	[UpdateDutyDate] [varchar](20) NOT NULL,
	[ExcuteFile] [varchar](1) NOT NULL,
	[Enforce] [varchar](1) NOT NULL,
	[FileVersion] [varchar](20) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[File_Download_New]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[File_Download_New](
	[FileName] [varchar](255) NOT NULL,
	[FileStream] [varbinary](max) NOT NULL,
	[User_Serial_Key] [varchar](10) NOT NULL,
	[UpdateTime] [varchar](20) NOT NULL,
	[UpdateStartDate] [varchar](20) NOT NULL,
	[UpdateDutyDate] [varchar](20) NOT NULL,
	[ExcuteFile] [varchar](1) NOT NULL,
	[Enforce] [varchar](1) NOT NULL,
	[FileVersion] [varchar](20) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[KCRK]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KCRK](
	[RKNO] [varchar](12) NOT NULL,
	[GSBH] [varchar](4) NOT NULL,
	[CKBH] [varchar](4) NOT NULL,
	[ZSBH] [varchar](6) NOT NULL,
	[ZSNO] [varchar](20) NULL,
	[DOCNO] [varchar](30) NULL,
	[USERID] [varchar](20) NOT NULL,
	[USERDATE] [smalldatetime] NULL,
	[CFMID] [varchar](15) NULL,
	[CFMDATE] [smalldatetime] NULL,
	[YN] [varchar](1) NOT NULL,
	[SB] [varchar](1) NULL,
	[SampleExPrint] [smalldatetime] NULL,
	[EX_ACC_CFMID] [varchar](15) NULL,
	[EX_ACC_CFMDATE] [smalldatetime] NULL,
	[QCID] [varchar](15) NULL,
	[QCDATE] [smalldatetime] NULL,
	[MEMO] [varchar](255) NULL,
	[PurConfirm] [varchar](1) NULL,
	[Payment] [varchar](20) NULL,
	[Charge] [float] NULL,
	[Charge_VN] [float] NULL,
	[Charge_Reason] [varchar](200) NULL,
	[HGLB] [varchar](5) NULL,
	[Declaration] [varchar](50) NULL,
	[VATNO] [varchar](20) NULL,
	[YN_Date] [smalldatetime] NULL,
	[VATRate] [int] NULL,
	[VATAmount] [bigint] NULL,
	[LotID] [varchar](50) NULL,
	[SupplierInvoice] [varchar](150) NULL,
	[VATDate] [smalldatetime] NULL,
	[DeclarationDate] [smalldatetime] NULL,
	[CFMID2] [varchar](15) NULL,
	[CFMDATE2] [smalldatetime] NULL,
	[PurInv] [varchar](50) NULL,
	[InputMethod] [bit] NULL,
	[ModifyDate] [smalldatetime] NULL,
	[WH_ManagerID] [varchar](10) NULL,
	[WH_ManagerDate] [smalldatetime] NULL,
	[WF_GhiChuThanDon] [varchar](255) NULL,
	[WF_UserID] [varchar](10) NULL,
	[WF_UserDate] [smalldatetime] NULL,
 CONSTRAINT [PK_KCRK] PRIMARY KEY CLUSTERED 
(
	[RKNO] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[KCRKS]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KCRKS](
	[RKNO] [varchar](12) NOT NULL,
	[CLBH] [varchar](15) NOT NULL,
	[CGBH] [varchar](15) NOT NULL,
	[RKSB] [varchar](2) NOT NULL,
	[Qty] [money] NOT NULL,
	[PaQty] [numeric](19, 2) NULL,
	[USPrice] [money] NULL,
	[USACC] [money] NULL,
	[VNPrice] [money] NULL,
	[VNACC] [bigint] NULL,
	[CWHL] [int] NULL,
	[CostID] [varchar](10) NULL,
	[USERID] [varchar](20) NOT NULL,
	[USERDATE] [smalldatetime] NOT NULL,
	[YN] [varchar](1) NOT NULL,
	[FKZT] [varchar](1) NULL,
	[DOCNO] [varchar](30) NULL,
	[VNPriceCT] [bigint] NULL,
	[RKMEMO] [varchar](200) NULL,
	[CNO] [varchar](40) NULL,
	[MEMO] [varchar](200) NULL,
	[HandCarry_USPrice] [money] NULL,
	[HandCarry_USACC] [money] NULL,
	[Charge] [money] NULL,
	[Charge_VN] [money] NULL,
	[Charge_Reason] [varchar](200) NULL,
	[SurCharge] [money] NULL,
	[SurCharge_VN] [money] NULL,
	[SurCharge_Reason] [varchar](200) NULL,
	[exchacc] [bigint] NULL,
	[MRNO] [varchar](15) NULL,
	[Price_ID] [varchar](20) NULL,
	[Price_Date] [smalldatetime] NULL,
	[MemoPrice] [varchar](255) NULL,
	[RemarkQty] [varchar](150) NULL,
	[AcCWHL] [int] NULL,
	[AcVNPrice] [int] NULL,
	[AcVNACC] [bigint] NULL,
	[HGPM] [varchar](255) NULL,
	[ExpirationDate] [smalldatetime] NULL,
	[InvTrf] [varchar](20) NULL,
	[MA_SO_PDN] [varchar](max) NULL,
	[CNO1] [varchar](40) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[KCRKS_HG]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KCRKS_HG](
	[RKNO] [varchar](12) NOT NULL,
	[CLBH] [varchar](15) NOT NULL,
	[CGBH] [varchar](15) NOT NULL,
	[RKSB] [varchar](2) NOT NULL,
	[HGLB] [varchar](6) NOT NULL,
	[Qty] [money] NULL,
	[UserID] [varchar](10) NULL,
	[UserDate] [smalldatetime] NULL,
	[YN] [char](1) NULL,
	[XXCC] [varchar](6) NOT NULL,
	[SCBH] [varchar](15) NOT NULL,
	[AcCWHL] [int] NULL,
	[AcVNPrice] [int] NULL,
	[AcVNACC] [bigint] NULL,
	[CNO] [varchar](40) NULL,
	[HGPM] [varchar](255) NULL,
 CONSTRAINT [PK_KCRKS_HG] PRIMARY KEY CLUSTERED 
(
	[RKNO] ASC,
	[CLBH] ASC,
	[CGBH] ASC,
	[RKSB] ASC,
	[HGLB] ASC,
	[XXCC] ASC,
	[SCBH] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[KCRKSS]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KCRKSS](
	[RKNo] [varchar](12) NOT NULL,
	[XXCC] [varchar](12) NOT NULL,
	[CLBH] [varchar](15) NOT NULL,
	[SCBH] [varchar](15) NOT NULL,
	[Qty] [numeric](18, 1) NOT NULL,
	[USERID] [varchar](20) NULL,
	[USERDATE] [smalldatetime] NULL,
	[YN] [varchar](1) NULL,
 CONSTRAINT [PK_KCRKSS] PRIMARY KEY CLUSTERED 
(
	[RKNo] ASC,
	[CLBH] ASC,
	[XXCC] ASC,
	[SCBH] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[KCRKSSS]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KCRKSSS](
	[RKNO] [varchar](15) NOT NULL,
	[CLBH] [varchar](15) NOT NULL,
	[QC_Registry] [bit] NULL,
	[Previously] [bit] NULL,
	[Package] [int] NULL,
	[Databases] [varchar](50) NULL,
	[Remark] [varchar](200) NULL,
	[CFID] [varchar](15) NULL,
	[CFDate] [smalldatetime] NULL,
	[UnCFID] [varchar](15) NULL,
	[UnCFDate] [smalldatetime] NULL,
	[UserID] [varchar](20) NULL,
	[UserDate] [smalldatetime] NULL,
	[YN] [char](1) NULL,
	[GSBH] [varchar](6) NULL,
	[RPNO] [varchar](15) NOT NULL,
	[Qty] [money] NULL,
	[ZSBH] [varchar](6) NULL,
	[Typess] [varchar](15) NULL,
	[JGNOS] [varchar](11) NOT NULL,
	[CGNO] [varchar](11) NULL,
	[IDRemark] [varchar](10) NULL,
	[DateRemark] [smalldatetime] NULL,
 CONSTRAINT [PK_KCRKSSS] PRIMARY KEY CLUSTERED 
(
	[RKNO] ASC,
	[CLBH] ASC,
	[RPNO] ASC,
	[JGNOS] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Log_Confirm_QC_ERP]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Log_Confirm_QC_ERP](
	[Log_Confirm_QC_ERP_Serial] [varchar](15) NOT NULL,
	[Confirm_QC_ERP_Serial] [varchar](15) NOT NULL,
	[Date_Confirm] [datetime] NOT NULL,
	[Area_WH] [nvarchar](20) NULL,
	[Order_No] [varchar](50) NOT NULL,
	[Material_No] [varchar](50) NOT NULL,
	[Print_Date] [datetime] NOT NULL,
	[Material_Name] [nvarchar](500) NULL,
	[Arrival_QTY] [decimal](25, 7) NOT NULL,
	[Qty_Total] [decimal](25, 7) NOT NULL,
	[Confirm_Status] [varchar](50) NULL,
	[Confirm_Content] [nvarchar](500) NULL,
	[Delivery_Date] [datetime] NULL,
	[RY_Content] [nvarchar](4000) NULL,
	[Lean] [nvarchar](500) NULL,
	[Action_Taken] [nvarchar](max) NULL,
	[Final_Decision] [nvarchar](100) NULL,
	[CBQC] [varchar](10) NOT NULL,
	[CBWH] [varchar](10) NOT NULL,
	[Priority_Vote] [varchar](1) NOT NULL,
	[Priority_No] [nvarchar](50) NULL,
	[Path_Image] [nvarchar](500) NULL,
	[Modify_Date] [datetime] NOT NULL,
	[User_Serial_Key] [varchar](10) NOT NULL,
	[HostName] [nvarchar](50) NOT NULL,
	[IP4_Address] [varchar](15) NOT NULL,
	[Mac_address] [varchar](20) NOT NULL,
	[Program_Log] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Log_Confirm_QC_ERP_Serial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Log_Create_Export_Sample]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Log_Create_Export_Sample](
	[Key_Log] [varchar](15) NOT NULL,
	[LLNO] [varchar](20) NULL,
	[YPZLBH] [varchar](20) NULL,
	[User_ID] [varchar](15) NULL,
	[Status] [varchar](10) NULL,
	[Note] [nvarchar](max) NULL,
	[Modify_Date] [datetime] NULL,
 CONSTRAINT [PK_Log_Create_Export_Sample] PRIMARY KEY CLUSTERED 
(
	[Key_Log] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Log_Create_Merge_BOM]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Log_Create_Merge_BOM](
	[Key_Log] [nvarchar](20) NOT NULL,
	[YPZLBH] [nvarchar](15) NULL,
	[List_Test_No] [nvarchar](max) NULL,
	[User_ID] [nvarchar](10) NULL,
	[Status] [nvarchar](15) NULL,
	[Note] [nvarchar](max) NULL,
	[Modify_Date] [datetime] NULL,
 CONSTRAINT [PK_Log_Create_Merge_BOM] PRIMARY KEY CLUSTERED 
(
	[Key_Log] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Log_Group]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Log_Group](
	[Log_Group_Serial] [varchar](15) NOT NULL,
	[Group_Serial_Key] [varchar](10) NOT NULL,
	[Group_ID] [varchar](10) NOT NULL,
	[Group_Name] [nvarchar](100) NOT NULL,
	[Start_Date] [datetime] NOT NULL,
	[NoUse_Date] [datetime] NOT NULL,
	[Modify_Date] [datetime] NOT NULL,
	[User_Serial_Key] [varchar](10) NOT NULL,
	[HostName] [nvarchar](50) NOT NULL,
	[IP4_Address] [varchar](15) NOT NULL,
	[Mac_address] [varchar](20) NOT NULL,
	[Program_Log] [varchar](100) NOT NULL,
 CONSTRAINT [PK_Log_Group] PRIMARY KEY CLUSTERED 
(
	[Log_Group_Serial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Log_Group_Priority]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Log_Group_Priority](
	[Log_Group_Priority_Serial] [varchar](15) NOT NULL,
	[Group_Serial_Key] [varchar](10) NOT NULL,
	[Program_Serial_Key] [varchar](10) NOT NULL,
	[Start_Date] [datetime] NOT NULL,
	[NoUse_Date] [datetime] NOT NULL,
	[Modify_Date] [datetime] NOT NULL,
	[User_Serial_Key] [varchar](10) NOT NULL,
	[HostName] [nvarchar](50) NOT NULL,
	[IP4_Address] [varchar](15) NOT NULL,
	[Mac_address] [varchar](20) NOT NULL,
	[Program_Log] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Log_Group_Priority_Serial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Log_KCLL]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Log_KCLL](
	[Log_KCLL_Key] [varchar](20) NOT NULL,
	[LLNO] [varchar](11) NULL,
	[GSBH] [varchar](4) NULL,
	[CKBH] [varchar](4) NULL,
	[SCBH] [varchar](15) NULL,
	[DepID] [varchar](10) NULL,
	[USERDATE] [smalldatetime] NULL,
	[USERID] [varchar](20) NULL,
	[CFMID] [varchar](15) NULL,
	[YN] [varchar](1) NULL,
	[USER_ID] [varchar](15) NULL,
	[HostName] [varchar](50) NULL,
	[IP4_Address] [varchar](50) NULL,
	[Mac_address] [varchar](50) NULL,
	[Status] [varchar](15) NULL,
	[Modify_Date] [datetime] NULL,
 CONSTRAINT [PK_Log_KCLL] PRIMARY KEY CLUSTERED 
(
	[Log_KCLL_Key] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Log_KCLLS]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Log_KCLLS](
	[Key_KCLLS_Log] [varchar](20) NOT NULL,
	[LLNO] [varchar](15) NULL,
	[CLBH] [varchar](15) NULL,
	[DFL] [varchar](15) NULL,
	[SCBH] [varchar](15) NULL,
	[TempQty] [money] NULL,
	[Qty] [money] NULL,
	[CostID] [varchar](10) NULL,
	[USERDATE] [datetime] NULL,
	[USERID] [varchar](20) NULL,
	[YN] [varchar](1) NULL,
	[CLSL] [money] NULL,
	[USER_ID] [varchar](15) NULL,
	[HostName] [varchar](50) NULL,
	[IP4_Address] [varchar](15) NULL,
	[Mac_address] [varchar](20) NULL,
	[Status] [varchar](15) NULL,
	[Modify_Date] [datetime] NULL,
 CONSTRAINT [PK_Log_KCLLS] PRIMARY KEY CLUSTERED 
(
	[Key_KCLLS_Log] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Log_KCLLSS]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Log_KCLLSS](
	[Key_KCLLSS_Log] [varchar](20) NOT NULL,
	[LLNO] [char](11) NULL,
	[CLBH] [char](15) NULL,
	[ARTICLE] [char](15) NULL,
	[QTY] [money] NULL,
	[USERDATE] [datetime] NULL,
	[USERID] [varchar](20) NULL,
	[YN] [char](1) NULL,
	[CLSL] [money] NULL,
	[Stage] [varchar](15) NULL,
	[XXCC] [varchar](6) NULL,
	[TempQty] [money] NULL,
	[USER_ID] [varchar](15) NULL,
	[HostName] [varchar](50) NULL,
	[IP4_Address] [varchar](15) NULL,
	[Mac_address] [varchar](20) NULL,
	[Status] [varchar](15) NULL,
	[Modify_Date] [datetime] NULL,
 CONSTRAINT [PK_Log_KCLLSS] PRIMARY KEY CLUSTERED 
(
	[Key_KCLLSS_Log] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Log_List_Input_In_ERP]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Log_List_Input_In_ERP](
	[Log_Input_In_ERP_Serial] [varchar](15) NOT NULL,
	[Input_In_ERP_Serial] [varchar](15) NOT NULL,
	[RKNO_Stock_In_No] [varchar](20) NULL,
	[F_Factory] [varchar](10) NULL,
	[WH] [varchar](10) NULL,
	[Supplier_No] [nvarchar](50) NULL,
	[Print_Date] [datetime] NULL,
	[Order_No] [varchar](50) NOT NULL,
	[DOCNO] [nvarchar](50) NULL,
	[Type_Order] [nvarchar](10) NULL,
	[User_Confirm] [nvarchar](10) NULL,
	[Date_Confirm] [datetime] NULL,
	[CFMID] [varchar](10) NULL,
	[YN] [varchar](10) NULL,
	[HGLB] [varchar](10) NULL,
	[Material_No] [varchar](50) NOT NULL,
	[QC] [varchar](5) NULL,
	[RKSB] [varchar](10) NULL,
	[Qty] [decimal](25, 7) NOT NULL,
	[RKQty] [decimal](25, 7) NULL,
	[Pa_QTY] [decimal](25, 7) NULL,
	[Qty_Total] [decimal](25, 7) NULL,
	[CostID] [varchar](10) NULL,
	[Label_Status] [varchar](20) NULL,
	[Confirm_Status] [varchar](50) NULL,
	[IsClock] [varchar](1) NULL,
	[Remark] [nvarchar](500) NULL,
	[Modify_Date] [datetime] NULL,
	[User_Serial_Key] [varchar](10) NULL,
	[HostName] [nvarchar](50) NOT NULL,
	[IP4_Address] [varchar](15) NOT NULL,
	[Mac_address] [varchar](20) NOT NULL,
	[Program_Log] [varchar](100) NOT NULL,
	[ExpirationDate] [datetime] NULL,
	[RY] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[Log_Input_In_ERP_Serial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Log_Material_Delivery]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Log_Material_Delivery](
	[Log_Material_Delivery_Serial] [varchar](15) NOT NULL,
	[Data_Material_Delivery_Serial] [varchar](15) NOT NULL,
	[Num_No] [varchar](50) NOT NULL,
	[Material_No] [varchar](50) NOT NULL,
	[Material_Name] [nvarchar](500) NULL,
	[Color] [nvarchar](200) NULL,
	[Qty] [decimal](20, 7) NULL,
	[RY] [varchar](25) NULL,
	[Location] [nvarchar](100) NULL,
	[Remark] [nvarchar](500) NULL,
	[Date_Start] [datetime] NULL,
	[Date_End] [datetime] NULL,
	[RY_Status] [varchar](10) NULL,
	[Modify_Date] [datetime] NULL,
	[User_Serial_Key] [varchar](10) NOT NULL,
	[HostName] [nvarchar](50) NOT NULL,
	[IP4_Address] [varchar](15) NOT NULL,
	[Mac_address] [varchar](20) NOT NULL,
	[Program_Log] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Log_Material_Delivery_Serial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Log_Material_Label]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Log_Material_Label](
	[Log_Material_Label_Serial] [varchar](15) NOT NULL,
	[Material_Label_Serial] [varchar](15) NOT NULL,
	[Supplier] [varchar](100) NULL,
	[Material_Name] [nvarchar](500) NULL,
	[Color] [varchar](50) NULL,
	[Size] [varchar](50) NULL,
	[QTY] [decimal](20, 7) NULL,
	[Total_QTY] [decimal](15, 7) NOT NULL,
	[Print_QTY] [varchar](50) NULL,
	[Print_Times] [int] NOT NULL,
	[Label_Status] [varchar](10) NOT NULL,
	[Order_No] [varchar](50) NULL,
	[Roll] [varchar](15) NULL,
	[Production] [varchar](500) NULL,
	[Supplier_No] [varchar](50) NULL,
	[Material_No] [varchar](50) NULL,
	[Work_Order] [varchar](200) NULL,
	[Material_Type] [varchar](4) NULL,
	[BarCode] [varchar](100) NULL,
	[Modify_Date] [datetime] NOT NULL,
	[Print_Date] [datetime] NULL,
	[User_Serial_Key] [varchar](10) NOT NULL,
	[HostName] [nvarchar](50) NOT NULL,
	[IP4_Address] [varchar](15) NOT NULL,
	[Mac_address] [varchar](20) NOT NULL,
	[Program_Log] [varchar](100) NOT NULL,
	[Arrival_QTY] [decimal](20, 7) NULL,
	[Type_Order] [nvarchar](10) NULL,
PRIMARY KEY CLUSTERED 
(
	[Log_Material_Label_Serial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Log_Material_Stock_Out_Sample]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Log_Material_Stock_Out_Sample](
	[Key_Log_Material_Stock_Out_Sample] [varchar](15) NOT NULL,
	[Key_Material_Stock_Out_Sample] [varchar](15) NULL,
	[TestNo] [varchar](15) NULL,
	[YPZLBH] [varchar](20) NULL,
	[PONO] [varchar](20) NULL,
	[LLNO] [varchar](20) NULL,
	[Article] [varchar](15) NULL,
	[KFJD] [varchar](15) NULL,
	[Size] [varchar](15) NULL,
	[Material_No] [varchar](15) NULL,
	[Barcode] [varchar](20) NULL,
	[QTY_Bom] [numeric](18, 4) NULL,
	[QTY_Sample] [numeric](18, 4) NULL,
	[User_ID] [varchar](15) NULL,
	[Status] [varchar](20) NULL,
	[Modify_Date] [datetime] NULL,
	[HostName] [nvarchar](50) NULL,
	[IP4_Address] [varchar](15) NULL,
	[Mac_address] [varchar](20) NULL,
	[Program_Log] [varchar](100) NULL,
 CONSTRAINT [PK_Log_Material_Stock_Out_Sample] PRIMARY KEY CLUSTERED 
(
	[Key_Log_Material_Stock_Out_Sample] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Log_Material_Stock_Out_Sample_OutSource]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Log_Material_Stock_Out_Sample_OutSource](
	[Key_Material_Stock_Out_Sample] [varchar](15) NOT NULL,
	[YPZLBH] [varchar](20) NULL,
	[Article] [varchar](20) NULL,
	[Material_No] [varchar](15) NULL,
	[JGNO] [varchar](20) NULL,
	[QTY] [numeric](18, 4) NULL,
	[User_ID] [varchar](15) NULL,
	[Status] [varchar](20) NULL,
	[Modify_Date] [datetime] NULL,
	[LLNO] [varchar](15) NULL,
 CONSTRAINT [PK_Material_Stock_Out_Sample_OutSource] PRIMARY KEY CLUSTERED 
(
	[Key_Material_Stock_Out_Sample] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Log_Material_Storage]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Log_Material_Storage](
	[Log_Material_Storage_Serial] [varchar](15) NOT NULL,
	[Material_Storage_Serial] [varchar](15) NOT NULL,
	[Material_No] [varchar](50) NULL,
	[Material_Name] [nvarchar](500) NULL,
	[Unit_Storage] [varchar](10) NULL,
	[Date_Storage] [datetime] NOT NULL,
	[Number_In] [varchar](50) NULL,
	[Number_Out] [varchar](50) NULL,
	[Remark] [varchar](max) NULL,
	[Qty_In] [decimal](15, 7) NULL,
	[Qty_Out] [decimal](15, 7) NULL,
	[Qty_Remaining] [decimal](15, 7) NULL,
	[Confirm] [varchar](15) NULL,
	[Modify_Date] [datetime] NULL,
	[User_Serial_Key] [varchar](10) NULL,
	[HostName] [nvarchar](50) NOT NULL,
	[IP4_Address] [varchar](15) NOT NULL,
	[Mac_address] [varchar](20) NOT NULL,
	[Program_Log] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Log_Material_Storage_Serial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Log_MES_Material_Storage]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Log_MES_Material_Storage](
	[Log_Material_Storage_Serial] [varchar](15) NOT NULL,
	[CLBH_Material_No] [varchar](15) NOT NULL,
	[CKBH_Warehouse_No] [varchar](4) NOT NULL,
	[KCBH_Storage_No] [varchar](10) NOT NULL,
	[USERID_User_ID] [varchar](20) NOT NULL,
	[USERDATE_User_Date] [datetime] NOT NULL,
	[YN_Yes_No] [varchar](1) NOT NULL,
	[KCQty_Qty] [money] NULL,
	[Modify_Date] [datetime] NOT NULL,
	[User_Serial_Key] [varchar](10) NOT NULL,
	[HostName] [varchar](50) NULL,
	[IP4_Address] [varchar](15) NULL,
	[Mac_address] [varchar](20) NULL,
	[Program_Log] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[Log_Material_Storage_Serial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Log_MES_Material_Storage_Detail]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Log_MES_Material_Storage_Detail](
	[Log_Material_Storage_Detail_Serial] [varchar](15) NOT NULL,
	[CLBH_Material_No] [varchar](15) NOT NULL,
	[CKBH_Warehouse_No] [varchar](4) NOT NULL,
	[KCBH_Storage_No] [varchar](10) NOT NULL,
	[Location_Rack_Location] [varchar](10) NOT NULL,
	[USERID_User_ID] [varchar](20) NOT NULL,
	[USERDATE_User_Date] [datetime] NOT NULL,
	[YN_Yes_No] [varchar](1) NOT NULL,
	[Remark_Remark_Qty] [varchar](20) NULL,
	[Modify_Date] [datetime] NULL,
	[User_Serial_Key] [varchar](10) NULL,
	[HostName] [varchar](50) NULL,
	[IP4_Address] [varchar](15) NULL,
	[Mac_address] [varchar](20) NULL,
	[Program_Log] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[Log_Material_Storage_Detail_Serial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Log_Program]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Log_Program](
	[Log_Program_Serial] [varchar](15) NOT NULL,
	[Program_Serial_Key] [varchar](10) NOT NULL,
	[Program_ID] [varchar](10) NOT NULL,
	[Program_Name] [nvarchar](100) NOT NULL,
	[Start_Date] [datetime] NOT NULL,
	[NoUse_Date] [datetime] NOT NULL,
	[Modify_Date] [datetime] NOT NULL,
	[User_Serial_Key] [varchar](10) NOT NULL,
	[HostName] [nvarchar](50) NOT NULL,
	[IP4_Address] [varchar](15) NOT NULL,
	[Mac_address] [varchar](20) NOT NULL,
	[Program_Log] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Log_Program_Serial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Log_Register_In_ERP]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Log_Register_In_ERP](
	[Log_Register_In_ERP_Serial] [varchar](15) NOT NULL,
	[Register_In_ERP_Serial] [varchar](15) NOT NULL,
	[WH] [varchar](10) NULL,
	[Date_Confirm] [datetime] NOT NULL,
	[Order_No] [varchar](50) NULL,
	[Material_No] [varchar](50) NOT NULL,
	[Qty] [decimal](25, 7) NOT NULL,
	[Qty_Total] [decimal](25, 7) NOT NULL,
	[Stock_In_No] [varchar](20) NULL,
	[Confirm_Status] [varchar](50) NULL,
	[IsClock] [varchar](1) NULL,
	[Remark] [nvarchar](500) NULL,
	[Modify_Date] [datetime] NULL,
	[User_Serial_Key] [varchar](10) NOT NULL,
	[HostName] [nvarchar](50) NOT NULL,
	[IP4_Address] [varchar](15) NOT NULL,
	[Mac_address] [varchar](20) NOT NULL,
	[Program_Log] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Log_Register_In_ERP_Serial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Log_Stock_In]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Log_Stock_In](
	[Log_Stock_In_ERP_Serial] [varchar](15) NOT NULL,
	[RKNO_Stock_In_No] [varchar](12) NOT NULL,
	[GSBH_Company_No] [varchar](4) NOT NULL,
	[CKBH_Warehouse_No] [varchar](4) NOT NULL,
	[ZSBH_Supplier_No] [varchar](6) NOT NULL,
	[ZSNO_Order_No] [varchar](20) NULL,
	[DOCNO_Invoice_No] [varchar](30) NULL,
	[USERID_User_ID] [varchar](20) NOT NULL,
	[USERDATE_User_Date] [smalldatetime] NOT NULL,
	[CFMID_Confirm_ID] [varchar](15) NULL,
	[CFMDATE_Confirm_Date] [smalldatetime] NULL,
	[YN_Yes_No] [varchar](1) NOT NULL,
	[SB_Type] [varchar](1) NULL,
	[SampleExPrint_Sample_Export_Print] [smalldatetime] NULL,
	[EX_ACC_CFMID_Export_Accounting_Confirm_ID] [varchar](15) NULL,
	[EX_ACC_CFMDATE_Export_Accounting_Confirm_Date] [smalldatetime] NULL,
	[QCID_Quality_ID] [varchar](15) NULL,
	[QCDATE_Quality_Date] [smalldatetime] NULL,
	[MEMO_Remark] [varchar](50) NULL,
	[PurConfirm] [varchar](1) NULL,
	[Payment] [varchar](20) NULL,
	[Charge] [float] NULL,
	[Charge_VN] [float] NULL,
	[Charge_Reason] [varchar](200) NULL,
	[HGLB] [varchar](5) NULL,
	[Declaration] [varchar](50) NULL,
	[CFMID2_Confirm_ID2] [varchar](15) NULL,
	[CFMDATE2_Confirm_Date2] [smalldatetime] NULL,
	[VATNO_Tax_No] [varchar](20) NULL,
	[Status] [varchar](1) NULL,
	[ModifyDate] [smalldatetime] NULL,
	[User_Serial_Key] [varchar](15) NULL,
	[HostName] [varchar](50) NULL,
	[IP4_Address] [varchar](15) NULL,
	[Mac_address] [varchar](20) NULL,
	[Program_Log] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[Log_Stock_In_ERP_Serial] ASC,
	[RKNO_Stock_In_No] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Log_Stock_In_Detail]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Log_Stock_In_Detail](
	[Log_Stock_In_Detail_ERP_Serial] [varchar](15) NOT NULL,
	[RKNO_Stock_In_No] [varchar](12) NOT NULL,
	[CLBH_Material_No] [varchar](15) NOT NULL,
	[CGBH_RY] [varchar](15) NOT NULL,
	[RKSB_Stock_In_Type] [varchar](2) NOT NULL,
	[Qty] [money] NOT NULL,
	[PaQty_Check_Qty] [numeric](19, 2) NULL,
	[US_Price] [money] NULL,
	[USACC_US_Accounting] [money] NULL,
	[VN_Price] [money] NULL,
	[VNACC] [bigint] NULL,
	[CWHL_Exchange_Rate] [int] NULL,
	[CostID_Cost_ID] [varchar](10) NULL,
	[USERID_User_ID] [varchar](20) NOT NULL,
	[USERDATE_User_Date] [smalldatetime] NOT NULL,
	[YN_Yes_No] [varchar](1) NOT NULL,
	[FKZT_Pay_Status] [varchar](1) NULL,
	[DOCNO_Invoice_No] [varchar](30) NULL,
	[VNPriceCT_Carton_Price] [bigint] NULL,
	[RKMEMO_Stock_Remark] [varchar](200) NULL,
	[CNO_Detail_No] [varchar](40) NULL,
	[HGPM_TENHQ] [varchar](200) NULL,
	[HandCarry_USPrice_US_Air_Delivery_Fee] [money] NULL,
	[HandCarry_USACC_US_Air_Delivery_Fee_Accounting] [money] NULL,
	[Charge] [money] NULL,
	[Charge_VN] [money] NULL,
	[Charge_Reason] [varchar](200) NULL,
	[SurCharge] [money] NULL,
	[SurCharge_VN] [money] NULL,
	[SurCharge_Reason] [varchar](200) NULL,
	[exchacc] [bigint] NULL,
	[MRNO] [varchar](15) NULL,
	[Price_ID] [varchar](20) NULL,
	[Price_Date] [smalldatetime] NULL,
	[Modify_Date] [smalldatetime] NULL,
	[User_Serial_Key] [varchar](15) NULL,
	[HostName] [varchar](50) NULL,
	[IP4_Address] [varchar](15) NULL,
	[Mac_address] [varchar](20) NULL,
	[Program_Log] [varchar](100) NULL,
	[ExpirationDate] [smalldatetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Log_Stock_In_Detail_ERP_Serial] ASC,
	[RKNO_Stock_In_No] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Log_Stock_In_Detail_Size]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Log_Stock_In_Detail_Size](
	[Log_Stock_In_Size_ERP_Serial] [varchar](15) NOT NULL,
	[RKNO_Stock_In_No] [varchar](12) NOT NULL,
	[XXCC_Size] [varchar](12) NOT NULL,
	[CLBH_Material_No] [varchar](15) NOT NULL,
	[SCBH_RY] [varchar](15) NOT NULL,
	[Qty] [money] NOT NULL,
	[USERID_User_ID] [varchar](20) NULL,
	[USERDATE_User_Date] [smalldatetime] NULL,
	[YN_Yes_No] [varchar](1) NULL,
	[Modify_Date] [smalldatetime] NULL,
	[User_Serial_Key] [varchar](15) NULL,
	[HostName] [varchar](50) NULL,
	[IP4_Address] [varchar](15) NULL,
	[Mac_address] [varchar](20) NULL,
	[Program_Log] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[Log_Stock_In_Size_ERP_Serial] ASC,
	[RKNO_Stock_In_No] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Log_Stock_In_Out]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Log_Stock_In_Out](
	[Log_Stock_In_Out_Serial] [varchar](15) NOT NULL,
	[Stock_In_Out_Serial] [varchar](15) NOT NULL,
	[Material_Label_Serial] [varchar](15) NOT NULL,
	[Barcode] [varchar](100) NOT NULL,
	[Stock_In_Out_Status] [varchar](10) NOT NULL,
	[Stock_In_No] [varchar](20) NULL,
	[Stock_Out_No] [varchar](20) NULL,
	[QTY] [decimal](20, 4) NULL,
	[Print_Qty] [varchar](50) NULL,
	[Storage_Serial] [varchar](10) NULL,
	[Modify_Date] [datetime] NOT NULL,
	[User_Serial_Key] [varchar](10) NOT NULL,
	[HostName] [nvarchar](50) NOT NULL,
	[IP4_Address] [varchar](15) NOT NULL,
	[Mac_address] [varchar](20) NOT NULL,
	[Program_Log] [varchar](100) NOT NULL,
 CONSTRAINT [PK_Log_Stock_In_Out] PRIMARY KEY CLUSTERED 
(
	[Log_Stock_In_Out_Serial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Log_Stock_out]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Log_Stock_out](
	[Log_MES_Stock_out_Serial] [varchar](15) NOT NULL,
	[LLNO_Stock_Out_No] [varchar](12) NOT NULL,
	[GSBH_Company_No] [varchar](4) NOT NULL,
	[CKBH_Warehouse_No] [varchar](4) NOT NULL,
	[SCBH_Production_No] [varchar](15) NOT NULL,
	[DepID_Department_ID] [varchar](10) NOT NULL,
	[USERDATE_User_Date] [smalldatetime] NOT NULL,
	[USERID_User_ID] [varchar](20) NOT NULL,
	[CFMDate_Comfirm_Date] [smalldatetime] NULL,
	[CFMID_Comfirm_ID] [varchar](15) NULL,
	[YN_Yes_No] [varchar](1) NOT NULL,
	[PMARK_Print_Times] [int] NULL,
	[Modify_Date] [smalldatetime] NULL,
	[User_Serial_Key] [varchar](15) NULL,
	[HostName] [varchar](50) NULL,
	[IP4_Address] [varchar](15) NULL,
	[Mac_address] [varchar](20) NULL,
	[Program_Log] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[Log_MES_Stock_out_Serial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Log_Stock_out_Detail]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Log_Stock_out_Detail](
	[Log_MES_Stock_out_detail_Serial] [varchar](15) NOT NULL,
	[LLNO_Stock_Out_No] [varchar](12) NOT NULL,
	[CLBH_Material_No] [varchar](15) NOT NULL,
	[DFL_Work_Type] [varchar](1) NOT NULL,
	[SCBH_Production_No] [varchar](15) NOT NULL,
	[TempQty_Order_Qty] [money] NOT NULL,
	[Qty_Actual_Qty] [money] NOT NULL,
	[USPrice_US_Price] [money] NULL,
	[VNPrice_VN_Price] [bigint] NULL,
	[CWHL_Exchange_Ratio] [int] NULL,
	[CostID_Cost_ID] [varchar](10) NULL,
	[USERDATE_User_Date] [smalldatetime] NOT NULL,
	[USERID_User_ID] [varchar](20) NOT NULL,
	[YN_Yes_No] [varchar](1) NOT NULL,
	[CLSL_Work_Usage] [money] NULL,
	[YYBH_Reason_No] [varchar](4) NULL,
	[TTYPE_Type_Class] [varchar](10) NULL,
	[Modify_Date] [smalldatetime] NULL,
	[User_Serial_Key] [varchar](15) NULL,
	[HostName] [varchar](50) NULL,
	[IP4_Address] [varchar](15) NULL,
	[Mac_address] [varchar](20) NULL,
	[Program_Log] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[Log_MES_Stock_out_detail_Serial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Log_Storage]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Log_Storage](
	[Log_Storage_Serial] [varchar](15) NOT NULL,
	[Storage_Serial] [varchar](10) NOT NULL,
	[Rack] [varchar](12) NOT NULL,
	[Max_Qty] [decimal](8, 2) NOT NULL,
	[Min_Qty] [decimal](8, 2) NOT NULL,
	[StartDate] [datetime] NOT NULL,
	[EndDate] [datetime] NOT NULL,
	[ModifyDate] [datetime] NULL,
	[Material_Type] [varchar](10) NULL,
	[Host_Name] [varchar](50) NOT NULL,
	[IP4_Address] [varchar](15) NOT NULL,
	[Mac_address] [varchar](20) NOT NULL,
	[Program_Log] [varchar](100) NOT NULL,
 CONSTRAINT [PK_Log_Storage] PRIMARY KEY CLUSTERED 
(
	[Log_Storage_Serial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Log_User]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Log_User](
	[Log_User_Serial] [varchar](15) NOT NULL,
	[User_Serial_Key] [varchar](10) NOT NULL,
	[User_ID] [varchar](10) NOT NULL,
	[User_Password] [varchar](50) NOT NULL,
	[User_Name] [nvarchar](100) NOT NULL,
	[Group_Serial_Key] [varchar](10) NOT NULL,
	[Start_Date] [datetime] NOT NULL,
	[Leave_Date] [datetime] NOT NULL,
	[Login_Date] [datetime] NOT NULL,
	[UUser_Serial_Key] [varchar](10) NOT NULL,
	[HostName] [nvarchar](50) NOT NULL,
	[IP4_Address] [varchar](15) NOT NULL,
	[Mac_address] [varchar](20) NOT NULL,
	[Program_Log] [varchar](100) NOT NULL,
	[TLLanguage] [varchar](2) NULL,
 CONSTRAINT [PK_Log_User] PRIMARY KEY CLUSTERED 
(
	[Log_User_Serial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Log_YPZLZL]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Log_YPZLZL](
	[Log_YPZLZL_Key] [varchar](15) NOT NULL,
	[YPZLBH] [varchar](15) NOT NULL,
	[INSDATE] [datetime] NOT NULL,
	[KFJD] [varchar](10) NOT NULL,
	[JiJie] [varchar](10) NOT NULL,
	[USERID] [varchar](20) NOT NULL,
	[USERDATE] [smalldatetime] NOT NULL,
	[YN] [varchar](1) NOT NULL,
	[CALDATE] [datetime] NULL,
	[PD] [varchar](1) NULL,
	[memo] [varchar](50) NULL,
	[Remark] [varchar](200) NULL,
	[USER_ID] [varchar](15) NOT NULL,
	[HostName] [varchar](50) NULL,
	[IP4_Address] [varchar](50) NULL,
	[Mac_address] [varchar](20) NULL,
	[Status] [varchar](15) NOT NULL,
	[Modify_Date] [datetime] NOT NULL,
 CONSTRAINT [PK_Log_YPZLZL] PRIMARY KEY CLUSTERED 
(
	[Log_YPZLZL_Key] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Log_YPZLZLS]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Log_YPZLZLS](
	[Log_YPZLZLS_Key] [varchar](15) NOT NULL,
	[YPZLBH] [varchar](15) NULL,
	[YPDH] [varchar](15) NULL,
	[PAIRS] [numeric](18, 2) NULL,
	[USERID] [varchar](20) NULL,
	[USERDATE] [datetime] NULL,
	[YN] [varchar](1) NULL,
	[TestNo] [varchar](20) NULL,
	[Remark] [varchar](30) NULL,
	[ShipmentDate] [smalldatetime] NULL,
	[USER_ID] [varchar](15) NULL,
	[HostName] [varchar](50) NULL,
	[IP4_Address] [varchar](15) NULL,
	[Mac_address] [varchar](20) NULL,
	[Status] [varchar](15) NULL,
	[Modify_Date] [datetime] NULL,
 CONSTRAINT [PK_Log_YPZLZLS] PRIMARY KEY CLUSTERED 
(
	[Log_YPZLZLS_Key] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Log_YPZLZLS_Siz]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Log_YPZLZLS_Siz](
	[Log_YPZLZLS_Siz_Key] [varchar](15) NOT NULL,
	[YPZLBH] [varchar](15) NOT NULL,
	[YPDH] [varchar](15) NOT NULL,
	[Siz] [varchar](6) NOT NULL,
	[Pairs] [int] NULL,
	[UserID] [varchar](10) NULL,
	[UserDate] [smalldatetime] NULL,
	[YN] [varchar](1) NULL,
	[USER_ID] [varchar](15) NOT NULL,
	[HostName] [varchar](50) NULL,
	[IP4_Address] [varchar](15) NULL,
	[Mac_address] [varchar](20) NULL,
	[Status] [varchar](15) NOT NULL,
	[Modify_Date] [datetime] NOT NULL,
 CONSTRAINT [PK_Log_YPZLZLS_Siz] PRIMARY KEY CLUSTERED 
(
	[Log_YPZLZLS_Siz_Key] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Log_YPZLZLS1]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Log_YPZLZLS1](
	[Log_YPZLZLS1_Key] [varchar](15) NOT NULL,
	[YPZLBH] [varchar](15) NULL,
	[YPDH] [varchar](15) NULL,
	[XH] [varchar](3) NULL,
	[BWBH] [varchar](4) NULL,
	[BWLB] [varchar](5) NULL,
	[CLBH] [varchar](15) NULL,
	[CSBH] [varchar](6) NULL,
	[LOSS] [numeric](18, 4) NULL,
	[CLSL] [numeric](18, 4) NULL,
	[CLDJ] [numeric](18, 4) NULL,
	[Currency] [varchar](3) NULL,
	[Rate] [numeric](18, 6) NULL,
	[Remark] [varchar](50) NULL,
	[JGZWSM] [varchar](100) NULL,
	[JGYWSM] [varchar](100) NULL,
	[USER_ID] [varchar](15) NULL,
	[HostName] [varchar](50) NULL,
	[IP4_Address] [varchar](15) NULL,
	[Mac_address] [varchar](20) NULL,
	[Status] [varchar](15) NOT NULL,
	[Modify_Date] [datetime] NOT NULL,
 CONSTRAINT [PK_Log_YPZLZLS1] PRIMARY KEY CLUSTERED 
(
	[Log_YPZLZLS1_Key] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Log_YPZLZLS2]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Log_YPZLZLS2](
	[Log_YPZLZLS2_Key] [varchar](15) NOT NULL,
	[YPZLBH] [varchar](15) NOT NULL,
	[YPDH] [varchar](15) NOT NULL,
	[BWBH] [varchar](4) NOT NULL,
	[CSBH] [varchar](6) NULL,
	[MJBH] [varchar](10) NOT NULL,
	[CLBH] [varchar](10) NOT NULL,
	[ZMLB] [varchar](1) NULL,
	[SIZE] [varchar](6) NULL,
	[CLSL] [numeric](18, 4) NULL,
	[USAGE] [numeric](18, 4) NULL,
	[USERID] [varchar](20) NOT NULL,
	[USERDATE] [smalldatetime] NOT NULL,
	[YN] [varchar](1) NOT NULL,
	[USER_ID] [varchar](15) NOT NULL,
	[HostName] [varchar](50) NULL,
	[IP4_Address] [varchar](15) NULL,
	[Mac_address] [varchar](20) NULL,
	[Status] [varchar](15) NOT NULL,
	[Modify_Date] [datetime] NOT NULL,
 CONSTRAINT [PK_Log_YPZLZLS2] PRIMARY KEY CLUSTERED 
(
	[Log_YPZLZLS2_Key] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Material_Stock_Out_Sample]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Material_Stock_Out_Sample](
	[Key_Material_Stock_Out_Sample] [varchar](15) NOT NULL,
	[PONO] [varchar](20) NULL,
	[TestNo] [varchar](15) NULL,
	[YPZLBH] [varchar](20) NULL,
	[Article] [varchar](20) NULL,
	[Material_No] [varchar](15) NULL,
	[Barcode] [varchar](20) NULL,
	[QTY_Bom] [numeric](18, 4) NULL,
	[QTY_Sample] [numeric](18, 4) NULL,
	[User_ID] [varchar](15) NULL,
	[Status] [varchar](20) NULL,
	[Modify_Date] [datetime] NULL,
	[Size] [varchar](20) NOT NULL,
	[KFJD] [varchar](20) NOT NULL,
	[LLNO] [varchar](15) NULL,
 CONSTRAINT [PK_Materrial_Stock_Out_Sample] PRIMARY KEY CLUSTERED 
(
	[Key_Material_Stock_Out_Sample] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Material_Stock_Out_Sample_OutSource]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Material_Stock_Out_Sample_OutSource](
	[Key_Material_Stock_Out_Sample] [varchar](20) NOT NULL,
	[LLNO] [varchar](11) NOT NULL,
	[JGNO] [varchar](15) NULL,
	[CLBH] [varchar](15) NOT NULL,
	[DFL] [varchar](15) NOT NULL,
	[SCBH] [varchar](15) NOT NULL,
	[TempQty] [money] NOT NULL,
	[Qty] [money] NOT NULL,
	[CostID] [varchar](10) NULL,
	[USERDATE] [smalldatetime] NOT NULL,
	[USERID] [varchar](20) NOT NULL,
	[YN] [varchar](1) NOT NULL,
	[MEMO] [varchar](250) NULL,
 CONSTRAINT [PK_KCLLS_1] PRIMARY KEY CLUSTERED 
(
	[Key_Material_Stock_Out_Sample] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Print_Name_Machine]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Print_Name_Machine](
	[Name_Print_key] [varchar](50) NOT NULL,
	[User_ID] [varchar](10) NULL,
	[Name_print] [varchar](255) NULL,
	[Print_IP] [varchar](50) NULL,
 CONSTRAINT [PK_Print_Name_Machine] PRIMARY KEY CLUSTERED 
(
	[Name_Print_key] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Type_Account_Sign]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Type_Account_Sign](
	[Account_Sign_Serial] [varchar](10) NOT NULL,
	[User_ID] [varchar](10) NOT NULL,
	[User_Name] [nvarchar](100) NULL,
	[Image_Sign] [image] NULL,
	[StartDate] [datetime] NULL,
	[EndDate] [datetime] NULL,
	[User_Serial_Key] [varchar](15) NULL,
	[ModifyDate] [datetime] NULL,
 CONSTRAINT [PK_Type_Account_Sign] PRIMARY KEY CLUSTERED 
(
	[Account_Sign_Serial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Type_Action]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Type_Action](
	[Action_Serial_Key] [varchar](5) NOT NULL,
	[Action_Name] [nvarchar](200) NULL,
	[Remark] [nvarchar](100) NULL,
	[User_Serial_Key] [varchar](10) NULL,
	[Modified_Date] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Action_Serial_Key] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Type_Color]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Type_Color](
	[Color_Code] [varchar](15) NOT NULL,
	[Color_Name] [nvarchar](200) NULL,
	[R] [varchar](15) NULL,
	[G] [varchar](15) NULL,
	[B] [varchar](15) NULL,
 CONSTRAINT [PK_Type_Color] PRIMARY KEY CLUSTERED 
(
	[Color_Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Type_Language]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Type_Language](
	[ObjectName] [nvarchar](100) NOT NULL,
	[TLLanguage] [nvarchar](50) NOT NULL,
	[ObjectContent] [nvarchar](200) NULL,
 CONSTRAINT [PK_Type_Language] PRIMARY KEY CLUSTERED 
(
	[ObjectName] ASC,
	[TLLanguage] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Type_Person_Decision]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Type_Person_Decision](
	[Decision_Serial_Key] [varchar](5) NOT NULL,
	[Decision_Name] [nvarchar](200) NULL,
	[Remark] [nvarchar](100) NULL,
	[User_Serial_Key] [varchar](10) NULL,
	[Modified_Date] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Decision_Serial_Key] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Type_Rack_Address]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Type_Rack_Address](
	[Rack_Total_ID] [varchar](10) NOT NULL,
	[x] [numeric](10, 2) NOT NULL,
	[y] [numeric](10, 2) NOT NULL,
	[Width] [numeric](10, 2) NOT NULL,
	[Height] [numeric](10, 2) NOT NULL,
	[Rack_Status] [nvarchar](20) NOT NULL,
	[Building] [nvarchar](10) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Type_Storage]    Script Date: 1/20/2025 3:21:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Type_Storage](
	[Type_Data] [varchar](10) NOT NULL,
	[Data_Number] [int] NOT NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Data_Group_Priority] ADD  DEFAULT ('2099/12/31 23:59:00.000') FOR [NoUse_Date]
GO
ALTER TABLE [dbo].[Data_Group_Priority] ADD  DEFAULT ('2099/12/31 23:59:00.000') FOR [Modify_Date]
GO
ALTER TABLE [dbo].[Data_Program] ADD  DEFAULT ('2099/12/31 23:59:00.000') FOR [NoUse_Date]
GO
ALTER TABLE [dbo].[Data_Register_In_ERP] ADD  DEFAULT ((0)) FOR [RKQty]
GO
ALTER TABLE [dbo].[Log_Group] ADD  DEFAULT ('2099/12/31 23:59:00.000') FOR [Modify_Date]
GO
ALTER TABLE [dbo].[Log_Group_Priority] ADD  DEFAULT ('2099/12/31 23:59:00.000') FOR [NoUse_Date]
GO
ALTER TABLE [dbo].[Log_Program] ADD  DEFAULT ('2099/12/31 23:59:00.000') FOR [NoUse_Date]
GO
ALTER TABLE [dbo].[Log_User] ADD  DEFAULT ('2099/12/31 23:59:00.000') FOR [Login_Date]
GO
