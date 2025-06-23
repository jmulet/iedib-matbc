var aliasConfig = {
appName : ["", "", ""],
totalPageCount : [],
largePageWidth : [],
largePageHeight : [],
normalPath : [],
largePath : [],
thumbPath : [],

ToolBarsSettings:[],
TitleBar:[],
appLogoIcon:["appLogoIcon"],
appLogoLinkURL:["appLogoLinkURL"],
bookTitle : [],
bookDescription : [],
ButtonsBar : [],
ShareButton : [],
ShareButtonVisible : ["socialShareButtonVisible"],
ThumbnailsButton : [],
ThumbnailsButtonVisible : ["enableThumbnail"],
ZoomButton : [],
ZoomButtonVisible : ["enableZoomIn"],
FlashDisplaySettings : [],
MainBgConfig : [],
bgBeginColor : ["bgBeginColor"],
bgEndColor : ["bgEndColor"],
bgMRotation : ["bgMRotation"],
backGroundImgURL : ["mainbgImgUrl","innerMainbgImgUrl"],
pageBackgroundColor : ["pageBackgroundColor"],
flipshortcutbutton : [],
BookMargins : [],
topMargin : [],
bottomMargin : [],
leftMargin : [],
rightMargin : [],
HTMLControlSettings : [],
linkconfig : [],
LinkDownColor : ["linkOverColor"],
LinkAlpha : ["linkOverColorAlpha"],
OpenWindow : ["linkOpenedWindow"],
searchColor : [],
searchAlpha : [],
SearchButtonVisible : ["searchButtonVisible"],

productName : [],
homePage : [],
enableAutoPlay : ["autoPlayAutoStart"],
autoPlayDuration : ["autoPlayDuration"],
autoPlayLoopCount : ["autoPlayLoopCount"],
BookMarkButtonVisible : [],
googleAnalyticsID : ["googleAnalyticsID"],
OriginPageIndex : [],	
HardPageEnable : ["isHardCover"],	
UIBaseURL : [],	
RightToLeft: ["isRightToLeft"],	

LeftShadowWidth : ["leftPageShadowWidth"],	
LeftShadowAlpha : ["pageShadowAlpha"],
RightShadowWidth : ["rightPageShadowWidth"],
RightShadowAlpha : ["pageShadowAlpha"],
ShortcutButtonHeight : [],	
ShortcutButtonWidth : [],
AutoPlayButtonVisible : ["enableAutoPlay"],	
DownloadButtonVisible : ["enableDownload"],	
DownloadURL : ["downloadURL"],
HomeButtonVisible :["homeButtonVisible"],
HomeURL:['btnHomeURL'],
BackgroundSoundURL:['bacgroundSoundURL'],
//TableOfContentButtonVisible:["BookMarkButtonVisible"],
PrintButtonVisible:["enablePrint"],
toolbarColor:["mainColor","barColor"],
loadingBackground:["mainColor","barColor"],
BackgroundSoundButtonVisible:["enableFlipSound"],
FlipSound:["enableFlipSound"],
MiniStyle:["userSmallMode"],
retainBookCenter:["moveFlipBookToCenter"],
totalPagesCaption:["totalPageNumberCaptionStr"],
pageNumberCaption:["pageIndexCaptionStrs"]
};
var aliasLanguage={
frmPrintbtn:["frmPrintCaption"],
frmPrintall : ["frmPrintPrintAll"],
frmPrintcurrent : ["frmPrintPrintCurrentPage"],
frmPrintRange : ["frmPrintPrintRange"],
frmPrintexample : ["frmPrintExampleCaption"],
btnLanguage:["btnSwicthLanguage"],
btnTableOfContent:["btnBookMark"]
}
;
	var bookConfig = {
	appName:'flippdf',
	totalPageCount : 0,
	largePageWidth : 1080,
	largePageHeight : 1440,
	normalPath : "files/page/",
	largePath : "files/large/",
	thumbPath : "files/thumb/",
	
	ToolBarsSettings:"",
	TitleBar:"",
	appLogoLinkURL:"https://piworld.es/books/",
	bookTitle:"Matemàtiques I - Solucionari",
	bookDescription:"",
	ButtonsBar:"",
	ShareButton:"",
	
	ThumbnailsButton:"",
	ThumbnailsButtonVisible:"Show",
	ZoomButton:"",
	ZoomButtonVisible:"Yes",
	FlashDisplaySettings:"",
	MainBgConfig:"",
	bgBeginColor:"#cccccc",
	bgEndColor:"#eeeeee",
	bgMRotation:45,
	pageBackgroundColor:"#FFFFFF",
	flipshortcutbutton:"Show",
	BookMargins:"",
	topMargin:10,
	bottomMargin:10,
	leftMargin:10,
	rightMargin:10,
	HTMLControlSettings:"",
	linkconfig:"",
	LinkDownColor:"#808080",
	LinkAlpha:0.5,
	OpenWindow:"_Blank",

	BookMarkButtonVisible:'true',
	productName : 'Matemàtiques I - 1r Batxillerat',
	homePage : 'https://piworld.es/books/',
	isFlipPdf : "true",
	TableOfContentButtonVisible:"true",
	searchTextJS:'javascript/search_config.js',
	searchPositionJS:undefined
};
	
	
	
