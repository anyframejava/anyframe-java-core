//CSS=TopBottomFrame.css
    
(function() {
  return function() {
    var obj;   
    
    obj = new nexacro.Style_align("left middle");
    this._addCss("Button.btn_TF_MenuN", "align", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Button.btn_TF_MenuS", "align", obj, ["normal", "focused", "disabled", "mouseover", "pushed", "selected"]);
    this._addCss("Static.sta_LF_Title", "align", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Grid.grd_MDI_List", "align", obj, ["normal"]);

    obj = new nexacro.Style_background("","","","0","0","0","0","true");
    this._addCss("Button.btn_TF_MenuN", "background", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Button.btn_TF_MenuS", "background", obj, ["normal", "focused", "disabled", "mouseover", "pushed", "selected"]);
    this._addCss("Combo.cmb_LF_Site>#dropbutton", "background", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Grid.grd_LF_Menu>#body", "background", obj, ["disabled"]);
    this._addCss("Grid.grd_LF_Menu>#vscrollbar>#incbutton", "background", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Grid.grd_LF_Menu>#vscrollbar>#decbutton", "background", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Grid.grd_LF_MyMenu>#body", "background", obj, ["disabled"]);
    this._addCss("Grid.grd_MDI_List", "background", obj, ["normal"]);
    this._addCss("Grid.grd_MDI_List>#body", "background", obj, ["normal", "disabled", "mouseover"]);
    this._addCss("Tab.tab_MDI_Tab", "background", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Tab.tab_MDI_Tab>#spinupbutton", "background", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Tab.tab_MDI_Tab>#spindownbutton", "background", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);

    obj = new nexacro.Style_border("0","none","","");
    this._addCss("Button.btn_TF_MenuN", "border", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Button.btn_TF_MenuS", "border", obj, ["normal", "focused", "disabled", "mouseover", "pushed", "selected"]);
    this._addCss("Button.btn_TF_MenuPre", "border", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Button.btn_TF_MenuNxt", "border", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Button.btn_TF_UtillCall", "border", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Button.btn_TF_UtillPW", "border", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Button.btn_TF_UtillBug", "border", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Button.btn_TF_UtillLogout", "border", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Button.btn_TF_ChangeChae", "border", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Button.btn_TF_ChangeSin", "border", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Button.btn_LF_SearchBtn", "border", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Button.btn_LF_MyMenu", "border", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Button.btn_LF_MyMenuX", "border", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Combo.cmb_LF_Site>#dropbutton", "border", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Grid.grd_LF_Menu>#vscrollbar", "border", obj, ["normal", "disabled", "selected", "mouseover", "pushed", "focused"]);
    this._addCss("Grid.grd_LF_Menu>#vscrollbar>#incbutton", "border", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Grid.grd_LF_Menu>#vscrollbar>#decbutton", "border", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Grid.grd_LF_Menu>#vscrollbar>#trackbar", "border", obj, ["normal", "disabled", "selected", "focused", "mouseover", "pushed"]);
    this._addCss("Static.sta_LF_Title", "border", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Button.btn_MDI_Home", "border", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Button.btn_MDI_HomeS", "border", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Button.btn_MDI_List", "border", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Button.btn_MDI_TabCascade", "border", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Button.btn_MDI_TabPop", "border", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Button.btn_MDI_TabMax", "border", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Button.btn_MDI_AllClose", "border", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Grid.grd_MDI_List", "border", obj, ["normal"]);
    this._addCss("Tab.tab_MDI_Tab", "border", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Tab.tab_MDI_Tab>#spinupbutton", "border", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Tab.tab_MDI_Tab>#spindownbutton", "border", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);

    obj = new nexacro.Style_color("#222222");
    this._addCss("Button.btn_TF_MenuN", "color", obj, ["normal", "focused"]);
    this._addCss("Tab.tab_MDI_Tab", "color", obj, ["pushed", "selected"]);

    obj = new nexacro.Style_font("bold 10 Gulim");
    this._addCss("Button.btn_TF_MenuN", "font", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Button.btn_TF_MenuS", "font", obj, ["normal", "focused", "disabled", "mouseover", "pushed", "selected"]);
    this._addCss("Static.sta_LF_Title", "font", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_padding("1 0 0 0");
    this._addCss("Button.btn_TF_MenuN", "padding", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Button.btn_TF_MenuS", "padding", obj, ["normal", "focused", "disabled", "mouseover", "pushed", "selected"]);

    obj = new nexacro.Style_color("#2170e5");
    this._addCss("Button.btn_TF_MenuN", "color", obj, ["mouseover", "pushed", "selected"]);
    this._addCss("Button.btn_TF_MenuS", "color", obj, ["normal", "focused", "disabled", "mouseover", "pushed", "selected"]);

    obj = new nexacro.Style_color("#c8c8c8");
    this._addCss("Button.btn_TF_MenuN", "color", obj, ["disabled"]);
    this._addCss("Tab.tab_MDI_Tab", "color", obj, ["disabled"]);

    obj = new nexacro.Style_background("","images::btn_TF_MenuPre.png","","0","0","0","0","true");
    this._addCss("Button.btn_TF_MenuPre", "background", obj, ["normal", "focused", "disabled"]);

    obj = new nexacro.Style_background("","images::btn_TF_MenuPre_O.png","","0","0","0","0","true");
    this._addCss("Button.btn_TF_MenuPre", "background", obj, ["mouseover", "pushed", "selected"]);

    obj = new nexacro.Style_value("20");
    this._addCss("Button.btn_TF_MenuPre", "opacity", obj, ["disabled"]);
    this._addCss("Button.btn_TF_MenuNxt", "opacity", obj, ["disabled"]);
    this._addCss("Button.btn_LF_SearchBtn", "opacity", obj, ["disabled"]);
    this._addCss("Button.btn_MDI_Home", "opacity", obj, ["disabled"]);
    this._addCss("Button.btn_MDI_List", "opacity", obj, ["disabled"]);
    this._addCss("Button.btn_MDI_TabCascade", "opacity", obj, ["disabled"]);
    this._addCss("Button.btn_MDI_TabPop", "opacity", obj, ["disabled"]);
    this._addCss("Button.btn_MDI_TabMax", "opacity", obj, ["disabled"]);
    this._addCss("Button.btn_MDI_AllClose", "opacity", obj, ["disabled"]);

    obj = new nexacro.Style_background("","images::btn_TF_MenuNxt.png","","0","0","0","0","true");
    this._addCss("Button.btn_TF_MenuNxt", "background", obj, ["normal", "focused", "disabled"]);

    obj = new nexacro.Style_background("","images::btn_TF_MenuNxt_O.png","","0","0","0","0","true");
    this._addCss("Button.btn_TF_MenuNxt", "background", obj, ["mouseover", "pushed", "selected"]);

    obj = new nexacro.Style_background("","images::btn_TF_UtillCall.png","","0","0","0","0","true");
    this._addCss("Button.btn_TF_UtillCall", "background", obj, ["normal", "focused"]);

    obj = new nexacro.Style_background("","images::btn_TF_UtillCall_O.png","","0","0","0","0","true");
    this._addCss("Button.btn_TF_UtillCall", "background", obj, ["mouseover"]);

    obj = new nexacro.Style_background("","images::btn_TF_UtillCall_P.png","","0","0","0","0","true");
    this._addCss("Button.btn_TF_UtillCall", "background", obj, ["pushed", "selected"]);

    obj = new nexacro.Style_background("","images::btn_TF_UtillCall_D.png","","0","0","0","0","true");
    this._addCss("Button.btn_TF_UtillCall", "background", obj, ["disabled"]);

    obj = new nexacro.Style_background("","images::btn_TF_UtillPW.png","","0","0","0","0","true");
    this._addCss("Button.btn_TF_UtillPW", "background", obj, ["normal", "focused"]);

    obj = new nexacro.Style_background("","images::btn_TF_UtillPW_O.png","","0","0","0","0","true");
    this._addCss("Button.btn_TF_UtillPW", "background", obj, ["mouseover"]);

    obj = new nexacro.Style_background("","images::btn_TF_UtillPW_P.png","","0","0","0","0","true");
    this._addCss("Button.btn_TF_UtillPW", "background", obj, ["pushed", "selected"]);

    obj = new nexacro.Style_background("","images::btn_TF_UtillPW_D.png","","0","0","0","0","true");
    this._addCss("Button.btn_TF_UtillPW", "background", obj, ["disabled"]);

    obj = new nexacro.Style_background("","images::btn_TF_UtillBug.png","","0","0","0","0","true");
    this._addCss("Button.btn_TF_UtillBug", "background", obj, ["normal", "focused"]);

    obj = new nexacro.Style_background("","images::btn_TF_UtillBug_O.png","","0","0","0","0","true");
    this._addCss("Button.btn_TF_UtillBug", "background", obj, ["mouseover"]);

    obj = new nexacro.Style_background("","images::btn_TF_UtillBug_P.png","","0","0","0","0","true");
    this._addCss("Button.btn_TF_UtillBug", "background", obj, ["pushed", "selected"]);

    obj = new nexacro.Style_background("","images::btn_TF_UtillBug_D.png","","0","0","0","0","true");
    this._addCss("Button.btn_TF_UtillBug", "background", obj, ["disabled"]);

    obj = new nexacro.Style_background("","images::btn_TF_UtillLogout.png","","0","0","0","0","true");
    this._addCss("Button.btn_TF_UtillLogout", "background", obj, ["normal", "focused"]);

    obj = new nexacro.Style_background("","images::btn_TF_UtillLogout_O.png","","0","0","0","0","true");
    this._addCss("Button.btn_TF_UtillLogout", "background", obj, ["mouseover"]);

    obj = new nexacro.Style_background("","images::btn_TF_UtillLogout_P.png","","0","0","0","0","true");
    this._addCss("Button.btn_TF_UtillLogout", "background", obj, ["pushed", "selected"]);

    obj = new nexacro.Style_background("","images::btn_TF_UtillLogout_D.png","","0","0","0","0","true");
    this._addCss("Button.btn_TF_UtillLogout", "background", obj, ["disabled"]);

    obj = new nexacro.Style_background("","images::btn_TF_ChangeChae.png","","0","0","0","0","true");
    this._addCss("Button.btn_TF_ChangeChae", "background", obj, ["normal", "focused"]);

    obj = new nexacro.Style_bordertype("normal","0","0","true","true","true","true");
    this._addCss("Button.btn_TF_ChangeChae", "bordertype", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Button.btn_TF_ChangeSin", "bordertype", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Button.btn_LF_MyMenu", "bordertype", obj, ["normal", "focused", "mouseover", "pushed", "selected"]);
    this._addCss("Button.btn_LF_MyMenuX", "bordertype", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Grid.grd_LF_Menu>#vscrollbar>#trackbar", "bordertype", obj, ["normal", "disabled", "selected", "focused", "mouseover", "pushed"]);
    this._addCss("Button.btn_MDI_Home", "bordertype", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Button.btn_MDI_HomeS", "bordertype", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Button.btn_MDI_List", "bordertype", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);

    obj = new nexacro.Style_background("","images::btn_TF_ChangeChae_O.png","","0","0","0","0","true");
    this._addCss("Button.btn_TF_ChangeChae", "background", obj, ["mouseover"]);

    obj = new nexacro.Style_background("","images::btn_TF_ChangeChae_P.png","","0","0","0","0","true");
    this._addCss("Button.btn_TF_ChangeChae", "background", obj, ["pushed", "selected"]);

    obj = new nexacro.Style_background("","images::btn_TF_ChangeChae_D.png","","0","0","0","0","true");
    this._addCss("Button.btn_TF_ChangeChae", "background", obj, ["disabled"]);

    obj = new nexacro.Style_background("","images::btn_TF_ChangeSin.png","","0","0","0","0","true");
    this._addCss("Button.btn_TF_ChangeSin", "background", obj, ["normal", "focused"]);

    obj = new nexacro.Style_background("","images::btn_TF_ChangeSin_O.png","","0","0","0","0","true");
    this._addCss("Button.btn_TF_ChangeSin", "background", obj, ["mouseover"]);

    obj = new nexacro.Style_background("","images::btn_TF_ChangeSin_P.png","","0","0","0","0","true");
    this._addCss("Button.btn_TF_ChangeSin", "background", obj, ["pushed", "selected"]);

    obj = new nexacro.Style_background("","images::btn_TF_ChangeSin_D.png","","0","0","0","0","true");
    this._addCss("Button.btn_TF_ChangeSin", "background", obj, ["disabled"]);

    obj = new nexacro.Style_background("#ffffffff","","","0","0","0","0","true");
    this._addCss("Static.sta_TF_Bg", "background", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_border("0","none","","","0","none","","","1","solid","#969696ff","","0","none","","");
    this._addCss("Static.sta_TF_Bg", "border", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_background("","images::sta_TF_LogoSin.png","","0","0","0","0","true");
    this._addCss("Static.sta_TF_LogoSin", "background", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_background("","images::sta_TF_LogoChae.png","","0","0","0","0","true");
    this._addCss("Static.sta_TF_LogoChae", "background", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_background("","images::sta_TF_LogoSin2.png","","0","0","0","0","true");
    this._addCss("Static.sta_TF_LogoSin2", "background", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_background("","images::sta_TF_LogoChae2.png","","0","0","0","0","true");
    this._addCss("Static.sta_TF_LogoChae2", "background", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_align("right middle");
    this._addCss("Static.sta_TF_User", "align", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_color("#48617f");
    this._addCss("Static.sta_TF_User", "color", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_padding("1 9 0 15");
    this._addCss("Static.sta_TF_User", "padding", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_background("","images::btn_LF_SearchBtn.png","","0","0","50","50","true");
    this._addCss("Button.btn_LF_SearchBtn", "background", obj, ["normal", "focused", "mouseover", "disabled"]);

    obj = new nexacro.Style_background("","images::btn_LF_SearchBtn_P.png","","0","0","50","50","true");
    this._addCss("Button.btn_LF_SearchBtn", "background", obj, ["pushed", "selected"]);

    obj = new nexacro.Style_background("","images::btn_LF_MyMenu.png","","0","0","50","50","true");
    this._addCss("Button.btn_LF_MyMenu", "background", obj, ["normal", "focused"]);

    obj = new nexacro.Style_background("","images::btn_LF_MyMenu_O.png","","0","0","50","50","true");
    this._addCss("Button.btn_LF_MyMenu", "background", obj, ["mouseover"]);

    obj = new nexacro.Style_background("","images::btn_LF_MyMenu_P.png","","0","0","50","50","true");
    this._addCss("Button.btn_LF_MyMenu", "background", obj, ["pushed", "selected"]);

    obj = new nexacro.Style_background("","images::btn_LF_MyMenu_D.png","","0","0","50","50","true");
    this._addCss("Button.btn_LF_MyMenu", "background", obj, ["disabled"]);

    obj = new nexacro.Style_background("","images::btn_LF_MyMenuX.png","","0","0","50","50","true");
    this._addCss("Button.btn_LF_MyMenuX", "background", obj, ["normal", "focused"]);

    obj = new nexacro.Style_background("","images::btn_LF_MyMenuX_O.png","","0","0","50","50","true");
    this._addCss("Button.btn_LF_MyMenuX", "background", obj, ["mouseover"]);

    obj = new nexacro.Style_background("","images::btn_LF_MyMenuX_P.png","","0","0","50","50","true");
    this._addCss("Button.btn_LF_MyMenuX", "background", obj, ["pushed", "selected"]);

    obj = new nexacro.Style_background("","images::btn_LF_MyMenuX_D.png","","0","0","50","50","true");
    this._addCss("Button.btn_LF_MyMenuX", "background", obj, ["disabled"]);

    obj = new nexacro.Style_background("#454f5dff","","","0","0","0","0","true");
    this._addCss("Combo.cmb_LF_Site", "background", obj, ["normal", "focused", "mouseover", "selected", "disabled"]);
    this._addCss("Combo.cmb_LF_Site>#comboedit", "background", obj, ["normal", "focused", "mouseover", "disabled"]);
    this._addCss("Combo.cmb_LF_Site>#combolist", "background", obj, ["normal", "focused", "mouseover", "selected", "disabled"]);

    obj = new nexacro.Style_border("1","solid","#38424fff","");
    this._addCss("Combo.cmb_LF_Site", "border", obj, ["normal", "focused", "mouseover", "selected", "disabled"]);
    this._addCss("Combo.cmb_LF_Site>#combolist", "border", obj, ["normal", "focused", "mouseover", "selected", "disabled"]);

    obj = new nexacro.Style_bordertype("normal","0","0","true","true","true","true");
    this._addCss("Combo.cmb_LF_Site", "bordertype", obj, ["normal", "focused", "mouseover", "selected", "disabled"]);
    this._addCss("Grid.grd_LF_Menu", "bordertype", obj, ["normal"]);
    this._addCss("Grid.grd_LF_Menu>#vscrollbar", "bordertype", obj, ["normal", "disabled", "selected", "mouseover", "pushed", "focused"]);
    this._addCss("Grid.grd_LF_Menu>#vscrollbar>#incbutton", "bordertype", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Grid.grd_LF_Menu>#vscrollbar>#decbutton", "bordertype", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Grid.grd_LF_MyMenu", "bordertype", obj, ["normal"]);
    this._addCss("Tab.tab_MDI_Tab>#spinupbutton", "bordertype", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Tab.tab_MDI_Tab>#spindownbutton", "bordertype", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);

    obj = new nexacro.Style_value("25");
    this._addCss("Combo.cmb_LF_Site", "buttonsize", obj, ["normal", "focused", "mouseover", "selected", "disabled"]);

    obj = new nexacro.Style_color("#aab4c0");
    this._addCss("Combo.cmb_LF_Site", "color", obj, ["normal", "focused", "mouseover", "selected", "disabled"]);
    this._addCss("Combo.cmb_LF_Site>#comboedit", "color", obj, ["normal", "focused", "mouseover", "disabled"]);
    this._addCss("Combo.cmb_LF_Site>#combolist", "color", obj, ["normal", "focused", "mouseover", "selected", "disabled"]);

    obj = new nexacro.Style_value("28");
    this._addCss("Combo.cmb_LF_Site", "itemheight", obj, ["normal", "focused", "mouseover", "selected", "disabled"]);
    this._addCss("Combo.cmb_LF_Site>#combolist", "itemheight", obj, ["mouseover", "selected", "disabled"]);

    obj = new nexacro.Style_color("#ffffff");
    this._addCss("Combo.cmb_LF_Site", "itemcolor", obj, ["selected"]);
    this._addCss("Combo.cmb_LF_Site>#combolist", "itemcolor", obj, ["selected"]);

    obj = new nexacro.Style_value("30");
    this._addCss("Combo.cmb_LF_Site", "opacity", obj, ["disabled"]);
    this._addCss("Combo.cmb_LF_Site>#comboedit", "opacity", obj, ["disabled"]);
    this._addCss("Combo.cmb_LF_Site>#dropbutton", "opacity", obj, ["disabled"]);

    obj = new nexacro.Style_padding("1 5 0 9");
    this._addCss("Combo.cmb_LF_Site>#comboedit", "padding", obj, ["normal", "focused", "mouseover", "disabled"]);

    obj = new nexacro.Style_value("URL('images::cmb_LF_SiteDropBtn.png')");
    this._addCss("Combo.cmb_LF_Site>#dropbutton", "image", obj, ["normal", "focused", "mouseover", "disabled"]);

    obj = new nexacro.Style_align("center middle");
    this._addCss("Combo.cmb_LF_Site>#dropbutton", "imagealign", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);

    obj = new nexacro.Style_value("URL('images::cmb_LF_SiteDropBtn_P.png')");
    this._addCss("Combo.cmb_LF_Site>#dropbutton", "image", obj, ["pushed", "selected"]);

    obj = new nexacro.Style_background("#454f5dff","","","0","0","0","0","true");
    this._addCss("Combo.cmb_LF_Site>#combolist", "itembackground", obj, ["normal", "focused", "disabled"]);

    obj = new nexacro.Style_color("#aab4c0");
    this._addCss("Combo.cmb_LF_Site>#combolist", "itemcolor", obj, ["normal", "focused", "mouseover", "disabled"]);

    obj = new nexacro.Style_font("antialias 11 NanumGothic");
    this._addCss("Combo.cmb_LF_Site>#combolist", "itemfont", obj, ["normal", "focused", "mouseover", "selected", "disabled"]);

    obj = new nexacro.Style_padding("1 9 0 9");
    this._addCss("Combo.cmb_LF_Site>#combolist", "itempadding", obj, ["normal", "focused", "mouseover", "selected", "disabled"]);

    obj = new nexacro.Style_background("#5f6d7eff","","","0","0","0","0","true");
    this._addCss("Combo.cmb_LF_Site>#combolist", "itembackground", obj, ["mouseover"]);

    obj = new nexacro.Style_background("#2170e5ff","","","0","0","0","0","true");
    this._addCss("Combo.cmb_LF_Site>#combolist", "itembackground", obj, ["selected"]);

    obj = new nexacro.Style_shadow("30");
    this._addCss("Combo.cmb_LF_Site>#combolist", "shadow", obj, ["disabled"]);

    obj = new nexacro.Style_background("#5f6d7eff","","","0","0","0","0","true");
    this._addCss("Grid.grd_LF_Menu", "background", obj, ["normal"]);
    this._addCss("Grid.grd_LF_Menu>#body", "background", obj, ["normal", "mouseover"]);
    this._addCss("Static.sta_LF_SiteBg", "background", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_LF_Bg", "background", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_border("0","none","","","1","solid","#353d48ff","","1","solid","#4e5b6bff","","0","none","","");
    this._addCss("Grid.grd_LF_Menu", "border", obj, ["normal"]);
    this._addCss("Grid.grd_LF_MyMenu", "border", obj, ["normal"]);

    obj = new nexacro.Style_color("#ffffff");
    this._addCss("Grid.grd_LF_Menu", "color", obj, ["normal"]);
    this._addCss("Grid.grd_LF_MyMenu", "color", obj, ["normal"]);
    this._addCss("Static.sta_LF_Title", "color", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_value("URL('images::grd_LF_MenuClose.png')");
    this._addCss("Grid.grd_LF_Menu", "treeclosebuttonimage", obj, ["normal"]);

    obj = new nexacro.Style_value("URL('images::grd_LF_MenuItem.png')");
    this._addCss("Grid.grd_LF_Menu", "treeitemimage", obj, ["normal"]);

    obj = new nexacro.Style_value("URL('images::grd_LF_MenuOpen.png')");
    this._addCss("Grid.grd_LF_Menu", "treeopenbuttonimage", obj, ["normal"]);

    obj = new nexacro.Style_align("left middle");
    this._addCss("Grid.grd_LF_Menu>#body", "cellalign", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Grid.grd_LF_MyMenu>#body", "cellalign", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Grid.grd_MDI_List>#body", "cellalign", obj, ["normal", "disabled", "mouseover"]);

    obj = new nexacro.Style_background("#39424dff","","","0","0","0","0","true");
    this._addCss("Grid.grd_LF_Menu>#body", "cellbackground", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Grid.grd_LF_MyMenu>#body", "cellbackground", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_background("#39424dff","","","0","0","0","0","true");
    this._addCss("Grid.grd_LF_Menu>#body", "cellbackground2", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Grid.grd_LF_MyMenu>#body", "cellbackground2", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_color("#b0bac7");
    this._addCss("Grid.grd_LF_Menu>#body", "cellcolor", obj, ["normal", "mouseover"]);
    this._addCss("Grid.grd_LF_MyMenu>#body", "cellcolor", obj, ["normal", "mouseover"]);

    obj = new nexacro.Style_color("#b0bac7");
    this._addCss("Grid.grd_LF_Menu>#body", "cellcolor2", obj, ["normal", "mouseover"]);
    this._addCss("Grid.grd_LF_MyMenu>#body", "cellcolor2", obj, ["normal", "mouseover"]);

    obj = new nexacro.Style_font("antialias 11 NanumGothic");
    this._addCss("Grid.grd_LF_Menu>#body", "cellfont", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Grid.grd_LF_MyMenu>#body", "cellfont", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Grid.grd_MDI_List>#body", "cellfont", obj, ["normal", "disabled"]);

    obj = new nexacro.Style_border("0","none","","");
    this._addCss("Grid.grd_LF_Menu>#body", "cellline", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Grid.grd_LF_MyMenu>#body", "cellline", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Grid.grd_MDI_List>#body", "cellline", obj, ["normal", "disabled", "mouseover"]);

    obj = new nexacro.Style_padding("0 0 0 10");
    this._addCss("Grid.grd_LF_Menu>#body", "cellpadding", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_value("#2170e5");
    this._addCss("Grid.grd_LF_Menu>#body", "selectbackground", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Grid.grd_LF_MyMenu>#body", "selectbackground", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_color("#ffffff");
    this._addCss("Grid.grd_LF_Menu>#body", "selectcolor", obj, ["normal", "mouseover"]);
    this._addCss("Grid.grd_LF_MyMenu>#body", "selectcolor", obj, ["normal", "mouseover"]);

    obj = new nexacro.Style_font("antialias 11 NanumGothic");
    this._addCss("Grid.grd_LF_Menu>#body", "selectfont", obj, ["normal", "mouseover"]);
    this._addCss("Grid.grd_LF_MyMenu>#body", "selectfont", obj, ["normal", "mouseover"]);

    obj = new nexacro.Style_border("0","none","","");
    this._addCss("Grid.grd_LF_Menu>#body", "selectline", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Grid.grd_LF_MyMenu>#body", "selectline", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Grid.grd_MDI_List>#body", "selectline", obj, ["normal", "disabled", "mouseover"]);

    obj = new nexacro.Style_color("#5f6c7c");
    this._addCss("Grid.grd_LF_Menu>#body", "cellcolor", obj, ["disabled"]);
    this._addCss("Grid.grd_LF_MyMenu>#body", "cellcolor", obj, ["disabled"]);

    obj = new nexacro.Style_color("#5f6c7c");
    this._addCss("Grid.grd_LF_Menu>#body", "cellcolor2", obj, ["disabled"]);
    this._addCss("Grid.grd_LF_MyMenu>#body", "cellcolor2", obj, ["disabled"]);

    obj = new nexacro.Style_color("#5f6c7c");
    this._addCss("Grid.grd_LF_Menu>#body", "selectcolor", obj, ["disabled"]);
    this._addCss("Grid.grd_LF_MyMenu>#body", "selectcolor", obj, ["disabled"]);

    obj = new nexacro.Style_font("bold antialias 11 NanumGothic");
    this._addCss("Grid.grd_LF_Menu>#body", "selectfont", obj, ["disabled"]);
    this._addCss("Grid.grd_LF_MyMenu>#body", "selectfont", obj, ["disabled"]);

    obj = new nexacro.Style_background("#2c333bff","","","0","0","0","0","true");
    this._addCss("Grid.grd_LF_Menu>#vscrollbar", "background", obj, ["normal", "disabled", "selected", "mouseover", "pushed", "focused"]);

    obj = new nexacro.Style_value("11");
    this._addCss("Grid.grd_LF_Menu>#vscrollbar", "scrollbarsize", obj, ["normal", "disabled", "selected", "mouseover", "pushed", "focused"]);

    obj = new nexacro.Style_value("10");
    this._addCss("Grid.grd_LF_Menu>#vscrollbar", "incbtnsize", obj, ["normal", "disabled", "selected", "mouseover", "pushed", "focused"]);

    obj = new nexacro.Style_value("10");
    this._addCss("Grid.grd_LF_Menu>#vscrollbar", "decbtnsize", obj, ["normal", "disabled", "selected", "mouseover", "pushed", "focused"]);

    obj = new nexacro.Style_value("50");
    this._addCss("Grid.grd_LF_Menu>#vscrollbar", "trackbarsize", obj, ["normal", "disabled", "selected", "mouseover", "pushed", "focused"]);

    obj = new nexacro.Style_padding("0");
    this._addCss("Grid.grd_LF_Menu>#vscrollbar", "padding", obj, ["normal", "disabled", "selected", "mouseover", "pushed", "focused"]);

    obj = new nexacro.Style_value("URL('images::grd_WF_MainNoticeScrolNon.png')");
    this._addCss("Grid.grd_LF_Menu>#vscrollbar>#incbutton", "image", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Grid.grd_LF_Menu>#vscrollbar>#decbutton", "image", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);

    obj = new nexacro.Style_background("","images::grd_LF_MenuScol.png","","0","0","50","50","true");
    this._addCss("Grid.grd_LF_Menu>#vscrollbar>#trackbar", "background", obj, ["normal", "disabled", "selected", "focused"]);

    obj = new nexacro.Style_line("0","none","","");
    this._addCss("Grid.grd_LF_Menu>#vscrollbar>#trackbar", "focusborder", obj, ["normal", "disabled", "selected", "focused", "mouseover", "pushed"]);

    obj = new nexacro.Style_background("","images::grd_LF_MenuScol_O.png","","0","0","50","50","true");
    this._addCss("Grid.grd_LF_Menu>#vscrollbar>#trackbar", "background", obj, ["mouseover", "pushed"]);

    obj = new nexacro.Style_background("#39424dff","","","0","0","0","0","true");
    this._addCss("Grid.grd_LF_MyMenu", "background", obj, ["normal"]);
    this._addCss("Grid.grd_LF_MyMenu>#body", "background", obj, ["normal", "mouseover"]);

    obj = new nexacro.Style_padding("0 0 0 0");
    this._addCss("Grid.grd_LF_MyMenu>#body", "cellpadding", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Grid.grd_MDI_List>#body", "cellpadding", obj, ["normal", "disabled", "mouseover"]);

    obj = new nexacro.Style_background("#00adffff","","","0","0","0","0","true");
    this._addCss("Edit.edt_LF_Search", "background", obj, ["normal", "focused", "mouseover", "disabled"]);

    obj = new nexacro.Style_border("0","none","","","0","none","","","0","none","","","1","solid","#009ae3ff","");
    this._addCss("Edit.edt_LF_Search", "border", obj, ["normal", "focused", "mouseover", "disabled"]);

    obj = new nexacro.Style_color("#cff0ff");
    this._addCss("Edit.edt_LF_Search", "color", obj, ["normal", "focused", "mouseover"]);

    obj = new nexacro.Style_padding("1 45 0 9");
    this._addCss("Edit.edt_LF_Search", "padding", obj, ["normal", "focused", "mouseover", "disabled"]);

    obj = new nexacro.Style_color("#29baff");
    this._addCss("Edit.edt_LF_Search", "color", obj, ["disabled"]);

    obj = new nexacro.Style_background("","images::sta_LF_Title.png","","0","0","0","0","true");
    this._addCss("Static.sta_LF_Title", "background", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_padding("1 9 0 9");
    this._addCss("Static.sta_LF_Title", "padding", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_border("1","solid","#707d8dff","","0","none","","","0","none","","","0","none","","");
    this._addCss("Static.sta_LF_SiteBg", "border", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_background("","images::btn_MDI_Home.png","","0","0","50","50","true");
    this._addCss("Button.btn_MDI_Home", "background", obj, ["normal", "focused", "disabled"]);

    obj = new nexacro.Style_background("","images::btn_MDI_Home_O.png","","0","0","50","50","true");
    this._addCss("Button.btn_MDI_Home", "background", obj, ["mouseover"]);

    obj = new nexacro.Style_background("","images::btn_MDI_Home_P.png","","0","0","50","50","true");
    this._addCss("Button.btn_MDI_Home", "background", obj, ["pushed", "selected"]);
    this._addCss("Button.btn_MDI_HomeS", "background", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);

    obj = new nexacro.Style_background("","images::btn_MDI_List.png","","0","0","50","50","true");
    this._addCss("Button.btn_MDI_List", "background", obj, ["normal", "focused", "disabled"]);

    obj = new nexacro.Style_background("","images::btn_MDI_List_O.png","","0","0","50","50","true");
    this._addCss("Button.btn_MDI_List", "background", obj, ["mouseover"]);

    obj = new nexacro.Style_background("","images::btn_MDI_List_P.png","","0","0","50","50","true");
    this._addCss("Button.btn_MDI_List", "background", obj, ["pushed", "selected"]);

    obj = new nexacro.Style_background("","images::tab_MDI_TabCascade.png","","0","0","50","50","true");
    this._addCss("Button.btn_MDI_TabCascade", "background", obj, ["normal", "focused", "disabled"]);

    obj = new nexacro.Style_background("","images::tab_MDI_TabCascade_O.png","","0","0","50","50","true");
    this._addCss("Button.btn_MDI_TabCascade", "background", obj, ["mouseover"]);

    obj = new nexacro.Style_background("","images::tab_MDI_TabCascade_P.png","","0","0","50","50","true");
    this._addCss("Button.btn_MDI_TabCascade", "background", obj, ["pushed", "selected"]);

    obj = new nexacro.Style_background("","images::tab_MDI_TabPop.png","","0","0","50","50","true");
    this._addCss("Button.btn_MDI_TabPop", "background", obj, ["normal", "focused", "disabled"]);

    obj = new nexacro.Style_background("","images::tab_MDI_TabPop_O.png","","0","0","50","50","true");
    this._addCss("Button.btn_MDI_TabPop", "background", obj, ["mouseover"]);

    obj = new nexacro.Style_background("","images::tab_MDI_TabPop_P.png","","0","0","50","50","true");
    this._addCss("Button.btn_MDI_TabPop", "background", obj, ["pushed", "selected"]);

    obj = new nexacro.Style_background("","images::tab_MDI_TabMax.png","","0","0","50","50","true");
    this._addCss("Button.btn_MDI_TabMax", "background", obj, ["normal", "focused", "disabled"]);

    obj = new nexacro.Style_background("","images::tab_MDI_TabMax_O.png","","0","0","50","50","true");
    this._addCss("Button.btn_MDI_TabMax", "background", obj, ["mouseover"]);

    obj = new nexacro.Style_background("","images::tab_MDI_TabMax_P.png","","0","0","50","50","true");
    this._addCss("Button.btn_MDI_TabMax", "background", obj, ["pushed", "selected"]);

    obj = new nexacro.Style_background("","images::tab_MDI_AllClose.png","","0","0","50","50","true");
    this._addCss("Button.btn_MDI_AllClose", "background", obj, ["normal", "focused", "disabled"]);

    obj = new nexacro.Style_background("","images::tab_MDI_AllClose_O.png","","0","0","50","50","true");
    this._addCss("Button.btn_MDI_AllClose", "background", obj, ["mouseover"]);

    obj = new nexacro.Style_background("","images::tab_MDI_AllClose_P.png","","0","0","50","50","true");
    this._addCss("Button.btn_MDI_AllClose", "background", obj, ["pushed", "selected"]);

    obj = new nexacro.Style_color("#444444");
    this._addCss("Grid.grd_MDI_List", "color", obj, ["normal"]);

    obj = new nexacro.Style_background("","","","0","0","0","0","true");
    this._addCss("Grid.grd_MDI_List>#body", "cellbackground", obj, ["normal", "disabled", "mouseover"]);

    obj = new nexacro.Style_background("","","","0","0","0","0","true");
    this._addCss("Grid.grd_MDI_List>#body", "cellbackground2", obj, ["normal", "disabled", "mouseover"]);

    obj = new nexacro.Style_color("#444444");
    this._addCss("Grid.grd_MDI_List>#body", "cellcolor", obj, ["normal", "disabled", "mouseover"]);

    obj = new nexacro.Style_color("#444444");
    this._addCss("Grid.grd_MDI_List>#body", "cellcolor2", obj, ["normal", "disabled", "mouseover"]);

    obj = new nexacro.Style_value("#transparent");
    this._addCss("Grid.grd_MDI_List>#body", "selectbackground", obj, ["normal", "disabled", "mouseover"]);

    obj = new nexacro.Style_color("#444444");
    this._addCss("Grid.grd_MDI_List>#body", "selectcolor", obj, ["normal", "disabled", "mouseover"]);

    obj = new nexacro.Style_font("underline bold antialias 11 NanumGothic");
    this._addCss("Grid.grd_MDI_List>#body", "selectfont", obj, ["normal", "disabled", "mouseover"]);

    obj = new nexacro.Style_font("underline bold antialias 11 NanumGothic");
    this._addCss("Grid.grd_MDI_List>#body", "cellfont", obj, ["mouseover"]);

    obj = new nexacro.Style_background("#e9e9e9ff","","","0","0","0","0","true");
    this._addCss("Static.sta_MDI_Bg", "background", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_border("0","none","","","0","none","","","1","solid","#c5c5c5ff","","0","none","","");
    this._addCss("Static.sta_MDI_Bg", "border", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_background("","images::tab_MDI_TabBtn.png","stretch","2","2","0","0","true");
    this._addCss("Tab.tab_MDI_Tab", "buttonbackground", obj, ["normal", "focused", "mouseover", "disabled"]);

    obj = new nexacro.Style_value("0 none");
    this._addCss("Tab.tab_MDI_Tab", "buttonborder", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);

    obj = new nexacro.Style_padding("10 10 10 16");
    this._addCss("Tab.tab_MDI_Tab", "buttonpadding", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);

    obj = new nexacro.Style_margin("0 -1 0 0");
    this._addCss("Tab.tab_MDI_Tab", "buttonmargin", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);

    obj = new nexacro.Style_color("#848484");
    this._addCss("Tab.tab_MDI_Tab", "color", obj, ["normal", "focused", "mouseover"]);

    obj = new nexacro.Style_background("","images::tab_MDI_TabBtnS.png","stretch","2","2","0","0","true");
    this._addCss("Tab.tab_MDI_Tab", "buttonbackground", obj, ["pushed", "selected"]);

    obj = new nexacro.Style_font("antialias 11 NanumGothic");
    this._addCss("Tab.tab_MDI_Tab", "font", obj, ["pushed", "selected"]);

    obj = new nexacro.Style_accessibility("","true","all","","","");
    this._addCss("Tab.tab_MDI_Tab>#spinupbutton", "accessibility", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Tab.tab_MDI_Tab>#spindownbutton", "accessibility", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);

    obj = new nexacro.Style_align("");
    this._addCss("Tab.tab_MDI_Tab>#spinupbutton", "align", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Tab.tab_MDI_Tab>#spindownbutton", "align", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);

    obj = new nexacro.Style_color("");
    this._addCss("Tab.tab_MDI_Tab>#spinupbutton", "color", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Tab.tab_MDI_Tab>#spindownbutton", "color", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);

    obj = new nexacro.Style_value("");
    this._addCss("Tab.tab_MDI_Tab>#spinupbutton", "cursor", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Tab.tab_MDI_Tab>#spindownbutton", "cursor", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);

    obj = new nexacro.Style_font("");
    this._addCss("Tab.tab_MDI_Tab>#spinupbutton", "font", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Tab.tab_MDI_Tab>#spindownbutton", "font", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);

    obj = new nexacro.Style_gradation("");
    this._addCss("Tab.tab_MDI_Tab>#spinupbutton", "gradation", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Tab.tab_MDI_Tab>#spindownbutton", "gradation", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);

    obj = new nexacro.Style_value("URL('images::tab_MDI_TabPre.png')");
    this._addCss("Tab.tab_MDI_Tab>#spinupbutton", "image", obj, ["normal", "focused", "disabled"]);

    obj = new nexacro.Style_align("");
    this._addCss("Tab.tab_MDI_Tab>#spinupbutton", "imagealign", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Tab.tab_MDI_Tab>#spindownbutton", "imagealign", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);

    obj = new nexacro.Style_value("");
    this._addCss("Tab.tab_MDI_Tab>#spinupbutton", "opacity", obj, ["normal", "focused", "mouseover", "pushed", "selected"]);
    this._addCss("Tab.tab_MDI_Tab>#spindownbutton", "opacity", obj, ["normal", "focused", "mouseover", "pushed", "selected"]);

    obj = new nexacro.Style_padding("");
    this._addCss("Tab.tab_MDI_Tab>#spinupbutton", "padding", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Tab.tab_MDI_Tab>#spindownbutton", "padding", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);

    obj = new nexacro.Style_shadow("");
    this._addCss("Tab.tab_MDI_Tab>#spinupbutton", "shadow", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);
    this._addCss("Tab.tab_MDI_Tab>#spindownbutton", "shadow", obj, ["normal", "focused", "mouseover", "pushed", "selected", "disabled"]);

    obj = new nexacro.Style_value("URL('images::tab_MDI_TabPre_O.png')");
    this._addCss("Tab.tab_MDI_Tab>#spinupbutton", "image", obj, ["mouseover", "selected"]);

    obj = new nexacro.Style_value("URL('images::tab_MDI_TabPre_P.png')");
    this._addCss("Tab.tab_MDI_Tab>#spinupbutton", "image", obj, ["pushed"]);

    obj = new nexacro.Style_value("50%");
    this._addCss("Tab.tab_MDI_Tab>#spinupbutton", "opacity", obj, ["disabled"]);
    this._addCss("Tab.tab_MDI_Tab>#spindownbutton", "opacity", obj, ["disabled"]);

    obj = new nexacro.Style_value("URL('images::tab_MDI_TabNxt.png')");
    this._addCss("Tab.tab_MDI_Tab>#spindownbutton", "image", obj, ["normal", "focused", "disabled"]);

    obj = new nexacro.Style_value("URL('images::tab_MDI_TabNxt_O.png')");
    this._addCss("Tab.tab_MDI_Tab>#spindownbutton", "image", obj, ["mouseover", "selected"]);

    obj = new nexacro.Style_value("URL('images::tab_MDI_TabNxt_P.png')");
    this._addCss("Tab.tab_MDI_Tab>#spindownbutton", "image", obj, ["pushed"]);

    obj = new nexacro.Style_value("URL('images::tab_MDI_Extra.png')");
    this._addCss("Tab.tab_MDI_Tab#extrabutton", "image", obj, ["normal"]);
    this._addCss("Tab.tab_MDI_Tab>#extrabutton", "image", obj, ["focused", "mouseover", "pushed", "disabled"]);

    obj = null;
    
//[add theme images]
  };
})();
