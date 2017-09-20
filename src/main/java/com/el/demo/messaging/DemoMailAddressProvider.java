package com.el.demo.messaging;

import com.el.core.messaging.domain.EventUser;
import com.el.core.messaging.mailer.MailAddressProvider;
import lombok.Setter;

import java.util.function.Function;

/**
 * @author neo.pan
 * @since 17/5/4
 */
public class DemoMailAddressProvider implements MailAddressProvider {

    @Setter
    private Function<EventUser, String> mailAddressResolver;

    @Override
    public String getMailAddress(EventUser user) {
        return mailAddressResolver.apply(user);
    }

}