bookConfig.loadingCaption="Carregant";
bookConfig.loadingCaptionColor="#DDDDDD";
bookConfig.loadingBackground="#000000";
bookConfig.appLogoIcon="./files/mobile-ext/iesbbooks.svg";
bookConfig.appLogoOpenWindow="Blank";
bookConfig.logoHeight="40";
bookConfig.logoPadding="0";
bookConfig.logoTop="0";
bookConfig.toolbarColor="#000000";
bookConfig.iconColor="#ECF5FB";
bookConfig.pageNumColor="#333333";
bookConfig.iconFontColor="#FFFFFF";
bookConfig.InstructionsButtonVisible="Hide";
bookConfig.QRCode="Hide";
bookConfig.HomeButtonVisible="Hide";
bookConfig.enablePageBack="Show";
bookConfig.ShareButtonVisible="Hide";
bookConfig.EmailButtonVisible="Hide";
bookConfig.btnShareWithEmailBody="\{link\}";
bookConfig.ThumbnailsButtonVisible="Show";
bookConfig.thumbnailColor="#333333";
bookConfig.thumbnailAlpha="70";
bookConfig.BookMarkButtonVisible="Show";
bookConfig.TableOfContentButtonVisible="Show";
bookConfig.bookmarkBackground="#000000";
bookConfig.bookmarkFontColor="#CCCCCC";
bookConfig.SearchButtonVisible="Show";
bookConfig.leastSearchChar="3";
bookConfig.searchFontColor="#FFFFFF";
bookConfig.PrintButtonVisible="No";
bookConfig.BackgroundSoundButtonVisible="Enable";
bookConfig.FlipSound="Enable";
bookConfig.BackgroundSoundLoop="-1";
bookConfig.AutoPlayButtonVisible="Yes";
bookConfig.autoPlayAutoStart="No";
bookConfig.autoPlayDuration="9";
bookConfig.autoPlayLoopCount="1";
bookConfig.ZoomButtonVisible="Yes";
bookConfig.minZoomWidth="700";
bookConfig.minZoomHeight="518";
bookConfig.mouseWheelFlip="Yes";
bookConfig.DownloadButtonVisible="Hide";
bookConfig.FullscreenButtonVisible="Show";
bookConfig.bgBeginColor="#E2E2E2";
bookConfig.bgEndColor="#E2E2E2";
bookConfig.bgMRotation="90";
bookConfig.backGroundImgURL="./files/mobile-ext/backGroundImgURL.jpg";
bookConfig.backgroundPosition="stretch";
bookConfig.backgroundOpacity="100";
bookConfig.LeftShadowWidth="90";
bookConfig.LeftShadowAlpha="0.6";
bookConfig.RightShadowWidth="55";
bookConfig.RightShadowAlpha="0.6";
bookConfig.HardPageEnable="No";
bookConfig.hardCoverBorderWidth="8";
bookConfig.borderColor="#572F0D";
bookConfig.outerCoverBorder="Yes";
bookConfig.cornerRound="8";
bookConfig.leftMarginOnMobile="0";
bookConfig.topMarginOnMobile="0";
bookConfig.rightMarginOnMobile="0";
bookConfig.bottomMarginOnMobile="0";
bookConfig.pageBackgroundColor="#E8E8E8";
bookConfig.flipshortcutbutton="Show";
bookConfig.BindingType="side";
bookConfig.RightToLeft="No";
bookConfig.flippingTime="0.3";
bookConfig.retainBookCenter="Yes";
bookConfig.FlipStyle="Flip";
bookConfig.autoDoublePage="Yes";
bookConfig.topMargin="10";
bookConfig.bottomMargin="10";
bookConfig.leftMargin="10";
bookConfig.rightMargin="10";
bookConfig.maxWidthToSmallMode="400";
bookConfig.maxHeightToSmallMode="300";
bookConfig.LinkDownColor="#800080";
bookConfig.LinkAlpha="0.2";
bookConfig.OpenWindow="Blank";
bookConfig.showLinkHint="Yes";

