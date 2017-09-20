package com.el.demo.messaging;

import com.el.core.messaging.domain.EventUser;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author neo.pan
 * @since 17/5/4
 */
@Data
@EqualsAndHashCode(of = "id")
public class DemoEventUser implements EventUser {

    private Integer id;

    public static DemoEventUser userOf(Integer id) {
        DemoEventUser user = new DemoEventUser();
        user.id = id;
        return user;
    }

    public static DemoEventUser[] usersOf(Integer... ids) {
        int n = ids.length;
        DemoEventUser[] users = new DemoEventUser[n];
        for (int i = 0; i < n; i++) {
            users[i] = userOf(ids[i]);
        }
        return users;
    }

}
