package com.el.demo.messaging;

import com.el.core.messaging.domain.EventTarget;
import com.el.core.messaging.domain.EventUser;
import lombok.Data;
import lombok.val;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * @author neo.pan
 * @since 17/5/4
 */
@Data
public class DemoEventTarget implements EventTarget {

    private Set<EventUser> users;

    public static DemoEventTarget of(List<DemoEventUser> users) {
        val eventTarget = new DemoEventTarget();
        eventTarget.users = new HashSet<>(users);
        return eventTarget;
    }

}
