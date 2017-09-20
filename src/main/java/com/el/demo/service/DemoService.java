package com.el.demo.service;

import com.el.core.domain.CodeName;

import java.util.List;

/**
 * @author neo.pan
 * @since 16/10/24
 */
public interface DemoService {

    /**
     * @param userId
     * @return
     */
    String userNameToUpperCase(Integer userId);

    /**
     * @param usernameLike
     * @return
     */
    List<CodeName> usersLike(String usernameLike);
}
