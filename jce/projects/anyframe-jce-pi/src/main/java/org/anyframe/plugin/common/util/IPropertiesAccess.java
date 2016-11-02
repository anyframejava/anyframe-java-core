package org.anyframe.plugin.common.util;


/**
 * SpringFramework 의 property 들을 구하는 기능.
 * @author uchung
 *
 */
public interface IPropertiesAccess {
  /**
   * name 에 해당되는 property 값을 구함
   * @param name property 명
   * @return name 에 해당되는 property 값
   */
  String get(String name);
  
  /**
   * name 에 해당되는 property 값을 구함.
   * 만약 해당 property 가 없거나 null 이면 defaultValue 를 return 함
   * @param name property 명
   * @return name 에 해당되는 property 값.
   */
  String get(String name, String defaultValue);
  /**
   * name 에 해당되는 property 값을 set함
   * @param name property 명
   * @param value set 할 값
   */
  void set(String name, String value);
}