bookConfig.macBookVersion = "OEbbqsNCecigLDadugHKVaglOMYahuPDbTrsOLVfvhPKRRsuFAYamlFKUemvMCZermKIbYnlCAUXipKNYRsj7Ba5c04F_";
bookConfig.iesbSecurity = true;
bookConfig.imageExt = "svg";
bookConfig.AnnotationButtonVisible = true;
bookConfig.paperColor = "#FFFFFF";
bookConfig.Html5Template = "Metro";
bookConfig.UIBaseURL="mobile/";
bookConfig.isFlipPdf=false;
bookConfig.searchTextJS="mobile/javascript/search_config.js";
bookConfig.searchPositionJS="mobile/javascript/text_position[1].js";
bookConfig.totalPageCount=59;
bookConfig.largePageWidth=595;
bookConfig.largePageHeight=841;
bookConfig.bookTitle="Matemàtiques I - Solucionari";
bookConfig.normalPath="./files/mobile/";
bookConfig.largePath="./files/mobile/";
bookConfig.productName="Matemàtiques I - Solucionari";
bookConfig.MidBgColor="#641bc7";
bookConfig.bookmarkCR = "15849ce90a3d5a0e3d06eb67c3f452575954c843";
bookConfig.thumbPath="./files/thumb/";
bookConfig.iesbSecurity = true;
bookConfig.excludeFrontPages = true;

