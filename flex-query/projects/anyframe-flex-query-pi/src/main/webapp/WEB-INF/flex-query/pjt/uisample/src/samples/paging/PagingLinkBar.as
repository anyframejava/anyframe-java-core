package samples.paging
{

import flash.display.DisplayObject;
import flash.events.MouseEvent;
import mx.controls.NavBar;
import mx.controls.Button;
import mx.controls.LinkButton;
import mx.core.ClassFactory;
import mx.core.EdgeMetrics;
import mx.core.IFlexDisplayObject;
import mx.core.mx_internal;
import mx.events.ChildExistenceChangedEvent;
import mx.events.FlexEvent;
import mx.events.ItemClickEvent;
import mx.styles.ISimpleStyleClient;

use namespace mx_internal;

//--------------------------------------
//  Events
//--------------------------------------

/**
 *  Event occurs when user click the page number.
 *
 *  @eventType PagingEvent.PAGE_CLICK
 */
[Event(name="pageClick", type="samples.paging.PagingEvent")]

//--------------------------------------
//  Styles
//--------------------------------------

/**
 *  selected button styleName.
 *  @default selectedButtonStyle
 */
[Style(name="selectedButtonStyleName", type="String", inherit="no")]

/**
 *  Number of pixels between the LinkButton controls in the horizontal direction.
 * 
 *  @default 8
 */
[Style(name="horizontalGap", type="Number", format="Length", inherit="no")]

/**
 *  Number of pixels between the bottom border and the LinkButton controls.
 * 
 *  @default 2
 */
[Style(name="paddingBottom", type="Number", format="Length", inherit="no")]

/**
 *  Number of pixels between the top border and the LinkButton controls.
 * 
 *  @default 2
 */
[Style(name="paddingTop", type="Number", format="Length", inherit="no")]

/**
 *  Color of links as you roll the mouse pointer over them.
 *  The default value is based on the current <code>themeColor</code>.
 * 
 *  @default 0xEEFEE6 (light green)
 */
[Style(name="rollOverColor", type="uint", format="Color", inherit="yes")]

/**
 *  Background color of the LinkButton control as you press it.
 * 
 *  @default 0xCDFFC1
 */
[Style(name="selectionColor", type="uint", format="Color", inherit="yes")]

/**
 *  Separator color used by the default separator skin.
 * 
 *  @default 0xC4CCCC
 */
[Style(name="separatorColor", type="uint", format="Color", inherit="yes")]

/**
 *  Seperator symbol between LinkButton controls in the LinkBar. 
 * 
 *  @default mx.skins.halo.LinkSeparator
 */
[Style(name="separatorSkin", type="Class", inherit="no")]

/**
 *  Separator pixel width, in pixels.
 * 
 *  @default 1
 */
[Style(name="separatorWidth", type="Number", format="Length", inherit="yes")]

/**
 *  Text color of the link as you move the mouse pointer over it.
 * 
 *  @default 0x2B333C
 */
[Style(name="textRollOverColor", type="uint", format="Color", inherit="yes")]

/**
 *  Text color of the link as you press it.
 * 
 *  @default 0x000000
 */
[Style(name="textSelectedColor", type="uint", format="Color", inherit="yes")]

/**
 *  Number of pixels between children in the vertical direction.
 * 
 *  @default 8
 */
[Style(name="verticalGap", type="Number", format="Length", inherit="no")]

//--------------------------------------
//  Excluded APIs
//--------------------------------------

[Exclude(name="horizontalLineScrollSize", kind="property")]
[Exclude(name="horizontalPageScrollSize", kind="property")]
[Exclude(name="horizontalScrollBar", kind="property")]
[Exclude(name="horizontalScrollPolicy", kind="property")]
[Exclude(name="horizontalScrollPosition", kind="property")]
[Exclude(name="maxHorizontalScrollPosition", kind="property")]
[Exclude(name="maxVerticalScrollPosition", kind="property")]
[Exclude(name="verticalLineScrollSize", kind="property")]
[Exclude(name="verticalPageScrollSize", kind="property")]
[Exclude(name="verticalScrollBar", kind="property")]
[Exclude(name="verticalScrollPolicy", kind="property")]
[Exclude(name="verticalScrollPosition", kind="property")]
[Exclude(name="dataProvider", kind="property")]

[Exclude(name="scroll", kind="event")]
[Exclude(name="click", kind="event")]

[Exclude(name="horizontalScrollBarStyleName", kind="style")]
[Exclude(name="verticalScrollBarStyleName", kind="style")]

//--------------------------------------
//  Other metadata
//--------------------------------------

[MaxChildren(0)]

/**
 *  PagingLinkBar Class
 *
 *  @includeExample examples/LinkBarExample.mxml
 *
 *  @see mx.controls.NavBar
 *  @see mx.controls.LinkButton
 *  @see mx.controls.ToggleButtonBar
 *  @see mx.controls.ButtonBar
 */
public class PagingLinkBar extends NavBar
{
  //--------------------------------------------------------------------------
  //
  //  Class constants
  //
  //--------------------------------------------------------------------------

  /**
   *  @private
   */
  private static const SEPARATOR_NAME:String = "_separator";

  //--------------------------------------------------------------------------
  //
  //  Constructor
  //
  //--------------------------------------------------------------------------

  /**
   *  Constructor
   */
  public function PagingLinkBar()
  {
    super();

    navItemFactory = new ClassFactory(LinkButton);

    addEventListener(MouseEvent.CLICK, defaultClickHandler);
    addEventListener(ChildExistenceChangedEvent.CHILD_REMOVE, childRemoveHandler);
  }

  //--------------------------------------------------------------------------
  //
  //  Variables
  //
  //--------------------------------------------------------------------------

  /**
   *  @private
   *  prev button enabled
   */
  private var prevEnabled:Boolean;

  /**
   *  @private
   *  next button enabled
   */
  private var nextEnabled:Boolean;

  /**
   *  @private
   *  first button enabled
   */
  private var startEnabled:Boolean;

  /**
   *  @private
   *  last button enabled
   */
  private var endEnabled:Boolean;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  //------------------------------
  //  totalCount
  //------------------------------

  /**
   *  @private
   *  total count
   */
  private var _totalCount:uint = 1;

  [Bindable]

  /**
   *  전체 게시물 건수.
   */
  public function get totalCount():uint
  {
    return _totalCount;
  }

  /** 
   *  @private
   */
  public function set totalCount(value:uint):void
  {
    if (value < 1)
    {
      value = 1;
    }

    if (_totalCount != value)
    {
      _totalCount = value;

      createPageNumbers();
    }
  }

  //------------------------------
  //  currentPage
  //------------------------------

  /**
   *  @private
   *  current page
   */
  private var _currentPage:uint = 1;

  [Bindable]

  /**
   *  current page
   */
  public function get currentPage():uint
  {
    return _currentPage;
  }

  /**
   *  @private
   */
  public function set currentPage(value:uint):void
  {
    if (value < 1)
    {
      value = 1;
    }

    if (_currentPage != value)
    {
      _currentPage = value;

      createPageNumbers();
    }
  }

  //------------------------------
  //  numPages
  //------------------------------

  /**
   *  @private
   *  page number
   */
  private var _numPages:uint = 10;

  [Bindable]

  /**
   *
   *  @default 10
   */
  public function get numPages():uint
  {
    return _numPages;
  }

  /**
   *  @private
   */
  public function set numPages(value:uint):void
  {
    if (value < 1)
    {
      value = 1;
    }

    if (_numPages != value)
    {
      _numPages = Math.max(1, value);

      createPageNumbers();
    }
  }

  //------------------------------
  //  fetchSize
  //------------------------------

  /**
   *  @private
   *  Rows
   */
  private var _fetchSize:uint = 10;

  [Bindable]

  /**
   *  Rows
   *
   *  @default 10
   */
  public function get fetchSize():uint
  {
    return _fetchSize;
  }

  /**
   *  @private
   */
  public function set fetchSize(value:uint):void
  {
    if (value < 1)
    {
      value = 1;
    }

    if (_fetchSize != value)
    {
      var total:Number = _fetchSize * _currentPage;
      _currentPage = Math.ceil(total / value);
      _fetchSize = value;

      createPageNumbers();
    }
  }

  //------------------------------
  //  totalPage
  //------------------------------

  /**
   *  @private
   *  totalPage.
   */
  private var _totalPage:uint;

  /**
   *  total page
   */
  public function get totalPage():uint
  {
    return _totalPage;
  }

  //----------------------------------
  //  dataProvider
  //----------------------------------

  /**
   *  @private
   */
  override public function set dataProvider(value:Object):void
  {
    // do nothing
  }

  //--------------------------------------------------------------------------
  //
  //  Overridden methods: UIComponent
  //
  //--------------------------------------------------------------------------

  /**
   *  @private
   */
  override protected function createChildren():void
  {
    super.createChildren();

    createPageNumbers();
  }

  /**
   *  @private
   */
  override protected function updateDisplayList(unscaledWidth:Number,
                          unscaledHeight:Number):void
  {
    // The super method will lay out the Links.
    super.updateDisplayList(unscaledWidth, unscaledHeight);

    var vm:EdgeMetrics = viewMetricsAndPadding;

    var horizontalGap:Number = getStyle("horizontalGap");
    var verticalGap:Number = getStyle("verticalGap");

    var separatorHeight:Number = unscaledHeight - (vm.top + vm.bottom);
    var separatorWidth:Number = unscaledWidth - (vm.left + vm.right);

    // Lay out the separators.
    var n:int = numChildren;

    for (var i:int = 0; i < n; i++)
    {
      var child:IFlexDisplayObject = IFlexDisplayObject(getChildAt(i));

      var separator:IFlexDisplayObject = IFlexDisplayObject(rawChildren.getChildByName(SEPARATOR_NAME + i));

      if (separator)
      {
        separator.visible = false;

        // The 0th separator is to the left of the first link.
        // It should always be invisible, and doesn't need
        // to be laid out.
        if (i == 0)
        {
          continue;
        }

        if (isVertical())
        {
          separator.move(vm.left, child.y - verticalGap);
          separator.setActualSize(separatorWidth, verticalGap);

          // The separators don't get clipped.
          // (In general, chrome elements
          // don't get automatically clipped.)
          // So show a separator only if it is completely visible.
          if (separator.y + separator.height < unscaledHeight - vm.bottom)
          {
            separator.visible = true;
          }
        }
        else
        {
          separator.move(child.x - horizontalGap, vm.top);
          separator.setActualSize(horizontalGap, separatorHeight);

          if (separator.x + separator.width < unscaledWidth - vm.right)
          {
            separator.visible = true;
          }
        }
      }
    }

    var hilitedIndex:int = ((_currentPage - 1) % _numPages) + 2;
    hiliteSelectedNavItem(hilitedIndex);
    adjustNavButtons();
  }

  //--------------------------------------------------------------------------
  //
  //  Overridden methods: NavBar
  //
  //--------------------------------------------------------------------------

  /**
   *  @private
   */
  override protected function createNavItem(label:String,
                        icon:Class = null):IFlexDisplayObject
  {
    // Create the new LinkButton.

    var newLink:mx.controls.Button = mx.controls.Button(navItemFactory.newInstance());

    newLink.styleName = this;

    if (label && label.length > 0)
    {
      newLink.label = label;
    }
    else
    {
      newLink.label = " ";
    }

    if (icon)
    {
      newLink.setStyle("icon", icon);
    }

    addChild(newLink);

    newLink.addEventListener(MouseEvent.CLICK, clickHandler);

    // Create the new separator to the left of the LinkButton.
    var separatorClass:Class = Class(getStyle("separatorSkin"));

    if (separatorClass)
    {
      var separator:DisplayObject = DisplayObject(new separatorClass());

      separator.name = SEPARATOR_NAME + (numChildren - 1);

      if (separator is ISimpleStyleClient)
      {
        ISimpleStyleClient(separator).styleName = this;
      }

      rawChildren.addChild(separator);
    }
    
    return newLink;
  }

  /**
   *  @private
   */
  override protected function hiliteSelectedNavItem(index:int):void
  {
    super.selectedIndex = index;

    var child:mx.controls.Button = mx.controls.Button(getChildAt(selectedIndex));
    // set selectedButton style
    child.styleName = getStyle("selectedButtonStyleName");
	child.enabled = true;
  }

  /**
   *  @private
   */
  override protected function resetNavItems():void
  {
    // Reset the index values and selection state.
    var n:int = numChildren;
    for (var i:int = 0; i < n; i++)
    {
      var child:mx.controls.Button = mx.controls.Button(getChildAt(i));
      child.enabled = !(i == selectedIndex);
    }

    invalidateDisplayList();
  }

  //--------------------------------------------------------------------------
  //
  //  Methods
  //
  //--------------------------------------------------------------------------

  /**
   *  @private
   */
  private function adjustNavButtons():void
  {
    var link:mx.controls.Button = mx.controls.Button(getChildAt(0));
    link.enabled = startEnabled;

    link = mx.controls.Button(getChildAt(1));
    link.enabled = prevEnabled;
    
    link = mx.controls.Button(getChildAt(numChildren - 2));
    link.enabled = nextEnabled;
    
    link = mx.controls.Button(getChildAt(numChildren - 1));
    link.enabled = endEnabled;
  }

  /**
   *  @private
   */
  private function createPageNumbers():void
  {
    _totalPage = Math.ceil(_totalCount / _fetchSize);

    if (_currentPage > _totalPage)
    {
      _currentPage = _totalPage;
    }

    var prev:Number = _currentPage - (((_currentPage - 1) % _numPages) + 1);

    var next:Number = prev + _numPages + 1;

    prevEnabled = prev > 0;
    nextEnabled = _totalPage >= next;
    startEnabled = currentPage != 1;
    endEnabled = currentPage != _totalPage;

    var arr:Array = [];

    arr.push({label:"<<", data:1, toolTip:""});
    arr.push({label:"<", data:prev, toolTip:""});

    for (var i:int = 1 + prev; i < next && i <= totalPage; i++)
    {
      arr.push({label:i, data:i});
    }

    arr.push({label:">", data:next, toolTip:""});
    arr.push({label:">>", data:_totalPage, toolTip:""});

    super.dataProvider = arr;

    invalidateDisplayList();
  }

  //--------------------------------------------------------------------------
  //
  //  Event handlers
  //
  //--------------------------------------------------------------------------

  /**
   *  @private
   */
  private function childRemoveHandler(event:ChildExistenceChangedEvent):void
  {
    var child:DisplayObject = event.relatedObject;
    var index:int = getChildIndex(child);
    var separator:DisplayObject = rawChildren.getChildByName(SEPARATOR_NAME + index);
	if(separator != null){
		rawChildren.removeChild(separator);
		
	    // Shuffle the separators down.
		var n:int = numChildren - 1;
		for (var i:int = index; i < n; i++)
		{
			rawChildren.getChildByName(SEPARATOR_NAME + (i + 1)).name = SEPARATOR_NAME + i;
		}
	}
    
  }

  /**
   *  @private
   */
  private function defaultClickHandler(event:MouseEvent):void
  {
    // We do not want to propagate a MouseEvent.CLICK event up.
    if (!(event is ItemClickEvent))
    {
      event.stopImmediatePropagation();
    }
  }
  
  //--------------------------------------------------------------------------
  //
  //  Overridden event handlers: NavBar
  //
  //--------------------------------------------------------------------------
  
  /**
   *  @private
   */
  override protected function clickHandler(event:MouseEvent):void
  {
    var oldPage:uint;

    if (selectedIndex > -1)
    {
      oldPage = uint(dataProvider[selectedIndex].data);
    }

    var currentLabel:String = event.currentTarget.label;
    var newPage:uint;

    switch (currentLabel)
    {
      case "<":
        newPage = dataProvider[1].data;
        break;

      case ">":
        newPage = dataProvider[dataProvider.length - 2].data;
        break;
      
      case "<<":
        newPage = dataProvider[0].data;
        break;
      
      case ">>":
        newPage = dataProvider[dataProvider.length - 1].data;
        break;
      
      default:
        newPage = uint(currentLabel);
        break;
    }

    currentPage = newPage;

    var e:PagingEvent = new PagingEvent(PagingEvent.PAGE_CLICK);
    e.oldPage = oldPage;
    e.newPage = newPage;

    dispatchEvent(e);
  }
}

}
