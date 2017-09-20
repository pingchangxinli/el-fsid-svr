package com.el.demo.service;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

/**
 * @author neo.pan
 * @since 17/3/8
 */
public interface DemoValidationService {

    @Length(min = 3, max = 5)
    String createUser(@NotBlank @Email String email,
                      @NotBlank String username,
                      @NotBlank String password);
}