var language=[{"language" : "Spanish","btnFirstPage" : "Primera Buton","btnNextPage" : "Siguiente","btnLastPage" : "Ultima Página","btnPrePage" : "Anterior","btnDownload" : "Descargar","btnPrint" : "Imprimir","btnSearch" : "Buscar","btnClearSearch" : "Borrar","btnBookMark" : "Opciones","btnHelp" : "Ayuda","btnFullScreen" : "Permitir Pantalla Completa","btnDisableFullScreen" : "Deshabilitar Pantalla Completa","btnSoundOn" : "Sonido","btnSoundOff" : "Sin Sonido","btnShareEmail" : "Compartir","btnSocialShare" : "Redes Sociales","btnZoomIn" : "Agrandar","btnZoomOut" : "Achicar","btnDragToMove" : "Arrastrar el modo de movimiento","btnAutoFlip" : "Auto Flip","btnStopAutoFlip" : "Detener Auto Flip","btnGoToHome" : "Principio","frmHelpCaption" : "Ayuda","frmHelpTip1" : "Doble click para agrandar o achicar","frmHelpTip2" : "Arrastrar el Borde con el Maus","frmPrintCaption" : "Imprimir","frmPrintBtnCaption" : "Imprimir","frmPrintPrintAll" : "Imprimir todas las Páginas","frmPrintPrintCurrentPage" : "Imprimir Página actual","frmPrintPrintRange" : "Imprimir Páginas:","frmPrintExampleCaption" : "Ejemplo: 2,5,8-26","frmPrintPreparePage" : "Preparando la Página:","frmPrintPrintFailed" : "Error de Impresión:","pnlSearchInputInvalid" : "(Mínimo 3 Caracteres)","loginCaption" : "Login","loginInvalidPassword" : "Contraseña no válida!","loginPasswordLabel" : "Contraseña:","loginBtnLogin" : "Login","loginBtnCancel" : "Cancelar","btnThumb" : "Miniaturas","lblPages" : "Páginas:","lblPagesFound" : "Páginas:","lblPageIndex" : "Página","btnAbout" : "Acerca de","frnAboutCaption" : "Acerca de y Contacto","btnSinglePage" : "Página Simple","btnDoublePage" : "Página doble","btnSwicthLanguage" : "Cambiar el Idioma","tipChangeLanguage" : "Elegir un Idioma...","btnMoreOptionsLeft" : "Mas Opciones","btnMoreOptionsRight" : "Mas Opciones","btnFit" : "Ajustar la Ventana","smallModeCaption" : "Click para ver Pantalla Completa","btnAddAnnotation" : "Agregar Notas","btnAnnotation" : "Notas","FlipPageEditor_SaveAndExit" : "Guardar y Salir","FlipPageEditor_Exit" : "Salir","DrawToolWindow_Redo" : "Rehacer","DrawToolWindow_Undo" : "Deshacer","DrawToolWindow_Clear" : "Limpiar","DrawToolWindow_Brush" : "Pincel","DrawToolWindow_Width" : "Ancho","DrawToolWindow_Alpha" : "Alfa","DrawToolWindow_Color" : "Color","DrawToolWindow_Eraser" : "Borrador","DrawToolWindow_Rectangular" : "Rectangular","DrawToolWindow_Ellipse" : "Elipse","TStuff_BorderWidth" : "Ancho de Borde","TStuff_BorderAlph" : "Borde Alfa","TStuff_BorderColor" : "Color del Borde","DrawToolWindow_TextNote" : "Texto Nota","AnnotMark" : "Marcador","lastpagebtnHelp" : "Ultima Página","firstpagebtnHelp" : "Primera Página","homebtnHelp" : "Volver a la Página Principal","aboubtnHelp" : "Acerca de","screenbtnHelp" : "Abrir en Pantalla Completa","helpbtnHelp" : "Mostrar la Ayuda","searchbtnHelp" : "Buscar en Páginas","pagesbtnHelp" : "Ver las miniaturas de este Brochure","bookmarkbtnHelp" : "Abrir Marcador","AnnotmarkbtnHelp" : "Abrir la Tabla de Contenidos","printbtnHelp" : "Imprimir el brochure","soundbtnHelp" : "Prender o Apagar el Sonido","sharebtnHelp" : "Enviar Email a","socialSharebtnHelp" : "Redes Sociales","zoominbtnHelp" : "Agrandar","downloadbtnHelp" : "Descargar el Brochure","pagemodlebtnHelp" : "Cambiar entre Simple y Doble Modo de Página","languagebtnHelp" : "Cambiar Idioma","annotationbtnHelp" : "Agregar Anotación","addbookmarkbtnHelp" : "Agregar Marcador","removebookmarkbtnHelp" : "Eliminar Marcador","updatebookmarkbtnHelp" : "Actualizar Marcador","btnShoppingCart" : "Carrito de Compras","Help_ShoppingCartbtn" : "Ayudar Carrito de Compras","Help_btnNextPage" : "Siguiente Página","Help_btnPrePage" : "Anterior Página","Help_btnAutoFlip" : "Auto filp","Help_StopAutoFlip" : "Detener atuo filp","btnaddbookmark" : "Agregar","btndeletebookmark" : "Eliminar","btnupdatebookmark" : "Actualizar","frmyourbookmarks" : "Mis Anotaciones","frmitems" : "Artículos","DownloadFullPublication" : "Publicación Completa","DownloadCurrentPage" : "Página Actual","DownloadAttachedFiles" : "Archivos Adjuntos","lblLink" : "Enlace","btnCopy" : "Botón Copiar","restorePage" : "Desea recuperar la sesión anterior?","tmpl_Backgoundsoundon" : "Fondo Sonido Encendido","tmpl_Backgoundsoundoff" : "Fondo Sonido Apagado ","tmpl_Flipsoundon" : "Flip Sonido Encendido","tmpl_Flipsoundoff" : "Flip Sonido Apagado ","Help_PageIndex" : "Número de actual Página","tmpl_PrintPageRanges" : "Página Alcance","tmpl_PrintPreview" : "Preestreno","btnSelection" : "Seleccionar Texto","loginNameLabel" : "Nombre:","btnGotoPage" : "Ir a Página","btnSettings" : "Configuración","soundSettingTitle" : "Sonido Configuración","closeFlipSound" : "Cerrar el Sonido de Flip","closeBackgroundSound" : "Cerrar el Sonido de Fondo","frmShareCaption" : "Compartiendo","frmShareLinkLabel" : "Enlace:","frmShareBtnCopy" : "Copiar","frmShareItemsGroupCaption" : "Social Compartiendo","TAnnoActionPropertyStuff_GotoPage" : "Ir a página ","btnPageBack" : "Retroceder","btnPageForward" : "Adelante","SelectTextCopy" : "Copiar Texto","selectCopyButton" : "Copiar","TStuffCart_TypeCart" : "Carrito de Compras","TStuffCart_DetailedQuantity" : "Cantidad","TStuffCart_DetailedPrice" : "Precio","ShappingCart_Close" : "Cerrar","ShappingCart_CheckOut" : "Proceso","ShappingCart_Item" : "Artículo","ShappingCart_Total" : "Total precio","ShappingCart_AddCart" : "Añadir a carrito","ShappingCart_InStock" : "En Stock","TStuffCart_DetailedCost" : "Costo de transporte","TStuffCart_DetailedTime" : "Tiempo de entrega","TStuffCart_DetailedDay" : "día(s)","ShappingCart_NotStock" : "Poco en stock","btnCrop" : "Ajustar","btnDragButton" : "Drag","btnFlipBook" : "Flip Book","btnSlideMode" : "Slide Mode","btnSinglePageMode" : "Single Page Mode","btnVertical" : "Vertical Mode","btnHotizontal" : "Horizontal Mode","btnClose" : "Close","btnDoublePage" : "Double Page","btnBookStatus" : "Book View","checkBoxInsert" : "Insert Current Page","lblLast" : "This is the last page.","lblFirst" : "This is the first page.","lblFullscreen" : "Click to view in fullscreen","lblName" : "Name","lblPassword" : "Password","lblLogin" : "Login","lblCancel" : "Cancel","lblNoName" : "User name can not be empty.","lblNoPassword" : "Password can not be empty.","lblNoCorrectLogin" : "Please enter the correct user name and password.","btnVideo" : "VideoGallery","btnSlideShow" : "SlideShow","pnlSearchInputInvalid" : "The search text is too short.","btnDragToMove" : "Move by mouse drag","btnPositionToMove" : "Move by mouse position","lblHelp1" : "Drag the page corner to view","lblHelp2" : "Double click to zoom in, out","lblCopy" : "Copy","lblAddToPage" : "add to page","lblPage" : "Page","lblTitle" : "Title","lblEdit" : "Edit","lblDelete" : "Delete","lblRemoveAll" : "RemoveAll","tltCursor" : "cursor","tltAddHighlight" : "add highlight","tltAddTexts" : "add texts","tltAddShapes" : "add shapes","tltAddNotes" : "add notes","tltAddImageFile" : "add image file","tltAddSignature" : "add signature","tltAddLine" : "add line","tltAddArrow" : "add arrow","tltAddRect" : "add rect","tltAddEllipse" : "add ellipse","lblDoubleClickToZoomIn" : "Double click to zoom in.","frmShareCaption" : "Share","frmShareLabel" : "Share","frmShareInfo" : "You can easily share this publication to social networks.Just cilck the appropriate button below.","frminsertLabel" : "Insert to Site","frminsertInfo" : "Use the code below to embed this publication to your website."}];var pageEditor =[[{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.284559",y:"0.824352",width:"0.155803",height:"0.009955"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"www.iesbinissalem.net"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.286234",y:"0.825636",width:"0.152456",height:"0.009727"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"http://www.iesbinissalem.net"}}],[],[{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.168797",y:"0.327624",width:"0.178000",height:"0.012187"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionGotoPage",pageIndex:"5"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.168797",y:"0.343243",width:"0.178000",height:"0.012188"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionGotoPage",pageIndex:"6"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.168797",y:"0.358864",width:"0.178000",height:"0.012188"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionGotoPage",pageIndex:"11"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.168797",y:"0.374485",width:"0.178000",height:"0.012187"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionGotoPage",pageIndex:"17"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.168797",y:"0.390104",width:"0.165555",height:"0.012188"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionGotoPage",pageIndex:"21"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.168797",y:"0.405725",width:"0.178000",height:"0.012188"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionGotoPage",pageIndex:"22"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.168797",y:"0.421346",width:"0.178000",height:"0.012188"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionGotoPage",pageIndex:"27"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.168797",y:"0.436966",width:"0.178000",height:"0.012188"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionGotoPage",pageIndex:"30"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.168797",y:"0.452586",width:"0.171979",height:"0.012188"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionGotoPage",pageIndex:"40"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.168797",y:"0.468207",width:"0.178000",height:"0.012188"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionGotoPage",pageIndex:"42"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.168797",y:"0.483827",width:"0.178000",height:"0.012188"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionGotoPage",pageIndex:"46"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.168797",y:"0.499448",width:"0.187757",height:"0.012188"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionGotoPage",pageIndex:"51"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.168797",y:"0.515068",width:"0.178405",height:"0.012188"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionGotoPage",pageIndex:"55"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.168797",y:"0.530688",width:"0.187757",height:"0.012188"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionGotoPage",pageIndex:"56"}}],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.149690",y:"0.155337",width:"0.017627",height:"0.014896"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://www.geogebra.org/m/PS5YUdBN"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.149690",y:"0.209669",width:"0.017627",height:"0.014897"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://www.geogebra.org/m/K6YYNbCC"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.149690",y:"0.264001",width:"0.017627",height:"0.014897"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://www.geogebra.org/m/mU2vFjBH"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.149690",y:"0.355491",width:"0.017627",height:"0.014897"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://www.geogebra.org/m/KCtQrh29"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.535405",y:"0.132380",width:"0.017625",height:"0.014897"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://www.geogebra.org/m/n5pZEvVR"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.169597",y:"0.159204",width:"0.267087",height:"0.009757"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://www.geogebra.org/m/PS5YUdBN"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.169597",y:"0.213535",width:"0.268325",height:"0.009757"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://www.geogebra.org/m/K6YYNbCC"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.169597",y:"0.267868",width:"0.267414",height:"0.009757"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://www.geogebra.org/m/mU2vFjBH"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.169597",y:"0.359357",width:"0.259106",height:"0.009757"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://www.geogebra.org/m/KCtQrh29"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.555310",y:"0.136246",width:"0.262848",height:"0.009757"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://www.geogebra.org/m/n5pZEvVR"}}],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.183024",y:"0.585920",width:"0.017625",height:"0.014897"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://www.geogebra.org/m/vpkYZGqu"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.202931",y:"0.589787",width:"0.262905",height:"0.009757"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://www.geogebra.org/m/vpkYZGqu"}}],[],[{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.206454",y:"0.318349",width:"0.017627",height:"0.016724"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://www.geogebra.org/m/mKY89SzR"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.183024",y:"0.404556",width:"0.017625",height:"0.014897"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://www.geogebra.org/m/tzkCVusA"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.206454",y:"0.538576",width:"0.017627",height:"0.016723"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://www.geogebra.org/m/zf9ZxYWn"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.206454",y:"0.696220",width:"0.017627",height:"0.016723"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://www.geogebra.org/m/VAX9PeVf"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.183024",y:"0.767872",width:"0.017625",height:"0.014897"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://www.geogebra.org/m/VJGVSq6z"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.592167",y:"0.373058",width:"0.017627",height:"0.016723"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://www.geogebra.org/m/CxZaNSBY"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.226361",y:"0.322217",width:"0.265166",height:"0.009757"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://www.geogebra.org/m/mKY89SzR"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.612074",y:"0.376925",width:"0.264569",height:"0.009757"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://www.geogebra.org/m/CxZaNSBY"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.202931",y:"0.408424",width:"0.256759",height:"0.009757"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://www.geogebra.org/m/tzkCVusA"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.226361",y:"0.542444",width:"0.260756",height:"0.009757"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://www.geogebra.org/m/zf9ZxYWn"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.226361",y:"0.700087",width:"0.258054",height:"0.009757"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://www.geogebra.org/m/VAX9PeVf"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.202931",y:"0.771738",width:"0.259405",height:"0.009757"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://www.geogebra.org/m/VJGVSq6z"}}],[],[],[],[{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.206454",y:"0.499083",width:"0.017627",height:"0.016723"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://goo.gl/hpSTWs"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.206454",y:"0.704894",width:"0.017627",height:"0.016723"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://goo.gl/ExXjiX"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.592167",y:"0.163620",width:"0.017627",height:"0.016723"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://goo.gl/5nRcAv"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.592167",y:"0.270084",width:"0.017627",height:"0.016723"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://es.wikipedia.org/wiki/Cromo"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.592167",y:"0.380451",width:"0.017627",height:"0.016723"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://goo.gl/cY7x1L"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.612074",y:"0.167487",width:"0.142968",height:"0.009757"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://goo.gl/5nRcAv"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.612074",y:"0.273950",width:"0.239048",height:"0.009757"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://es.wikipedia.org/wiki/Cromo"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.612074",y:"0.384317",width:"0.140550",height:"0.009757"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://goo.gl/cY7x1L"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.226361",y:"0.502949",width:"0.148530",height:"0.009757"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://goo.gl/hpSTWs"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.226361",y:"0.708760",width:"0.136381",height:"0.009757"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://goo.gl/ExXjiX"}}],[{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.149690",y:"0.266673",width:"0.017627",height:"0.014896"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://goo.gl/Q6BEy9"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.173121",y:"0.709170",width:"0.017625",height:"0.016723"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://goo.gl/c1dcec"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.173121",y:"0.903347",width:"0.017625",height:"0.016723"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://goo.gl/3AMzyc"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.558835",y:"0.466417",width:"0.017625",height:"0.016723"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://goo.gl/qdmVsS"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.558835",y:"0.665241",width:"0.017625",height:"0.016723"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://goo.gl/SqBxFB"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.169597",y:"0.270539",width:"0.145557",height:"0.009757"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://goo.gl/Q6BEy9"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.578742",y:"0.470283",width:"0.148018",height:"0.009757"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://goo.gl/qdmVsS"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.578742",y:"0.669107",width:"0.144632",height:"0.009757"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://goo.gl/SqBxFB"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.193026",y:"0.713036",width:"0.139582",height:"0.009757"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://goo.gl/c1dcec"}},{annotype:"com.mobiano.flipbook.pageeditor.TAnnoLink",location:{x:"0.193026",y:"0.907213",width:"0.146055",height:"0.009757"},action:{triggerEventType:"mouseDown",actionType:"com.mobiano.flipbook.pageeditor.TAnnoActionOpenURL",url:"https://goo.gl/3AMzyc"}}],[]]
;
	bookConfig.hideMiniFullscreen=true;
	if(language&&language.length>0&&language[0]&&language[0].language){
		bookConfig.language=language[0].language;
	}
	
try{
	for(var i=0;pageEditor!=undefined&&i<pageEditor.length;i++){
		if(pageEditor[i].length==0){
			continue;
		}
		for(var j=0;j<pageEditor[i].length;j++){
			var anno=pageEditor[i][j];
			if(anno==undefined)continue;
			if(anno.overAlpha==undefined){
				anno.overAlpha=bookConfig.LinkAlpha;
			}
			if(anno.outAlpha==undefined){
				anno.outAlpha=0;
			}
			if(anno.downAlpha==undefined){
				anno.downAlpha=bookConfig.LinkAlpha;
			}
			if(anno.overColor==undefined){
				anno.overColor=bookConfig.LinkDownColor;
			}
			if(anno.downColor==undefined){
				anno.downColor=bookConfig.LinkDownColor;
			}
			if(anno.outColor==undefined){
				anno.outColor=bookConfig.LinkDownColor;
			}
			if(anno.annotype=='com.mobiano.flipbook.pageeditor.TAnnoLink'){
				anno.alpha=bookConfig.LinkAlpha;
			}
		}
	}
}catch(e){
}
try{
	$.browser.device = 2;
}catch(ee){
}
