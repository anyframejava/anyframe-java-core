package samples.paging
{

import flash.events.Event;

/**
 *  PagingEvent Class
 */
public class PagingEvent extends Event
{
  //--------------------------------------------------------------------------
  //
  //  Class constants
  //
  //--------------------------------------------------------------------------

  public static const PAGE_CLICK:String = "pageClick";

  //--------------------------------------------------------------------------
  //
  //  Constructor
  //
  //--------------------------------------------------------------------------

  /**
   *  Constructor.
   */
  public function PagingEvent(type:String, bubbles:Boolean = false, cancelable:Boolean = false, detail:int = -1)
  {
    super(type, bubbles, cancelable);

    this.detail = detail;
  }

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   *  새로운 페이지를 나타낸다.
   */
  public var oldPage:uint;

  /**
   *  이전의 페이지를 나타낸다.
   */
  public var newPage:uint;

  //----------------------------------
  //  detail
  //----------------------------------

  /**
   */
  public var detail:int;

  //--------------------------------------------------------------------------
  //
  //  Overridden methods: Event
  //
  //--------------------------------------------------------------------------

  /**
   *  @private
   */
  override public function clone():Event
  {
    return new PagingEvent(type, bubbles, cancelable, detail);
  }
}
}
