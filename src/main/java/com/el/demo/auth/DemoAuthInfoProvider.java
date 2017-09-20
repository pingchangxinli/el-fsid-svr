package com.el.demo.auth;

import com.el.core.auth.AccountInfoProvider;
import com.el.core.auth.AuthAccount;
import com.el.demo.datapower.DemoDpIndices;
import org.apache.shiro.crypto.hash.Sha256Hash;
import org.apache.shiro.util.ByteSource;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @author neo.pan
 * @since 17/4/20
 */
public class DemoAuthInfoProvider extends AccountInfoProvider {

    private static final String REALM_NAME = "AUTH_STORE_DEMO";

    private static List<Integer> DEMO_USERS = Arrays.asList(1, 2, 3);

    private static String loginNoOf(Integer id) {
        return "u" + id;
    }

    private static String DEMO_ROLE = "SYS";

    private static String DEMO_SALT = "anything";
    private static String DEMO_HASH = new Sha256Hash("password", DEMO_SALT).toHex();

    private static Map<String, AuthAccount> AUTH_STORE;

    static {
        AUTH_STORE = DEMO_USERS.stream()
                .collect(Collectors.toMap(DemoAuthInfoProvider::loginNoOf,
                        id -> DemoAuthAccount.of(loginNoOf(id), id,
                                DEMO_ROLE, DEMO_HASH, DEMO_SALT,
                                DemoDpIndices.of(id, 100 + id))));
    }

    @Override
    public String getStoreName() {
        return REALM_NAME;
    }

    @Override
    protected AuthAccount getAccount(String loginNo) {
        return AUTH_STORE.get(loginNo);
    }

    @Override
    public String hashCredentials(char[] credentials, ByteSource salt) {
        return new Sha256Hash(credentials, salt).toHex();
    }
}
