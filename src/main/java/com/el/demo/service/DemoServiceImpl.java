package com.el.demo.service;

import com.el.core.domain.CodeName;
import com.el.demo.mapper.DemoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 没有限定Profile的原因：用于测试确认生产环境中消息／邮件／存储等功能可用性（注意：仅对角色 DEV 有效）。
 *
 * @author neo.pan
 * @since 16/10/24
 */
@Profile("demo")
@Service
public class DemoServiceImpl implements DemoService {

    @Autowired
    private DemoMapper demoMapper;

    @Override
    public String userNameToUpperCase(@NotNull Integer userId) {
        return demoMapper.userNameOf(userId).toUpperCase();
    }

    @Override
    public List<CodeName> usersLike(String usernameLike) {
        return demoMapper.usersLike(usernameLike).stream()
                .map(CodeName::of)
                .collect(Collectors.toList());
    }

}
