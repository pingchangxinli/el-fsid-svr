package com.el.demo.messaging;

import com.el.core.messaging.domain.EventSource;
import lombok.Data;
import lombok.val;

/**
 * @author neo.pan
 * @since 17/5/4
 */
@Data
public class DemoEventSource implements EventSource {

    private DemoEventUser user;

    public static DemoEventSource of(DemoEventUser user) {
        val eventSource = new DemoEventSource();
        eventSource.user = user;
        return eventSource;
    }

}
