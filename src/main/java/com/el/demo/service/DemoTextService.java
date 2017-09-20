package com.el.demo.service;

/**
 * @author neo.pan
 * @since 16/11/16
 */
public interface DemoTextService {

    /**
     * 所有字母转成大写
     *
     * @param text 文本
     * @return 转换后的文本
     */
    String toUpperCase(String text);

    /**
     * 所有字母转成小写
     *
     * @param text 文本
     * @return 转换后的文本
     */
    String toLowerCase(String text);
}
