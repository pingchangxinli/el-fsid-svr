package com.el.demo.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

/**
 * @author neo.pan
 * @since 16/4/14
 */
@Profile("demo")
@Slf4j
@Validated
@Component
public class DemoValidationServiceImpl implements DemoValidationService {

    @Override
    public String createUser(String email, String username, String password) {
        log.debug(String.format("[SMS] validated: %s:%s@%s", username, password, email));
        return username;
    }
}
